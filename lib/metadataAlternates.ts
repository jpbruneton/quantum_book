import type { Metadata } from "next";
import { localizedPath, stripLocalePrefix, type SiteLang } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";
import { availablePageLanguages } from "@/lib/contentAvailability.server";
export function localeAlternates(lang: SiteLang, path: string): NonNullable<Metadata["alternates"]> {
  const logicalPath = stripLocalePrefix(path).pathWithoutLang;
  const available = availablePageLanguages(logicalPath);
  const languages: Record<string, string> = Object.fromEntries(available.map(code => [code, absoluteUrl(localizedPath(code, logicalPath))]));
  const fallback = available.includes("en") ? "en" : available[0];
  if (fallback) languages["x-default"] = absoluteUrl(localizedPath(fallback, logicalPath));
  return {canonical: absoluteUrl(localizedPath(lang, logicalPath)), languages};
}
