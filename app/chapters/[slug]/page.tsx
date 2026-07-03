import { notFound, redirect } from "next/navigation";
import { getWebTheme } from "@/lib/chapters";
import { getFirstLessonRef } from "@/lib/lessonRoutes";

interface Props {
  params: { slug: string };
}

export default function ChapterThemeRedirectPage({ params }: Props) {
  const theme = getWebTheme(params.slug);
  if (!theme) notFound();
  const firstLessonRef = getFirstLessonRef(theme.lessons);
  if (!firstLessonRef) notFound();
  redirect(`/chapters/${params.slug}/${firstLessonRef}`);
}
