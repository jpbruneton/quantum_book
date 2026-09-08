import { notFound } from "next/navigation";
import ChaptersPageClient from "./ChaptersPageClient";
import { getWebThemes } from "@/lib/localizedChapters.server";
import { isSiteLang } from "@/lib/localeRoutes";
import { getTranslations } from "@/lib/translations.server";
import { breadcrumbListJsonLd, itemListJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/app/components/JsonLd";

export default function ChaptersPage({ params }: { params: { lang: string } }) {
  if (!isSiteLang(params.lang)) notFound();
  const lang = params.lang;
  const t = getTranslations(lang);
  const webThemes = getWebThemes(lang);
  const jsonLd = [
    breadcrumbListJsonLd(lang, [
      {name: t.nav.home, logicalPath: "/"},
      {name: t.nav.chapters, logicalPath: "/chapters"},
    ]),
    itemListJsonLd(lang, webThemes.map(theme => ({
      name: lang === "fr" ? theme.titleFr : theme.titleEn,
      logicalPath: `/chapters/${theme.slug}`,
    }))),
  ];
  return <>
    <JsonLd data={jsonLd} />
    <ChaptersPageClient webThemes={webThemes} />
  </>;
}
