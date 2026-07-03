export function exerciseIdToSegment(exerciseId: string): string {
  return exerciseId.replace(/:/g, "-");
}

export function exerciseSegmentToId(segment: string): string {
  if (segment.startsWith("exo-")) {
    return `exo:${segment.slice(4)}`;
  }
  return segment;
}

export function exerciseDetailPath(themeSlug: string, exerciseId: string): string {
  return `/exercises/${themeSlug}/${exerciseIdToSegment(exerciseId)}`;
}
