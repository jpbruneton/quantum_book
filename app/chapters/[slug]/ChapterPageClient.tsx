"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import type { Theme } from "@/lib/chapters";
import { ChapterContent } from "../ChapterContent";
import { useLang } from "@/app/context/LangContext";

interface Props {
  theme: Theme;
  prev: Theme | null;
  next: Theme | null;
}

function ChapterPageClientInner({ theme, prev, next }: Props) {
  const { t, lang } = useLang();
  const searchParams = useSearchParams();
  const requestedLessonNumber = Number(searchParams.get("lesson") || "");
  const requestedLessonIndex =
    Number.isFinite(requestedLessonNumber) && requestedLessonNumber >= 1
      ? Math.min(
          Math.max(requestedLessonNumber - 1, 0),
          Math.max(theme.lessons.length - 1, 0)
        )
      : 0;
  const [activeLessonIndex, setActiveLessonIndex] = useState(requestedLessonIndex);

  useEffect(() => {
    setActiveLessonIndex(requestedLessonIndex);
  }, [requestedLessonIndex]);

  const activeLesson = useMemo(
    () => theme.lessons[activeLessonIndex] || null,
    [theme.lessons, activeLessonIndex]
  );
  const previousLesson =
    theme.lessons.length > 0 && activeLessonIndex > 0
      ? theme.lessons[activeLessonIndex - 1]
      : null;
  const nextLesson =
    theme.lessons.length > 0 && activeLessonIndex < theme.lessons.length - 1
      ? theme.lessons[activeLessonIndex + 1]
      : null;

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
              {t.chapter.breadcrumbThemes}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--amber)" }}>
              {t.chapter.themeLabel.charAt(0) +
                t.chapter.themeLabel.slice(1).toLowerCase()}{" "}
              {theme.number}
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
            {t.chapter.themeLabel} {String(theme.number).padStart(2, "0")}
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
            {lang === "fr" ? theme.titleFr : theme.titleEn}
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
            {lang === "fr" ? theme.descriptionFr : theme.descriptionEn}
          </p>

          {/* Lesson tabs */}
          {theme.lessons.length > 0 && (
            <div style={{ marginTop: "1.75rem" }}>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-dim)",
                  textTransform: "uppercase",
                  marginBottom: "0.8rem",
                }}
              >
                {t.chapter.lessonsTabsLabel}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {theme.lessons.map((lesson, index) => (
                  <button
                    key={lesson.slug}
                    onClick={() => setActiveLessonIndex(index)}
                    style={{
                      background:
                        index === activeLessonIndex
                          ? "var(--accent-bg-md)"
                          : "var(--accent-bg-xs)",
                      border:
                        index === activeLessonIndex
                          ? "1px solid var(--accent-border-md)"
                          : "1px solid var(--accent-border-sm)",
                      borderRadius: "999px",
                      padding: "0.35rem 0.85rem",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.78rem",
                      color:
                        index === activeLessonIndex
                          ? "var(--amber)"
                          : "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                  >
                    {lang === "fr"
                      ? `Leçon n°${lesson.number} : ${lesson.subtitleFr}`
                      : `Lesson #${lesson.number}: ${lesson.subtitleEn}`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Tabs: Web / PDF ─── */}
      {activeLesson ? (
        <ChapterContent lesson={activeLesson} />
      ) : (
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "3rem 1.5rem 4rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.6rem",
              color: "var(--text-heading)",
              marginBottom: "0.7rem",
            }}
          >
            {t.chapter.noLessonTitle}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
            }}
          >
            {t.chapter.noLessonBody}
          </p>
        </div>
      )}

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
        {previousLesson ? (
          <button
            onClick={() =>
              setActiveLessonIndex(() => Math.max(activeLessonIndex - 1, 0))
            }
            style={{
              textAlign: "left",
              border: "none",
              background: "none",
              padding: 0,
              cursor: "pointer",
            }}
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
                {lang === "fr"
                  ? `Leçon n°${previousLesson.number} : ${previousLesson.subtitleFr}`
                  : `Lesson #${previousLesson.number}: ${previousLesson.subtitleEn}`}
              </div>
            </div>
          </button>
        ) : prev ? (
          <Link href={`/chapters/${prev.slug}`} style={{ textDecoration: "none" }}>
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
        {nextLesson ? (
          <button
            onClick={() =>
              setActiveLessonIndex(() =>
                Math.min(activeLessonIndex + 1, Math.max(theme.lessons.length - 1, 0))
              )
            }
            style={{
              textAlign: "left",
              border: "none",
              background: "none",
              padding: 0,
              cursor: "pointer",
            }}
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
                {lang === "fr"
                  ? `Leçon n°${nextLesson.number} : ${nextLesson.subtitleFr}`
                  : `Lesson #${nextLesson.number}: ${nextLesson.subtitleEn}`}
              </div>
            </div>
          </button>
        ) : next ? (
          <Link href={`/chapters/${next.slug}`} style={{ textDecoration: "none" }}>
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

export function ChapterPageClient({ theme, prev, next }: Props) {
  return (
    <Suspense fallback={null}>
      <ChapterPageClientInner theme={theme} prev={prev} next={next} />
    </Suspense>
  );
}
