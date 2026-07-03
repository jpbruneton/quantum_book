import { notFound, redirect } from "next/navigation";
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
import { absoluteUrl } from "@/lib/siteUrl";
import legacyExerciseSlugRedirects from "@/lib/legacyExerciseSlugRedirects.json";
import { ExerciseSingleClient } from "./ExerciseSingleClient";

const legacySlugs = legacyExerciseSlugRedirects as Record<string, string>;

interface Props {
  params: { slug: string; exoSegment: string };
}

export function generateStaticParams() {
  return getWebThemes()
    .filter((theme) => themeHasExercisesFrOrEn(theme.number))
    .flatMap((theme) =>
      listThemeExerciseIds(theme.number).map((exerciseId) => ({
        slug: theme.slug,
        exoSegment: exerciseId.replace(/:/g, "-"),
      }))
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const theme = getWebTheme(params.slug);
  if (!theme) return {};
  const exerciseId = exerciseSegmentToId(params.exoSegment);
  const entry = findThemeExerciseEntry(theme.number, exerciseId);
  if (!entry) return {};
  const path = exerciseDetailPath(theme.slug, exerciseId);
  const url = absoluteUrl(path);
  const titlePlain = exerciseTitleToPlainHtml(entry.titleTex).replace(/<[^>]+>/g, "");
  return {
    title: `Exercise – ${titlePlain} | Theme ${theme.number} | ${bookMeta.title}`,
    description: `Solved exercise: ${titlePlain}. Theme ${theme.number}: ${theme.titleEn}.`,
    keywords: entry.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `Exercise – ${titlePlain}`,
      description: `Theme ${theme.number}: ${theme.titleEn}`,
      url,
    },
  };
}

export default function ExerciseDetailPage({ params }: Props) {
  const canonicalSlug = legacySlugs[params.slug];
  if (canonicalSlug) {
    redirect(exerciseDetailPath(canonicalSlug, exerciseSegmentToId(params.exoSegment)));
  }

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
