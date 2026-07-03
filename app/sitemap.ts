import { MetadataRoute } from "next";
import { getWebThemes } from "@/lib/chapters";
import { getExerciseThemePdfLinks } from "@/lib/exercisePdfDownloads.server";
import {
  listThemeExerciseIds,
  themeHasExercisesFrOrEn,
} from "@/lib/exercisesLibrary.server";
import { exerciseDetailPath } from "@/lib/exerciseRoutes";
import { chapterLessonPath } from "@/lib/lessonRoutes";
import { localizedPath, SITE_LANGS } from "@/lib/localeRoutes";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

const SITE_URL = getSiteUrl();

function localizedStaticRoutes(): MetadataRoute.Sitemap {
  const paths = ["/", "/chapters", "/exercises", "/about", "/glossary"];
  return SITE_LANGS.flatMap((lang) =>
    paths.map((path) => ({
      url: absoluteUrl(localizedPath(lang, path)),
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("monthly" as const) : path === "/exercises" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/chapters" ? 0.9 : path === "/exercises" ? 0.75 : 0.6,
      alternates: {
        languages: {
          en: absoluteUrl(localizedPath("en", path)),
          fr: absoluteUrl(localizedPath("fr", path)),
          "x-default": absoluteUrl(localizedPath("en", path)),
        },
      },
    }))
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lessonRoutes: MetadataRoute.Sitemap = SITE_LANGS.flatMap((lang) =>
    getWebThemes().flatMap((theme) =>
      theme.lessons.map((lesson) => ({
          url: absoluteUrl(chapterLessonPath(lang, theme.slug, lesson)),
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.85,
          alternates: {
            languages: {
              en: absoluteUrl(chapterLessonPath("en", theme.slug, lesson)),
              fr: absoluteUrl(chapterLessonPath("fr", theme.slug, lesson)),
              "x-default": absoluteUrl(chapterLessonPath("en", theme.slug, lesson)),
            },
          },
        }))
    )
  );

  const exerciseThemeRoutes: MetadataRoute.Sitemap = SITE_LANGS.flatMap((lang) =>
    getWebThemes()
      .filter((theme) => themeHasExercisesFrOrEn(theme.number))
      .map((theme) => ({
        url: absoluteUrl(localizedPath(lang, `/exercises/${theme.slug}`)),
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.75,
        alternates: {
          languages: {
            en: absoluteUrl(localizedPath("en", `/exercises/${theme.slug}`)),
            fr: absoluteUrl(localizedPath("fr", `/exercises/${theme.slug}`)),
            "x-default": absoluteUrl(localizedPath("en", `/exercises/${theme.slug}`)),
          },
        },
      }))
  );

  const exerciseDetailRoutes: MetadataRoute.Sitemap = SITE_LANGS.flatMap((lang) =>
    getWebThemes()
      .filter((theme) => themeHasExercisesFrOrEn(theme.number))
      .flatMap((theme) =>
        listThemeExerciseIds(theme.number).map((exerciseId) => ({
          url: absoluteUrl(exerciseDetailPath(lang, theme.slug, exerciseId)),
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
          alternates: {
            languages: {
              en: absoluteUrl(exerciseDetailPath("en", theme.slug, exerciseId)),
              fr: absoluteUrl(exerciseDetailPath("fr", theme.slug, exerciseId)),
              "x-default": absoluteUrl(exerciseDetailPath("en", theme.slug, exerciseId)),
            },
          },
        }))
      )
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
    ...localizedStaticRoutes(),
    ...lessonRoutes,
    ...exerciseThemeRoutes,
    ...exerciseDetailRoutes,
    ...exercisePdfRoutes,
  ];
}
