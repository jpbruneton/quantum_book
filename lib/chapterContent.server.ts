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

  if (/^\\input\s*\{/.test(trimmed)) return true;
  if (/^\\include\s*\{/.test(trimmed)) return true;

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
  result = result.replace(/\\underline\{([^{}]+)\}/g, "<span class=\"latex-uline\">$1</span>");
  result = result.replace(/\\ldots/g, "...");
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

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function latexToPlainTextForAlt(value: string): string {
  return value
    .replace(/\$+/g, "")
    .replace(/\\[a-zA-Z]+\*?(?:\[[^\]]*\])?/g, " ")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFigureHtml(figureBlock: string, figureNumber: number): string {
  const includeGraphicsMatch = figureBlock.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/);
  if (!includeGraphicsMatch) return "";

  const imagePath = normalizeFigurePath(includeGraphicsMatch[1].trim());
  let captionRaw = "";
  const captionCommandIndex = figureBlock.search(/\\caption\s*\{/);
  if (captionCommandIndex !== -1) {
    const firstBraceIndex = figureBlock.indexOf("{", captionCommandIndex);
    if (firstBraceIndex !== -1) {
      const captionBlock = readBalancedBraces(figureBlock, firstBraceIndex);
      if (captionBlock) {
        captionRaw = captionBlock.content.replace(/\s+/g, " ").trim();
      }
    }
  }
  const caption = cleanLatexInline(captionRaw);
  const altTextRaw = latexToPlainTextForAlt(captionRaw || "Figure");
  const altText = escapeHtmlAttribute(altTextRaw);

  const captionWithNumber = caption
    ? `Figure ${figureNumber}. ${caption}`
    : `Figure ${figureNumber}`;
  const figCaption = `<figcaption>${captionWithNumber}</figcaption>`;
  const isPdfFigure = imagePath.toLowerCase().endsWith(".pdf");
  if (isPdfFigure) {
    return `<figure class="latex-figure"><object class="latex-figure-pdf" data="${imagePath}" type="application/pdf"><a class="latex-figure-pdf-link" href="${imagePath}" target="_blank" rel="noreferrer">Ouvrir la figure PDF</a></object>${figCaption}</figure>`;
  }

  return `<figure class="latex-figure"><a class="latex-figure-zoom-link" href="${imagePath}" target="_blank" rel="noreferrer"><img src="${imagePath}" alt="${altText}" loading="lazy" /></a>${figCaption}</figure>`;
}

function renderSectionHeading(
  level: string,
  rawTitle: string,
  sectionIndex: number,
  subsectionIndex: number,
  subsubsectionIndex: number,
  _paragraphIndex: number
): string {
  const titleWithoutLabel = rawTitle.replace(/\\label\{[^{}]*\}/g, "").trim();
  const title = cleanLatexInline(titleWithoutLabel);

  if (level === "section") return `\n\n<h2>${sectionIndex}. ${title}</h2>\n\n`;
  if (level === "subsection") {
    const prefix = sectionIndex > 0 ? `${sectionIndex}.${subsectionIndex}` : `${subsectionIndex}`;
    return `\n\n<h3>${prefix}. ${title}</h3>\n\n`;
  }
  if (level === "subsubsection") {
    const prefix = sectionIndex > 0
      ? `${sectionIndex}.${Math.max(subsectionIndex, 1)}.${subsubsectionIndex}`
      : `${Math.max(subsectionIndex, 1)}.${subsubsectionIndex}`;
    return `\n\n<h4>${prefix}. ${title}</h4>\n\n`;
  }

  return `\n\n<h5>${title}</h5>\n\n`;
}

function replaceSectionCommands(input: string): string {
  let output = "";
  let index = 0;
  let sectionIndex = 0;
  let subsectionIndex = 0;
  let subsubsectionIndex = 0;
  let paragraphIndex = 0;

  while (index < input.length) {
    const slice = input.slice(index);
    const commandMatch = slice.match(/^\\(section|subsection|subsubsection|paragraph)\*?/);
    if (!commandMatch) {
      output += input[index];
      index += 1;
      continue;
    }

    const level = commandMatch[1];
    const commandText = commandMatch[0];
    let cursor = index + commandText.length;
    while (cursor < input.length && /\s/.test(input[cursor])) cursor += 1;

    if (input[cursor] !== "{") {
      output += commandText;
      index = cursor;
      continue;
    }

    cursor += 1;
    let depth = 1;
    let title = "";
    while (cursor < input.length && depth > 0) {
      const char = input[cursor];
      const previous = cursor > 0 ? input[cursor - 1] : "";

      if (char === "{" && previous !== "\\") {
        depth += 1;
        title += char;
      } else if (char === "}" && previous !== "\\") {
        depth -= 1;
        if (depth > 0) title += char;
      } else {
        title += char;
      }
      cursor += 1;
    }

    if (level === "section") {
      sectionIndex += 1;
      subsectionIndex = 0;
      subsubsectionIndex = 0;
      paragraphIndex = 0;
    } else if (level === "subsection") {
      subsectionIndex += 1;
      subsubsectionIndex = 0;
      paragraphIndex = 0;
    } else if (level === "subsubsection") {
      subsubsectionIndex += 1;
      paragraphIndex = 0;
    } else {
      paragraphIndex += 1;
    }

    output += renderSectionHeading(
      level,
      title,
      sectionIndex,
      subsectionIndex,
      subsubsectionIndex,
      paragraphIndex
    );
    index = cursor;
  }

  return output;
}

function readBalancedBraces(input: string, startIndex: number): { content: string; endIndex: number } | null {
  if (input[startIndex] !== "{") return null;
  let depth = 1;
  let cursor = startIndex + 1;
  let content = "";

  while (cursor < input.length && depth > 0) {
    const char = input[cursor];
    const previous = cursor > 0 ? input[cursor - 1] : "";

    if (char === "{" && previous !== "\\") {
      depth += 1;
      content += char;
    } else if (char === "}" && previous !== "\\") {
      depth -= 1;
      if (depth > 0) content += char;
    } else {
      content += char;
    }
    cursor += 1;
  }

  if (depth !== 0) return null;
  return { content, endIndex: cursor };
}

function collectReferenceMap(input: string): Record<string, string> {
  const references: Record<string, string> = {};
  let sectionIndex = 0;
  let subsectionIndex = 0;
  let subsubsectionIndex = 0;
  let figureIndex = 0;
  let theoremIndex = 0;
  let propositionIndex = 0;
  let definitionIndex = 0;
  let remarkIndex = 0;

  const envStack: Array<{ env: string; refText: string }> = [];
  let index = 0;

  while (index < input.length) {
    const slice = input.slice(index);

    const sectionMatch = slice.match(/^\\(section|subsection|subsubsection)\*?/);
    if (sectionMatch) {
      const level = sectionMatch[1];
      let cursor = index + sectionMatch[0].length;
      while (cursor < input.length && /\s/.test(input[cursor])) cursor += 1;
      const titleBlock = readBalancedBraces(input, cursor);
      if (!titleBlock) {
        index += 1;
        continue;
      }

      if (level === "section") {
        sectionIndex += 1;
        subsectionIndex = 0;
        subsubsectionIndex = 0;
      } else if (level === "subsection") {
        subsectionIndex += 1;
        subsubsectionIndex = 0;
      } else {
        subsubsectionIndex += 1;
      }

      const sectionNumber = level === "section"
        ? `${sectionIndex}`
        : level === "subsection"
          ? `${Math.max(sectionIndex, 1)}.${subsectionIndex}`
          : `${Math.max(sectionIndex, 1)}.${Math.max(subsectionIndex, 1)}.${subsubsectionIndex}`;

      const inlineLabelMatch = titleBlock.content.match(/\\label\{([^{}]+)\}/);
      if (inlineLabelMatch) references[inlineLabelMatch[1]] = sectionNumber;

      let afterTitle = titleBlock.endIndex;
      while (afterTitle < input.length && /\s/.test(input[afterTitle])) afterTitle += 1;
      const followingLabelMatch = input.slice(afterTitle).match(/^\\label\{([^{}]+)\}/);
      if (followingLabelMatch) references[followingLabelMatch[1]] = sectionNumber;

      index = titleBlock.endIndex;
      continue;
    }

    const beginMatch = slice.match(/^\\begin\{([A-Za-z*]+)\}/);
    if (beginMatch) {
      const env = beginMatch[1].replace(/\*$/, "");
      let refText = "";
      if (env === "figure") {
        figureIndex += 1;
        refText = `Figure ${figureIndex}`;
      } else if (env === "theorem") {
        theoremIndex += 1;
        refText = `Théorème ${theoremIndex}`;
      } else if (env === "proposition") {
        propositionIndex += 1;
        refText = `Proposition ${propositionIndex}`;
      } else if (env === "definition") {
        definitionIndex += 1;
        refText = `Définition ${definitionIndex}`;
      } else if (env === "remark") {
        remarkIndex += 1;
        refText = `Remarque ${remarkIndex}`;
      }
      envStack.push({ env, refText });
      index += beginMatch[0].length;
      continue;
    }

    const endMatch = slice.match(/^\\end\{([A-Za-z*]+)\}/);
    if (endMatch) {
      const env = endMatch[1].replace(/\*$/, "");
      for (let i = envStack.length - 1; i >= 0; i -= 1) {
        if (envStack[i].env === env) {
          envStack.splice(i, 1);
          break;
        }
      }
      index += endMatch[0].length;
      continue;
    }

    const labelMatch = slice.match(/^\\label\{([^{}]+)\}/);
    if (labelMatch) {
      const label = labelMatch[1];
      const nearest = envStack[envStack.length - 1];
      if (nearest?.refText) references[label] = nearest.refText;
      index += labelMatch[0].length;
      continue;
    }

    index += 1;
  }

  return references;
}

function replaceCommandBlock(
  input: string,
  command: string,
  cssClass: string,
  title: string
): string {
  let output = "";
  let index = 0;
  let blockIndex = 0;

  while (index < input.length) {
    const marker = `\\${command}`;
    const start = input.indexOf(marker, index);
    if (start === -1) {
      output += input.slice(index);
      break;
    }

    output += input.slice(index, start);
    let cursor = start + marker.length;
    while (cursor < input.length && /\s/.test(input[cursor])) cursor += 1;

    if (input[cursor] !== "{") {
      output += marker;
      index = cursor;
      continue;
    }

    cursor += 1;
    let depth = 1;
    let body = "";
    while (cursor < input.length && depth > 0) {
      const char = input[cursor];
      const previous = cursor > 0 ? input[cursor - 1] : "";

      if (char === "{" && previous !== "\\") {
        depth += 1;
        body += char;
      } else if (char === "}" && previous !== "\\") {
        depth -= 1;
        if (depth > 0) body += char;
      } else {
        body += char;
      }
      cursor += 1;
    }

    const cleanedBody = body.trim();
    blockIndex += 1;
    output += `\n\n<div class="latex-block ${cssClass}"><strong>${title} ${blockIndex}.</strong> ${cleanedBody}</div>\n\n`;
    index = cursor;
  }

  return output;
}

function normalizeLatexBlocks(input: string): string {
  let result = input;
  let figureRenderIndex = 0;
  const references = collectReferenceMap(result);

  // Be tolerant to over-escaped LaTeX sequences from copy/paste paths.
  result = result.replace(/\\\\([A-Za-z]+)/g, "\\$1");
  result = result.replace(/\\\$/g, "$");
  result = result.replace(/\\,/g, " ");
  result = result.replace(/\\:/g, " ");
  result = result.replace(/\\;/g, " ");
  result = result.replace(/\\\./g, ".");

  // Common typo tolerance.
  result = result.replace(/\\bgin\{figure\*?\}/g, "\\begin{figure}");

  // Render LaTeX figures as HTML figures, instead of showing raw environment tags.
  result = result.replace(/\\begin\{figure\*?\}[\s\S]*?\\end\{figure\*?\}/g, (block) => {
    figureRenderIndex += 1;
    return `\n\n${extractFigureHtml(block, figureRenderIndex)}\n\n`;
  });

  // Ignore mdframed wrappers while preserving their inner content.
  result = result.replace(/\\begin\{mdframed\}(?:\[[^\]]*\])?/g, "");
  result = result.replace(/\\end\{mdframed\}/g, "");

  // Support command-style theorem blocks such as \proposition{...}.
  result = replaceCommandBlock(result, "proposition", "latex-block-proposition", "Proposition");

  // Render section-like commands as headings in document order.
  result = replaceSectionCommands(result);

  // Render theorem-like environments as styled blocks.
  const blockKinds: Array<{ env: string; title: string }> = [
    { env: "definition", title: "Definition" },
    { env: "theorem", title: "Théorème" },
    { env: "proposition", title: "Proposition" },
    { env: "lemma", title: "Lemma" },
    { env: "corollary", title: "Corollary" },
    { env: "remark", title: "Remarque" },
    { env: "plusloin", title: "Plus loin" },
    { env: "exemple", title: "Exemple" },
    { env: "example", title: "Example" },
    { env: "resume", title: "Résumé" },
    { env: "important", title: "Important" },
  ];
  const blockCounters: Record<string, number> = {
    definition: 0,
    theorem: 0,
    proposition: 0,
    remark: 0,
  };

  for (const blockKind of blockKinds) {
    const beginRegex = new RegExp(`\\\\begin\\{${blockKind.env}\\}(?:\\[([^\\]]+)\\])?`, "g");
    const endRegex = new RegExp(`\\\\end\\{${blockKind.env}\\}`, "g");
    result = result.replace(beginRegex, (_m, label: string) => {
      const suffix = label ? ` (${cleanLatexInline(label)})` : "";
      let numberedTitle = blockKind.title;
      if (blockKind.env in blockCounters) {
        blockCounters[blockKind.env] += 1;
        numberedTitle = `${blockKind.title} ${blockCounters[blockKind.env]}`;
      }
      return `\n\n<div class="latex-block latex-block-${blockKind.env}"><strong>${numberedTitle}${suffix}.</strong> `;
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
  result = result.replace(/\\begin\{eqnarray\*?\}/g, "\n\n$$\n\\begin{aligned}\n");
  result = result.replace(/\\end\{eqnarray\*?\}/g, "\n\\end{aligned}\n$$\n\n");
  result = result.replace(/\$(\s*\\begin\{aligned\}[\s\S]*?\\end\{aligned\}\s*)\$/g, "\n\n$$\n$1\n$$\n\n");
  result = result.replace(/(?:^|\n)\s*\$\s*\n([\s\S]*?)\n\s*\$\s*(?=\n|$)/g, (_m, block: string) => {
    return `\n\n$$\n${block.trim()}\n$$\n\n`;
  });
  result = result.replace(/(?<!\\)\\\[\s*([\s\S]*?)\s*(?<!\\)\\\]/g, (_m, block: string) => {
    return `\n\n$$\n${block.trim()}\n$$\n\n`;
  });
  result = result.replace(/\\nonumber/g, "");
  result = result.replace(/(?<!\\)\\\[/g, "$$").replace(/(?<!\\)\\\]/g, "$$");
  result = result.replace(/\\\(/g, "$").replace(/\\\)/g, "$");

  // Remove noisy reference commands from online prose.
  result = result.replace(/\\cite\{[^{}]*\}/g, "");
  result = stripFootnotes(result);
  result = result.replace(/\\ref\{([^{}]*)\}/g, (_m, label: string) => references[label] ?? `[${label}]`);
  result = result.replace(/\\label\{[^{}]*\}/g, "");

  // Remove line-level environments that are not needed for web rendering.
  result = result.replace(/\\begin\{(center|flushleft|flushright)\}/g, "");
  result = result.replace(/\\end\{(center|flushleft|flushright)\}/g, "");
  result = result.replace(/\\vspace\*?\{[^{}]*\}/g, "");
  result = result.replace(/\\noindent\b/g, "");
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
  if (cleaned.includes("$$")) {
    const chunks: string[] = [];
    let cursor = 0;
    const displayRegex = /\$\$[\s\S]*?\$\$/g;
    let match: RegExpExecArray | null;

    while ((match = displayRegex.exec(cleaned)) !== null) {
      const textBefore = cleaned.slice(cursor, match.index).trim();
      if (textBefore) chunks.push(`<p>${textBefore}</p>`);
      chunks.push(match[0].trim());
      cursor = match.index + match[0].length;
    }

    const textAfter = cleaned.slice(cursor).trim();
    if (textAfter) chunks.push(`<p>${textAfter}</p>`);
    return chunks.join("\n\n");
  }
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
