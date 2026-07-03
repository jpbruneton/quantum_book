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
  const url = absoluteUrl(localizedPath(params.lang, "/exercises"));
  return {
    title: "Exercises",
    description: `Practice problems and exercises for ${bookMetaDisplayTitle()} — covering Hilbert spaces, operators, measurement, and more.`,
    alternates: localeAlternates(params.lang, "/exercises"),
    openGraph: {
      title: `Exercises | ${bookMeta.title}`,
      description: `Practice problems for ${bookMeta.title}: Hilbert spaces, operators, measurement theory, and more.`,
      url,
    },
  };
}

export default function ExercisesLayout({ children }: Props) {
  return <>{children}</>;
}
