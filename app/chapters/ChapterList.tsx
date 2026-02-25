"use client";
import Link from "next/link";
import { chapters } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";

export function ChapterList() {
  const { t } = useLang();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
      {chapters.map((chapter, i) => (
        <div
          key={chapter.slug}
          style={{
            borderBottom:
              i < chapters.length - 1
                ? "1px solid var(--border-subtle)"
                : "none",
          }}
        >
          <Link
            href={`/chapters/${chapter.slug}`}
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
                {String(chapter.number).padStart(2, "0")}
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
                  {chapter.title}
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
                  {chapter.subtitle}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {chapter.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
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
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.5rem",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    color: "var(--text-dim)",
                  }}
                >
                  {chapter.readingTime}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8rem",
                    color: "var(--amber)",
                    fontWeight: 500,
                  }}
                >
                  {t.home.readChapter}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
