import { notFound } from "next/navigation";
import { getWebTheme, getWebThemes } from "@/lib/chapters";
import { isSiteLang } from "@/lib/localeRoutes";
import { findLessonIndexByRef, lessonToPathSegment } from "@/lib/lessonRoutes";
import { getLocalizedQuizQuestions } from "@/lib/quizzes";
import { getQuizTranslations } from "@/lib/quizTranslations";
import { localeAlternates } from "@/lib/metadataAlternates";
import { processLatex } from "@/lib/latex";
import { QuizRunner } from "./QuizRunner";
type Props = {params: {lang: string; slug: string; lessonRef: string}};
export function generateStaticParams() { return getWebThemes().flatMap(theme => theme.lessons.map(lesson => ({slug: theme.slug, lessonRef: lessonToPathSegment(lesson)}))); }
export function generateMetadata({params}: Props) {
  if (!isSiteLang(params.lang)) return {};
  return {title: getQuizTranslations(params.lang).hubTitle, robots: {index: false, follow: true}, alternates: localeAlternates(params.lang, `/quiz/${params.slug}/${params.lessonRef}`)};
}
export default function QuizPage({params}: Props) {
  if (!isSiteLang(params.lang)) notFound();
  const theme = getWebTheme(params.slug);
  const index = theme ? findLessonIndexByRef(theme.lessons, params.lessonRef) : -1;
  if (!theme || index < 0) notFound();
  const questions = getLocalizedQuizQuestions(theme.number, params.lessonRef, params.lang);
  const t = getQuizTranslations(params.lang);
  if (!questions) return <div style={{maxWidth: 860, margin: "4rem auto", padding: "1.5rem"}}><h1>{t.hubTitle}</h1><p>{t.unavailableLesson(theme.lessons[index].number)}</p></div>;
  return <QuizRunner questions={questions.map(q => ({...q, question: processLatex(q.question), choices: q.choices.map(processLatex), explanations: q.explanations.map(processLatex)}))} />;
}
