import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { hubPageSeo } from "@/lib/hubPageSeo";
import { localeAlternates } from "@/lib/metadataAlternates";
import { isSiteLang } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";
import { notFound } from "next/navigation";

interface Props {
  params: { lang: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSiteLang(params.lang)) return {};
  const seo = hubPageSeo("home", params.lang);
  const url = absoluteUrl(`/${params.lang}`);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: localeAlternates(params.lang, "/"),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
    },
  };
}

export default function HomePage({ params }: Props) {
  if (!isSiteLang(params.lang)) notFound();
  return <HomePageClient />;
}
