import { notFound } from "next/navigation";
import Content from "./Content";
import { getWebThemes } from "@/lib/localizedChapters.server";
import { isSiteLang } from "@/lib/localeRoutes";
import { getTranslations } from "@/lib/translations.server";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/app/components/JsonLd";

export default function Page({ params }: { params: { lang: string } }) {
  if (!isSiteLang(params.lang)) notFound();
  const lang = params.lang;
  const t = getTranslations(lang);
  const jsonLd = breadcrumbListJsonLd(lang, [
    {name: t.nav.home, logicalPath: "/"},
    {name: t.nav.glossary, logicalPath: "/glossary"},
  ]);
  return <>
    <JsonLd data={jsonLd} />
    <Content webThemes={getWebThemes(lang)} />
  </>;
}
