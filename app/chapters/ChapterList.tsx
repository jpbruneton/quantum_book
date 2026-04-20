"use client";
import Link from "next/link";
import { getWebThemes } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";

function getThemeCategory(slug: string, lang: "fr" | "en"): string {
  const isMath = slug === "hilbert-spaces";
  if (lang === "fr") return isMath ? "Thème mathématique" : "Thème physique";
  return isMath ? "Mathematics" : "Physics";
}

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
          {theme.partHeadingFr ? (
            <div
              style={{
                marginTop: i > 0 ? "2rem" : 0,
                paddingTop: i > 0 ? "1.75rem" : 0,
                borderTop:
                  i > 0 ? "1px solid var(--border-subtle)" : "none",
                marginBottom: "1rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--text-heading)",
                  letterSpacing: "0.02em",
                }}
              >
                {lang === "fr"
                  ? theme.partHeadingFr
                  : theme.partHeadingEn}
              </p>
            </div>
          ) : null}
          <Link
            href={`/chapters/${theme.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr auto",
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    border: "1px solid var(--accent-border-sm)",
                    background: "var(--accent-bg-xs)",
                    borderRadius: "999px",
                    padding: "0.12rem 0.55rem",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.02em",
                    color: "var(--text-dim)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {getThemeCategory(theme.slug, lang)}
                </span>
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
                    marginBottom: 0,
                  }}
                >
                  {lang === "fr" ? theme.descriptionFr : theme.descriptionEn}
                </p>
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
