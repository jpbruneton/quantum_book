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
  const url = absoluteUrl(localizedPath(params.lang, "/chapters"));
  return {
    title: "Chapters",
    description: `Browse all themes and lessons of ${bookMetaDisplayTitle()} — covering Hilbert spaces, quantum postulates, measurement, and more.`,
    alternates: localeAlternates(params.lang, "/chapters"),
    openGraph: {
      title: `Chapters | ${bookMeta.title}`,
      description: `All themes and lessons of ${bookMeta.title}: Hilbert spaces, quantum postulates, measurement theory, and more.`,
      url,
    },
  };
}

export default function ChaptersLayout({ children }: Props) {
  return <>{children}</>;
}
