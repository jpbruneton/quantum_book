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
  const seo = hubPageSeo("chapters", params.lang);
  const url = absoluteUrl(localizedPath(params.lang, "/chapters"));
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: localeAlternates(params.lang, "/chapters"),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
    },
  };
}

export default function ChaptersLayout({ children }: Props) {
  return <>{children}</>;
}
