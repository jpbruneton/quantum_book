import type { Lang } from "@/lib/i18n";
export interface QuizQuestion {
  id: string;
  theme: number;
  lessonRef: string;
  question: string;
  choices: string[];
  explanations: string[];
  correctIndex: number;
  trueFalse?: boolean;
}
// Authored Quantum questions only. An empty bank does not advertise a finished quiz.
export const quizQuestions: QuizQuestion[] = [];
export type QuizTranslation = Pick<QuizQuestion, "question" | "choices" | "explanations">;
export const quizQuestionTranslations: Partial<Record<Lang, Record<string, QuizTranslation>>> = {};
export function getLocalizedQuizQuestions(theme: number, lessonRef: string, lang: Lang): QuizQuestion[] | null {
  const source = quizQuestions.filter(q => q.theme === theme && q.lessonRef === lessonRef);
  if (!source.length) return null;
  const result: QuizQuestion[] = [];
  for (const q of source) {
    const translation = lang === "fr" ? q : quizQuestionTranslations[lang]?.[q.id];
    if (!translation || !translation.question.trim() || translation.choices.length !== q.choices.length ||
        translation.explanations.length !== q.choices.length || q.correctIndex < 0 || q.correctIndex >= q.choices.length ||
        !translation.choices.every(text => text.trim()) || !translation.explanations.every(text => text.trim())) return null;
    result.push({...q, ...translation, trueFalse: q.choices.length === 2 && q.choices[0] === "Vrai" && q.choices[1] === "Faux"});
  }
  return result;
}
