import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { LessonReference } from "@/lib/chapters";

function stripComment(line: string): string {
  const protectedPercent = "__ESCAPED_PERCENT__";
  const escaped = line.replace(/\\%/g, protectedPercent);
  const withoutComment = escaped.replace(/%.*$/, "");
  return withoutComment.replace(new RegExp(protectedPercent, "g"), "\\%");
}

function readBalancedBracesAt(input: string, startIndex: number): { content: string; endIndex: number } | null {
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

function replaceInlineCommand(
  input: string,
  command: string,
  render: (content: string) => string
): string {
  const marker = `\\${command}`;
  let output = "";
  let index = 0;

  while (index < input.length) {
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

    const block = readBalancedBracesAt(input, cursor);
    if (!block) {
      output += marker;
      index = cursor + 1;
      continue;
    }

    output += render(block.content);
    index = block.endIndex;
  }

  return output;
}

function replaceTexorpdfstring(input: string): string {
  const marker = "\\texorpdfstring";
  let output = "";
  let index = 0;

  while (index < input.length) {
    const start = input.indexOf(marker, index);
    if (start === -1) {
      output += input.slice(index);
      break;
    }

    output += input.slice(index, start);
    let cursor = start + marker.length;
    while (cursor < input.length && /\s/.test(input[cursor])) cursor += 1;

    const first = readBalancedBracesAt(input, cursor);
    if (!first) {
      output += marker;
      index = cursor;
      continue;
    }

    cursor = first.endIndex;
    while (cursor < input.length && /\s/.test(input[cursor])) cursor += 1;
    const second = readBalancedBracesAt(input, cursor);
    if (!second) {
      output += first.content;
      index = first.endIndex;
      continue;
    }

    // For web rendering, prefer the TeX variant (first argument) so math
    // in headings remains properly rendered (e.g. L^2(R^3), \ell^2(N), etc.).
    // The second argument is typically a plain-text fallback for PDF bookmarks.
    const chosen = first.content.trim().length > 0 ? first.content : second.content;
    output += chosen;
    index = second.endIndex;
  }

  return output;
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
  const nbsp = "\u00A0";
  result = replaceTexorpdfstring(result);
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

  result = replaceInlineCommand(result, "emph", (content) => `<span class="latex-inline-blue-strong">${content}</span>`);
  result = replaceInlineCommand(result, "textit", (content) => `<span class="latex-inline-blue-strong">${content}</span>`);
  result = replaceInlineCommand(result, "textbf", (content) => `<span class="latex-inline-blue-strong">${content}</span>`);
  result = replaceInlineCommand(result, "uline", (content) => `<em>${content}</em>`);
  result = replaceInlineCommand(result, "underline", (content) => `<span class="latex-uline">${content}</span>`);
  // Convert TeX opening/closing double quotes to typographic quotes.
  result = result.replace(/``/g, "“").replace(/''/g, "”");
  result = result.replace(/\\ldots/g, "...");
  result = result.replace(/\\og(?:\{\})?\s*/g, "« ");
  result = result.replace(/\s*\\fg(?:\{\})?/g, " »");
  result = result.replace(/---/g, "—");
  result = result.replace(/--/g, "—");
  // Keep French typography groups unbreakable around guillemets and high punctuation.
  result = result.replace(/«\s+/g, `«${nbsp}`);
  result = result.replace(/\s+»/g, `${nbsp}»`);
  // Keep English typographic quotes unbreakable at boundaries as well.
  result = result.replace(/“\s+/g, `“${nbsp}`);
  result = result.replace(/\s+”/g, `${nbsp}”`);
  result = result.replace(/\s+:/g, `${nbsp}:`);
  result = result.replace(/\s+;/g, `${nbsp};`);
  result = result.replace(/\s+\?/g, `${nbsp}?`);
  result = result.replace(/\s+!/g, `${nbsp}!`);
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

function extractFootnotesFromParagraph(input: string): { text: string; footnotes: string[] } {
  const marker = "\\footnote";
  const footnotes: string[] = [];
  let output = "";
  let cursor = 0;

  while (cursor < input.length) {
    const start = input.indexOf(marker, cursor);
    if (start === -1) {
      output += input.slice(cursor);
      break;
    }

    output += input.slice(cursor, start);
    let next = start + marker.length;
    while (next < input.length && /\s/.test(input[next])) next += 1;

    if (input[next] !== "{") {
      output += marker;
      cursor = next;
      continue;
    }

    const block = readBalancedBraces(input, next);
    if (!block) {
      output += marker;
      cursor = next + 1;
      continue;
    }

    const footnoteIndex = footnotes.length;
    footnotes.push(block.content);
    output += `__FOOTNOTE_${footnoteIndex}__`;
    cursor = block.endIndex;
  }

  return { text: output, footnotes };
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

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
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

function extractFigureSourceHtml(figureBlock: string, isEnglish: boolean): string {
  const beginTag = "\\begin{figuresource}";
  const endTag = "\\end{figuresource}";
  const start = figureBlock.indexOf(beginTag);
  if (start === -1) return "";
  const end = figureBlock.indexOf(endTag, start + beginTag.length);
  if (end === -1) return "";
  const inner = figureBlock.slice(start + beginTag.length, end).trim();
  const urlMatch = inner.match(/\\url\{([^}]*)\}/);
  const prefix = isEnglish ? "Figure taken from " : "Figure tirée de ";
  if (urlMatch) {
    const rawUrl = urlMatch[1];
    const safeHref = escapeHtmlAttribute(rawUrl);
    const displayUrl = escapeHtmlText(rawUrl);
    return `<br /><span class="latex-figure-source"><small><em>${prefix}</em><a href="${safeHref}" target="_blank" rel="noreferrer">${displayUrl}</a></small></span>`;
  }
  const plain = cleanLatexInline(inner);
  if (!plain) return "";
  return `<br /><span class="latex-figure-source"><small><em>${prefix}</em>${plain}</small></span>`;
}

function extractFigureHtml(figureBlock: string, figureNumber: number, isEnglish: boolean): string {
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
  const sourceHtml = extractFigureSourceHtml(figureBlock, isEnglish);
  const figCaption = `<figcaption>${captionWithNumber}${sourceHtml}</figcaption>`;
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

function readBalancedSquareBrackets(input: string, startIndex: number): { content: string; endIndex: number } | null {
  if (input[startIndex] !== "[") return null;
  let depth = 1;
  let cursor = startIndex + 1;
  let content = "";

  while (cursor < input.length && depth > 0) {
    const char = input[cursor];
    const previous = cursor > 0 ? input[cursor - 1] : "";

    if (char === "[" && previous !== "\\") {
      depth += 1;
      content += char;
    } else if (char === "]" && previous !== "\\") {
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
  let equationIndex = 0;
  let theoremIndex = 0;
  let propositionIndex = 0;
  let definitionIndex = 0;
  let lemmaIndex = 0;
  let corollaireIndex = 0;
  let exempleIndex = 0;
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
      } else if (["equation", "align", "gather", "multline", "eqnarray"].includes(env)) {
        equationIndex += 1;
        refText = `${equationIndex}`;
      } else if (env === "theorem") {
        theoremIndex += 1;
        refText = `Théorème ${theoremIndex}`;
      } else if (env === "proposition") {
        propositionIndex += 1;
        refText = `Proposition ${propositionIndex}`;
      } else if (env === "definition") {
        definitionIndex += 1;
        refText = `Définition ${definitionIndex}`;
      } else if (env === "lemma") {
        lemmaIndex += 1;
        refText = `Lemme ${lemmaIndex}`;
      } else if (env === "corollaire" || env === "corollary") {
        corollaireIndex += 1;
        refText = `Corollaire ${corollaireIndex}`;
      } else if (env === "exemple" || env === "example") {
        exempleIndex += 1;
        refText = `Exemple ${exempleIndex}`;
      } else if (env === "remark") {
        remarkIndex += 1;
        refText = `Remarque ${remarkIndex}`;
      }

      // Support custom theorem box syntax:
      // \begin{definition}[Displayed title]{def:my_label}
      // and map the brace argument label to the generated numbered reference.
      let cursor = index + beginMatch[0].length;
      while (cursor < input.length && /\s/.test(input[cursor])) cursor += 1;
      if (input[cursor] === "[") {
        const bracketBlock = readBalancedSquareBrackets(input, cursor);
        if (bracketBlock) cursor = bracketBlock.endIndex;
      }
      while (cursor < input.length && /\s/.test(input[cursor])) cursor += 1;
      if (input[cursor] === "{") {
        const braceBlock = readBalancedBraces(input, cursor);
        const braceValue = braceBlock?.content.trim() ?? "";
        if (
          braceBlock &&
          refText &&
          /^[A-Za-z0-9_.:-]+$/.test(braceValue)
        ) {
          references[braceValue] = refText;
          cursor = braceBlock.endIndex;
        }
      }

      envStack.push({ env, refText });
      index = cursor;
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

function latexVspaceToCssHeight(rawValue: string): string {
  const value = rawValue.trim();
  const baselineMatch = value.match(/^([+-]?\d*\.?\d+)\s*\\baselineskip$/);
  if (baselineMatch) {
    const factor = Number(baselineMatch[1]);
    if (Number.isFinite(factor) && factor > 0) return `${factor}em`;
    return "0.5em";
  }

  const cssLengthMatch = value.match(/^([+-]?\d*\.?\d+)\s*(px|em|rem|vh|vw|%)$/i);
  if (cssLengthMatch) {
    const amount = Number(cssLengthMatch[1]);
    if (Number.isFinite(amount) && amount > 0) return `${amount}${cssLengthMatch[2]}`;
  }

  return "0.5em";
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
    output += `\n\n<div class="latex-block ${cssClass}"><div class="latex-block-heading"><strong>${title} ${blockIndex}</strong></div><div class="latex-block-body">${cleanedBody}</div></div>\n\n`;
    index = cursor;
  }

  return output;
}

interface CitationNumberMaps {
  en: Record<string, number>;
  fr: Record<string, number>;
}

type ContentLanguage = "en" | "fr";

function buildCitationNumberMaps(references: LessonReference[]): CitationNumberMaps {
  const maps: CitationNumberMaps = { en: {}, fr: {} };
  const counters: Record<"en" | "fr", number> = { en: 0, fr: 0 };

  for (const reference of references) {
    const language = reference.language;
    if (maps[language][reference.key] !== undefined) continue;
    counters[language] += 1;
    maps[language][reference.key] = counters[language];
  }

  return maps;
}

function replaceCitations(input: string, citationMaps: CitationNumberMaps): string {
  return input.replace(/\\cite\{([^{}]+)\}/g, (_match, rawKeys: string) => {
    const keys = rawKeys
      .split(",")
      .map((key) => key.trim())
      .filter((key) => key.length > 0);

    if (keys.length === 0) return "[?]";

    const enNumbers = keys
      .map((key) => citationMaps.en[key])
      .filter((value): value is number => typeof value === "number");
    const frNumbers = keys
      .map((key) => citationMaps.fr[key])
      .filter((value): value is number => typeof value === "number");

    const enValue = enNumbers.length > 0 ? enNumbers.join(",") : "?";
    const frValue = frNumbers.length > 0 ? frNumbers.join(",") : "?";
    const fallback = enValue !== "?" ? enValue : frValue;
    return `<sup class="lesson-cite" data-cite-en="${enValue}" data-cite-fr="${frValue}">[${fallback}]</sup>`;
  });
}

function stripLatexCommandsWithSimpleArg(input: string, command: string): string {
  const marker = `\\${command}`;
  let output = "";
  let index = 0;
  while (index < input.length) {
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
    const block = readBalancedBracesAt(input, cursor);
    if (!block) {
      output += marker;
      index = cursor + 1;
      continue;
    }
    index = block.endIndex;
  }
  return output;
}

function peelTrailingEnvironmentBlock(
  body: string,
  envName: string
): { rest: string; inner: string | null } {
  const endTag = `\\end{${envName}}`;
  const endIdx = body.lastIndexOf(endTag);
  if (endIdx === -1) return { rest: body, inner: null };
  const after = body.slice(endIdx + endTag.length).trim();
  if (after.length > 0) return { rest: body, inner: null };
  const beginTag = `\\begin{${envName}}`;
  const beginIdx = body.lastIndexOf(beginTag, endIdx);
  if (beginIdx === -1) return { rest: body, inner: null };
  const inner = body.slice(beginIdx + beginTag.length, endIdx);
  const rest = body.slice(0, beginIdx).trim();
  return { rest, inner };
}

function transformQuestionsInner(body: string, isEnglish: boolean): string {
  const trimmed = body.trim();
  if (!/\\question\b/.test(trimmed)) {
    return `\n\n${trimmed}\n\n`;
  }
  const chunks = trimmed
    .split(/\\question\b/)
    .slice(1)
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
  const qWord = isEnglish ? "Question" : "Question";
  let out = `\n\n<div class="latex-exercise-questions">`;
  for (let i = 0; i < chunks.length; i += 1) {
    let chunk = chunks[i];
    const sol = peelTrailingEnvironmentBlock(chunk, "solution");
    chunk = sol.rest;
    let hintInner: string | null = null;
    const indA = peelTrailingEnvironmentBlock(chunk, "indication");
    if (indA.inner !== null) {
      hintInner = indA.inner;
      chunk = indA.rest;
    } else {
      const indB = peelTrailingEnvironmentBlock(chunk, "indice");
      if (indB.inner !== null) {
        hintInner = indB.inner;
        chunk = indB.rest;
      } else {
        const indC = peelTrailingEnvironmentBlock(chunk, "hint");
        if (indC.inner !== null) {
          hintInner = indC.inner;
          chunk = indC.rest;
        }
      }
    }
    const stem = chunk.trim();
    out += `<div class="latex-exercise-question"><div class="latex-exercise-q-heading"><strong>${qWord} ${i + 1}</strong></div><div class="latex-exercise-q-stem">${stem}</div>`;
    if (hintInner !== null) {
      out += `\n\\begin{indice}${hintInner}\\end{indice}`;
    }
    if (sol.inner !== null) {
      out += `\n\\begin{solution}${sol.inner}\\end{solution}`;
    }
    out += `</div>`;
  }
  out += `</div>\n\n`;
  return out;
}

function transformQuestionsEnvironments(input: string, isEnglish: boolean): string {
  const beginTag = "\\begin{questions}";
  const endTag = "\\end{questions}";
  let result = "";
  let cursor = 0;
  while (cursor < input.length) {
    const start = input.indexOf(beginTag, cursor);
    if (start === -1) {
      result += input.slice(cursor);
      break;
    }
    result += input.slice(cursor, start);
    let depth = 1;
    let pos = start + beginTag.length;
    let closedAt = -1;
    while (pos < input.length && depth > 0) {
      const nb = input.indexOf(beginTag, pos);
      const ne = input.indexOf(endTag, pos);
      if (ne === -1) {
        depth = -1;
        break;
      }
      if (nb !== -1 && nb < ne) {
        depth += 1;
        pos = nb + beginTag.length;
      } else {
        depth -= 1;
        if (depth === 0) {
          closedAt = ne;
          break;
        }
        pos = ne + endTag.length;
      }
    }
    if (closedAt === -1) {
      result += input.slice(start);
      break;
    }
    const inner = input.slice(start + beginTag.length, closedAt);
    result += transformQuestionsInner(inner, isEnglish);
    cursor = closedAt + endTag.length;
  }
  return result;
}

function normalizeLatexBlocks(
  input: string,
  citationMaps: CitationNumberMaps,
  contentLanguage: ContentLanguage
): string {
  let result = input;
  let figureRenderIndex = 0;
  let equationRenderIndex = 0;
  const references = collectReferenceMap(result);
  const isEnglish = contentLanguage === "en";

  // Be tolerant to over-escaped LaTeX sequences from copy/paste paths.
  result = result.replace(/\\\\([A-Za-z]+)/g, "\\$1");
  result = result.replace(/\\\$/g, "$");
  // Do not strip \, \: \; — they are meaningful math spacing for KaTeX ($...$ / $$...$$).
  result = result.replace(/\\\./g, ".");

  // Common typo tolerance.
  result = result.replace(/\\bgin\{figure\*?\}/g, "\\begin{figure}");

  // Render LaTeX figures as HTML figures, instead of showing raw environment tags.
  result = result.replace(/\\begin\{figure\*?\}[\s\S]*?\\end\{figure\*?\}/g, (block) => {
    figureRenderIndex += 1;
    return `\n\n${extractFigureHtml(block, figureRenderIndex, isEnglish)}\n\n`;
  });

  // Ignore mdframed wrappers while preserving their inner content.
  result = result.replace(/\\begin\{mdframed\}(?:\[[^\]]*\])?/g, "");
  result = result.replace(/\\end\{mdframed\}/g, "");

  // Exercise library metadata (web only; not rendered as prose).
  result = stripLatexCommandsWithSimpleArg(result, "keywords");
  result = stripLatexCommandsWithSimpleArg(result, "theme");

  // Support command-style theorem blocks such as \proposition{...}.
  result = replaceCommandBlock(result, "proposition", "latex-block-proposition", "Proposition");
  result = replaceCommandBlock(
    result,
    "coro",
    "latex-block-corollary",
    isEnglish ? "Corollary" : "Corollaire"
  );

  // Render section-like commands as headings in document order.
  result = replaceSectionCommands(result);

  // Render proof environments as collapsible details blocks.
  result = result.replace(/\\begin\{proof\}(?:\[([^\]]+)\])?/g, (_m, label: string) => {
    const suffix = label ? ` (${cleanLatexInline(label)})` : "";
    return `\n\n<details class="latex-proof"><summary class="latex-proof-summary"><em>${isEnglish ? "Proof" : "Démonstration"}${suffix}.</em></summary><div class="latex-proof-body">`;
  });
  result = result.replace(
    /\\end\{proof\}/g,
    ` <span class="latex-proof-qed" aria-hidden="true">□</span></div></details>\n\n`
  );

  result = transformQuestionsEnvironments(result, isEnglish);

  // Un seul compteur / style « léger » pour exercice, exercise et exo.
  result = result.replace(/\\begin\{exercice\}/g, "\\begin{exo}");
  result = result.replace(/\\end\{exercice\}/g, "\\end{exo}");
  result = result.replace(/\\begin\{exercise\}/g, "\\begin{exo}");
  result = result.replace(/\\end\{exercise\}/g, "\\end{exo}");

  // Render theorem-like environments as styled blocks.
  const blockKinds: Array<{ env: string; title: string; collapsible?: boolean }> = [
    { env: "definition", title: "Definition" },
    { env: "theorem", title: isEnglish ? "Theorem" : "Théorème" },
    { env: "proposition", title: "Proposition" },
    { env: "lemma", title: "Lemma" },
    { env: "corollaire", title: isEnglish ? "Corollary" : "Corollaire" },
    { env: "corollary", title: isEnglish ? "Corollary" : "Corollaire" },
    { env: "remark", title: isEnglish ? "Remark" : "Remarque" },
    { env: "plusloin", title: isEnglish ? "To go further" : "Pour aller plus loin" },
    { env: "exemple", title: isEnglish ? "Example" : "Exemple" },
    { env: "example", title: "Example" },
    { env: "resume", title: isEnglish ? "Summary" : "Résumé" },
    { env: "important", title: "Important" },
    { env: "exo", title: isEnglish ? "Exercise" : "Exercice" },
    { env: "indice", title: isEnglish ? "Hint" : "Indice", collapsible: true },
    { env: "indication", title: isEnglish ? "Hint" : "Indication", collapsible: true },
    { env: "hint", title: isEnglish ? "Hint" : "Indice", collapsible: true },
    { env: "solution", title: isEnglish ? "Solution" : "Solution", collapsible: true },
  ];
  const blockCounters: Record<string, number> = {
    definition: 0,
    theorem: 0,
    proposition: 0,
    lemma: 0,
    corollaire: 0,
    corollary: 0,
    exemple: 0,
    example: 0,
    remark: 0,
    exo: 0,
  };

  for (const blockKind of blockKinds) {
    const beginRegex = new RegExp(
      `\\\\begin\\{${blockKind.env}\\}(?:\\[([^\\]]*)\\])?(?:\\{([^{}]+)\\})?`,
      "g"
    );
    const endRegex = new RegExp(`\\\\end\\{${blockKind.env}\\}`, "g");
    result = result.replace(beginRegex, (_m, bracketArg: string, braceArg: string) => {
      // Some custom tcolorbox theorem styles use:
      // \begin{definition}[Displayed title]{technical_label}
      // Keep the displayed title, but drop technical labels from rendering.
      const fallbackArg = braceArg?.trim() ?? "";
      const looksLikeTechnicalLabel = /^[A-Za-z0-9_.:-]+$/.test(fallbackArg);
      const displayLabel = bracketArg?.trim() || (looksLikeTechnicalLabel ? "" : fallbackArg);
      const suffix = displayLabel ? ` (${cleanLatexInline(displayLabel)})` : "";
      let numberedTitle = blockKind.title;
      if (blockKind.env === "exo") {
        blockCounters.exo += 1;
        numberedTitle = `${blockKind.title} ${blockCounters.exo}`;
      } else if (blockKind.env in blockCounters) {
        blockCounters[blockKind.env] += 1;
        numberedTitle = `${blockKind.title} ${blockCounters[blockKind.env]}`;
      }
      if (blockKind.env === "plusloin") {
        const label = isEnglish ? "To go further" : "Pour aller plus loin";
        const topicHtml = displayLabel
          ? `<strong class="latex-plusloin-topic"> (${cleanLatexInline(displayLabel)})</strong>`
          : "";
        return `\n\n<div class="latex-block latex-block-plusloin"><div class="latex-block-heading"><span class="latex-plusloin-label">${label}</span>${topicHtml}</div><div class="latex-block-body">`;
      }
      const isExo = blockKind.env === "exo";
      if (isExo) {
        const titlePart = bracketArg?.trim() ? ` : ${cleanLatexInline(bracketArg.trim())}` : "";
        const exoIdAttr =
          looksLikeTechnicalLabel && fallbackArg.length > 0
            ? ` id="${fallbackArg.replace(/"/g, "&quot;")}"`
            : "";
        return `\n\n<div class="latex-exo"${exoIdAttr}><p class="latex-exo-title"><strong>${numberedTitle}${titlePart}</strong></p><div class="latex-exo-content">`;
      }
      let headingStrongInner: string;
      headingStrongInner = `${numberedTitle}${suffix}`;
      if (blockKind.collapsible) {
        return `\n\n<details class="latex-block latex-block-${blockKind.env}"><summary><div class="latex-block-heading"><strong>${headingStrongInner}</strong></div></summary><div class="latex-block-collapsible-body">`;
      }
      return `\n\n<div class="latex-block latex-block-${blockKind.env}"><div class="latex-block-heading"><strong>${headingStrongInner}</strong></div><div class="latex-block-body">`;
    });
    result = result.replace(
      endRegex,
      blockKind.collapsible ? "</div></details>\n\n" : "</div></div>\n\n"
    );
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
  result = result.replace(/\\begin\{equation\}([\s\S]*?)\\end\{equation\}/g, (_m, body: string) => {
    equationRenderIndex += 1;
    return `\n\n<div class="latex-equation"><div class="latex-equation-math">$$\n${body.trim()}\n$$</div><span class="latex-equation-number">(${equationRenderIndex})</span></div>\n\n`;
  });
  result = result.replace(/\\begin\{(equation\*|align\*?|gather\*?|multline\*?)\}/g, "\n\n$$\n");
  result = result.replace(/\\end\{(equation\*|align\*?|gather\*?|multline\*?)\}/g, "\n$$\n\n");
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

  // Render bibliography citations as numbered markers.
  result = replaceCitations(result, citationMaps);
  result = result.replace(/\\ref\{([^{}]*)\}/g, (_m, label: string) => {
    const resolved = references[label];
    if (!resolved) return `[${label}]`;
    // Keep \ref output numeric to avoid duplicating prefixes already present in prose
    // (e.g. "cf Figure \ref{magnet}" -> "cf Figure 1", not "cf Figure Figure 1").
    return resolved
      .replace(
        /^(Figure|Théorème|Theorem|Proposition|Définition|Definition|Lemme|Lemma|Corollaire|Corollary|Exemple|Example|Remarque|Remark)\s+/i,
        ""
      )
      .trim();
  });
  result = result.replace(/\\label\{[^{}]*\}/g, "");

  // Remove line-level environments that are not needed for web rendering.
  result = result.replace(/\\begin\{(center|flushleft|flushright)\}/g, "");
  result = result.replace(/\\end\{(center|flushleft|flushright)\}/g, "");
  result = result.replace(/\\vspace\*?\{([^{}]*)\}/g, (_m, rawAmount: string) => {
    const height = latexVspaceToCssHeight(rawAmount);
    return `\n\n<div class="latex-vspace" style="height:${height};"></div>\n\n`;
  });
  result = result.replace(/\\medskip\b/g, "");
  result = result.replace(/\\newpage\b/g, "");
  result = result.replace(/\\noindent\b/g, "");
  return result;
}

function renderParagraph(paragraph: string, footnoteCounter: { value: number }): string {
  const extracted = extractFootnotesFromParagraph(paragraph);
  let cleaned = cleanLatexInline(extracted.text);
  const assignedFootnotes = extracted.footnotes.map((rawFootnote) => {
    const number = footnoteCounter.value;
    footnoteCounter.value += 1;
    return {
      number,
      text: cleanLatexInline(rawFootnote),
    };
  });
  cleaned = cleaned.replace(/__FOOTNOTE_(\d+)__/g, (_m, indexText: string) => {
    const index = Number(indexText);
    if (!Number.isFinite(index) || index < 0 || index >= assignedFootnotes.length) return "";
    return `<sup class="latex-footnote-ref">${assignedFootnotes[index].number}</sup>`;
  });

  if (!cleaned) return "";

  // Helper: append footnotes to any pre-built HTML chunk (including block envs,
  // headings, figures, etc.) so footnotes inside boxes are always rendered.
  // For proofs, keep footnotes inside the collapsible body (before □), not below </details>.
  const withFootnotes = (html: string): string => {
    if (assignedFootnotes.length === 0) return html;
    const footnotesHtml = assignedFootnotes
      .map(
        (fn) =>
          `<div class="latex-footnote-item"><span class="latex-footnote-label">Note ${fn.number} :</span> ${fn.text}</div>`
      )
      .join("");
    const footnotesBlock = `\n<div class="latex-footnotes">${footnotesHtml}</div>`;

    if (html.startsWith('<details class="latex-proof"')) {
      const withQed = html.replace(
        /(\s*)(<span\b[^>]*\blatex-proof-qed\b[^>]*>)/,
        `${footnotesBlock}$1$2`
      );
      if (withQed !== html) return withQed;
      return html.replace(/(<\/div>\s*)(<\/details>)/, `${footnotesBlock}$1$2`);
    }

    return `${html}\n${footnotesBlock}`;
  };

  if (cleaned.startsWith("<figure")) return withFootnotes(cleaned);
  if (cleaned.startsWith("<h2") || cleaned.startsWith("<h3") || cleaned.startsWith("<h4") || cleaned.startsWith("<h5")) return withFootnotes(cleaned);
  if (cleaned.startsWith("<div class=\"latex-vspace\"")) return withFootnotes(cleaned);
  if (
    cleaned.startsWith("<ul") ||
    cleaned.startsWith("<ol") ||
    cleaned.startsWith("<details class=\"latex-proof\"") ||
    cleaned.startsWith("<div class=\"latex-block") ||
    cleaned.startsWith("<div class=\"latex-exercise-questions\"") ||
    cleaned.startsWith("<div class=\"latex-exo\"")
  ) {
    return withFootnotes(cleaned);
  }
  if (cleaned.includes("<ul") || cleaned.includes("<ol") || cleaned.includes("<li>")) return withFootnotes(cleaned);
  if (cleaned.startsWith("$$") && cleaned.endsWith("$$")) return withFootnotes(cleaned);
  let paragraphHtml = "";
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
    paragraphHtml = chunks.join("\n\n");
  } else {
    // Keep explicit LaTeX line breaks in prose paragraphs.
    const proseWithLineBreaks = cleaned.replace(/\\\\(?=\s|$)/g, "<br/>");
    paragraphHtml = `<p>${proseWithLineBreaks}</p>`;
  }

  return withFootnotes(paragraphHtml);
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
  const footnoteCounter = { value: 1 };
  return paragraphs
    .map((paragraph) => sanitizeUnbalancedDollarMath(paragraph))
    .map((paragraph) => renderParagraph(paragraph, footnoteCounter))
    .filter((chunk) => chunk.length > 0)
    .join("\n\n");
}

function parseTexParagraphs(
  texSource: string,
  citationMaps: CitationNumberMaps,
  contentLanguage: ContentLanguage
): string[] {
  const normalized = texSource.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");

  const keptLines: string[] = [];
  for (const rawLine of lines) {
    const line = stripComment(rawLine);
    if (line.trim() === "\\\\") continue;
    if (shouldSkipLatexLine(line)) continue;
    keptLines.push(line);
  }

  const body = normalizeLatexBlocks(keptLines.join("\n"), citationMaps, contentLanguage).trim();
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

function cleanReferenceLabel(text: string): string {
  return cleanLatexInline(text).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function normalizeReferenceUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^www\./i.test(trimmed)) return `https://${trimmed}`;
  if (/^[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\/.*)?$/.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

function parseReferencesTex(source: string): LessonReference[] {
  const refs: LessonReference[] = [];
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  let currentLanguage: "en" | "fr" = "en";
  const autoCounters: Record<"en" | "fr", number> = { en: 0, fr: 0 };
  let pendingStructuredRef: { name: string; url: string; description: string } | null = null;
  let pendingStructuredKey = "";

  const pushStructuredRefIfComplete = () => {
    if (!pendingStructuredRef) return;
    if (
      pendingStructuredRef.name.trim().length === 0 ||
      pendingStructuredRef.url.trim().length === 0 ||
      pendingStructuredRef.description.trim().length === 0
    ) {
      return;
    }
    autoCounters[currentLanguage] += 1;
    const explicitKey = pendingStructuredKey.trim();
    refs.push({
      key: explicitKey.length > 0 ? explicitKey : `structured_${currentLanguage}_${autoCounters[currentLanguage]}`,
      url: normalizeReferenceUrl(pendingStructuredRef.url),
      // Use a structured separator consumed by the chapter references renderer.
      label: `${cleanReferenceLabel(pendingStructuredRef.name)}|||${cleanReferenceLabel(pendingStructuredRef.description)}`,
      language: currentLanguage,
    });
    pendingStructuredRef = null;
    pendingStructuredKey = "";
  };

  for (const rawLine of lines) {
    const rawTrimmedLine = rawLine.trim();
    const line = stripComment(rawLine).trim();
    if (!line) continue;

    if (
      /(?:^1\..*anglais|\\(?:sub)?section\*?\{[^{}]*(?:anglais|english)[^{}]*\})/i.test(line)
    ) {
      pushStructuredRefIfComplete();
      currentLanguage = "en";
      continue;
    }

    if (
      /(?:^2\..*fran|\\(?:sub)?section\*?\{[^{}]*(?:fran|french)[^{}]*\})/i.test(line)
    ) {
      pushStructuredRefIfComplete();
      currentLanguage = "fr";
      continue;
    }

    const nameRegex = /\\name\{([^{}]+)\}/g;
    let nameMatch: RegExpExecArray | null;
    while ((nameMatch = nameRegex.exec(line)) !== null) {
      if (!pendingStructuredRef) {
        pendingStructuredRef = { name: "", url: "", description: "" };
      }
      pendingStructuredRef.name = nameMatch[1];
      pushStructuredRefIfComplete();
    }

    // Optional explicit citation key for a structured reference block.
    const keyRegex = /\\key\{([^{}]+)\}/g;
    let keyMatch: RegExpExecArray | null;
    while ((keyMatch = keyRegex.exec(line)) !== null) {
      pendingStructuredKey = keyMatch[1].trim();
    }

    const descriptionRegex = /\\description\{([^{}]+)\}/g;
    let descriptionMatch: RegExpExecArray | null;
    while ((descriptionMatch = descriptionRegex.exec(line)) !== null) {
      if (!pendingStructuredRef) {
        pendingStructuredRef = { name: "", url: "", description: "" };
      }
      pendingStructuredRef.description = descriptionMatch[1];
      pushStructuredRefIfComplete();
    }

    // Parse refentry from raw line so URL-encoded '%' does not get truncated
    // by comment stripping (e.g. ...Polyn%C3%B4me...).
    const refEntryRegex = /\\refentry\{([^{}]+)\}\{([^{}]+)\}\{([^{}]+)\}/g;
    let refEntryMatch: RegExpExecArray | null;
    while ((refEntryMatch = refEntryRegex.exec(rawTrimmedLine)) !== null) {
      refs.push({
        key: refEntryMatch[1].trim(),
        url: normalizeReferenceUrl(refEntryMatch[2]),
        label: cleanReferenceLabel(refEntryMatch[3]) || normalizeReferenceUrl(refEntryMatch[2]),
        language: currentLanguage,
      });
    }

    const hrefRegex = /\\href\{([^{}]+)\}\{([^{}]+)\}/g;
    let hrefMatch: RegExpExecArray | null;
    while ((hrefMatch = hrefRegex.exec(line)) !== null) {
      autoCounters[currentLanguage] += 1;
      refs.push({
        key: `auto_${currentLanguage}_${autoCounters[currentLanguage]}`,
        url: normalizeReferenceUrl(hrefMatch[1]),
        label: cleanReferenceLabel(hrefMatch[2]) || normalizeReferenceUrl(hrefMatch[1]),
        language: currentLanguage,
      });
    }

    // Same rationale for \url{}: keep percent-encoded URLs intact.
    const urlRegex = /\\url\{([^{}]+)\}/g;
    let urlMatch: RegExpExecArray | null;
    while ((urlMatch = urlRegex.exec(rawTrimmedLine)) !== null) {
      const normalizedUrl = normalizeReferenceUrl(urlMatch[1]);
      if (pendingStructuredRef && pendingStructuredRef.url.trim().length === 0) {
        pendingStructuredRef.url = normalizedUrl;
        pushStructuredRefIfComplete();
      } else {
        autoCounters[currentLanguage] += 1;
        refs.push({
          key: `auto_${currentLanguage}_${autoCounters[currentLanguage]}`,
          url: normalizedUrl,
          label: normalizedUrl,
          language: currentLanguage,
        });
      }
    }
  }

  pushStructuredRefIfComplete();
  return refs;
}

export function getLessonWebContent(
  texFile: string,
  paragraphCount: number,
  references: LessonReference[]
): string {
  const texPath = getTexPathByFileName(texFile);
  if (!texPath) return "";

  try {
    const source = readFileSync(texPath, "utf-8");
    const citationMaps = buildCitationNumberMaps(references);
    const contentLanguage: ContentLanguage = /_en\//.test(texFile) ? "en" : "fr";
    const paragraphs = parseTexParagraphs(source, citationMaps, contentLanguage);
    const limitedParagraphs = paragraphCount > 0 ? paragraphs.slice(0, paragraphCount) : paragraphs;
    if (limitedParagraphs.length === 0) return "";
    return paragraphsToHtml(limitedParagraphs);
  } catch {
    return "";
  }
}

/** Plain HTML for exercise titles in search cards (no block-level TeX). */
export function exerciseTitleToPlainHtml(texTitle: string): string {
  return cleanLatexInline(texTitle);
}

export function getTexWebHtmlFromSource(
  source: string,
  contentLanguage: "en" | "fr",
  references: LessonReference[]
): string {
  const lang: ContentLanguage = contentLanguage === "en" ? "en" : "fr";
  const citationMaps = buildCitationNumberMaps(references);
  const paragraphs = parseTexParagraphs(source, citationMaps, lang);
  if (paragraphs.length === 0) return "";
  return paragraphsToHtml(paragraphs);
}

export function getLessonReferences(
  themeNumber: number,
  lessonNumber: number,
  fallbackReferences: LessonReference[]
): LessonReference[] {
  const fileName = `ref_${themeNumber}_${lessonNumber}.tex`;
  const refPath = getTexPathByFileName(fileName);
  if (!refPath) return fallbackReferences;

  try {
    const source = readFileSync(refPath, "utf-8");
    const parsed = parseReferencesTex(source);
    if (parsed.length > 0) return parsed;
    return fallbackReferences;
  } catch {
    return fallbackReferences;
  }
}
