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

  const looksLikeAlignedSystem = result.includes("&") && result.includes("\\\\");
  if (looksLikeAlignedSystem) {
    result = result.replace(/\\\\\s*$/, "");
    return `\\begin{aligned}\n${result}\n\\end{aligned}`;
  }

  return result;
}

function sanitizeDisplayMath(math: string): string {
  let result = sanitizeMathCommon(math);
  // Prevent invalid nested inline math markers inside display blocks, e.g. \text{le $1$ ...}
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
  // 1. Display math: $$...$$
  let result = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
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
