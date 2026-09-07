import SiteDocument, { metadata } from "@/app/components/SiteDocument";
import { notFound } from "next/navigation";
import { LangProvider } from "@/app/context/LangContext";
import { NavBar } from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";
import { VercelInstrumentation } from "@/app/components/VercelInstrumentation";
import { isSiteLang, SITE_LANGS } from "@/lib/localeRoutes";
import { getTranslations } from "@/lib/translations.server";
import { getWebThemes } from "@/lib/localizedChapters.server";
import { getCatalog } from "@/lib/catalog";
import { isInterfaceTranslated } from "@/lib/catalog";
export const dynamic = "error";
export function generateStaticParams() { return SITE_LANGS.map(lang => ({lang})); }
export function generateMetadata({params}: {params: {lang: string}}) {
  if (!isSiteLang(params.lang)) return {};
  const t = getTranslations(params.lang);
  return {...metadata,
    title: {default: t.book.title, template: `%s | ${t.book.title}`},
    description: t.book.description,
    openGraph: {...metadata.openGraph, title: t.book.title, siteName: t.book.title, description: t.book.description},
    twitter: {...metadata.twitter, title: t.book.title, description: t.book.description},
    robots: {index: isInterfaceTranslated(params.lang), follow: true},
  };
}
export default function LangLayout({children, params}: {children: React.ReactNode; params: {lang: string}}) {
  if (!isSiteLang(params.lang)) notFound();
  return <SiteDocument lang={params.lang}><LangProvider initialLang={params.lang} initialUi={getCatalog(params.lang).ui} initialThemes={getWebThemes(params.lang)}>
    <NavBar /><main>{children}</main><Footer /><VercelInstrumentation />
  </LangProvider></SiteDocument>;
}
