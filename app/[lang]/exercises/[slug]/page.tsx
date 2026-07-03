import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { bookMeta, getWebTheme, getWebThemes } from "@/lib/chapters";
import { exerciseTitleToPlainHtml } from "@/lib/chapterContent.server";
import { getExerciseThemePdfLinks } from "@/lib/exercisePdfDownloads.server";
import {
  buildAllExerciseIndexEntries,
  themeHasExercisesFrOrEn,
} from "@/lib/exercisesLibrary.server";
import { localeAlternates } from "@/lib/metadataAlternates";
import { isSiteLang, localizedPath, SITE_LANGS } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";
import { ExerciseThemeClient, type ThemeExerciseCard } from "./ExerciseThemeClient";

interface Props {
  params: { lang: string; slug: string };
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
  return SITE_LANGS.flatMap((lang) =>
    getWebThemes()
      .filter((theme) => themeHasExercisesFrOrEn(theme.number))
      .map((theme) => ({ lang, slug: theme.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSiteLang(params.lang)) return {};
  const theme = getWebTheme(params.slug);
  if (!theme) return {};
  const isFr = params.lang === "fr";
  const path = localizedPath(params.lang, `/exercises/${theme.slug}`);
  const url = absoluteUrl(path);
  const title = isFr ? theme.titleFr : theme.titleEn;
  const description = isFr ? theme.descriptionFr : theme.descriptionEn;
  return {
    title: `${isFr ? "Exercices" : "Exercises"} – ${isFr ? "Thème" : "Theme"} ${theme.number}: ${title} | ${bookMeta.title}`,
    description: `${isFr ? "Exercices corrigés pour le thème" : "Solved exercises for Theme"} ${theme.number}: ${title} — ${description}`,
    alternates: localeAlternates(params.lang, `/exercises/${theme.slug}`),
    openGraph: {
      title: `${isFr ? "Exercices" : "Exercises"} – ${isFr ? "Thème" : "Theme"} ${theme.number}: ${title}`,
      description,
      url,
    },
  };
}

export default function ExerciseThemePage({ params }: Props) {
  if (!isSiteLang(params.lang)) notFound();
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
