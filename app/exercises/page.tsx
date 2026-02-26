"use client";

import { useLang } from "@/app/context/LangContext";

export default function ExercisesPage() {
  const { lang } = useLang();
  const title = lang === "fr" ? "Exercices corrigés" : "Solved Exercises";
  const body =
    lang === "fr"
      ? "Cette section rassemblera progressivement les séries d'exercices et leurs corrigés détaillés."
      : "This section will progressively gather exercise sets and their detailed solutions.";

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 700,
            color: "var(--text-heading)",
            marginBottom: "1rem",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-crimson)",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}
