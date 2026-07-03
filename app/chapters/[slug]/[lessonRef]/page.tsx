import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getWebTheme, getWebThemes } from "@/lib/chapters";
import { buildThemeWithLocalizedContent } from "@/lib/chapterPage.server";
import {
  findLessonIndexByRef,
  getFirstLessonRef,
  lessonToPathSegment,
} from "@/lib/lessonRoutes";
import { absoluteUrl } from "@/lib/siteUrl";
import { ChapterPageClient } from "../ChapterPageClient";

interface Props {
  params: { slug: string; lessonRef: string };
}

export function generateStaticParams() {
  return getWebThemes().flatMap((theme) =>
    theme.lessons.map((lesson) => ({
      slug: theme.slug,
      lessonRef: lessonToPathSegment(lesson),
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const theme = getWebTheme(params.slug);
  if (!theme) return {};
  const lessonIndex = findLessonIndexByRef(theme.lessons, params.lessonRef);
  if (lessonIndex < 0) return {};
  const lesson = theme.lessons[lessonIndex];
  const path = `/chapters/${theme.slug}/${params.lessonRef}`;
  const url = absoluteUrl(path);
  const label =
    lesson.kind === "fiche"
      ? `Sheet ${lesson.number}: ${lesson.subtitleEn}`
      : `Lesson ${lesson.number}: ${lesson.subtitleEn}`;
  return {
    title: `Theme ${theme.number}, ${label}`,
    description: lesson.descriptionEn || theme.descriptionEn,
    keywords: lesson.topicsEn.slice(0, 15),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `Theme ${theme.number}, ${label}`,
      description: lesson.descriptionEn || theme.descriptionEn,
      url,
    },
  };
}

export default function ChapterLessonPage({ params }: Props) {
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
