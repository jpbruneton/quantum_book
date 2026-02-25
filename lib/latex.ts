import katex from "katex";
import { KATEX_MACROS } from "@/lib/latexMacros";

/**
 * Processes an HTML string and renders all $...$ (inline) and $$...$$ (display)
 * LaTeX math expressions into KaTeX HTML. Processes display math first to avoid
 * double-matching the inner dollar signs.
 */
export function processLatex(html: string): string {
  // 1. Display math: $$...$$
  let result = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
        trust: false,
        macros: KATEX_MACROS,
      });
    } catch {
      return match;
    }
  });

  // 2. Inline math: $...$ — exclude < and > to avoid matching inside HTML tags
  result = result.replace(/\$([^$<>\n]+?)\$/g, (match, math) => {
    try {
      return katex.renderToString(math.trim(), {
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
