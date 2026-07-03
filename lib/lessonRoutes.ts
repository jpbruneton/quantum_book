import type { Lesson } from "@/lib/chapters";
import { localizedPath, type SiteLang } from "@/lib/localeRoutes";
import { lessonRefToCanonical, lessonRefToPublic } from "@/lib/themePublicSlugs";

export function lessonToPathSegment(lesson: Lesson): string {
  if (lesson.kind === "fiche") {
    return `fiche-${String(lesson.number)}`;
  }
  return `lesson-${String(lesson.number)}`;
}

export function lessonToPublicPathSegment(lang: SiteLang, lesson: Lesson): string {
  return lessonRefToPublic(lang, lessonToPathSegment(lesson));
}

export function chapterLessonPath(lang: SiteLang, themeSlug: string, lesson: Lesson): string {
  return localizedPath(lang, `/chapters/${themeSlug}/${lessonToPathSegment(lesson)}`);
}

export function parseLessonPathSegment(
  segment: string
): { number: number; kind: "lesson" | "fiche" } | null {
  const canonical = lessonRefToCanonical(segment);
  const lessonMatch = /^lesson-(\d+)$/.exec(canonical);
  if (lessonMatch) {
    return { number: Number.parseInt(lessonMatch[1], 10), kind: "lesson" };
  }
  const ficheMatch = /^fiche-(\d+)$/.exec(canonical);
  if (ficheMatch) {
    return { number: Number.parseInt(ficheMatch[1], 10), kind: "fiche" };
  }
  return null;
}

export function findLessonIndexByRef(lessons: Lesson[], lessonRef: string): number {
  const canonicalRef = lessonRefToCanonical(lessonRef);
  for (let index = 0; index < lessons.length; index += 1) {
    if (lessonToPathSegment(lessons[index]) === canonicalRef) {
      return index;
    }
  }
  return -1;
}

export function getFirstLessonRef(lessons: Lesson[]): string | null {
  if (lessons.length === 0) {
    return null;
  }
  return lessonToPathSegment(lessons[0]);
}
