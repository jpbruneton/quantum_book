import "server-only";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import { SUPPORTED_LANGS, type Lang } from "@/lib/i18n";
export type ExerciseIndexSource = "library" | "legacy";
export interface ExerciseIndexEntry {
  source: ExerciseIndexSource;
  id: string;
  titleTex: string;
  keywords: string[];
  themeNumber: number;
  lessonNumber: number | null;
  seoReady: boolean;
  libraryRelPath: string | undefined;
}
function texRoot() { return join(process.cwd(), "content", "tex"); }
function libraryDir(lang: Lang) { return join(texRoot(), `exos_${lang}`); }
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

interface ParsedExoBlock {
  id: string;
  titleTex: string;
  source: string;
}

function parseExoBlocksFromSource(source: string): ParsedExoBlock[] {
  const beginRe =
    /\\begin\s*\{\s*(?:exo|exercice|exercise)\s*\}\s*(?:\[([^\]]*)\])?\s*(?:\{([^}]*)\})?/gi;
  const blocks: ParsedExoBlock[] = [];
  let match: RegExpExecArray | null;
  let serial = 0;
  while ((match = beginRe.exec(source)) !== null) {
    const start = match.index;
    const titleTex = (match[1] ?? "").trim();
    const idRaw = (match[2] ?? "").trim();
    const endMarker = /\\end\s*\{\s*(?:exo|exercice|exercise)\s*\}/gi;
    endMarker.lastIndex = beginRe.lastIndex;
    const endMatch = endMarker.exec(source);
    if (!endMatch) continue;
    serial += 1;
    const id = idRaw.length > 0 ? idRaw : `legacy-block-${String(serial)}`;
    blocks.push({
      id,
      titleTex,
      source: source.slice(start, endMatch.index + endMatch[0].length),
    });
    beginRe.lastIndex = endMatch.index + endMatch[0].length;
  }
  return blocks;
}


export function listExerciseLibraryFiles(lang: Lang): string[] {
  const dir = libraryDir(lang);
  return existsSync(dir) ? readdirSync(dir).filter(name => /^exo_theme\d+\.tex$/.test(name)).sort((a,b) => a.localeCompare(b, undefined, {numeric:true})) : [];
}
export const combineThemeExerciseSources = cache((themeNumber: number, lang: Lang): string => {
  const file = join(libraryDir(lang), `exo_theme${themeNumber}.tex`);
  return existsSync(file) ? readFileSync(file, "utf8").replace(/(?<!\\)%[^\n]*/g, "") : "";
});
export const buildAllExerciseIndexEntries = cache((lang: Lang): ExerciseIndexEntry[] => {
  return listExerciseLibraryFiles(lang).flatMap(name => {
    const themeNumber = Number(name.match(/\d+/)![0]);
    const blocks = parseExoBlocksFromSource(combineThemeExerciseSources(themeNumber, lang));
    const ids = new Set<string>();
    return blocks.map(block => {
      if (ids.has(block.id)) throw new Error(`Duplicate exercise ID ${block.id} in ${name}`);
      ids.add(block.id);
      const lesson = extractCommandArg(block.source, "lecon");
      return {source: "library" as const, id: block.id, titleTex: block.titleTex,
        keywords: parseKeywordsList(extractCommandArg(block.source, "keywords") ?? ""),
        themeNumber, lessonNumber: lesson ? Number(lesson) : null,
        seoReady: extractCommandArg(block.source, "seoready") === "true",
        libraryRelPath: `exos_${lang}/${name}`};
    });
  });
});
export function themeHasAnyExercises(themeNumber: number, lang: Lang) {
  return buildAllExerciseIndexEntries(lang).some(entry => entry.themeNumber === themeNumber);
}
export function themeHasExercisesFrOrEn(themeNumber: number) {
  return SUPPORTED_LANGS.some(lang => themeHasAnyExercises(themeNumber, lang));
}
export function listThemeExerciseIds(themeNumber: number, lang?: Lang): string[] {
  return Array.from(new Set((lang ? [lang] : SUPPORTED_LANGS).flatMap(code => buildAllExerciseIndexEntries(code).filter(entry => entry.themeNumber === themeNumber).map(entry => entry.id))));
}
export function extractThemeExerciseSourceById(themeNumber: number, lang: Lang, exerciseId: string) {
  return parseExoBlocksFromSource(combineThemeExerciseSources(themeNumber, lang)).find(block => block.id === exerciseId)?.source ?? null;
}
export function findThemeExerciseEntry(themeNumber: number, exerciseId: string, lang?: Lang) {
  for (const code of lang ? [lang] : SUPPORTED_LANGS) {
    const entry = buildAllExerciseIndexEntries(code).find(entry => entry.themeNumber === themeNumber && entry.id === exerciseId);
    if (entry) return entry;
  }
  return null;
}
