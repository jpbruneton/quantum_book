import { notFound } from "next/navigation";
import { getWebTheme, getWebThemes } from "@/lib/chapters";
import { ChapterPageClient } from "./ChapterPageClient";
import type { Metadata } from "next";
import { getLessonReferences, getLessonWebContent } from "@/lib/chapterContent.server";
import { processLatex } from "@/lib/latex";
import { absoluteUrl } from "@/lib/siteUrl";

interface Props {
  params: { slug: string };
}

function getEnglishTexFilePath(frTexFile: string): string {
  const lessonMapped = frTexFile.replace(/_fr\/lecon(\d+)\.tex$/, "_en/lesson$1.tex");
  if (lessonMapped !== frTexFile) return lessonMapped;
  const ficheMapped = frTexFile.replace(/_fr\/(fiche\d+)\.tex$/, "_en/$1.tex");
  return ficheMapped;
}

export async function generateStaticParams() {
  return getWebThemes().map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const theme = getWebTheme(params.slug);
  if (!theme) return {};
  const keywords = theme.lessons.flatMap((l) => l.topicsEn).slice(0, 15);
  const url = absoluteUrl(`/chapters/${theme.slug}`);
  return {
    title: `Theme ${theme.number}: ${theme.titleEn}`,
    description: theme.descriptionEn,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `Theme ${theme.number}: ${theme.titleEn}`,
      description: theme.descriptionEn,
      url,
    },
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
      const enContent = getLessonWebContent(enTexFile, -1, resolvedReferences);
      const renderedFr = processLatex(frContent);
      const renderedEn = enContent ? processLatex(enContent) : "";
      return {
        ...lesson,
        content: frContent,
        contentFr: frContent,
        contentEn: enContent ?? "",
        renderedFr,
        renderedEn,
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
