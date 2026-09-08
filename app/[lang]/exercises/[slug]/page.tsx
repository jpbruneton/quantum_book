import { getTranslations } from "@/lib/translations.server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWebTheme, getWebThemes } from "@/lib/localizedChapters.server";
import { bookMeta } from "@/lib/chapters";
import { exerciseTitleToPlainHtml } from "@/lib/chapterContent.server";
import { getExerciseThemePdfLinks } from "@/lib/exercisePdfDownloads.server";
import {
  buildAllExerciseIndexEntries,
  themeHasExercisesFrOrEn,
  themeHasAnyExercises,
} from "@/lib/exercisesLibrary.server";
import { localeAlternates } from "@/lib/metadataAlternates";
import { isSiteLang, localizedPath, SITE_LANGS } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";
import { exerciseIdToSegment } from "@/lib/exerciseRoutes";
import { breadcrumbListJsonLd, itemListJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/app/components/JsonLd";
import { ExerciseThemeClient, type ThemeExerciseCard } from "./ExerciseThemeClient";

interface Props {
  params: { lang: string; slug: string };
}

function buildThemeExerciseCards(themeNumber: number, lang: import("@/lib/i18n").Lang): {
  exercisesFr: ThemeExerciseCard[];
  exercisesEn: ThemeExerciseCard[];
} {
  const exercisesFr: ThemeExerciseCard[] = [];
  const exercisesEn: ThemeExerciseCard[] = [];
  let frIndex = 0;
  let enIndex = 0;
  for (const entry of (lang === "fr" ? buildAllExerciseIndexEntries(lang) : [])) {
    if (entry.themeNumber !== themeNumber) continue;
    frIndex += 1;
    exercisesFr.push({
      id: entry.id,
      displayNumber: frIndex,
      titleHtml: exerciseTitleToPlainHtml(entry.titleTex),
      keywords: entry.keywords,
    });
  }
  for (const entry of (lang !== "fr" ? buildAllExerciseIndexEntries(lang) : [])) {
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
  const theme = getWebTheme(params.slug, isSiteLang(params.lang) ? params.lang : undefined);
  if (!theme) return {};
  const isFr = params.lang === "fr";
  const t = getTranslations(params.lang);
  const path = localizedPath(params.lang, `/exercises/${theme.slug}`);
  const url = absoluteUrl(path);
  const title = isFr ? theme.titleFr : theme.titleEn;
  const description = isFr ? theme.descriptionFr : theme.descriptionEn;
  return {
    title: `${t.nav.exercises} | ${t.common.theme} ${theme.number}: ${title}`,
    description: `${t.exercises.title}: ${title}. ${description}`,
    robots: {index: themeHasAnyExercises(theme.number, params.lang), follow: true},
    alternates: localeAlternates(params.lang, `/exercises/${theme.slug}`),
    openGraph: {
      title: `${t.nav.exercises} | ${t.common.theme} ${theme.number}: ${title}`,
      description,
      url,
    },
  };
}

export default function ExerciseThemePage({ params }: Props) {
  if (!isSiteLang(params.lang)) notFound();
  const theme = getWebTheme(params.slug, isSiteLang(params.lang) ? params.lang : undefined);
  if (!theme) notFound();

  const { exercisesFr, exercisesEn } = buildThemeExerciseCards(theme.number, params.lang);

  const lang = params.lang;
  const t = getTranslations(lang);
  const themeTitle = lang === "fr" ? theme.titleFr : theme.titleEn;
  const exerciseCards = lang === "fr" ? exercisesFr : exercisesEn;
  const jsonLd = [
    breadcrumbListJsonLd(lang, [
      {name: t.nav.home, logicalPath: "/"},
      {name: t.nav.exercises, logicalPath: "/exercises"},
      {name: themeTitle, logicalPath: `/exercises/${theme.slug}`},
    ]),
    ...(exerciseCards.length > 0 ? [itemListJsonLd(lang, exerciseCards.map(card => ({
      name: card.titleHtml.replace(/<[^>]+>/g, ""),
      logicalPath: `/exercises/${theme.slug}/${exerciseIdToSegment(card.id)}`,
    })))] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ExerciseThemeClient
        themeSlug={theme.slug}
        number={theme.number}
        titleFr={theme.titleFr}
        titleEn={theme.titleEn}
        exercisesFr={exercisesFr}
        exercisesEn={exercisesEn}
        pdfLinks={getExerciseThemePdfLinks(theme.number)}
      />
    </>
  );
}
