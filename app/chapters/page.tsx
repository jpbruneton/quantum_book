"use client";
import { ChapterList } from "./ChapterList";
import { useLang } from "@/app/context/LangContext";

export default function ChaptersPage() {
  const { t } = useLang();

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--amber)",
              marginBottom: "0.75rem",
            }}
          >
            {t.chapters.label}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--text-heading)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            {t.chapters.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              maxWidth: "520px",
            }}
          >
            {t.chapters.description}
          </p>
        </div>

        {/* Chapter list */}
        <ChapterList />
      </div>
    </div>
  );
}
