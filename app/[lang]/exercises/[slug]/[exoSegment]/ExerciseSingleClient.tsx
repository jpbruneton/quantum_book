"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/app/context/LangContext";
import { useLocalizedPath } from "@/lib/useLocalizedPath";
import { processLatex } from "@/lib/latex";

interface Props {
  themeSlug: string;
  themeNumber: number;
  themeTitleFr: string;
  themeTitleEn: string;
  titleHtml: string;
  keywords: string[];
  contentFr: string;
  contentEn: string;
}

export function ExerciseSingleClient({
  themeSlug,
  themeNumber,
  themeTitleFr,
  themeTitleEn,
  titleHtml,
  keywords,
  contentFr,
  contentEn,
}: Props) {
  const { lang } = useLang();
  const lp = useLocalizedPath();

  const rawContent = lang === "fr" ? contentFr : contentEn;
  const rendered = useMemo(() => (rawContent ? processLatex(rawContent) : ""), [rawContent]);

  const themeTitle = lang === "fr" ? themeTitleFr : themeTitleEn;
  const themePrefix = lang === "fr" ? "Thème" : "Theme";
  const backLabel = lang === "fr" ? "← Tous les exercices du thème" : "← All exercises for this theme";
  const libraryLabel = lang === "fr" ? "← Bibliothèque d'exercices" : "← Exercise library";
  const keywordsLabel = lang === "fr" ? "Mots-clés" : "Keywords";
  const unavailable =
    lang === "fr"
      ? "Cet exercice n'est pas encore disponible dans cette langue."
      : "This exercise is not yet available in this language.";

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <Link
            href={lp("/exercises")}
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            {libraryLabel}
          </Link>
          <Link
            href={lp(`/exercises/${themeSlug}`)}
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

        <div style={{ marginBottom: "2.5rem" }}>
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
            {themePrefix} {themeNumber} — {themeTitle}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.75rem, 4vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-heading)",
              margin: 0,
              lineHeight: 1.25,
            }}
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
          {keywords.length > 0 ? (
            <p
              style={{
                fontFamily: "var(--font-crimson)",
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                marginTop: "0.85rem",
              }}
            >
              <span style={{ fontWeight: 600 }}>{keywordsLabel}: </span>
              {keywords.join(" · ")}
            </p>
          ) : null}
        </div>

        {rendered ? (
          <div className="prose-quantum" dangerouslySetInnerHTML={{ __html: rendered }} />
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
      </div>
    </div>
  );
}
