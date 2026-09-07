import { buildAllExerciseIndexEntries } from "@/lib/exercisesLibrary.server";
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
  const seo = hubPageSeo("exercises", params.lang);
  const url = absoluteUrl(localizedPath(params.lang, "/exercises"));
  return {
    title: { absolute: seo.title },
    description: seo.description,
    robots: {index: buildAllExerciseIndexEntries(params.lang).length > 0, follow: true},
    alternates: localeAlternates(params.lang, "/exercises"),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
    },
  };
}

export default function ExercisesLayout({ children }: Props) {
  return <>{children}</>;
}
