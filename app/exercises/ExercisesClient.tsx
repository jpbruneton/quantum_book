"use client";

import Link from "next/link";
import { useLang } from "@/app/context/LangContext";

export interface ThemeCard {
  slug: string;
  number: number;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  hasContentFr: boolean;
  hasContentEn: boolean;
}

export function ExercisesClient({ themes }: { themes: ThemeCard[] }) {
  const { lang } = useLang();

  const t = {
    fr: {
      title: "Exercices corrigés",
      subtitle: "Séries d'exercices et corrigés détaillés, organisés par thème.",
      themePrefix: "Thème",
      open: "Ouvrir →",
      comingSoon: "À venir",
    },
    en: {
      title: "Solved Exercises",
      subtitle: "Exercise sets and detailed solutions, organized by theme.",
      themePrefix: "Theme",
      open: "Open →",
      comingSoon: "Coming soon",
    },
  }[lang];

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 700,
            color: "var(--text-heading)",
            marginBottom: "0.75rem",
          }}
        >
          {t.title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-crimson)",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: "3rem",
          }}
        >
          {t.subtitle}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {themes.map((theme) => {
            const title = lang === "fr" ? theme.titleFr : theme.titleEn;
            const description = lang === "fr" ? theme.descriptionFr : theme.descriptionEn;
            const hasContent = lang === "fr" ? theme.hasContentFr : theme.hasContentEn;

            return (
              <div
                key={theme.slug}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "1.4rem 1.8rem",
                  background: "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                  opacity: hasContent ? 1 : 0.6,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-crimson)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {t.themePrefix} {theme.number}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--text-heading)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-crimson)",
                      fontSize: "0.95rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {description}
                  </div>
                </div>

                <div style={{ flexShrink: 0 }}>
                  {hasContent ? (
                    <Link
                      href={`/exercises/${theme.slug}`}
                      style={{
                        display: "inline-block",
                        padding: "0.5rem 1.2rem",
                        border: "1px solid var(--accent)",
                        borderRadius: "4px",
                        color: "var(--accent)",
                        fontFamily: "var(--font-crimson)",
                        fontSize: "0.95rem",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.open}
                    </Link>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.5rem 1.2rem",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        color: "var(--text-secondary)",
                        fontFamily: "var(--font-crimson)",
                        fontSize: "0.95rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.comingSoon}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
