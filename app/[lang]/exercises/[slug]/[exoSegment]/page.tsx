import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { bookMeta, getWebTheme, getWebThemes } from "@/lib/chapters";
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
  const theme = getWebTheme(params.slug);
  if (!theme) return {};
  const exerciseId = exerciseSegmentToId(params.exoSegment);
  const entry = findThemeExerciseEntry(theme.number, exerciseId);
  if (!entry) return {};
  const path = exerciseDetailPath(params.lang, theme.slug, exerciseId);
  const url = absoluteUrl(path);
  const titlePlain = exerciseTitleToPlainHtml(entry.titleTex).replace(/<[^>]+>/g, "");
  const isFr = params.lang === "fr";
  const themeTitle = isFr ? theme.titleFr : theme.titleEn;
  return {
    title: `${isFr ? "Exercice" : "Exercise"} – ${titlePlain} | ${isFr ? "Thème" : "Theme"} ${theme.number} | ${bookMeta.title}`,
    description: `${isFr ? "Exercice corrigé" : "Solved exercise"}: ${titlePlain}. ${isFr ? "Thème" : "Theme"} ${theme.number}: ${themeTitle}.`,
    keywords: entry.keywords,
    alternates: localeAlternates(
      params.lang,
      `/exercises/${theme.slug}/${params.exoSegment}`
    ),
    openGraph: {
      title: `${isFr ? "Exercice" : "Exercise"} – ${titlePlain}`,
      description: `${isFr ? "Thème" : "Theme"} ${theme.number}: ${themeTitle}`,
      url,
    },
  };
}

export default function ExerciseDetailPage({ params }: Props) {
  if (!isSiteLang(params.lang)) notFound();

  const theme = getWebTheme(params.slug);
  if (!theme) notFound();

  const exerciseId = exerciseSegmentToId(params.exoSegment);
  const entry = findThemeExerciseEntry(theme.number, exerciseId);
  if (!entry) notFound();

  const sourceFr = extractThemeExerciseSourceById(theme.number, "fr", exerciseId);
  const sourceEn = extractThemeExerciseSourceById(theme.number, "en", exerciseId);
  const contentFr = sourceFr ? getTexWebHtmlFromSource(sourceFr, "fr", []) : "";
  const contentEn = sourceEn ? getTexWebHtmlFromSource(sourceEn, "en", []) : "";

  if (!contentFr && !contentEn) notFound();

  const titleHtml = exerciseTitleToPlainHtml(entry.titleTex);

  return (
    <ExerciseSingleClient
      themeSlug={theme.slug}
      themeNumber={theme.number}
      themeTitleFr={theme.titleFr}
      themeTitleEn={theme.titleEn}
      titleHtml={titleHtml}
      keywords={entry.keywords}
      contentFr={contentFr}
      contentEn={contentEn}
    />
  );
}
