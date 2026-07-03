import "server-only";
import type { Theme } from "@/lib/chapters";
import { getLessonReferences, getLessonWebContent } from "@/lib/chapterContent.server";
import { processLatex } from "@/lib/latex";

export function getEnglishTexFilePath(frTexFile: string): string {
  const lessonMapped = frTexFile.replace(/_fr\/lecon(\d+)\.tex$/, "_en/lesson$1.tex");
  if (lessonMapped !== frTexFile) return lessonMapped;
  const ficheMapped = frTexFile.replace(/_fr\/(fiche\d+)\.tex$/, "_en/$1.tex");
  return ficheMapped;
}

export function buildThemeWithLocalizedContent(theme: Theme) {
  return {
    ...theme,
    lessons: theme.lessons.map((lesson) => {
      const resolvedReferences = getLessonReferences(
        theme.number,
        lesson.number,
        lesson.references
      );
      const frContent =
        getLessonWebContent(lesson.texFile, -1, resolvedReferences) || lesson.content;
      const enTexFile = getEnglishTexFilePath(lesson.texFile);
      const enContent = getLessonWebContent(enTexFile, -1, resolvedReferences);
      const renderedFr = processLatex(frContent);
      const renderedEn = enContent ? processLatex(enContent) : "";
      return {
        ...lesson,
        content: frContent,
        contentFr: frContent,
        contentEn: enContent ?? "",
        renderedFr,
        renderedEn,
        references: resolvedReferences,
      };
    }),
  };
}
