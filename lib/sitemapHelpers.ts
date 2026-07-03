import type { MetadataRoute } from "next";
import { localizedPath, SITE_LANGS, type SiteLang } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";

export function sitemapHreflangAlternates(logicalPath: string): NonNullable<
  MetadataRoute.Sitemap[number]["alternates"]
> {
  return {
    languages: {
      en: absoluteUrl(localizedPath("en", logicalPath)),
      fr: absoluteUrl(localizedPath("fr", logicalPath)),
      "x-default": absoluteUrl(localizedPath("en", logicalPath)),
    },
  };
}

interface SitemapEntryOptions {
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}

export function sitemapEntriesForLogicalPath(
  logicalPath: string,
  options: SitemapEntryOptions
): MetadataRoute.Sitemap {
  const alternates = sitemapHreflangAlternates(logicalPath);
  return SITE_LANGS.map((lang) => ({
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
