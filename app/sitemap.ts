import { MetadataRoute } from "next";
import { getWebThemes } from "@/lib/chapters";
import { getExerciseThemePdfLinks } from "@/lib/exercisePdfDownloads.server";
import { themeHasExercisesFrOrEn } from "@/lib/exercisesLibrary.server";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/chapters`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/exercises`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  // One URL per lesson: first lesson uses bare /chapters/[slug]; others use ?lesson=N (1-based index in theme.lessons).
  const themeRoutes: MetadataRoute.Sitemap = getWebThemes().flatMap((theme) => {
    if (theme.lessons.length === 0) {
      return [
        {
          url: `${SITE_URL}/chapters/${theme.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        },
      ];
    }
    return theme.lessons.map((_, lessonIndex) => ({
      url:
        lessonIndex === 0
          ? `${SITE_URL}/chapters/${theme.slug}`
          : `${SITE_URL}/chapters/${theme.slug}?lesson=${String(lessonIndex + 1)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  });

  // Pages série par thème (les ancres #exo:… ne vont pas dans le sitemap : les moteurs les ignorent en général).
  const exerciseRoutes: MetadataRoute.Sitemap = getWebThemes()
    .filter((theme) => themeHasExercisesFrOrEn(theme.number))
    .map((theme) => ({
      url: `${SITE_URL}/exercises/${theme.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    }));

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

  return [...staticRoutes, ...themeRoutes, ...exerciseRoutes, ...exercisePdfRoutes];
}
