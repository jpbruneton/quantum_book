"use client";
import type { TocEntry } from "@/lib/lessonPresentation";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Lesson } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";
import { useLocalizedPath } from "@/lib/useLocalizedPath";

interface Props {
  lesson: LessonWithLocalizedContent;
}

interface LessonWithLocalizedContent extends Lesson {
  contentLang: string;
  renderedLang: string;
  toc: TocEntry[];
}

export function ChapterContent({ lesson }: Props) {
  const [activeTocId, setActiveTocId] = useState("");
  const [tocVisible, setTocVisible] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { t, lang } = useLang();
  const lp = useLocalizedPath();
  const hasLessonContent = lesson.renderedLang.trim().length > 0;
  const lessonHeadingFr = lesson.subtitleFr.trim() || lesson.titleFr;
  const lessonHeadingEn = lesson.subtitleEn.trim() || lesson.titleEn;
  const lessonHeading = lang === "fr" ? lessonHeadingFr : lessonHeadingEn;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [lesson.slug]);

  const splitReferenceLabel = (label: string, fallbackUrl: string) => {
    const normalizedLabel = label.replace(/\s+/g, " ").trim();
    const inlineUrlMatch = normalizedLabel.match(/https?:\/\/[^\s]+/i);
    const linkUrl = inlineUrlMatch ? inlineUrlMatch[0] : fallbackUrl.trim();

    if (!linkUrl) return { before: normalizedLabel, url: "", after: "" };

    const index = normalizedLabel.indexOf(linkUrl);
    if (index === -1) {
      return { before: normalizedLabel, url: linkUrl, after: "" };
    }

    const before = normalizedLabel.slice(0, index);
    const after = normalizedLabel.slice(index + linkUrl.length);
    return { before, url: linkUrl, after };
  };
  const formatReferenceLines = (label: string, url: string) => {
    const structuredSeparator = "|||";
    if (label.includes(structuredSeparator)) {
      const [rawAuthor, rawDescription] = label.split(structuredSeparator);
      return {
        author: (rawAuthor || "").replace(/\s+/g, " ").trim(),
        url: url.trim(),
        description: (rawDescription || "").replace(/\s+/g, " ").trim(),
      };
    }

    const normalized = label.replace(/\s+/g, " ").trim();
    let author = normalized;
    let description = "";

    const firstSentenceEnd = normalized.match(/\.\s+/);
    const firstDot = firstSentenceEnd ? firstSentenceEnd.index ?? -1 : -1;
    if (firstDot !== -1) {
      author = normalized.slice(0, firstDot).trim();
      description = normalized.slice(firstDot + 1).trim().replace(/^\s+/, "");
    }

    // Safety fallback when old labels still contain inline URLs.
    const legacy = splitReferenceLabel(normalized, url);
    if (legacy.before && legacy.before.length > 0 && legacy.before.length < author.length) {
      author = legacy.before.replace(/[,\s]+$/, "").trim();
      description = legacy.after.replace(/^[,.;:\s]+/, "").trim() || description;
    }

    return {
      author,
      url: url.trim(),
      description,
    };
  };
  const webContentWithToc = {content: lesson.renderedLang, toc: lesson.toc};
  const lessonHtml = useMemo(() => ({ __html: lesson.renderedLang }), [lesson.renderedLang]);

  useEffect(() => {
    if (webContentWithToc.toc.length === 0) return;

    const orderedIds = webContentWithToc.toc.map((entry) => entry.id);
    const activateFromViewport = () => {
      const offset = 120;
      let current = orderedIds[0];

      for (const id of orderedIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top;
        if (top - offset <= 0) current = id;
        else break;
      }

      setActiveTocId(current);
    };

    activateFromViewport();
    window.addEventListener("scroll", activateFromViewport, { passive: true });
    window.addEventListener("resize", activateFromViewport);

    return () => {
      window.removeEventListener("scroll", activateFromViewport);
      window.removeEventListener("resize", activateFromViewport);
    };
  }, [webContentWithToc.toc]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 280);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem 1.5rem 0",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.45rem",
            color: "var(--text-heading)",
            marginBottom: "0.65rem",
            lineHeight: 1.3,
          }}
        >
          {lessonHeading}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-crimson)",
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "1rem",
          }}
        >
          {lang === "fr" ? lesson.descriptionFr : lesson.descriptionEn}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
          {(lang === "fr" ? lesson.topicsFr : lesson.topicsEn).map((topic) => (
            <Link
              key={topic}
              href={lp(`/glossary?q=${encodeURIComponent(topic)}`)}
              style={{
                background: "var(--accent-bg-sm)",
                border: "1px solid var(--accent-border-sm)",
                borderRadius: "100px",
                padding: "0.2rem 0.75rem",
                fontFamily: "var(--font-inter)",
                fontSize: "0.74rem",
                color: "var(--amber)",
                textDecoration: "none",
              }}
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Web Content ─── */}
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        {hasLessonContent ? (
          <div className="lesson-web-layout">
            <div className="lesson-web-main">
              <div
                className="prose-quantum"
                dangerouslySetInnerHTML={lessonHtml}
              />
              <div
                style={{
                  padding: "0 0 2rem",
                }}
              >
                {lesson.references.length === 0 ? (
                  <p
                    style={{
                      fontFamily: "var(--font-crimson)",
                      fontSize: "1rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {t.chapter.refsEmpty}
                  </p>
                ) : (
                  <div style={{ display: "grid", gap: "1.75rem" }}>
                        <ul
                          style={{
                            margin: 0,
                            paddingInlineStart: "1.2rem",
                            display: "grid",
                            gap: "0.8rem",
                          }}
                        >
                          {lesson.references.map((reference, index) => (
                            <li
                              key={reference.key}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "2.2rem 1fr",
                                alignItems: "start",
                                columnGap: "0.25rem",
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: "var(--font-jetbrains)",
                                  fontSize: "0.8rem",
                                  color: "var(--text-dim)",
                                  lineHeight: 1.6,
                                }}
                              >
                                [{index + 1}]
                              </span>
                              {(() => {
                                const parts = formatReferenceLines(reference.label, reference.url);
                                return (
                                  <span
                                    style={{
                                      display: "inline-grid",
                                      gap: "0.15rem",
                                      verticalAlign: "top",
                                      fontFamily: "var(--font-crimson)",
                                      fontSize: "1rem",
                                      color: "var(--text-heading)",
                                      lineHeight: 1.6,
                                    }}
                                  >
                                    <span>{parts.author}</span>
                                    {parts.url ? (
                                      <a
                                        href={reference.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          color: "#2563eb",
                                          textDecoration: "none",
                                          fontFamily: "inherit",
                                          fontSize: "inherit",
                                        }}
                                      >
                                        {parts.url}
                                      </a>
                                    ) : null}
                                    {parts.description ? <span>{parts.description}</span> : null}
                                  </span>
                                );
                              })()}
                            </li>
                          ))}
                        </ul>
                  </div>
                )}
              </div>
            </div>
            {webContentWithToc.toc.length > 0 && (
              <aside className="lesson-toc lesson-toc-sticky">
                <div className="lesson-toc-header">
                  {tocVisible && <h3 className="lesson-toc-title">{t.chapter.tocTitle}</h3>}
                  <button
                    className="lesson-toc-toggle"
                    onClick={() => setTocVisible((current) => !current)}
                  >
                    {tocVisible ? t.chapter.hideToc : t.chapter.showToc}
                  </button>
                </div>
                {tocVisible && (
                  <ul className="lesson-toc-list">
                    {webContentWithToc.toc.map((entry) => (
                      <li
                        key={entry.id}
                        className="lesson-toc-item"
                        style={{
                          marginInlineStart:
                            entry.level === 2
                              ? "0"
                              : entry.level === 3
                                ? "0.7rem"
                                : "1.4rem",
                        }}
                      >
                        <a
                          href={`#${entry.id}`}
                          className={`lesson-toc-link ${activeTocId === entry.id ? "lesson-toc-link-active" : ""}`}
                          onClick={() => setActiveTocId(entry.id)}
                        >
                          {entry.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            )}
          </div>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "760px",
            }}
          >
            {t.chapter.contentUnavailable}
          </p>
        )}
      </div>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.common.backToTop}
          title={t.common.backToTop}
          style={{
            position: "fixed",
            right: "1.2rem",
            bottom: "1.2rem",
            width: "42px",
            height: "42px",
            borderRadius: "999px",
            border: "1px solid var(--accent-border-md)",
            background: "var(--bg-card)",
            color: "var(--amber)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
            cursor: "pointer",
            zIndex: 40,
            fontSize: "1.1rem",
            lineHeight: 1,
          }}
        >
          ↑
        </button>
      )}
    </>
  );
}
