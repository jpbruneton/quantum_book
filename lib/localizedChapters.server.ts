import "server-only";
import { getWebThemes as getSourceThemes, type Theme } from "@/lib/chapters";
import { getThemeCopy, getLessonCopy } from "@/lib/catalog";
import { themeSlugToCanonical } from "@/lib/themePublicSlugs";
import type { Lang } from "@/lib/i18n";

export function getWebThemes(lang?: Lang): Theme[] {
  if (!lang) return getSourceThemes();
  return getSourceThemes(lang).map(theme => {
    const copy = getThemeCopy(theme.slug, lang);
    return {...theme,
      titleFr: copy.title, titleEn: copy.title, descriptionFr: copy.description,
      descriptionEn: copy.description, partHeadingFr: copy.partHeading, partHeadingEn: copy.partHeading,
      lessons: theme.lessons.map(lesson => {
        const text = getLessonCopy(theme.slug, lesson.slug, lang)!;
        return {...lesson, content: "", titleFr: text.title, titleEn: text.title,
          subtitleFr: text.subtitle, subtitleEn: text.subtitle, descriptionFr: text.description,
          descriptionEn: text.description, topicsFr: text.topics, topicsEn: text.topics};
      }),
    };
  });
}

export function getWebTheme(slug: string, lang?: Lang) {
  return getWebThemes(lang).find(theme => theme.slug === themeSlugToCanonical(slug));
}
