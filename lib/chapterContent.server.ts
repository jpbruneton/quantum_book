import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";

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

function normalizeFigurePath(path: string): string {
  const withoutPrefix = path.replace(/^\.?\/*/, "").replace(/^figs\//, "");
  return `/figs/${withoutPrefix}`;
}

function extractFigureHtml(figureBlock: string): string {
  const includeGraphicsMatch = figureBlock.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/);
  if (!includeGraphicsMatch) return "";

  const imagePath = normalizeFigurePath(includeGraphicsMatch[1].trim());
  const captionMatch = figureBlock.match(/\\caption\{([\s\S]*?)\}/);
  const captionRaw = captionMatch ? captionMatch[1].replace(/\s+/g, " ").trim() : "";
  const caption = cleanLatexInline(captionRaw);
  const altText = caption || "Figure";

  const figCaption = caption ? `<figcaption>${caption}</figcaption>` : "";
  return `<figure class="latex-figure"><img src="${imagePath}" alt="${altText}" loading="lazy" />${figCaption}</figure>`;
}

function normalizeLatexBlocks(input: string): string {
  let result = input;

  // Render LaTeX figures as HTML figures, instead of showing raw environment tags.
  result = result.replace(/\\begin\{figure\*?\}[\s\S]*?\\end\{figure\*?\}/g, (block) => {
    return `\n\n${extractFigureHtml(block)}\n\n`;
  });

  result = result.replace(/\\begin\{definition\}(?:\[([^\]]+)\])?/g, (_match, label: string) => {
    const definitionTitle = label ? `Definition (${label})` : "Definition";
    return `\n\n<strong>${definitionTitle}.</strong> `;
  });
  result = result.replace(/\\end\{definition\}/g, "\n\n");

  // Convert common display environments so processLatex() can render them.
  result = result.replace(/\\begin\{(equation\*?|align\*?|gather\*?|multline\*?)\}/g, "\n\n$$\n");
  result = result.replace(/\\end\{(equation\*?|align\*?|gather\*?|multline\*?)\}/g, "\n$$\n\n");
  result = result.replace(/\\begin\{eqnarray\*?\}/g, "\n\n$$\n\\\\begin{aligned}\n");
  result = result.replace(/\\end\{eqnarray\*?\}/g, "\n\\\\end{aligned}\n$$\n\n");
  result = result.replace(/\\nonumber/g, "");
  result = result.replace(/\\\[/g, "$$").replace(/\\\]/g, "$$");
  result = result.replace(/\\\(/g, "$").replace(/\\\)/g, "$");

  // Remove noisy reference commands from online prose.
  result = result.replace(/\\cite\{[^{}]*\}/g, "");
  result = result.replace(/\\footnote\{[\s\S]*?\}/g, "");
  result = result.replace(/\\label\{[^{}]*\}/g, "");
  result = result.replace(/\\ref\{[^{}]*\}/g, "");

  // Remove line-level environments that are not needed for web rendering.
  result = result.replace(/\\begin\{(center|flushleft|flushright)\}/g, "");
  result = result.replace(/\\end\{(center|flushleft|flushright)\}/g, "");
  return result;
}

function renderParagraph(paragraph: string): string {
  const cleaned = cleanLatexInline(paragraph);
  if (!cleaned) return "";
  if (cleaned.startsWith("<figure")) return cleaned;
  if (cleaned.startsWith("$$") && cleaned.endsWith("$$")) return cleaned;
  return `<p>${cleaned}</p>`;
}

function paragraphsToHtml(paragraphs: string[]): string {
  return paragraphs.map((paragraph) => renderParagraph(paragraph)).filter((chunk) => chunk.length > 0).join("\n\n");
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

  const body = normalizeLatexBlocks(keptLines.join("\n")).trim();
  if (!body) return [];

  const paragraphs = body
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").trim())
    .filter((paragraph) => paragraph.length > 0);

  return paragraphs;
}

function getTexPathByFileName(texFile: string): string {
  if (!texFile) return "";
  return join(process.cwd(), "content", "tex", texFile);
}

export function getLessonWebContent(texFile: string, paragraphCount: number): string {
  const texPath = getTexPathByFileName(texFile);
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
