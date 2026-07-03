import legacyExerciseSlugRedirects from "@/lib/legacyExerciseSlugRedirects.json";
import type { SiteLang } from "@/lib/localeRoutes";

const frToCanonicalThemeSlug = legacyExerciseSlugRedirects as Record<string, string>;

const canonicalToFrThemeSlug: Record<string, string> = {};
for (const [frSlug, canonicalSlug] of Object.entries(frToCanonicalThemeSlug)) {
  canonicalToFrThemeSlug[canonicalSlug] = frSlug;
}

export function themeSlugToCanonical(publicOrCanonicalSlug: string): string {
  return frToCanonicalThemeSlug[publicOrCanonicalSlug] ?? publicOrCanonicalSlug;
}

export function themeSlugToPublic(lang: SiteLang, canonicalSlug: string): string {
  if (lang === "fr" && canonicalToFrThemeSlug[canonicalSlug]) {
    return canonicalToFrThemeSlug[canonicalSlug];
  }
  return canonicalSlug;
}

export function lessonRefToCanonical(segment: string): string {
  const leconMatch = /^lecon-(\d+)$/.exec(segment);
  if (leconMatch) {
    return `lesson-${leconMatch[1]}`;
  }
  return segment;
}

export function lessonRefToPublic(lang: SiteLang, canonicalRef: string): string {
  if (lang === "fr") {
    const lessonMatch = /^lesson-(\d+)$/.exec(canonicalRef);
    if (lessonMatch) {
      return `lecon-${lessonMatch[1]}`;
    }
  }
  return canonicalRef;
}

export function canonicalizeChapterExercisePath(parts: string[]): string[] {
  if (parts.length === 0) {
    return parts;
  }
  const section = parts[0];
  if (section !== "chapters" && section !== "exercises") {
    return parts;
  }
  const out = [...parts];
  if (out.length >= 2) {
    out[1] = themeSlugToCanonical(out[1]);
  }
  if (section === "chapters" && out.length >= 3) {
    out[2] = lessonRefToCanonical(out[2]);
  }
  return out;
}

export function localizeChapterExercisePath(parts: string[], lang: SiteLang): string[] {
  if (parts.length === 0) {
    return parts;
  }
  const section = parts[0];
  if (section !== "chapters" && section !== "exercises") {
    return parts;
  }
  const out = [...parts];
  if (out.length >= 2) {
    out[1] = themeSlugToPublic(lang, out[1]);
  }
  if (section === "chapters" && out.length >= 3) {
    out[2] = lessonRefToPublic(lang, out[2]);
  }
  return out;
}
