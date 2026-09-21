import type { Lang } from "@/lib/i18n";

/** Temporarily withdrawn by the author; the source remains in the private repository. */
export function isLessonPublished(texFile: string, lang: Lang): boolean {
  if (lang !== "fr") return true;
  if (texFile === "theme1_fr/lecon2.tex") return false;
  const theme3Lesson = /^theme3_fr\/lecon(\d+)\.tex$/.exec(texFile);
  return !theme3Lesson || Number(theme3Lesson[1]) <= 8;
}
