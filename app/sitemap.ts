import type { MetadataRoute } from "next";
import { getWebThemes } from "@/lib/chapters";
import { availablePageLanguages } from "@/lib/contentAvailability.server";
import { listThemeExerciseIds } from "@/lib/exercisesLibrary.server";
import { lessonToPathSegment } from "@/lib/lessonRoutes";
import { exerciseIdToSegment } from "@/lib/exerciseRoutes";
import { sitemapEntriesForLogicalPath } from "@/lib/sitemapHelpers";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/chapters", "/about", "/glossary", "/exercises"];
  for (const theme of getWebThemes()) {
    for (const lesson of theme.lessons) paths.push(`/chapters/${theme.slug}/${lessonToPathSegment(lesson)}`);
    paths.push(`/exercises/${theme.slug}`);
    for (const id of listThemeExerciseIds(theme.number)) paths.push(`/exercises/${theme.slug}/${exerciseIdToSegment(id)}`);
  }
  return paths.flatMap(path => sitemapEntriesForLogicalPath(path, {changeFrequency: "weekly", priority: path === "/" ? 1 : 0.75}, availablePageLanguages(path)));
}
