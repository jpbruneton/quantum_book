import type { Metadata } from "next";
import { localizedPath, type SiteLang } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";

export function localeAlternates(lang: SiteLang, path: string): NonNullable<Metadata["alternates"]> {
  const pathWithoutLang = path.startsWith("/en/") || path.startsWith("/fr/")
    ? path.replace(/^\/(en|fr)/, "") || "/"
    : path.startsWith("/") ? path : `/${path}`;

  return {
    canonical: absoluteUrl(localizedPath(lang, pathWithoutLang)),
    languages: {
      en: absoluteUrl(localizedPath("en", pathWithoutLang)),
      fr: absoluteUrl(localizedPath("fr", pathWithoutLang)),
      "x-default": absoluteUrl(localizedPath("en", pathWithoutLang)),
    },
  };
}
