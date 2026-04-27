import "server-only";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
export type ExerciseIndexSource = "library" | "legacy";

export interface ExerciseIndexEntry {
  source: ExerciseIndexSource;
  /** Stable id: optional brace after \\begin{exo} (ou exercice), ou clé legacy. */
  id: string;
  /** Titre entre crochets après \\begin{exo}[...] (TeX brut). */
  titleTex: string;
  keywords: string[];
  themeNumber: number;
  /** Relative path under content/tex for library files (undefined for legacy). */
  libraryRelPath: string | undefined;
}

function texRoot(): string {
  return join(process.cwd(), "content", "tex");
}

function libraryDir(lang: "fr" | "en"): string {
  return join(texRoot(), lang === "fr" ? "exercises_library_fr" : "exercises_library_en");
}

function readBalancedArg(input: string, openBraceIndex: number): { content: string; endIndex: number } | null {
  if (input[openBraceIndex] !== "{") return null;
  let depth = 1;
  let cursor = openBraceIndex + 1;
  let content = "";
  while (cursor < input.length && depth > 0) {
    const char = input[cursor];
    const previous = cursor > 0 ? input[cursor - 1] : "";
    if (char === "{" && previous !== "\\") {
      depth += 1;
      content += char;
    } else if (char === "}" && previous !== "\\") {
      depth -= 1;
      if (depth > 0) content += char;
    } else {
      content += char;
    }
    cursor += 1;
  }
  if (depth !== 0) return null;
  return { content, endIndex: cursor };
}

function extractCommandArg(source: string, command: string): string | null {
  const marker = `\\${command}`;
  let index = 0;
  while (index < source.length) {
    const start = source.indexOf(marker, index);
    if (start === -1) return null;
    let cursor = start + marker.length;
    while (cursor < source.length && /\s/.test(source[cursor])) cursor += 1;
    if (source[cursor] !== "{") {
      index = cursor;
      continue;
    }
    const block = readBalancedArg(source, cursor);
    if (!block) return null;
    return block.content.trim();
  }
  return null;
}

function parseKeywordsList(raw: string): string[] {
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k.length > 0);
}

export function parseThemeNumberFromSource(source: string): number | null {
  const arg = extractCommandArg(source, "theme");
  if (!arg) return null;
  const n = Number.parseInt(arg.replace(/\s+/g, ""), 10);
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
}

export function listExerciseLibraryFiles(lang: "fr" | "en"): string[] {
  const dir = libraryDir(lang);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => /^exercices.*\.tex$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

export function parseFirstExerciceHeader(source: string): { titleTex: string; id: string | null } {
  const re =
    /\\begin\s*\{\s*(?:exo|exercice|exercise)\s*\}\s*(?:\[([^\]]*)\])?\s*(?:\{([^}]*)\})?/i;
  const m = re.exec(source);
  if (!m) return { titleTex: "", id: null };
  const titleTex = (m[1] ?? "").trim();
  const id = (m[2] ?? "").trim();
  return { titleTex, id: id.length > 0 ? id : null };
}

export function buildLibraryIndexEntries(lang: "fr" | "en"): ExerciseIndexEntry[] {
  const dir = libraryDir(lang);
  const names = listExerciseLibraryFiles(lang);
  const entries: ExerciseIndexEntry[] = [];
  for (const name of names) {
    const full = join(dir, name);
    let source: string;
    try {
      source = readFileSync(full, "utf-8");
    } catch {
      continue;
    }
    const themeNumber = parseThemeNumberFromSource(source);
    if (themeNumber === null) continue;
    const kwRaw = extractCommandArg(source, "keywords");
    const keywords = kwRaw ? parseKeywordsList(kwRaw) : [];
    const header = parseFirstExerciceHeader(source);
    const baseId = header.id ?? name.replace(/\.tex$/i, "");
    entries.push({
      source: "library",
      id: baseId,
      titleTex: header.titleTex,
      keywords,
      themeNumber,
      libraryRelPath: `${lang === "fr" ? "exercises_library_fr" : "exercises_library_en"}/${name}`,
    });
  }
  return entries;
}

