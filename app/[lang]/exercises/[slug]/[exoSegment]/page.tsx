import { getTranslations } from "@/lib/translations.server";
import { processLatex } from "@/lib/latex";
import { ContentUnavailable } from "@/app/components/ContentUnavailable";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWebTheme, getWebThemes } from "@/lib/localizedChapters.server";
import { bookMeta } from "@/lib/chapters";
import { exerciseTitleToPlainHtml, getTexWebHtmlFromSource } from "@/lib/chapterContent.server";
import {
  extractThemeExerciseSourceById,
  findThemeExerciseEntry,
  listThemeExerciseIds,
  themeHasExercisesFrOrEn,
} from "@/lib/exercisesLibrary.server";
import { exerciseDetailPath, exerciseSegmentToId } from "@/lib/exerciseRoutes";
import { localeAlternates } from "@/lib/metadataAlternates";
import { isSiteLang, SITE_LANGS } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";
import { ExerciseSingleClient } from "./ExerciseSingleClient";

interface Props {
  params: { lang: string; slug: string; exoSegment: string };
}

export function generateStaticParams() {
  return SITE_LANGS.flatMap((lang) =>
    getWebThemes()
      .filter((theme) => themeHasExercisesFrOrEn(theme.number))
      .flatMap((theme) =>
        listThemeExerciseIds(theme.number).map((exerciseId) => ({
          lang,
          slug: theme.slug,
          exoSegment: exerciseId.replace(/:/g, "-"),
        }))
      )
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSiteLang(params.lang)) return {};
  const theme = getWebTheme(params.slug, isSiteLang(params.lang) ? params.lang : undefined);
  if (!theme) return {};
  const exerciseId = exerciseSegmentToId(params.exoSegment);
  const entry = findThemeExerciseEntry(theme.number, exerciseId, params.lang);
  if (!entry) return {robots: {index: false, follow: true}, alternates: localeAlternates(params.lang, `/exercises/${theme.slug}/${params.exoSegment}`)};
  const path = exerciseDetailPath(params.lang, theme.slug, exerciseId);
  const url = absoluteUrl(path);
  const titlePlain = exerciseTitleToPlainHtml(entry.titleTex).replace(/<[^>]+>/g, "");
  const isFr = params.lang === "fr";
  const t = getTranslations(params.lang);
  const themeTitle = isFr ? theme.titleFr : theme.titleEn;
  return {
    title: `${t.exercises.exercisePrefix}: ${titlePlain} | ${t.common.theme} ${theme.number}`,
    description: `${t.exercises.exercisePrefix}: ${titlePlain}. ${t.common.theme} ${theme.number}: ${themeTitle}.`,
    keywords: entry.keywords,
    robots: {index: entry.seoReady, follow: true},
    alternates: localeAlternates(
      params.lang,
      `/exercises/${theme.slug}/${params.exoSegment}`
    ),
    openGraph: {
      title: `${t.exercises.exercisePrefix}: ${titlePlain}`,
      description: `${t.common.theme} ${theme.number}: ${themeTitle}`,
      url,
    },
  };
}

export default function ExerciseDetailPage({ params }: Props) {
  if (!isSiteLang(params.lang)) notFound();

  const theme = getWebTheme(params.slug, isSiteLang(params.lang) ? params.lang : undefined);
  if (!theme) notFound();

  const exerciseId = exerciseSegmentToId(params.exoSegment);
  const entry = findThemeExerciseEntry(theme.number, exerciseId);
  if (!entry) notFound();

  const localizedEntry = findThemeExerciseEntry(theme.number, exerciseId, params.lang);
  const source = extractThemeExerciseSourceById(theme.number, params.lang, exerciseId);
  if (!source || !localizedEntry) return <ContentUnavailable />;
  const rendered = processLatex(getTexWebHtmlFromSource(source, params.lang, []));

  const titleHtml = exerciseTitleToPlainHtml(localizedEntry.titleTex);

  return (
    <ExerciseSingleClient
      themeSlug={theme.slug}
      themeNumber={theme.number}
      themeTitleFr={theme.titleFr}
      themeTitleEn={theme.titleEn}
      titleHtml={titleHtml}
      keywords={localizedEntry.keywords}
      rendered={rendered}
    />
  );
}
