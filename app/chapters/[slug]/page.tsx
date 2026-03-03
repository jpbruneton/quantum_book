import { notFound } from "next/navigation";
import { getWebTheme, getWebThemes } from "@/lib/chapters";
import { ChapterPageClient } from "./ChapterPageClient";
import type { Metadata } from "next";
import { getLessonReferences, getLessonWebContent } from "@/lib/chapterContent.server";

interface Props {
  params: { slug: string };
}

function getEnglishTexFilePath(frTexFile: string): string {
  const mapped = frTexFile.replace(/_fr\/lecon(\d+)\.tex$/, "_en/lesson$1.tex");
  return mapped || frTexFile;
}

export async function generateStaticParams() {
  return getWebThemes().map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const theme = getWebTheme(params.slug);
  if (!theme) return {};
  return {
    title: `Theme ${theme.number}: ${theme.titleEn}`,
    description: theme.descriptionEn,
  };
}

export default function ChapterPage({ params }: Props) {
  const theme = getWebTheme(params.slug);
  if (!theme) notFound();

  const themeWithDynamicContent = {
    ...theme,
    lessons: theme.lessons.map((lesson) => {
      const resolvedReferences = getLessonReferences(theme.number, lesson.number, lesson.references);
      const frContent = getLessonWebContent(lesson.texFile, -1, resolvedReferences) || lesson.content;
      const enTexFile = getEnglishTexFilePath(lesson.texFile);
      const enContent = getLessonWebContent(enTexFile, -1, resolvedReferences) || frContent;
      return {
        ...lesson,
        content: frContent,
        contentFr: frContent,
        contentEn: enContent,
        references: resolvedReferences,
      };
    }),
  };

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
    />
  );
}
