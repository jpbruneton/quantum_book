"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import type { Theme } from "@/lib/chapters";
import {
  chapterLessonPath,
  findLessonIndexByRef,
  getFirstLessonRef,
  lessonToPathSegment,
} from "@/lib/lessonRoutes";
import { ChapterContent } from "../ChapterContent";
import { useLang } from "@/app/context/LangContext";
import { useLocalizedPath } from "@/lib/useLocalizedPath";

type LocalizedLesson = Theme["lessons"][number] & {
  contentFr: string;
  contentEn: string;
  renderedFr: string;
  renderedEn: string;
};

type ThemeWithLocalizedLessonContent = Omit<Theme, "lessons"> & {
  lessons: LocalizedLesson[];
};

interface Props {
  theme: ThemeWithLocalizedLessonContent;
  prev: Theme | null;
  next: Theme | null;
  activeLessonRef: string;
}

const headerBoxStyle: CSSProperties = {
  borderBottom: "1px solid var(--border)",
  padding: "4rem 1.5rem 3rem",
  background: "var(--bg-secondary)",
  transition: "background 0.25s ease",
};

const maxWStyle: CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto",
};

function lessonTabStyle(active: boolean): CSSProperties {
  return {
    background: active ? "var(--accent-bg-md)" : "var(--accent-bg-xs)",
    border: active ? "1px solid var(--accent-border-md)" : "1px solid var(--accent-border-sm)",
    borderRadius: "999px",
    padding: "0.35rem 0.85rem",
    fontFamily: "var(--font-inter)",
    fontSize: "0.78rem",
    color: active ? "var(--amber)" : "var(--text-secondary)",
    textDecoration: "none",
    display: "inline-block",
  };
}

function ChapterThemeHeadingBlock({ theme }: { theme: ThemeWithLocalizedLessonContent }) {
  const { t, lang } = useLang();
  const lp = useLocalizedPath();
  return (
    <>
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
        <Link href={lp("/")} style={{ color: "var(--text-dim)", textDecoration: "none" }}>
          {t.chapter.breadcrumbHome}
        </Link>
        <span>/</span>
        <Link href={lp("/chapters")} style={{ color: "var(--text-dim)", textDecoration: "none" }}>
          {t.chapter.breadcrumbThemes}
        </Link>
        <span>/</span>
        <span style={{ color: "var(--amber)" }}>
          {t.chapter.themeLabel.charAt(0) + t.chapter.themeLabel.slice(1).toLowerCase()}{" "}
          {theme.number}
        </span>
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
    </>
  );
}

