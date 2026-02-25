"use client";
import Link from "next/link";
import type { Chapter } from "@/lib/chapters";
import { ChapterContent } from "../ChapterContent";
import { useLang } from "@/app/context/LangContext";

interface Props {
  chapter: Chapter;
  prev: Chapter | null;
  next: Chapter | null;
}

export function ChapterPageClient({ chapter, prev, next }: Props) {
  const { t, lang } = useLang();

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* Chapter Header */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "4rem 1.5rem 3rem",
          background: "var(--bg-secondary)",
          transition: "background 0.25s ease",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8rem",
              color: "var(--text-dim)",
            }}
          >
            <Link
              href="/"
              style={{ color: "var(--text-dim)", textDecoration: "none" }}
            >
              {t.chapter.breadcrumbHome}
            </Link>
            <span>/</span>
            <Link
              href="/chapters"
              style={{ color: "var(--text-dim)", textDecoration: "none" }}
            >
              {t.chapter.breadcrumbChapters}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--amber)" }}>
              {t.chapter.chapterLabel.charAt(0) +
                t.chapter.chapterLabel.slice(1).toLowerCase()}{" "}
              {chapter.number}
            </span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--amber)",
              marginBottom: "0.75rem",
            }}
          >
            {t.chapter.chapterLabel} {String(chapter.number).padStart(2, "0")}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "var(--text-heading)",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            {lang === "fr" ? chapter.titleFr : chapter.titleEn}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "1.2rem",
              color: "var(--amber-soft)",
              marginBottom: "1.5rem",
            }}
          >
            {chapter.subtitle}
          </p>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              maxWidth: "580px",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
            }}
          >
            {chapter.description}
          </p>

          {/* Topics */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {chapter.topics.map((topic) => (
              <span
                key={topic}
                style={{
                  background: "var(--accent-bg-sm)",
                  border: "1px solid var(--accent-border-sm)",
                  borderRadius: "100px",
                  padding: "0.25rem 0.75rem",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  color: "var(--amber)",
                }}
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Reading time + download */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.8rem",
                color: "var(--text-dim)",
              }}
            >
              ⏱ {t.chapter.readTime(chapter.readingTime)}
            </span>
            {chapter.pdfAvailable && (
              <a
                href={`/pdfs/${chapter.pdfFile}`}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--accent-bg-md)",
                  border: "1px solid var(--accent-border-md)",
                  color: "var(--amber)",
                  padding: "0.45rem 1rem",
                  borderRadius: "4px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                }}
              >
                {t.chapter.downloadPdf}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ─── Tabs: Web / PDF ─── */}
      <ChapterContent chapter={chapter} />

      {/* ─── Prev / Next navigation ─── */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 1.5rem 5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        {prev ? (
          <Link
            href={`/chapters/${prev.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              className="chapter-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--accent-border-sm)",
                borderRadius: "8px",
                padding: "1.25rem 1.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-dim)",
                  marginBottom: "0.4rem",
                }}
              >
                {t.chapter.prev}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "0.95rem",
                  color: "var(--text-heading)",
                }}
              >
                {lang === "fr" ? prev.titleFr : prev.titleEn}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/chapters/${next.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              className="chapter-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--accent-border-sm)",
                borderRadius: "8px",
                padding: "1.25rem 1.5rem",
                textAlign: "right",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-dim)",
                  marginBottom: "0.4rem",
                }}
              >
                {t.chapter.next}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "0.95rem",
                  color: "var(--text-heading)",
                }}
              >
                {lang === "fr" ? next.titleFr : next.titleEn}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
