import { notFound } from "next/navigation";
import { isSiteLang, type SiteLang } from "@/lib/localeRoutes";
import { getWebThemes } from "@/lib/chapters";
import { exerciseTitleToPlainHtml } from "@/lib/chapterContent.server";
import { getExerciseThemePdfLinks } from "@/lib/exercisePdfDownloads.server";
import { buildAllExerciseIndexEntries, themeHasAnyExercises } from "@/lib/exercisesLibrary.server";
import { ExercisesClient } from "./ExercisesClient";

function exoTexExists(themeNumber: number, lang: SiteLang): boolean {
  return themeHasAnyExercises(themeNumber, lang);
}

function buildIndexCards(lang: SiteLang) {
  const slugByNumber = new Map(getWebThemes().map((t) => [t.number, t.slug]));
  return buildAllExerciseIndexEntries(lang).map((e, index) => ({
    id: e.id,
    displayNumber: index + 1,
    titleHtml: exerciseTitleToPlainHtml(e.titleTex),
    titleTex: e.titleTex,
    keywords: e.keywords,
    themeNumber: e.themeNumber,
    themeSlug: slugByNumber.get(e.themeNumber) ?? "",
    source: e.source,
  }));
}

export default function ExercisesPage({params}: {params: {lang: string}}) {
  if (!isSiteLang(params.lang)) notFound();
  const lang = params.lang;
  const themes = getWebThemes().map((theme) => ({
    slug: theme.slug,
    number: theme.number,
    titleFr: theme.titleFr,
    titleEn: theme.titleEn,
    descriptionFr: theme.descriptionFr,
    descriptionEn: theme.descriptionEn,
    hasContentFr: lang === "fr" && exoTexExists(theme.number, lang),
    hasContentEn: lang !== "fr" && exoTexExists(theme.number, lang),
    pdfLinks: getExerciseThemePdfLinks(theme.number),
  }));

  const indexFr = lang === "fr" ? buildIndexCards(lang) : [];
  const indexEn = lang !== "fr" ? buildIndexCards(lang) : [];

  return <ExercisesClient themes={themes} indexFr={indexFr} indexEn={indexEn} />;
}
