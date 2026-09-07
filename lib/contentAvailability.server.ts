import "server-only";
import { getWebTheme } from "@/lib/chapters";
import { findLessonIndexByRef } from "@/lib/lessonRoutes";
import { hasLessonWebContent } from "@/lib/chapterPage.server";
import { buildAllExerciseIndexEntries, findThemeExerciseEntry, themeHasAnyExercises } from "@/lib/exercisesLibrary.server";
import { exerciseSegmentToId } from "@/lib/exerciseRoutes";
import { SITE_LANGS, stripLocalePrefix, toLogicalPath, type SiteLang } from "@/lib/localeRoutes";
export function availablePageLanguages(path: string): SiteLang[] {
  const parts = toLogicalPath(stripLocalePrefix(path).pathWithoutLang).split("/").filter(Boolean);
  const [section, slug, ref] = parts;
  if (section === "chapters" && slug && ref) {
    const theme = getWebTheme(slug);
    const index = theme ? findLessonIndexByRef(theme.lessons, ref) : -1;
    return theme && index >= 0 ? SITE_LANGS.filter(lang => hasLessonWebContent(theme.lessons[index].texFile, lang)) : [];
  }
  if (section === "quiz") return [];
  if (section === "exercises") {
    const theme = slug ? getWebTheme(slug) : null;
    return SITE_LANGS.filter(lang => ref && theme
      ? !!findThemeExerciseEntry(theme.number, exerciseSegmentToId(ref), lang)?.seoReady
      : theme ? themeHasAnyExercises(theme.number, lang) : buildAllExerciseIndexEntries(lang).length > 0);
  }
  return ["fr", "en"];
}
