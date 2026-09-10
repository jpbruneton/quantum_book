import "server-only";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { SiteLang } from "@/lib/localeRoutes";
import { isLessonPublished } from "@/lib/publication";

/** Maps a French source path to the same lesson authored in `lang`. */
export function getTexFilePathForLang(frTexFile: string, lang: SiteLang): string {
  if (lang === "fr") return frTexFile;
  const lessonMapped = frTexFile.replace(/_fr\/lecon(\d+)\.tex$/, `_${lang}/lesson$1.tex`);
  if (lessonMapped !== frTexFile) return lessonMapped;
  return frTexFile.replace(/_fr\/(fiche\d+)\.tex$/, `_${lang}/$1.tex`);
}

/** True only when `lang` has an authored, non-empty lesson body on disk. */
export function hasLessonWebContent(frTexFile: string, lang: SiteLang): boolean {
  if (!frTexFile || !isLessonPublished(frTexFile, lang)) return false;
  const texPath = join(process.cwd(), "content", "tex", getTexFilePathForLang(frTexFile, lang));
  if (!existsSync(texPath)) return false;
  try {
    return readFileSync(texPath, "utf-8").replace(/(?<!\\)%[^\n]*/g, "").trim().length > 0;
  } catch {
    return false;
  }
}
