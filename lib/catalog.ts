import "server-only";
import french from "@/lib/locales/fr.json";
import { translatedCatalogs } from "@/lib/locales";

export type Catalog = typeof french;

export function getCatalog(lang: string): Catalog {
  return (translatedCatalogs[lang] as Catalog | undefined) ?? french;
}

export function isInterfaceTranslated(lang: string): boolean {
  return lang === "fr" || Object.hasOwn(translatedCatalogs, lang);
}

export function getThemeCopy(slug: string, lang: string) {
  const catalog = getCatalog(lang);
  return catalog.themes[slug as keyof typeof catalog.themes];
}

export function getLessonCopy(themeSlug: string, lessonSlug: string, lang: string) {
  const theme = getThemeCopy(themeSlug, lang);
  return (theme?.lessons as Record<string, {title: string; subtitle: string; description: string; topics: string[]}> | undefined)?.[lessonSlug];
}
