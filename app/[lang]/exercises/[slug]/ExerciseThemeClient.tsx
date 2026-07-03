"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "@/app/context/LangContext";
import { exerciseDetailPath } from "@/lib/exerciseRoutes";
import { useLocalizedPath } from "@/lib/useLocalizedPath";
import type { ExerciseThemePdfLinks } from "@/lib/exercisePdfDownloads.server";

export interface ThemeExerciseCard {
  id: string;
  displayNumber: number;
  titleHtml: string;
  keywords: string[];
}

interface Props {
  themeSlug: string;
  number: number;
  titleFr: string;
  titleEn: string;
  exercisesFr: ThemeExerciseCard[];
  exercisesEn: ThemeExerciseCard[];
  pdfLinks: ExerciseThemePdfLinks;
}

export function ExerciseThemeClient({
  themeSlug,
  number,
  titleFr,
  titleEn,
  exercisesFr,
  exercisesEn,
  pdfLinks,
}: Props) {
  const { lang } = useLang();
  const router = useRouter();
  const lp = useLocalizedPath();

  const exercises = lang === "fr" ? exercisesFr : exercisesEn;
  const title = lang === "fr" ? titleFr : titleEn;
  const themePrefix = lang === "fr" ? "Thème" : "Theme";
  const backLabel = lang === "fr" ? "← Exercices" : "← Exercises";
  const listIntro =
    lang === "fr"
      ? "Choisissez un exercice pour ouvrir son énoncé et sa correction."
      : "Choose an exercise to open its statement and solution.";
  const keywordsLabel = lang === "fr" ? "Mots-clés" : "Keywords";
  const exercisePrefix = lang === "fr" ? "Exercice" : "Exercise";
  const unavailable =
    lang === "fr"
      ? "Les exercices de ce thème ne sont pas encore disponibles dans cette langue."
      : "Exercises for this theme are not yet available in this language.";
  const pdfLabel =
    lang === "fr"
      ? "Tous les exercices du thème — énoncés, indications et solutions (PDF)"
      : "All exercises for this theme — statements, hints and solutions (PDF)";

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw) return;
    const id = decodeURIComponent(raw);
    router.replace(exerciseDetailPath(lang, themeSlug, id));
  }, [router, lang, themeSlug]);

  const linkStyle = {
    fontFamily: "var(--font-crimson)",
    fontSize: "0.88rem",
    color: "var(--accent)",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  } as const;

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href={lp("/exercises")}
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            {backLabel}
          </Link>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginBottom: "0.4rem",
            }}
          >
            {themePrefix} {number}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "var(--text-heading)",
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              marginTop: "0.85rem",
              lineHeight: 1.6,
            }}
          >
            {listIntro}
          </p>
        </div>

        {exercises.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {exercises.map((card) => (
              <Link
                key={card.id}
                href={exerciseDetailPath(lang, themeSlug, card.id)}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "0.9rem 1.1rem",
                  background: "var(--bg-primary)",
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-crimson)",
                    fontSize: "0.95rem",
                    color: "var(--text-heading)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                    {exercisePrefix} {card.displayNumber}
                  </span>
                  <span style={{ color: "var(--text-secondary)", margin: "0 0.35rem" }}>—</span>
                  <span
                    style={{ fontWeight: 600 }}
                    dangerouslySetInnerHTML={{ __html: card.titleHtml }}
                  />
                </div>
                {card.keywords.length > 0 ? (
                  <div
                    style={{
                      fontFamily: "var(--font-crimson)",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      marginTop: "0.45rem",
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{keywordsLabel}: </span>
                    {card.keywords.join(" · ")}
                  </div>
                ) : null}
              </Link>
            ))}
          </div>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              fontStyle: "italic",
            }}
          >
            {unavailable}
          </p>
        )}

        {(lang === "fr" ? pdfLinks.fr : pdfLinks.en) && (
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              alignItems: "flex-start",
            }}
          >
            <a href={(lang === "fr" ? pdfLinks.fr : pdfLinks.en) ?? undefined} download style={linkStyle}>
              {pdfLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
