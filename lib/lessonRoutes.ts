import type { Lesson } from "@/lib/chapters";

export function lessonToPathSegment(lesson: Lesson): string {
  if (lesson.kind === "fiche") {
    return `fiche-${String(lesson.number)}`;
  }
  return `lesson-${String(lesson.number)}`;
}

export function chapterLessonPath(themeSlug: string, lesson: Lesson): string {
  return `/chapters/${themeSlug}/${lessonToPathSegment(lesson)}`;
}

export function parseLessonPathSegment(
  segment: string
): { number: number; kind: "lesson" | "fiche" } | null {
  const lessonMatch = /^lesson-(\d+)$/.exec(segment);
  if (lessonMatch) {
    return { number: Number.parseInt(lessonMatch[1], 10), kind: "lesson" };
  }
  const ficheMatch = /^fiche-(\d+)$/.exec(segment);
  if (ficheMatch) {
    return { number: Number.parseInt(ficheMatch[1], 10), kind: "fiche" };
  }
  return null;
}

export function findLessonIndexByRef(lessons: Lesson[], lessonRef: string): number {
  for (let index = 0; index < lessons.length; index += 1) {
    if (lessonToPathSegment(lessons[index]) === lessonRef) {
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
