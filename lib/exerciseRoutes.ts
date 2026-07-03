import { localizedPath, type SiteLang } from "@/lib/localeRoutes";

export function exerciseIdToSegment(exerciseId: string): string {
  return exerciseId.replace(/:/g, "-");
}

export function exerciseSegmentToId(segment: string): string {
  if (segment.startsWith("exo-")) {
    return `exo:${segment.slice(4)}`;
  }
  return segment;
}

export function exerciseDetailPath(lang: SiteLang, themeSlug: string, exerciseId: string): string {
  return localizedPath(lang, `/exercises/${themeSlug}/${exerciseIdToSegment(exerciseId)}`);
}
