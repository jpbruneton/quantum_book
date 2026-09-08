import { getTranslations } from "@/lib/translations.server";
import type { SiteLang } from "@/lib/localeRoutes";

// Google truncates meta descriptions around ~155-160 characters; the book's
// intro paragraph runs much longer, so cut it at a word boundary for SEO use
// (the untruncated text still renders in full on the page itself).
const META_DESCRIPTION_MAX_LENGTH = 155;

function truncateForMeta(text: string, maxLength = META_DESCRIPTION_MAX_LENGTH): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

export type HubPageKey = "home" | "chapters" | "exercises" | "glossary" | "about";
export function hubPageSeo(page: HubPageKey, lang: SiteLang) {
  const t = getTranslations(lang);
  const title = page === "home" ? t.book.title : `${t.nav[page]} | ${t.book.title}`;
  const description = page === "exercises" ? t.exercises.subtitle : page === "glossary" ? t.glossary.subtitle : truncateForMeta(t.book.description.split("\n")[0]);
  return {title, description};
}
