import { absoluteUrl } from "@/lib/siteUrl";
import { localizedPath, type SiteLang } from "@/lib/localeRoutes";

export interface BreadcrumbSegment {
  name: string;
  logicalPath: string;
}

/** BreadcrumbList JSON-LD for a chain of pages from home down to the current page. */
export function breadcrumbListJsonLd(lang: SiteLang, segments: BreadcrumbSegment[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: segment.name,
      item: absoluteUrl(localizedPath(lang, segment.logicalPath)),
    })),
  };
}

export interface ItemListEntry {
  name: string;
  logicalPath: string;
}

/** ItemList JSON-LD for an index page listing links to other pages (themes, exercises, ...). */
export function itemListJsonLd(lang: SiteLang, entries: ItemListEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: absoluteUrl(localizedPath(lang, entry.logicalPath)),
    })),
  };
}