function ChapterLessonTabButtons({
  theme,
  activeLessonRef,
}: {
  theme: ThemeWithLocalizedLessonContent;
  activeLessonRef: string;
}) {
  const { lang } = useLang();

  if (theme.lessons.length === 0) return null;

  const normalLessons = theme.lessons.filter((lesson) => lesson.kind !== "fiche");
  const fiches = theme.lessons.filter((lesson) => lesson.kind === "fiche");

  return (
    <div
      style={{
        marginTop: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {normalLessons.map((lesson) => {
          const href = chapterLessonPath(lang, theme.slug, lesson);
          const active = href.endsWith(`/${activeLessonRef}`);
          return (
            <Link key={lesson.slug} href={href} style={lessonTabStyle(active)}>
              {lang === "fr"
                ? `Leçon n°${lesson.number} : ${lesson.subtitleFr}`
                : `Lesson ${lesson.number}: ${lesson.subtitleEn}`}
            </Link>
          );
        })}
      </div>
      {fiches.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-dim)",
              marginRight: "0.15rem",
            }}
          >
            {lang === "fr" ? "Fiches de révision" : "Revision Sheets"}
          </span>
          {fiches.map((lesson) => {
            const href = chapterLessonPath(lang, theme.slug, lesson);
            const active = href.endsWith(`/${activeLessonRef}`);
            return (
              <Link key={lesson.slug} href={href} style={lessonTabStyle(active)}>
                {lang === "fr"
                  ? `Fiche n°${lesson.number} : ${lesson.subtitleFr}`
                  : `Sheet ${lesson.number}: ${lesson.subtitleEn}`}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ChapterContentAndPrevNext({ theme, prev, next, activeLessonRef }: Props) {
  const { t, lang } = useLang();
  const activeLessonIndex = findLessonIndexByRef(theme.lessons, activeLessonRef);

  const activeLesson = useMemo(
    () => (activeLessonIndex >= 0 ? theme.lessons[activeLessonIndex] : null),
    [theme.lessons, activeLessonIndex]
  );
  const previousLesson =
    activeLessonIndex > 0 ? theme.lessons[activeLessonIndex - 1] : null;
  const nextLesson =
    activeLessonIndex >= 0 && activeLessonIndex < theme.lessons.length - 1
      ? theme.lessons[activeLessonIndex + 1]
      : null;

  const prevFirstRef = prev ? getFirstLessonRef(prev.lessons) : null;
  const prevFirstLesson =
    prev && prevFirstRef
      ? prev.lessons.find((lesson) => lessonToPathSegment(lesson) === prevFirstRef)
      : null;
  const nextFirstRef = next ? getFirstLessonRef(next.lessons) : null;
  const nextFirstLesson =
    next && nextFirstRef
      ? next.lessons.find((lesson) => lessonToPathSegment(lesson) === nextFirstRef)
      : null;

  const prevThemeHref =
    prev && prevFirstLesson ? chapterLessonPath(lang, prev.slug, prevFirstLesson) : null;
  const nextThemeHref =
    next && nextFirstLesson ? chapterLessonPath(lang, next.slug, nextFirstLesson) : null;

  return (
    <>
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
          <Link
            href={chapterLessonPath(lang, theme.slug, previousLesson)}
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
                {previousLesson.kind === "fiche"
                  ? lang === "fr"
                    ? `Fiche n°${previousLesson.number} : ${previousLesson.subtitleFr}`
                    : `Sheet ${previousLesson.number}: ${previousLesson.subtitleEn}`
                  : lang === "fr"
                    ? `Leçon n°${previousLesson.number} : ${previousLesson.subtitleFr}`
                    : `Lesson ${previousLesson.number}: ${previousLesson.subtitleEn}`}
              </div>
            </div>
          </Link>
        ) : prevThemeHref ? (
          <Link href={prevThemeHref} style={{ textDecoration: "none" }}>
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
                {lang === "fr" ? prev!.titleFr : prev!.titleEn}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            href={chapterLessonPath(lang, theme.slug, nextLesson)}
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
                {nextLesson.kind === "fiche"
                  ? lang === "fr"
                    ? `Fiche n°${nextLesson.number} : ${nextLesson.subtitleFr}`
                    : `Sheet ${nextLesson.number}: ${nextLesson.subtitleEn}`
                  : lang === "fr"
                    ? `Leçon n°${nextLesson.number} : ${nextLesson.subtitleFr}`
                    : `Lesson ${nextLesson.number}: ${nextLesson.subtitleEn}`}
              </div>
            </div>
          </Link>
        ) : nextThemeHref ? (
          <Link href={nextThemeHref} style={{ textDecoration: "none" }}>
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
                {lang === "fr" ? next!.titleFr : next!.titleEn}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}

export function ChapterPageClient({ theme, prev, next, activeLessonRef }: Props) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={headerBoxStyle}>
        <div style={maxWStyle}>
          <ChapterThemeHeadingBlock theme={theme} />
          <ChapterLessonTabButtons theme={theme} activeLessonRef={activeLessonRef} />
        </div>
      </div>

      <ChapterContentAndPrevNext
        theme={theme}
        prev={prev}
        next={next}
        activeLessonRef={activeLessonRef}
      />
    </div>
  );
}
