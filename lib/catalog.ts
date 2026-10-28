import "server-only";
import french from "@/lib/locales/fr.json";
import { translatedCatalogs } from "@/lib/locales";

export type Catalog = typeof french;

export function getCatalog(lang: string): Catalog {
  return (translatedCatalogs[lang] as Catalog | undefined) ?? french;
}

/** Interface strings sent to the browser by the layout, on every page. */
export type ClientUi = Omit<Catalog["ui"], "about">;

/**
 * The layout serializes this into every page (HTML + RSC payload), so the
 * About page copy is left out: that page receives it as a prop instead.
 */
export function getClientUi(lang: string): ClientUi {
  const { about, ...ui } = getCatalog(lang).ui;
  return ui;
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
