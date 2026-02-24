import { notFound } from "next/navigation";
import Link from "next/link";
import { chapters, getChapter, bookMeta } from "@/lib/chapters";
import { ChapterContent } from "../ChapterContent";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chapter = getChapter(params.slug);
  if (!chapter) return {};
  return {
    title: `Ch. ${chapter.number}: ${chapter.title}`,
    description: chapter.description,
  };
}

export default function ChapterPage({ params }: Props) {
  const chapter = getChapter(params.slug);
  if (!chapter) notFound();

  const currentIndex = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* Chapter Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(245,158,11,0.1)",
          padding: "4rem 1.5rem 3rem",
          background: "var(--bg-secondary)",
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
              Home
            </Link>
            <span>/</span>
            <Link
              href="/chapters"
              style={{ color: "var(--text-dim)", textDecoration: "none" }}
            >
              Chapters
            </Link>
            <span>/</span>
            <span style={{ color: "var(--amber)" }}>Chapter {chapter.number}</span>
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
            CHAPTER {String(chapter.number).padStart(2, "0")}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#f1f5f9",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            {chapter.title}
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {chapter.topics.map((t) => (
              <span
                key={t}
                style={{
                  background: "rgba(245,158,11,0.07)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  borderRadius: "100px",
                  padding: "0.25rem 0.75rem",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  color: "var(--amber)",
                }}
              >
                {t}
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
              ⏱ {chapter.readingTime} read
            </span>
            <a
              href={`/pdfs/${chapter.pdfFile}`}
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.25)",
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
              ↓ Download PDF
            </a>
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
          <Link href={`/chapters/${prev.slug}`} style={{ textDecoration: "none" }}>
            <div
              className="chapter-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(245,158,11,0.12)",
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
                ← Previous
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "0.95rem",
                  color: "#f1f5f9",
                }}
              >
                {prev.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={`/chapters/${next.slug}`} style={{ textDecoration: "none" }}>
            <div
              className="chapter-card"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(245,158,11,0.12)",
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
                Next →
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "0.95rem",
                  color: "#f1f5f9",
                }}
              >
                {next.title}
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
