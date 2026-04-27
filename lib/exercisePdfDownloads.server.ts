import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

export interface ExerciseThemePdfLinks {
  /** Fichier attendu : `exo_theme{N}_fr.pdf` (énoncés + corrigés). */
  frAvecSolutions: string | null;
  /** Fichier attendu : `exo_theme{N}_fr_sans_solutions.pdf` (énoncés seuls). */
  frSansSolutions: string | null;
  /** Fichier attendu : `exo_theme{N}_en.pdf` (traduction). */
  en: string | null;
}

function publicFilePath(fileName: string): string {
  return join(process.cwd(), "public", fileName);
}

function hrefIfExists(fileName: string): string | null {
  if (!existsSync(publicFilePath(fileName))) return null;
  return `/${fileName}`;
}

export function getExerciseThemePdfLinks(themeNumber: number): ExerciseThemePdfLinks {
  const fr = `exo_theme${themeNumber}_fr.pdf`;
  const frSans = `exo_theme${themeNumber}_fr_sans_solutions.pdf`;
  const en = `exo_theme${themeNumber}_en.pdf`;
  return {
    frAvecSolutions: hrefIfExists(fr),
    frSansSolutions: hrefIfExists(frSans),
    en: hrefIfExists(en),
  };
}
