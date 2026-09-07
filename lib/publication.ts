import type { Lang } from "@/lib/i18n";

/** Temporarily withdrawn by the author; the source remains in the private repository. */
export function isLessonPublished(texFile: string, lang: Lang): boolean {
  return !(lang === "fr" && texFile === "theme1_fr/lecon2.tex");
}
