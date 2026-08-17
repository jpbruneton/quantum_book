import "server-only";
import type { Theme } from "@/lib/chapters";
import { getLessonReferences, getLessonWebContent } from "@/lib/chapterContent.server";
import { processLatex } from "@/lib/latex";
import type { SiteLang } from "@/lib/localeRoutes";

/** Maps a French source path to the same lesson authored in `lang`. */
export function getTexFilePathForLang(frTexFile: string, lang: SiteLang): string {
  if (lang === "fr") return frTexFile;
  const lessonMapped = frTexFile.replace(/_fr\/lecon(\d+)\.tex$/, `_${lang}/lesson$1.tex`);
  if (lessonMapped !== frTexFile) return lessonMapped;
  return frTexFile.replace(/_fr\/(fiche\d+)\.tex$/, `_${lang}/$1.tex`);
}

/**
 * Localizes a theme for a single lesson in a single language.
 *
 * Everything returned here is serialized into the page payload, so only the
 * lesson at `activeLessonIndex` carries a body: the other lessons are rendered
 * as navigation entries and need metadata alone. Likewise only `lang` is
 * resolved, since switching language is a navigation to another route.
 */
export function buildThemeWithLocalizedContent(
  theme: Theme,
  lang: SiteLang,
  activeLessonIndex: number
) {
  return {
    ...theme,
    lessons: theme.lessons.map((lesson, index) => {
      if (index !== activeLessonIndex) {
        return { ...lesson, content: "", contentLang: "", renderedLang: "", references: [] };
      }
      const resolvedReferences = getLessonReferences(
        theme.number,
        lesson.number,
        lesson.references
      );
      const langTexFile = getTexFilePathForLang(lesson.texFile, lang);
      const langContent =
        getLessonWebContent(langTexFile, -1, resolvedReferences) ||
        (lang === "fr" ? lesson.content : "");
      const renderedLang = langContent ? processLatex(langContent) : "";
      return {
        ...lesson,
        content: "",
        contentLang: langContent,
        renderedLang,
        references: resolvedReferences,
      };
    }),
  };
}
