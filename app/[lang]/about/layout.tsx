import type { Metadata } from "next";
import { bookMeta, bookMetaDisplayTitle } from "@/lib/chapters";
import { localeAlternates } from "@/lib/metadataAlternates";
import { isSiteLang, localizedPath } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";

interface Props {
  children: React.ReactNode;
  params: { lang: string };
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  if (!isSiteLang(params.lang)) return {};
  const url = absoluteUrl(localizedPath(params.lang, "/about"));
  return {
    title: "About",
    description: `${bookMetaDisplayTitle()} — by ${bookMeta.author} (${bookMeta.affiliation}). ${bookMeta.description}`,
    alternates: localeAlternates(params.lang, "/about"),
    openGraph: {
      title: `About | ${bookMeta.title}`,
      description: `${bookMetaDisplayTitle()} by ${bookMeta.author}, ${bookMeta.affiliation}.`,
      url,
    },
  };
}

export default function AboutLayout({ children }: Props) {
  return <>{children}</>;
}
