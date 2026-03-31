import katex from "katex";
import { KATEX_MACROS } from "@/lib/latexMacros";

function sanitizeMathCommon(math: string): string {
  let result = math;
  // Tolerate malformed one-argument braket usage.
  result = result.replace(/\\braket\{([^{}]+)\}(?!\{)/g, "\\left\\langle $1 \\right\\rangle");
  return result;
}

function normalizeDisplayAlignment(math: string): string {
  let result = math.trim();
  const hasExplicitAligned = /\\begin\{(aligned|align|align\*|gather|gather\*)\}/.test(result);
  if (hasExplicitAligned) return result;

  // align/align* rows can legitimately contain '&' even on a single line.
  const looksLikeAlignedSystem = result.includes("&");
  if (looksLikeAlignedSystem) {
    result = result.replace(/\\\\\s*$/, "");
    return `\\begin{aligned}\n${result}\n\\end{aligned}`;
  }

  return result;
}

function sanitizeDisplayMath(math: string): string {
  let result = sanitizeMathCommon(math);
  // If paragraph tags/entities leaked into math content, strip them before KaTeX parsing.
  result = result
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  result = result
    .replace(/<\s*\/?\s*p\b[^>]*>/gi, " ")
    .replace(/<\s*br\b[^>]*>/gi, " ");

  // Strip nested $...$ inside \text{...} so KaTeX does not see $ as math delimiters.
  // After stripping, commands like \C or \Phi must stay in math mode: prefer
  // \text{(... }\C^n\text{)} over \text{(... $\C^n$)} in source.
  result = result.replace(/\\text\{([^{}]*)\}/g, (_match, textContent: string) => {
    const normalizedText = textContent.replace(/\$([^$\n]+?)\$/g, "$1");
    return `\\text{${normalizedText}}`;
  });
  return normalizeDisplayAlignment(result);
}

/**
 * Processes an HTML string and renders all $...$ (inline) and $$...$$ (display)
 * LaTeX math expressions into KaTeX HTML. Processes display math first to avoid
 * double-matching the inner dollar signs.
 */
export function processLatex(html: string): string {
  // Recover aligned systems accidentally split across <p> tags.
  let normalizedHtml = html.replace(
    /<p>\s*\\{1,2}begin\{aligned\}\s*<\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>\s*\\{1,2}end\{aligned\}\s*<\/p>/g,
    (_match, body: string) => `$$\\begin{aligned} ${body.trim()} \\end{aligned}$$`
  );
  normalizedHtml = normalizedHtml.replace(/\\{2}begin\{aligned\}/g, "\\begin{aligned}");
  normalizedHtml = normalizedHtml.replace(/\\{2}end\{aligned\}/g, "\\end{aligned}");
  // Safety net: support display delimiters written as \[...\] if they leaked through.
  normalizedHtml = normalizedHtml.replace(/(?<!\\)\\\[/g, "$$");
  normalizedHtml = normalizedHtml.replace(/(?<!\\)\\\]/g, "$$");

  // 1. Display math: $$...$$
  let result = normalizedHtml.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
    const safeMath = sanitizeDisplayMath(math.trim());
    try {
      return katex.renderToString(safeMath, {
        displayMode: true,
        throwOnError: false,
        trust: false,
        macros: KATEX_MACROS,
      });
    } catch {
      return match;
    }
  });

  // 2. Inline math: $...$ — line-scoped to avoid swallowing prose.
  result = result.replace(/\$([^$\n]+?)\$/g, (match, math) => {
    // Guard against accidental capture of HTML fragments.
    if (/<\/?[a-z][^>]*>/i.test(math)) return match;

    try {
      return katex.renderToString(sanitizeMathCommon(math.trim()), {
        displayMode: false,
        throwOnError: false,
        trust: false,
        macros: KATEX_MACROS,
      });
    } catch {
      return match;
    }
  });

  return result;
}
