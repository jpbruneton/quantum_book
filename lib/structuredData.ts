import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";
import { bookMeta } from "@/lib/chapters";
import { getTranslations } from "@/lib/translations.server";
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

/**
 * Book and WebSite JSON-LD, rendered on the home page only: placed in the
 * layout, they were repeated (HTML + RSC payload) in every page of the site.
 */
export function homeJsonLd(lang: SiteLang) {
  const t = getTranslations(lang);
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${lang}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Book",
      name: t.book.title,
      description: t.book.description,
      author: {
        "@type": "Person",
        name: bookMeta.author,
        affiliation: {
          "@type": "Organization",
          name: bookMeta.affiliation,
        },
      },
      datePublished: bookMeta.year,
      inLanguage: lang,
      url,
      image: `${siteUrl}/figs/front.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: t.book.title,
      url,
      inLanguage: lang,
    },
  ];
}
