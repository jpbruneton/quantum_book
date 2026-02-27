"use client";
import Link from "next/link";
import { getWebThemes } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";

export function ChapterList() {
  const { t, lang } = useLang();
  const webThemes = getWebThemes();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
      {webThemes.map((theme, i) => (
        <div
          key={theme.slug}
          style={{
            borderBottom:
              i < webThemes.length - 1
                ? "1px solid var(--border-subtle)"
                : "none",
          }}
        >
          <Link
            href={`/chapters/${theme.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                alignItems: "center",
                gap: "1.5rem",
                padding: "1.75rem 0",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "var(--accent-bg-xs)";
                (e.currentTarget as HTMLDivElement).style.margin = "0 -1rem";
                (e.currentTarget as HTMLDivElement).style.padding =
                  "1.75rem 1rem";
                (e.currentTarget as HTMLDivElement).style.borderRadius = "6px";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "";
                (e.currentTarget as HTMLDivElement).style.margin = "";
                (e.currentTarget as HTMLDivElement).style.padding = "1.75rem 0";
                (e.currentTarget as HTMLDivElement).style.borderRadius = "";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  color: "var(--accent-border-lg)",
                  lineHeight: 1,
                }}
              >
                {String(theme.number).padStart(2, "0")}
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "var(--text-heading)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {lang === "fr" ? theme.titleFr : theme.titleEn}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontStyle: "italic",
                    fontSize: "0.9rem",
                    color: "var(--amber-soft)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {lang === "fr" ? theme.descriptionFr : theme.descriptionEn}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {theme.lessons.slice(0, 4).map((lesson) => (
                    <span
                      key={lesson.slug}
                      style={{
                        background: "var(--accent-bg-sm)",
                        border: "1px solid var(--accent-border-sm)",
                        borderRadius: "100px",
                        padding: "0.15rem 0.6rem",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.7rem",
                        color: "var(--amber)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {lang === "fr" ? `Leçon n°${lesson.number}` : `Lesson #${lesson.number}`}
                    </span>
                  ))}
                  {theme.lessons.length === 0 && (
                    <span
                      style={{
                        background: "var(--accent-bg-xs)",
                        border: "1px solid var(--accent-border-sm)",
                        borderRadius: "100px",
                        padding: "0.15rem 0.6rem",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.7rem",
                        color: "var(--text-dim)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {t.chapters.emptyTheme}
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8rem",
                    color: "var(--amber)",
                    fontWeight: 500,
                  }}
                >
                  {t.home.readTheme}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
