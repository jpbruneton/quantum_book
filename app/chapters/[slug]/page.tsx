import { notFound } from "next/navigation";
import { chapters, getChapter } from "@/lib/chapters";
import { ChapterPageClient } from "./ChapterPageClient";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chapter = getChapter(params.slug);
  if (!chapter) return {};
  return {
    title: `Ch. ${chapter.number}: ${chapter.titleFr}`,
    description: chapter.description,
  };
}

export default function ChapterPage({ params }: Props) {
  const chapter = getChapter(params.slug);
  if (!chapter) notFound();

  const currentIndex = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return <ChapterPageClient chapter={chapter} prev={prev} next={next} />;
}
