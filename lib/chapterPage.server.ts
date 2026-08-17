import "server-only";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Theme } from "@/lib/chapters";
import { getLessonReferences, getLessonWebContent } from "@/lib/chapterContent.server";
import { processLatex } from "@/lib/latex";
import type { SiteLang } from "@/lib/localeRoutes";

function getTexPathByFileName(texFile: string): string {
  if (!texFile) return "";
  return join(process.cwd(), "content", "tex", texFile);
}

/** Maps a French source path to the same lesson authored in `lang`. */
export function getTexFilePathForLang(frTexFile: string, lang: SiteLang): string {
  if (lang === "fr") return frTexFile;
  const lessonMapped = frTexFile.replace(/_fr\/lecon(\d+)\.tex$/, `_${lang}/lesson$1.tex`);
  if (lessonMapped !== frTexFile) return lessonMapped;
  return frTexFile.replace(/_fr\/(fiche\d+)\.tex$/, `_${lang}/$1.tex`);
}

/** True only when `lang` has an authored, non-empty lesson body on disk. */
export function hasLessonWebContent(frTexFile: string, lang: SiteLang): boolean {
  const texPath = getTexPathByFileName(getTexFilePathForLang(frTexFile, lang));
  if (!texPath || !existsSync(texPath)) return false;
  try {
    return readFileSync(texPath, "utf-8").trim().length > 0;
  } catch {
    return false;
  }
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
