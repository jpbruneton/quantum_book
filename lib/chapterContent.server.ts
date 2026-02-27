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
  const accentMap: Record<string, Record<string, string>> = {
    "'": { a: "á", e: "é", i: "í", o: "ó", u: "ú", y: "ý", A: "Á", E: "É", I: "Í", O: "Ó", U: "Ú", Y: "Ý" },
    "`": { a: "à", e: "è", i: "ì", o: "ò", u: "ù", A: "À", E: "È", I: "Ì", O: "Ò", U: "Ù" },
    "^": { a: "â", e: "ê", i: "î", o: "ô", u: "û", A: "Â", E: "Ê", I: "Î", O: "Ô", U: "Û" },
    '"': { a: "ä", e: "ë", i: "ï", o: "ö", u: "ü", y: "ÿ", A: "Ä", E: "Ë", I: "Ï", O: "Ö", U: "Ü" },
  };

  result = result.replace(/\\([`'^"])\{?([A-Za-z])\}?/g, (_m, accent: string, letter: string) => {
    const replacement = accentMap[accent]?.[letter];
    return replacement ?? letter;
  });
  result = result.replace(/\\c\{([cC])\}/g, (_m, letter: string) => (letter === "c" ? "ç" : "Ç"));

  result = result.replace(/\\emph\{([^{}]+)\}/g, "<em>$1</em>");
  result = result.replace(/\\textit\{([^{}]+)\}/g, "<em>$1</em>");
  result = result.replace(/\\textbf\{([^{}]+)\}/g, "<strong>$1</strong>");
  result = result.replace(/\\uline\{([^{}]+)\}/g, "<em>$1</em>");
  result = result.replace(/\\og(?:\{\})?\s*/g, "« ");
  result = result.replace(/\s*\\fg(?:\{\})?/g, " »");
  result = result.replace(/---/g, "—");
  result = result.replace(/--/g, "—");
  result = result.replace(/~+/g, " ");
  return result.trim();
}

function stripFootnotes(input: string): string {
  const marker = "\\footnote{";
  let result = "";
  let cursor = 0;

  while (cursor < input.length) {
    const start = input.indexOf(marker, cursor);
    if (start === -1) {
      result += input.slice(cursor);
      break;
    }

    result += input.slice(cursor, start);
    let index = start + marker.length;
    let depth = 1;

    while (index < input.length && depth > 0) {
      const char = input[index];
      const previous = index > 0 ? input[index - 1] : "";

      if (char === "{" && previous !== "\\") depth += 1;
      if (char === "}" && previous !== "\\") depth -= 1;
      index += 1;
    }

    cursor = index;
  }

  return result;
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
  const isPdfFigure = imagePath.toLowerCase().endsWith(".pdf");
  if (isPdfFigure) {
    return `<figure class="latex-figure"><object class="latex-figure-pdf" data="${imagePath}" type="application/pdf"><a class="latex-figure-pdf-link" href="${imagePath}" target="_blank" rel="noreferrer">Ouvrir la figure PDF</a></object>${figCaption}</figure>`;
  }

  return `<figure class="latex-figure"><img src="${imagePath}" alt="${altText}" loading="lazy" />${figCaption}</figure>`;
}

function normalizeLatexBlocks(input: string): string {
  let result = input;
  let sectionIndex = 0;
  let subsectionIndex = 0;
  let subsubsectionIndex = 0;
  let paragraphIndex = 0;

  // Be tolerant to over-escaped LaTeX sequences from copy/paste paths.
  result = result.replace(/\\\\([A-Za-z]+)/g, "\\$1");
  result = result.replace(/\\\$/g, "$");
  result = result.replace(/\\,/g, " ");
  result = result.replace(/\\:/g, " ");
  result = result.replace(/\\;/g, " ");
  result = result.replace(/\\\./g, ".");

  // Render LaTeX figures as HTML figures, instead of showing raw environment tags.
  result = result.replace(/\\begin\{figure\*?\}[\s\S]*?\\end\{figure\*?\}/g, (block) => {
    return `\n\n${extractFigureHtml(block)}\n\n`;
  });

  // Ignore mdframed wrappers while preserving their inner content.
  result = result.replace(/\\begin\{mdframed\}(?:\[[^\]]*\])?/g, "");
  result = result.replace(/\\end\{mdframed\}/g, "");

  // Render section-like commands as headings in document order.
  result = result.replace(
    /\\(section|subsection|subsubsection|paragraph)\*?\{([\s\S]*?)\}/g,
    (_m, level: string, title: string) => {
      if (level === "section") {
        sectionIndex += 1;
        subsectionIndex = 0;
        subsubsectionIndex = 0;
        paragraphIndex = 0;
        return `\n\n<h2>${sectionIndex}. ${cleanLatexInline(title)}</h2>\n\n`;
      }

      if (level === "subsection") {
        subsectionIndex += 1;
        subsubsectionIndex = 0;
        paragraphIndex = 0;
        const prefix = sectionIndex > 0 ? `${sectionIndex}.${subsectionIndex}` : `${subsectionIndex}`;
        return `\n\n<h3>${prefix}. ${cleanLatexInline(title)}</h3>\n\n`;
      }

      if (level === "subsubsection") {
        subsubsectionIndex += 1;
        paragraphIndex = 0;
        const prefix = sectionIndex > 0
          ? `${sectionIndex}.${Math.max(subsectionIndex, 1)}.${subsubsectionIndex}`
          : `${Math.max(subsectionIndex, 1)}.${subsubsectionIndex}`;
        return `\n\n<h4>${prefix}. ${cleanLatexInline(title)}</h4>\n\n`;
      }

      paragraphIndex += 1;
      const prefix = sectionIndex > 0
        ? `${sectionIndex}.${Math.max(subsectionIndex, 1)}.${Math.max(subsubsectionIndex, 1)}.${paragraphIndex}`
        : `${Math.max(subsectionIndex, 1)}.${Math.max(subsubsectionIndex, 1)}.${paragraphIndex}`;
      return `\n\n<h5>${prefix}. ${cleanLatexInline(title)}</h5>\n\n`;
    }
  );

  // Render theorem-like environments as styled blocks.
  const blockKinds: Array<{ env: string; title: string }> = [
    { env: "definition", title: "Definition" },
    { env: "theorem", title: "Théorème" },
    { env: "proposition", title: "Proposition" },
    { env: "lemma", title: "Lemma" },
    { env: "corollary", title: "Corollary" },
    { env: "remark", title: "Remarque" },
    { env: "example", title: "Example" },
    { env: "resume", title: "Résumé" },
    { env: "important", title: "Important" },
  ];

  for (const blockKind of blockKinds) {
    const beginRegex = new RegExp(`\\\\begin\\{${blockKind.env}\\}(?:\\[([^\\]]+)\\])?`, "g");
    const endRegex = new RegExp(`\\\\end\\{${blockKind.env}\\}`, "g");
    result = result.replace(beginRegex, (_m, label: string) => {
      const suffix = label ? ` (${cleanLatexInline(label)})` : "";
      return `\n\n<div class="latex-block latex-block-${blockKind.env}"><strong>${blockKind.title}${suffix}.</strong> `;
    });
    result = result.replace(endRegex, "</div>\n\n");
  }

  // Render itemized/enumerated lists.
  result = result.replace(/\\begin\{itemize\}/g, "\n\n<ul class=\"latex-list\">\n");
  result = result.replace(/\\end\{itemize\}/g, "\n</ul>\n\n");
  result = result.replace(/\\begin\{enumerate\}/g, "\n\n<ol class=\"latex-list\">\n");
  result = result.replace(/\\end\{enumerate\}/g, "\n</ol>\n\n");
  result = result.replace(/^\s*\\item(?:\s*\[([^\]]+)\])?\s*/gm, (_m, label: string) => {
    const prefix = label ? `<strong>${cleanLatexInline(label)}.</strong> ` : "";
    return `<li>${prefix}`;
  });
  result = result.replace(/(<li>[\s\S]*?)(?=<li>|<\/ul>|<\/ol>)/g, "$1</li>\n");

  // Convert common display environments so processLatex() can render them.
  result = result.replace(/\\beq\b/g, "\\begin{equation}");
  result = result.replace(/\\eeq\b/g, "\\end{equation}");
  result = result.replace(/\\begin\{(equation\*?|align\*?|gather\*?|multline\*?)\}/g, "\n\n$$\n");
  result = result.replace(/\\end\{(equation\*?|align\*?|gather\*?|multline\*?)\}/g, "\n$$\n\n");
  result = result.replace(/\\begin\{eqnarray\*?\}/g, "\n\n$$\n\\\\begin{aligned}\n");
  result = result.replace(/\\end\{eqnarray\*?\}/g, "\n\\\\end{aligned}\n$$\n\n");
  result = result.replace(/\$(\s*\\begin\{aligned\}[\s\S]*?\\end\{aligned\}\s*)\$/g, "\n\n$$\n$1\n$$\n\n");
  result = result.replace(/(?:^|\n)\s*\$\s*\n([\s\S]*?)\n\s*\$\s*(?=\n|$)/g, (_m, block: string) => {
    return `\n\n$$\n${block.trim()}\n$$\n\n`;
  });
  result = result.replace(/\\nonumber/g, "");
  result = result.replace(/\\\[/g, "$$").replace(/\\\]/g, "$$");
  result = result.replace(/\\\(/g, "$").replace(/\\\)/g, "$");

  // Remove noisy reference commands from online prose.
  result = result.replace(/\\cite\{[^{}]*\}/g, "");
  result = stripFootnotes(result);
  result = result.replace(/\\label\{[^{}]*\}/g, "");
  result = result.replace(/\\ref\{([^{}]*)\}/g, "[$1]");

  // Remove line-level environments that are not needed for web rendering.
  result = result.replace(/\\begin\{(center|flushleft|flushright)\}/g, "");
  result = result.replace(/\\end\{(center|flushleft|flushright)\}/g, "");
  result = result.replace(/\\vspace\*?\{[^{}]*\}/g, "");
  return result;
}

function renderParagraph(paragraph: string): string {
  const cleaned = cleanLatexInline(paragraph);
  if (!cleaned) return "";
  if (cleaned.startsWith("<figure")) return cleaned;
  if (cleaned.startsWith("<h2") || cleaned.startsWith("<h3") || cleaned.startsWith("<h4") || cleaned.startsWith("<h5")) return cleaned;
  if (cleaned.startsWith("<ul") || cleaned.startsWith("<ol") || cleaned.startsWith("<div class=\"latex-block")) return cleaned;
  if (cleaned.includes("<ul") || cleaned.includes("<ol") || cleaned.includes("<li>")) return cleaned;
  if (cleaned.startsWith("$$") && cleaned.endsWith("$$")) return cleaned;
  return `<p>${cleaned}</p>`;
}

function countSingleDollarDelimiters(text: string): number {
  let count = 0;
  for (let index = 0; index < text.length; index += 1) {
    if (text[index] !== "$") continue;
    const previous = index > 0 ? text[index - 1] : "";
    const next = index + 1 < text.length ? text[index + 1] : "";
    if (previous === "\\") continue;
    if (next === "$") {
      index += 1;
      continue;
    }
    count += 1;
  }
  return count;
}

function sanitizeUnbalancedDollarMath(paragraph: string): string {
  const singleDollarCount = countSingleDollarDelimiters(paragraph);
  if (singleDollarCount % 2 === 0) return paragraph;
  // Fallback: prevent broken long-range math capture when TeX source has unmatched '$'.
  return paragraph.replace(/(?<!\\)\$(?!\$)/g, "&#36;");
}

function paragraphsToHtml(paragraphs: string[]): string {
  return paragraphs
    .map((paragraph) => sanitizeUnbalancedDollarMath(paragraph))
    .map((paragraph) => renderParagraph(paragraph))
    .filter((chunk) => chunk.length > 0)
    .join("\n\n");
}

function parseTexParagraphs(texSource: string): string[] {
  const normalized = texSource.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");

  const keptLines: string[] = [];
  for (const rawLine of lines) {
    const line = stripComment(rawLine);
    if (line.trim() === "\\\\") continue;
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