export function buildLegacyExoIndexEntries(themeNumber: number, lang: "fr" | "en"): ExerciseIndexEntry[] {
  const folder = `theme${themeNumber}_${lang}`;
  const full = join(texRoot(), folder, "exo.tex");
  if (!existsSync(full)) return [];
  const source = readFileSync(full, "utf-8");
  const re =
    /\\begin\s*\{\s*(?:exo|exercice|exercise)\s*\}\s*(?:\[([^\]]*)\])?\s*(?:\{([^}]*)\})?/gi;
  const entries: ExerciseIndexEntry[] = [];
  let match: RegExpExecArray | null;
  let serial = 0;
  while ((match = re.exec(source)) !== null) {
    serial += 1;
    const titleTex = (match[1] ?? "").trim();
    const idRaw = (match[2] ?? "").trim();
    entries.push({
      source: "legacy",
      id: idRaw.length > 0 ? idRaw : `legacy-${themeNumber}-${serial}`,
      titleTex,
      keywords: [],
      themeNumber,
      libraryRelPath: undefined,
    });
  }
  return entries;
}

function compareLibraryEntriesByPath(a: ExerciseIndexEntry, b: ExerciseIndexEntry): number {
  const pa = a.libraryRelPath ?? "";
  const pb = b.libraryRelPath ?? "";
  return pa.localeCompare(pb, undefined, { numeric: true, sensitivity: "base" });
}

/**
 * Ordre d'affichage et de numérotation globale : pour chaque thème (1…20),
 * d'abord les exercices du fichier legacy exo.tex s'il existe, puis les fiches
 * bibliothèque de ce thème (tri par nom de fichier).
 */
export function buildAllExerciseIndexEntries(lang: "fr" | "en"): ExerciseIndexEntry[] {
  const libraryAll = buildLibraryIndexEntries(lang);
  const libraryByTheme = new Map<number, ExerciseIndexEntry[]>();
  for (const e of libraryAll) {
    const list = libraryByTheme.get(e.themeNumber);
    if (list) list.push(e);
    else libraryByTheme.set(e.themeNumber, [e]);
  }
  for (const list of Array.from(libraryByTheme.values())) {
    list.sort(compareLibraryEntriesByPath);
  }
  const out: ExerciseIndexEntry[] = [];
  for (let theme = 1; theme <= 20; theme += 1) {
    for (const e of buildLegacyExoIndexEntries(theme, lang)) {
      out.push(e);
    }
    const libs = libraryByTheme.get(theme);
    if (libs) {
      for (const e of libs) {
        out.push(e);
      }
    }
  }
  return out;
}

export function combineThemeExerciseSources(themeNumber: number, lang: "fr" | "en"): string {
  const parts: string[] = [];
  const legacyPath = join(texRoot(), `theme${themeNumber}_${lang}`, "exo.tex");
  if (existsSync(legacyPath)) {
    parts.push(readFileSync(legacyPath, "utf-8"));
  }
  const libNames = listExerciseLibraryFiles(lang);
  for (const name of libNames) {
    const full = join(libraryDir(lang), name);
    const source = readFileSync(full, "utf-8");
    const t = parseThemeNumberFromSource(source);
    if (t === themeNumber) {
      parts.push(source);
    }
  }
  return parts.join("\n\n");
}

export function themeHasAnyExercises(themeNumber: number, lang: "fr" | "en"): boolean {
  const legacyPath = join(texRoot(), `theme${themeNumber}_${lang}`, "exo.tex");
  if (existsSync(legacyPath)) return true;
  const libNames = listExerciseLibraryFiles(lang);
  for (const name of libNames) {
    const full = join(libraryDir(lang), name);
    const source = readFileSync(full, "utf-8");
    if (parseThemeNumberFromSource(source) === themeNumber) return true;
  }
  return false;
}

export function themeHasExercisesFrOrEn(themeNumber: number): boolean {
  return themeHasAnyExercises(themeNumber, "fr") || themeHasAnyExercises(themeNumber, "en");
}
