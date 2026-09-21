"use client";
import type { TocEntry } from "@/lib/lessonPresentation";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import type { Lesson } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";
import { useLocalizedPath } from "@/lib/useLocalizedPath";
import { ShareButton } from "@/app/components/ShareButton";
import { BackToTopButton } from "@/app/components/BackToTopButton";

interface Props {
  lesson: LessonWithLocalizedContent;
  /** Rendered as the first element of the text column, above the lesson content. */
  topNav?: ReactNode;
}

interface LessonWithLocalizedContent extends Lesson {
  contentLang: string;
  renderedLang: string;
  toc: TocEntry[];
}

export function ChapterContent({ lesson, topNav }: Props) {
  const [tocVisible, setTocVisible] = useState(true);
  const { t, lang } = useLang();
  const lp = useLocalizedPath();
  const hasLessonContent = lesson.renderedLang.trim().length > 0;
  const lessonHeadingFr = lesson.subtitleFr.trim() || lesson.titleFr;
  const lessonHeadingEn = lesson.subtitleEn.trim() || lesson.titleEn;
  const lessonHeading = lang === "fr" ? lessonHeadingFr : lessonHeadingEn;

  useEffect(() => {
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (target) target.scrollIntoView({ block: "start", behavior: "auto" });
    else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
        <p className="lesson-keywords">
          <span>{lang === "fr" ? "Mots clés" : t.exercises.keywordsLabel} : </span>
          {(lang === "fr" ? lesson.topicsFr : lesson.topicsEn).map((topic, index) => (
            <span key={topic}>
              {index > 0 && ", "}
              <Link prefetch={false} href={lp(`/glossary?q=${encodeURIComponent(topic)}`)}>{topic}</Link>
            </span>
          ))}
        </p>
        {lang === "fr" && lesson.texFile.startsWith("theme3_fr/") && lesson.number > 1 && (
          <p
            className="lesson-rewriting-notice"
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              padding: "0.65rem 1rem",
              fontFamily: "var(--font-inter)",
              fontSize: "0.9rem",
            }}
          >
            Leçon en cours de réécriture
          </p>
        )}
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
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0.75rem 1.5rem 0" }}>
        <ShareButton variant="inline" />
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
              {topNav && <div style={{ marginBottom: "1.5rem" }}>{topNav}</div>}
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
                                gridTemplateColumns: "2.2rem minmax(0, 1fr)",
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
                                      overflowWrap: "anywhere",
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
              <aside className="lesson-toc lesson-toc-sidebar">
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
                          className="lesson-toc-link"
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

      <BackToTopButton lessonKey={lesson.slug} />
    </>
  );
}
