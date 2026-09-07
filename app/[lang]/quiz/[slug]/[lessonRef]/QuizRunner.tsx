"use client";
import { useState } from "react";
import type { QuizQuestion } from "@/lib/quizzes";
import { useLang } from "@/app/context/LangContext";
import { getQuizTranslations } from "@/lib/quizTranslations";
export function QuizRunner({questions}: {questions: QuizQuestion[]}) {
  const {lang} = useLang();
  const t = getQuizTranslations(lang);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const q = questions[index];
  return <div style={{maxWidth: 860, margin: "4rem auto", padding: "1.5rem"}}>{q ? <>
    <p>{t.questionOf(index + 1, questions.length)}</p><h1 dangerouslySetInnerHTML={{__html: q.question}} />
    <div style={{display: "grid", gap: "1rem"}}>{q.choices.map((choice, answer) => <button key={answer} disabled={answers[index] !== undefined} onClick={() => setAnswers({...answers, [index]: answer})} dangerouslySetInnerHTML={{__html: choice}} />)}</div>
    {answers[index] !== undefined && <><p role="status" dangerouslySetInnerHTML={{__html: q.explanations[answers[index]]}} /><button onClick={() => setIndex(index + 1)}>{index + 1 === questions.length ? t.seeScore : t.next}</button></>}
  </> : <><h1>{t.scoreTitle}</h1><p>{t.scoreLine(score, questions.length)}</p><button onClick={() => {setIndex(0); setAnswers({});}}>{t.restart}</button></>}</div>;
}
