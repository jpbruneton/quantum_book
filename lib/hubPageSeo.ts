import { getTranslations } from "@/lib/translations.server";
import type { SiteLang } from "@/lib/localeRoutes";
export type HubPageKey = "home" | "chapters" | "exercises" | "glossary" | "about";
export function hubPageSeo(page: HubPageKey, lang: SiteLang) {
  const t = getTranslations(lang);
  const title = page === "home" ? t.book.title : `${t.nav[page]} | ${t.book.title}`;
  const description = page === "exercises" ? t.exercises.subtitle : page === "glossary" ? t.glossary.subtitle : t.book.description.split("\n")[0];
  return {title, description};
}
