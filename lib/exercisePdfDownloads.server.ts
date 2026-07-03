import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export interface ExerciseThemePdfLinks {
  /** Fichier attendu : `public/pdfs/exo_theme{N}_fr.pdf` (énoncés, indications, solutions). */
  fr: string | null;
  /** Fichier attendu : `public/pdfs/exo_theme{N}_en.pdf` (statements, hints, solutions). */
  en: string | null;
}

function publicFilePath(relativeUnderPublic: string): string {
  return join(process.cwd(), "public", ...relativeUnderPublic.split("/"));
}

function hrefIfExists(relativeUnderPublic: string): string | null {
  if (!existsSync(publicFilePath(relativeUnderPublic))) return null;
  return `/${relativeUnderPublic}`;
}

export function getExerciseThemePdfLinks(themeNumber: number): ExerciseThemePdfLinks {
  return {
    fr: hrefIfExists(`pdfs/exo_theme${themeNumber}_fr.pdf`),
    en: hrefIfExists(`pdfs/exo_theme${themeNumber}_en.pdf`),
  };
}
