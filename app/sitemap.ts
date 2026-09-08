import type { MetadataRoute } from "next";
import { getWebThemes } from "@/lib/chapters";
import { availablePageLanguages } from "@/lib/contentAvailability.server";
import { listThemeExerciseIds } from "@/lib/exercisesLibrary.server";
import { lessonToPathSegment } from "@/lib/lessonRoutes";
import { exerciseIdToSegment } from "@/lib/exerciseRoutes";
import { sitemapEntriesForLogicalPath } from "@/lib/sitemapHelpers";
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: {path: string; priority: number}[] = [
    {path: "/", priority: 1},
    {path: "/chapters", priority: 0.8},
    {path: "/exercises", priority: 0.8},
    {path: "/glossary", priority: 0.8},
    {path: "/about", priority: 0.6},
  ];
  for (const theme of getWebThemes()) {
    for (const lesson of theme.lessons) entries.push({path: `/chapters/${theme.slug}/${lessonToPathSegment(lesson)}`, priority: 0.7});
    entries.push({path: `/exercises/${theme.slug}`, priority: 0.7});
    for (const id of listThemeExerciseIds(theme.number)) entries.push({path: `/exercises/${theme.slug}/${exerciseIdToSegment(id)}`, priority: 0.6});
  }
  return entries.flatMap(({path, priority}) => sitemapEntriesForLogicalPath(path, {changeFrequency: "weekly", priority}, availablePageLanguages(path)));
}
