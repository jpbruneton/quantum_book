"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/app/context/LangContext";
import { processLatex } from "@/lib/latex";

interface Props {
  number: number;
  titleFr: string;
  titleEn: string;
  contentFr: string;
  contentEn: string;
}

export function ExerciseThemeClient({ number, titleFr, titleEn, contentFr, contentEn }: Props) {
  const { lang } = useLang();

  const rawContent = lang === "fr" ? contentFr : contentEn;
  const rendered = useMemo(() => (rawContent ? processLatex(rawContent) : ""), [rawContent]);

  useEffect(() => {
    function scrollToHash() {
      if (typeof window === "undefined") return;
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;
      const id = decodeURIComponent(raw);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [rendered]);

  const title = lang === "fr" ? titleFr : titleEn;
  const themePrefix = lang === "fr" ? "Thème" : "Theme";
  const backLabel = lang === "fr" ? "← Exercices" : "← Exercises";
  const unavailable =
    lang === "fr"
      ? "Les exercices de ce thème ne sont pas encore disponibles dans cette langue."
      : "Exercises for this theme are not yet available in this language.";

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/exercises"
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
        </div>

        {rendered ? (
          <div
            className="prose-quantum"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
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
