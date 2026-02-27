import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const TEX_FILE_BY_SLUG: Record<string, string> = {
  introduction: "chp1.tex",
  "espaces-de-hilbert": "chp2.tex",
  postulats: "chp3.tex",
  "theorie-des-operateurs-lineaires": "chp4.tex",
};

function stripComment(line: string): string {
  const protectedPercent = "__ESCAPED_PERCENT__";
  const escaped = line.replace(/\\%/g, protectedPercent);
  const withoutComment = escaped.replace(/%.*$/, "");
  return withoutComment.replace(new RegExp(protectedPercent, "g"), "\\%");
}

function shouldSkipLatexLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;

  const skipPrefixes = [
    "\\documentclass",
    "\\usepackage",
    "\\begin{document}",
    "\\end{document}",
    "\\tableofcontents",
    "\\chapter",
    "\\section",
    "\\subsection",
    "\\subsubsection",
    "\\label",
    "\\bibliographystyle",
    "\\bibliography",
    "\\appendix",
    "\\newpage",
    "\\clearpage",
    "\\maketitle",
    "\\title",
    "\\author",
    "\\date",
    "\\input",
    "\\include",
  ];

  for (const prefix of skipPrefixes) {
    if (trimmed.startsWith(prefix)) return true;
  }

  return false;
}

function cleanLatexInline(text: string): string {
  let result = text;
  result = result.replace(/\\emph\{([^{}]+)\}/g, "<em>$1</em>");
  result = result.replace(/\\textit\{([^{}]+)\}/g, "<em>$1</em>");
  result = result.replace(/\\textbf\{([^{}]+)\}/g, "<strong>$1</strong>");
  result = result.replace(/\\og\s*/g, "« ");
  result = result.replace(/\s*\\fg/g, " »");
  result = result.replace(/~+/g, " ");
  result = result.replace(/\\\\/g, "<br/>");
  return result.trim();
}

function paragraphsToHtml(paragraphs: string[]): string {
  return paragraphs.map((paragraph) => `<p>${cleanLatexInline(paragraph)}</p>`).join("\n\n");
}

function parseTexParagraphs(texSource: string): string[] {
  const normalized = texSource.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");

  const keptLines: string[] = [];
  for (const rawLine of lines) {
    const line = stripComment(rawLine);
    if (shouldSkipLatexLine(line)) continue;
    keptLines.push(line);
  }

  const body = keptLines.join("\n").trim();
  if (!body) return [];

  const paragraphs = body
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 0);

  return paragraphs;
}

function getTexPathBySlug(slug: string): string {
  const fileName = TEX_FILE_BY_SLUG[slug];
  if (!fileName) return "";
  return join(process.cwd(), "content", "tex", fileName);
}

export function getChapterWebContent(slug: string, paragraphCount: number): string {
  const texPath = getTexPathBySlug(slug);
  if (!texPath) return "";

  try {
    const source = readFileSync(texPath, "utf-8");
    const paragraphs = parseTexParagraphs(source);
    const limitedParagraphs = paragraphCount > 0 ? paragraphs.slice(0, paragraphCount) : paragraphs;
    if (limitedParagraphs.length === 0) return "";
    return paragraphsToHtml(limitedParagraphs);
  } catch {
    return "";
  }
}
