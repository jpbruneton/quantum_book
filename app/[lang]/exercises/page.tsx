import { getWebThemes } from "@/lib/chapters";
import { exerciseTitleToPlainHtml } from "@/lib/chapterContent.server";
import { getExerciseThemePdfLinks } from "@/lib/exercisePdfDownloads.server";
import { buildAllExerciseIndexEntries, themeHasAnyExercises } from "@/lib/exercisesLibrary.server";
import { ExercisesClient } from "./ExercisesClient";

function exoTexExists(themeNumber: number, lang: "fr" | "en"): boolean {
  return themeHasAnyExercises(themeNumber, lang);
}

function buildIndexCards(lang: "fr" | "en") {
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

export default function ExercisesPage() {
  const themes = getWebThemes().map((theme) => ({
    slug: theme.slug,
    number: theme.number,
    titleFr: theme.titleFr,
    titleEn: theme.titleEn,
    descriptionFr: theme.descriptionFr,
    descriptionEn: theme.descriptionEn,
    hasContentFr: exoTexExists(theme.number, "fr"),
    hasContentEn: exoTexExists(theme.number, "en"),
    pdfLinks: getExerciseThemePdfLinks(theme.number),
  }));

  const indexFr = buildIndexCards("fr");
  const indexEn = buildIndexCards("en");

  return <ExercisesClient themes={themes} indexFr={indexFr} indexEn={indexEn} />;
}
