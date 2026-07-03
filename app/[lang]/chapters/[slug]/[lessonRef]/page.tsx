import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getWebTheme, getWebThemes } from "@/lib/chapters";
import { buildThemeWithLocalizedContent } from "@/lib/chapterPage.server";
import {
  findLessonIndexByRef,
  lessonToPathSegment,
} from "@/lib/lessonRoutes";
import { localeAlternates } from "@/lib/metadataAlternates";
import { isSiteLang, localizedPath, SITE_LANGS } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";
import { ChapterPageClient } from "../ChapterPageClient";

interface Props {
  params: { lang: string; slug: string; lessonRef: string };
}

export function generateStaticParams() {
  return SITE_LANGS.flatMap((lang) =>
    getWebThemes().flatMap((theme) =>
      theme.lessons.map((lesson) => ({
        lang,
        slug: theme.slug,
        lessonRef: lessonToPathSegment(lesson),
      }))
    )
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isSiteLang(params.lang)) return {};
  const theme = getWebTheme(params.slug);
  if (!theme) return {};
  const lessonIndex = findLessonIndexByRef(theme.lessons, params.lessonRef);
  if (lessonIndex < 0) return {};
  const lesson = theme.lessons[lessonIndex];
  const path = localizedPath(params.lang, `/chapters/${theme.slug}/${params.lessonRef}`);
  const url = absoluteUrl(path);
  const isFr = params.lang === "fr";
  const label = lesson.kind === "fiche"
    ? isFr
      ? `Fiche ${lesson.number}: ${lesson.subtitleFr}`
      : `Sheet ${lesson.number}: ${lesson.subtitleEn}`
    : isFr
      ? `Leçon ${lesson.number}: ${lesson.subtitleFr}`
      : `Lesson ${lesson.number}: ${lesson.subtitleEn}`;
  const description = isFr
    ? lesson.descriptionFr || theme.descriptionFr
    : lesson.descriptionEn || theme.descriptionEn;
  const keywords = isFr ? lesson.topicsFr.slice(0, 15) : lesson.topicsEn.slice(0, 15);
  return {
    title: `${isFr ? "Thème" : "Theme"} ${theme.number}, ${label}`,
    description,
    keywords,
    alternates: localeAlternates(params.lang, `/chapters/${theme.slug}/${params.lessonRef}`),
    openGraph: {
      type: "article",
      title: `${isFr ? "Thème" : "Theme"} ${theme.number}, ${label}`,
      description,
      url,
    },
  };
}

export default function ChapterLessonPage({ params }: Props) {
  if (!isSiteLang(params.lang)) notFound();
  const theme = getWebTheme(params.slug);
  if (!theme) notFound();

  const lessonIndex = findLessonIndexByRef(theme.lessons, params.lessonRef);
  if (lessonIndex < 0) notFound();

  const themeWithDynamicContent = buildThemeWithLocalizedContent(theme);
  const webThemes = getWebThemes();
  const currentIndex = webThemes.findIndex((item) => item.slug === theme.slug);
  const prev = currentIndex > 0 ? webThemes[currentIndex - 1] : null;
  const next =
    currentIndex < webThemes.length - 1 ? webThemes[currentIndex + 1] : null;

  return (
    <ChapterPageClient
      theme={themeWithDynamicContent}
      prev={prev}
      next={next}
      activeLessonRef={params.lessonRef}
    />
  );
}
