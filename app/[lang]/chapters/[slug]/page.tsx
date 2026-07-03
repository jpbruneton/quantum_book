import { notFound, redirect } from "next/navigation";
import { getWebTheme } from "@/lib/chapters";
import { getFirstLessonRef } from "@/lib/lessonRoutes";
import { isSiteLang, localizedPath } from "@/lib/localeRoutes";

interface Props {
  params: { lang: string; slug: string };
}

export default function ChapterThemeRedirectPage({ params }: Props) {
  if (!isSiteLang(params.lang)) notFound();
  const theme = getWebTheme(params.slug);
  if (!theme) notFound();
  const firstLessonRef = getFirstLessonRef(theme.lessons);
  if (!firstLessonRef) notFound();
  redirect(localizedPath(params.lang, `/chapters/${params.slug}/${firstLessonRef}`));
}
