import type { Metadata } from "next";
import { hubPageSeo } from "@/lib/hubPageSeo";
import { localeAlternates } from "@/lib/metadataAlternates";
import { isSiteLang, localizedPath } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  if (!isSiteLang(params.lang)) return {};
  const seo = hubPageSeo("about", params.lang);
  const url = absoluteUrl(localizedPath(params.lang, "/about"));
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: localeAlternates(params.lang, "/about"),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
    },
  };
}

export default function AboutLayout({ children }: Props) {
  return <>{children}</>;
}
