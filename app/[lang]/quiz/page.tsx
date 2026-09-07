import { getTranslations } from "@/lib/translations.server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWebThemes } from "@/lib/localizedChapters.server";

import { isSiteLang, localizedPath } from "@/lib/localeRoutes";
import { lessonToPathSegment } from "@/lib/lessonRoutes";
import { getLocalizedQuizQuestions } from "@/lib/quizzes";
import { getQuizTranslations } from "@/lib/quizTranslations";
import { localeAlternates } from "@/lib/metadataAlternates";
export function generateMetadata({params}: {params: {lang: string}}) {
  if (!isSiteLang(params.lang)) return {};
  return {title: getQuizTranslations(params.lang).hubTitle, robots: {index: false, follow: true}, alternates: localeAlternates(params.lang, "/quiz")};
}
export default function QuizHome({params}: {params: {lang: string}}) {
  if (!isSiteLang(params.lang)) notFound();
  const lang = params.lang;
  const t = getQuizTranslations(lang);
  const quizzes = getWebThemes(lang).flatMap(theme => theme.lessons.flatMap(lesson => {
    const ref = lessonToPathSegment(lesson);
    const questions = getLocalizedQuizQuestions(theme.number, ref, lang);
    return questions ? [{theme, lesson, ref, count: questions.length}] : [];
  }));
  return <div style={{maxWidth: 860, margin: "4rem auto", padding: "1.5rem"}}><h1>{t.hubTitle}</h1>
    {!quizzes.length && <p>{getTranslations(lang).common.quizPending}</p>}
    {quizzes.map(({theme, lesson, ref, count}) => <p key={`${theme.number}/${ref}`}><Link href={localizedPath(lang, `/quiz/${theme.slug}/${ref}`)}>{lang === "fr" ? theme.titleFr : theme.titleEn} · {t.lessonLabel(lesson.number)} · {t.questionCount(count)}</Link></p>)}
  </div>;
}
