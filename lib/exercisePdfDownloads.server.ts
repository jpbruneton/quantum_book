import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export interface ExerciseThemePdfLinks {
  /** Fichier attendu : `public/pdfs/exo_theme{N}_fr.pdf` (énoncés + corrigés). */
  frAvecSolutions: string | null;
  /** Fichier attendu : `public/pdfs/exo_theme{N}_fr_sans_solutions.pdf` (énoncés seuls). */
  frSansSolutions: string | null;
  /** Fichier attendu : `public/pdfs/exo_theme{N}_en.pdf` (traduction). */
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
  const fr = `pdfs/exo_theme${themeNumber}_fr.pdf`;
  const frSans = `pdfs/exo_theme${themeNumber}_fr_sans_solutions.pdf`;
  const en = `pdfs/exo_theme${themeNumber}_en.pdf`;
  return {
    frAvecSolutions: hrefIfExists(fr),
    frSansSolutions: hrefIfExists(frSans),
    en: hrefIfExists(en),
  };
}
