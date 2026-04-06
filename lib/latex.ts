import katex from "katex";
import { KATEX_MACROS } from "@/lib/latexMacros";

function sanitizeMathCommon(math: string): string {
  // NBSP (U+00A0, "character 160") triggers KaTeX strict-mode warnings; TeX expects normal spaces.
  let result = math.replace(/\u00a0/g, " ");
  // Curly/smart quotes (U+201C " U+201D ") are invalid in LaTeX math mode; replace with ASCII ".
  result = result.replace(/[\u201c\u201d]/g, '"');
  // Left/right single curly quotes (U+2018 ' U+2019 ') → ASCII apostrophe.
  result = result.replace(/[\u2018\u2019]/g, "'");
  // KaTeX does not reliably support \mathbb on digits; only rewrite the identity symbol form.
  result = result.replace(/\\mathbb\s*\{\s*1\s*\}/g, "\\mathbf{1}");
  // Tolerate malformed one-argument braket usage.
  return result.replace(/\\braket\{([^{}]+)\}(?!\{)/g, "\\left\\langle $1 \\right\\rangle");
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

/**
 * TeX allows breaking pmatrix rows across physical lines; those newlines must become \\ for KaTeX.
 * If \\ is already present, only collapse whitespace/newlines.
 */
function normalizeMultilineMatrixEnvironmentsInMathFragment(fragment: string): string {
  const matrixEnv = "pmatrix|bmatrix|Bmatrix|vmatrix|Vmatrix|matrix|smallmatrix";
  return fragment.replace(
    new RegExp(`\\\\begin\\{(${matrixEnv})\\}([\\s\\S]*?)\\\\end\\{\\1\\}`, "g"),
    (full, env: string, inner: string) => {
      const t = inner.trim();
      if (!/\n/.test(t)) return full;
      if (t.includes("\\\\")) {
        const collapsed = t.replace(/\s+/g, " ");
        return `\\begin{${env}}${collapsed}\\end{${env}}`;
      }
      const rows = t.split(/\n+/).map((s) => s.trim()).filter(Boolean);
      return `\\begin{${env}}${rows.join("\\\\")}\\end{${env}}`;
    }
  );
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
  result = result.replace(/\\text\{([^{}]*)\}/g, (_match, textContent: string) => {
    const normalizedText = textContent.replace(/\$([^$\n]+?)\$/g, "$1");
    return `\\text{${normalizedText}}`;
  });
  result = normalizeMultilineMatrixEnvironmentsInMathFragment(result);
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
  // Empty display pairs break non-greedy $$...$$ (first match closes on second line, leaves \begin{aligned} raw).
  normalizedHtml = normalizedHtml.replace(/\$\$\s*\n+\s*\$\$/g, "");

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

  // 2. Inline math: $...$ — allow newlines inside (e.g. \begin{pmatrix} 1\n i \end{pmatrix}).
  result = result.replace(/\$([^$]+?)\$/g, (match, math) => {
    if (/<\/?[a-z][^>]*>/i.test(math)) return match;

    let body = math.trim();
    body = normalizeMultilineMatrixEnvironmentsInMathFragment(body);

    try {
      return katex.renderToString(sanitizeMathCommon(body), {
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
