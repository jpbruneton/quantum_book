import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { bookMeta, getWebTheme, getWebThemes } from "@/lib/chapters";
import { exerciseTitleToPlainHtml } from "@/lib/chapterContent.server";
import { getExerciseThemePdfLinks } from "@/lib/exercisePdfDownloads.server";
import {
  buildAllExerciseIndexEntries,
  themeHasExercisesFrOrEn,
} from "@/lib/exercisesLibrary.server";
import { absoluteUrl } from "@/lib/siteUrl";
import legacyExerciseSlugRedirects from "@/lib/legacyExerciseSlugRedirects.json";
import { ExerciseThemeClient, type ThemeExerciseCard } from "./ExerciseThemeClient";

const legacySlugs = legacyExerciseSlugRedirects as Record<string, string>;

interface Props {
  params: { slug: string };
}

function buildThemeExerciseCards(themeNumber: number): {
  exercisesFr: ThemeExerciseCard[];
  exercisesEn: ThemeExerciseCard[];
} {
  const exercisesFr: ThemeExerciseCard[] = [];
  const exercisesEn: ThemeExerciseCard[] = [];
  let frIndex = 0;
  let enIndex = 0;
  for (const entry of buildAllExerciseIndexEntries("fr")) {
    if (entry.themeNumber !== themeNumber) continue;
    frIndex += 1;
    exercisesFr.push({
      id: entry.id,
      displayNumber: frIndex,
      titleHtml: exerciseTitleToPlainHtml(entry.titleTex),
      keywords: entry.keywords,
    });
  }
  for (const entry of buildAllExerciseIndexEntries("en")) {
    if (entry.themeNumber !== themeNumber) continue;
    enIndex += 1;
    exercisesEn.push({
      id: entry.id,
      displayNumber: enIndex,
      titleHtml: exerciseTitleToPlainHtml(entry.titleTex),
      keywords: entry.keywords,
    });
  }
  return { exercisesFr, exercisesEn };
}

export function generateStaticParams() {
  return getWebThemes()
    .filter((theme) => themeHasExercisesFrOrEn(theme.number))
    .map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const theme = getWebTheme(params.slug);
  if (!theme) return {};
  const url = absoluteUrl(`/exercises/${theme.slug}`);
  return {
    title: `Exercises – Theme ${theme.number}: ${theme.titleEn} | ${bookMeta.title}`,
    description: `Solved exercises for Theme ${theme.number}: ${theme.titleEn} — ${theme.descriptionEn}`,
    alternates: { canonical: url },
    openGraph: {
      title: `Exercises – Theme ${theme.number}: ${theme.titleEn}`,
      description: theme.descriptionEn,
      url,
    },
  };
}

export default function ExerciseThemePage({ params }: Props) {
  const canonicalSlug = legacySlugs[params.slug];
  if (canonicalSlug) {
    redirect(`/exercises/${canonicalSlug}`);
  }
  const theme = getWebTheme(params.slug);
  if (!theme) notFound();

  const { exercisesFr, exercisesEn } = buildThemeExerciseCards(theme.number);
  if (exercisesFr.length === 0 && exercisesEn.length === 0) notFound();

  return (
    <ExerciseThemeClient
      themeSlug={theme.slug}
      number={theme.number}
      titleFr={theme.titleFr}
      titleEn={theme.titleEn}
      exercisesFr={exercisesFr}
      exercisesEn={exercisesEn}
      pdfLinks={getExerciseThemePdfLinks(theme.number)}
    />
  );
}
