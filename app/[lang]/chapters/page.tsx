"use client";
import { ChapterList } from "./ChapterList";
import { useLang } from "@/app/context/LangContext";

export default function ChaptersPage() {
  const { t } = useLang();

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        padding: "calc(5rem - 1cm) 1.5rem 5rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "calc(4rem - 1cm)" }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.15rem, 4.6vw, 3.1rem)",
              fontWeight: 700,
              color: "var(--text-heading)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            {t.chapters.title}
          </h1>
          {t.chapters.description.trim() ? (
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
          ) : null}
        </div>

        {/* Chapter list */}
        <ChapterList />
      </div>
    </div>
  );
}
