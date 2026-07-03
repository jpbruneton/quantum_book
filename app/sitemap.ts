import { MetadataRoute } from "next";
import { getWebThemes } from "@/lib/chapters";
import { getExerciseThemePdfLinks } from "@/lib/exercisePdfDownloads.server";
import { themeHasExercisesFrOrEn } from "@/lib/exercisesLibrary.server";
import { lessonToPathSegment } from "@/lib/lessonRoutes";
import { sitemapEntriesForLogicalPath } from "@/lib/sitemapHelpers";
import { absoluteUrl } from "@/lib/siteUrl";

const STATIC_LOGICAL_PATHS: { path: string; priority: number; changeFrequency: "monthly" | "weekly" }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/chapters", priority: 0.9, changeFrequency: "monthly" },
  { path: "/exercises", priority: 0.75, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/glossary", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_LOGICAL_PATHS.flatMap((item) =>
    sitemapEntriesForLogicalPath(item.path, {
      priority: item.priority,
      changeFrequency: item.changeFrequency,
    })
  );

  const lessonRoutes: MetadataRoute.Sitemap = getWebThemes().flatMap((theme) =>
    theme.lessons.flatMap((lesson) => {
      const logicalPath = `/chapters/${theme.slug}/${lessonToPathSegment(lesson)}`;
      return sitemapEntriesForLogicalPath(logicalPath, {
        changeFrequency: "weekly",
        priority: 0.85,
      });
    })
  );

  const exerciseThemeRoutes: MetadataRoute.Sitemap = getWebThemes()
    .filter((theme) => themeHasExercisesFrOrEn(theme.number))
    .flatMap((theme) =>
      sitemapEntriesForLogicalPath(`/exercises/${theme.slug}`, {
        changeFrequency: "weekly",
        priority: 0.75,
      })
    );

  const exercisePdfRoutes: MetadataRoute.Sitemap = getWebThemes()
    .filter((theme) => themeHasExercisesFrOrEn(theme.number))
    .flatMap((theme) => {
      const links = getExerciseThemePdfLinks(theme.number);
      const out: MetadataRoute.Sitemap = [];
      const push = (path: string | null) => {
        if (!path) return;
        out.push({
          url: absoluteUrl(path),
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.55,
        });
      };
      push(links.frAvecSolutions);
      push(links.frSansSolutions);
      push(links.enAvecSolutions);
      push(links.enSansSolutions);
      return out;
    });

  return [
    ...staticRoutes,
    ...lessonRoutes,
    ...exerciseThemeRoutes,
    ...exercisePdfRoutes,
  ];
}
