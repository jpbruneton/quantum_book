import type { MetadataRoute } from "next";
import { localizedPath, SITE_LANGS, type SiteLang } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";

export function sitemapHreflangAlternates(
  logicalPath: string,
  availableLangs: SiteLang[] = SITE_LANGS
): NonNullable<MetadataRoute.Sitemap[number]["alternates"]> {
  const languages: Record<string, string> = {};
  for (const lang of availableLangs) {
    languages[lang] = absoluteUrl(localizedPath(lang, logicalPath));
  }
  // x-default points at English when it exists, otherwise at the only language shipped.
  const fallback = availableLangs.includes("en") ? "en" : availableLangs[0];
  if (fallback) {
    languages["x-default"] = absoluteUrl(localizedPath(fallback, logicalPath));
  }
  return { languages };
}

interface SitemapEntryOptions {
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}

/**
 * One entry per language that actually ships this page. Listing a language
 * without content advertises a URL that renders an empty lesson.
 */
export function sitemapEntriesForLogicalPath(
  logicalPath: string,
  options: SitemapEntryOptions,
  availableLangs: SiteLang[] = SITE_LANGS
): MetadataRoute.Sitemap {
  if (availableLangs.length === 0) return [];
  const alternates = sitemapHreflangAlternates(logicalPath, availableLangs);
  return availableLangs.map((lang) => ({
    url: absoluteUrl(localizedPath(lang, logicalPath)),
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates,
  }));
}

export function sitemapEntryForLang(
  lang: SiteLang,
  logicalPath: string,
  options: SitemapEntryOptions
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(localizedPath(lang, logicalPath)),
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: sitemapHreflangAlternates(logicalPath),
  };
}
