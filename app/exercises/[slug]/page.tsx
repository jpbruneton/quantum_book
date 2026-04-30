import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { bookMeta, getWebTheme, getWebThemes } from "@/lib/chapters";
import { getTexWebHtmlFromSource } from "@/lib/chapterContent.server";
import { combineThemeExerciseSources, themeHasExercisesFrOrEn } from "@/lib/exercisesLibrary.server";
import { absoluteUrl } from "@/lib/siteUrl";
import legacyExerciseSlugRedirects from "@/lib/legacyExerciseSlugRedirects.json";
import { ExerciseThemeClient } from "./ExerciseThemeClient";

const legacySlugs = legacyExerciseSlugRedirects as Record<string, string>;

interface Props {
  params: { slug: string };
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

  const mergedFr = combineThemeExerciseSources(theme.number, "fr");
  const mergedEn = combineThemeExerciseSources(theme.number, "en");

  const contentFr = getTexWebHtmlFromSource(mergedFr, "fr", []);
  const contentEn = getTexWebHtmlFromSource(mergedEn, "en", []);

  if (!contentFr && !contentEn) notFound();

  return (
    <ExerciseThemeClient
      number={theme.number}
      titleFr={theme.titleFr}
      titleEn={theme.titleEn}
      contentFr={contentFr}
      contentEn={contentEn}
    />
  );
}
