import { buildLessonPresentation } from "@/lib/lessonPresentation";
import "server-only";
import type { Theme } from "@/lib/chapters";
import { getLessonReferences, getLessonWebContent } from "@/lib/chapterContent.server";
import { processLatex } from "@/lib/latex";
import type { SiteLang } from "@/lib/localeRoutes";

export { getTexFilePathForLang, hasLessonWebContent } from "@/lib/lessonSource.server";
import { getTexFilePathForLang } from "@/lib/lessonSource.server";

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
        return { ...lesson, content: "", contentLang: "", renderedLang: "", toc: [], references: [] };
      }
      const langTexFile = getTexFilePathForLang(lesson.texFile, lang);
      const resolvedReferences = getLessonReferences(
        theme.number,
        lesson.number,
        lesson.references,
        langTexFile
      );
      const langContent =
        getLessonWebContent(langTexFile, -1, resolvedReferences) ||
        (lang === "fr" ? lesson.content : "");
      const renderedLang = langContent ? processLatex(langContent) : "";
      const presentation = buildLessonPresentation(langContent, renderedLang, lang);
      return {
        ...lesson,
        content: "",
        contentLang: "",
        renderedLang: presentation.content,
        toc: presentation.toc,
        references: resolvedReferences,
      };
    }),
  };
}
