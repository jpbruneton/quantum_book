import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWebTheme, getWebThemes } from "@/lib/localizedChapters.server";
import { bookMeta } from "@/lib/chapters";
import { buildThemeWithLocalizedContent, hasLessonWebContent } from "@/lib/chapterPage.server";
import { findLessonIndexByRef, lessonDisplayLabel, lessonToPathSegment } from "@/lib/lessonRoutes";
import { localeAlternates } from "@/lib/metadataAlternates";
import { isSiteLang, localizedPath, SITE_LANGS } from "@/lib/localeRoutes";
import { absoluteUrl } from "@/lib/siteUrl";
import { getTranslations } from "@/lib/translations.server";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/app/components/JsonLd";
import { ChapterPageClient } from "../ChapterPageClient";
interface Props { params: {lang: string; slug: string; lessonRef: string} }
export function generateStaticParams() {
  return SITE_LANGS.flatMap(lang => getWebThemes(lang).flatMap(theme => theme.lessons.map(lesson => ({lang, slug: theme.slug, lessonRef: lessonToPathSegment(lesson)}))));
}
function resolvePage(params: Props["params"]) {
  if (!isSiteLang(params.lang)) notFound();
  const lang = params.lang;
  const theme = getWebTheme(params.slug, lang);
  if (!theme) notFound();
  const index = findLessonIndexByRef(theme.lessons, params.lessonRef);
  if (index < 0) notFound();
  const lesson = theme.lessons[index];
  const t = getTranslations(lang);
  const title = `${t.common.theme} ${theme.number}, ${lessonDisplayLabel(lesson, lang)}`;
  const path = `/chapters/${theme.slug}/${lessonToPathSegment(lesson)}`;
  return {lang, theme, index, lesson, t, title, path};
}
export function generateMetadata({params}: Props): Metadata {
  const {lang, theme, lesson, title, path} = resolvePage(params);
  const description = lesson.descriptionFr || theme.descriptionFr;
  return {title, description, keywords: lesson.topicsFr.slice(0, 15),
    robots: {index: hasLessonWebContent(lesson.texFile, lang), follow: true}, alternates: localeAlternates(lang, path),
    openGraph: {type: "article", title, description, url: absoluteUrl(localizedPath(lang, path))},
  };
}
export default function ChapterLessonPage({params}: Props) {
  const {lang, theme, index, lesson, t, title, path} = resolvePage(params);
  const webThemes = getWebThemes(lang);
  const position = webThemes.findIndex(item => item.slug === theme.slug);
  const url = absoluteUrl(localizedPath(lang, path));
  const jsonLd = [
    breadcrumbListJsonLd(lang, [
      {name: t.nav.home, logicalPath: "/"},
      {name: t.nav.chapters, logicalPath: "/chapters"},
      {name: title, logicalPath: path},
    ]),
    {"@context": "https://schema.org", "@type": "Course", name: title,
      description: lesson.descriptionFr || theme.descriptionFr, url, inLanguage: lang,
      provider: {"@type": "Organization", name: bookMeta.affiliation},
    },
  ];
  return <>
    {hasLessonWebContent(lesson.texFile, lang) && <JsonLd data={jsonLd} />}
    <ChapterPageClient theme={buildThemeWithLocalizedContent(theme, lang, index)} prev={webThemes[position - 1] ?? null} next={webThemes[position + 1] ?? null} activeLessonRef={lessonToPathSegment(lesson)} />
  </>;
}
