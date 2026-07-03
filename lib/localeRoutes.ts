import type { Lang } from "@/lib/i18n";

export type SiteLang = Lang;

export const SITE_LANGS: SiteLang[] = ["en", "fr"];
export const DEFAULT_SITE_LANG: SiteLang = "en";

const ROUTE_SECTIONS = {
  chapters: { en: "chapters", fr: "chapitres" },
  exercises: { en: "exercises", fr: "exercices" },
  glossary: { en: "glossary", fr: "glossaire" },
  about: { en: "about", fr: "a-propos" },
} as const;

type RouteSection = keyof typeof ROUTE_SECTIONS;

function splitPath(path: string): string[] {
  return path.split("/").filter(Boolean);
}

function isRouteSection(value: string): value is RouteSection {
  return value in ROUTE_SECTIONS;
}

function publicSectionSlug(lang: SiteLang, section: RouteSection): string {
  return ROUTE_SECTIONS[section][lang];
}

function resolveSectionFromPublicSlug(slug: string): RouteSection | null {
  for (const section of Object.keys(ROUTE_SECTIONS) as RouteSection[]) {
    if (ROUTE_SECTIONS[section].en === slug || ROUTE_SECTIONS[section].fr === slug) {
      return section;
    }
  }
  return null;
}

/** Canonical internal path used by the Next.js app directory (always English section slugs). */
export function toLogicalPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const parts = splitPath(normalized);
  if (parts.length === 0) {
    return "/";
  }
  const section = resolveSectionFromPublicSlug(parts[0]);
  if (!section) {
    return normalized;
  }
  parts[0] = section;
  return `/${parts.join("/")}`;
}

function toPublicPath(lang: SiteLang, logicalPath: string): string {
  const normalized = logicalPath.startsWith("/") ? logicalPath : `/${logicalPath}`;
  const parts = splitPath(normalized);
  if (parts.length === 0) {
    return "/";
  }
  if (isRouteSection(parts[0])) {
    parts[0] = publicSectionSlug(lang, parts[0]);
  }
  return `/${parts.join("/")}`;
}

export function isSiteLang(value: string): value is SiteLang {
  return value === "en" || value === "fr";
}

/** Public URL for a logical app path, with locale-prefixed section slugs. */
export function localizedPath(lang: SiteLang, logicalPath: string): string {
  const normalized = logicalPath.startsWith("/") ? logicalPath : `/${logicalPath}`;
  if (normalized === "/") {
    return `/${lang}`;
  }
  return `/${lang}${toPublicPath(lang, toLogicalPath(normalized))}`;
}

export function stripLocalePrefix(pathname: string): {
  lang: SiteLang | null;
  pathWithoutLang: string;
} {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isSiteLang(parts[0])) {
    const lang = parts[0];
    const rest = parts.slice(1);
    return {
      lang,
      pathWithoutLang: rest.length > 0 ? `/${rest.join("/")}` : "/",
    };
  }
  return { lang: null, pathWithoutLang: pathname };
}

export function swapLocaleInPath(pathname: string, newLang: SiteLang): string {
  const { pathWithoutLang } = stripLocalePrefix(pathname);
  const logicalPath = toLogicalPath(pathWithoutLang);
  return localizedPath(newLang, logicalPath);
}

export function preferSiteLangFromAcceptLanguage(header: string | null): SiteLang {
  if (!header) {
    return DEFAULT_SITE_LANG;
  }
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("fr")) {
    return "fr";
  }
  return DEFAULT_SITE_LANG;
}

/** Internal pathname for Next.js routing: /{lang}/chapters/... */
export function toInternalPathname(lang: SiteLang, publicPathWithoutLang: string): string {
  const logicalPath = toLogicalPath(publicPathWithoutLang);
  if (logicalPath === "/") {
    return `/${lang}`;
  }
  return `/${lang}${logicalPath}`;
}
