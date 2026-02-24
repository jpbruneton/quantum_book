import Link from "next/link";
import { chapters, bookMeta } from "@/lib/chapters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chapters",
  description: `Browse all ${chapters.length} chapters of ${bookMeta.title}`,
};

export default function ChaptersPage() {
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
            TABLE OF CONTENTS
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            All Chapters
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              maxWidth: "520px",
            }}
          >
            Each chapter is available to read online with full math rendering, or to download as a PDF.
          </p>
        </div>

        {/* Chapter list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {chapters.map((chapter, i) => (
            <div
              key={chapter.slug}
              style={{
                borderBottom:
                  i < chapters.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
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
                      "rgba(245,158,11,0.03)";
                    (e.currentTarget as HTMLDivElement).style.margin = "0 -1rem";
                    (e.currentTarget as HTMLDivElement).style.padding = "1.75rem 1rem";
                    (e.currentTarget as HTMLDivElement).style.borderRadius = "6px";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "";
                    (e.currentTarget as HTMLDivElement).style.margin = "";
                    (e.currentTarget as HTMLDivElement).style.padding = "1.75rem 0";
                    (e.currentTarget as HTMLDivElement).style.borderRadius = "";
                  }}
                >
                  {/* Chapter number */}
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "2.25rem",
                      fontWeight: 700,
                      color: "rgba(245,158,11,0.25)",
                      lineHeight: 1,
                    }}
                  >
                    {String(chapter.number).padStart(2, "0")}
                  </div>

                  {/* Info */}
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: "#f1f5f9",
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
                      {chapter.topics.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          style={{
                            background: "rgba(245,158,11,0.07)",
                            border: "1px solid rgba(245,158,11,0.15)",
                            borderRadius: "100px",
                            padding: "0.15rem 0.6rem",
                            fontFamily: "var(--font-inter)",
                            fontSize: "0.7rem",
                            color: "var(--amber)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
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
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
