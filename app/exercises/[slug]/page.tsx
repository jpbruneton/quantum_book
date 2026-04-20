import { existsSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWebTheme, getWebThemes, bookMeta } from "@/lib/chapters";
import { getLessonWebContent } from "@/lib/chapterContent.server";
import { absoluteUrl } from "@/lib/siteUrl";
import { ExerciseThemeClient } from "./ExerciseThemeClient";

interface Props {
  params: { slug: string };
}

function hasExoTex(themeNumber: number): boolean {
  const frPath = join(process.cwd(), "content", "tex", `theme${themeNumber}_fr`, "exo.tex");
  const enPath = join(process.cwd(), "content", "tex", `theme${themeNumber}_en`, "exo.tex");
  return existsSync(frPath) || existsSync(enPath);
}

export function generateStaticParams() {
  return getWebThemes()
    .filter((theme) => hasExoTex(theme.number))
    .map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const theme = getWebTheme(params.slug);
  if (!theme) return {};
  const url = absoluteUrl(`/exercises/${theme.slug}`);
  return {
    title: `Exercises – Theme ${theme.number}: ${theme.titleEn} | ${bookMeta.title}`,
    description: `Solved exercises for Theme ${theme.number}: ${theme.titleEn} — ${theme.descriptionEn}`,
    alternates: { canonical: url },
    openGraph: {
      title: `Exercises – Theme ${theme.number}: ${theme.titleEn}`,
      description: theme.descriptionEn,
      url,
    },
  };
}

export default function ExerciseThemePage({ params }: Props) {
  const theme = getWebTheme(params.slug);
  if (!theme) notFound();

  const contentFr = getLessonWebContent(`theme${theme.number}_fr/exo.tex`, -1, []);
  const contentEn = getLessonWebContent(`theme${theme.number}_en/exo.tex`, -1, []);

  if (!contentFr && !contentEn) notFound();

  return (
    <ExerciseThemeClient
      number={theme.number}
      titleFr={theme.titleFr}
      titleEn={theme.titleEn}
      contentFr={contentFr}
      contentEn={contentEn}
    />
  );
}
