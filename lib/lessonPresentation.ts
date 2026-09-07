import type { Lang } from "@/lib/i18n";
export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

function simplifyLatexForToc(value: string): string {
  let result = value;
  result = result.replace(/\\mathbb\{([^{}]+)\}/g, "$1");
  result = result.replace(/\\mathcal\{([^{}]+)\}/g, "$1");
  result = result.replace(/\\ell/g, "ℓ");
  result = result.replace(/\\C/g, "C");
  result = result.replace(/\\N/g, "N");
  result = result.replace(/\\R/g, "R");
  result = result.replace(/\\to/g, "→");
  result = result.replace(/\\rightarrow/g, "→");
  result = result.replace(/[_^]\{([^{}]+)\}/g, "$1");
  result = result.replace(/[_^]([A-Za-z0-9]+)/g, "$1");
  result = result.replace(/\\[a-zA-Z]+/g, "");
  result = result.replace(/[{}]/g, "");
  result = result.replace(/\s*([()])/g, "$1").replace(/([()])\s*/g, "$1");
  result = result.replace(/([A-Za-zℓ])\s+(\d)/g, "$1$2");
  result = result.replace(/(\d)\s+([A-Za-z])/g, "$1$2");
  return result.replace(/\s+/g, " ").trim();
}

function stripHtmlForToc(value: string): string {
  const withoutKatexMathMl = value.replace(
    /<span class="katex-mathml">[\s\S]*?<\/span>/g,
    ""
  );
  const htmlStripped = withoutKatexMathMl.replace(/<[^>]+>/g, " ");
  const withoutInlineMathDelimiters = htmlStripped.replace(/\$+([\s\S]*?)\$+/g, (_m, math: string) =>
    simplifyLatexForToc(math)
  );
  const compact = withoutInlineMathDelimiters
    .replace(/\s*([()])/g, "$1")
    .replace(/([()])\s*/g, "$1")
    .replace(/([A-Za-zℓ])\s+(\d)/g, "$1$2")
    .replace(/(\d)\s+([A-Za-z])/g, "$1$2");
  return compact.replace(/\s+/g, " ").trim();
}

function slugify(value: string): string {
  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return normalized || "section";
}


export function buildLessonPresentation(source: string, rendered: string, lang: Lang) {
  const headings = Array.from(source.matchAll(/<(h[2-4])>([\s\S]*?)<\/\1>/g), match => stripHtmlForToc(match[2].replace(/\$+([\s\S]*?)\$+/g, (_m, math: string) => simplifyLatexForToc(math))));
  const localized = rendered.replace(/<sup class="lesson-cite" data-cite-en="([^"]*)" data-cite-fr="([^"]*)">[\s\S]*?<\/sup>/g, (_m, en: string, fr: string) => {
    const preferred = lang === "fr" ? fr : en;
    const fallback = lang === "fr" ? en : fr;
    return `<sup class="lesson-cite">[${preferred && preferred !== "?" ? preferred : fallback || "?"}]</sup>`;
  });
  const toc: TocEntry[] = [];
  const used: Record<string, number> = {};
  const content = localized.replace(/<(h[2-4])>([\s\S]*?)<\/\1>/g, (_m, tag: string, inner: string) => {
    const text = headings[toc.length] || stripHtmlForToc(inner);
    const base = slugify(text);
    const count = used[base] ?? 0;
    used[base] = count + 1;
    const id = count ? `${base}-${count + 1}` : base;
    toc.push({id, text, level: Number(tag[1]) as 2 | 3 | 4});
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
  return {content, toc};
}
