"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Lesson } from "@/lib/chapters";
import { processLatex } from "@/lib/latex";
import { useLang } from "@/app/context/LangContext";

interface Props {
  lesson: Lesson;
}

interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

function simplifyLatexForToc(value: string): string {
  let result = value;
  result = result.replace(/\\mathbb\{([^{}]+)\}/g, "$1");
  result = result.replace(/\\mathcal\{([^{}]+)\}/g, "$1");
  result = result.replace(/\\ell/g, "ℓ");
  result = result.replace(/\\C/g, "C");
  result = result.replace(/\\N/g, "N");
  result = result.replace(/\\R/g, "R");
  result = result.replace(/\\to/g, "→");
  result = result.replace(/\\rightarrow/g, "→");
  result = result.replace(/[_^]\{([^{}]+)\}/g, "$1");
  result = result.replace(/[_^]([A-Za-z0-9]+)/g, "$1");
  result = result.replace(/\\[a-zA-Z]+/g, "");
  result = result.replace(/[{}]/g, "");
  result = result.replace(/\s*([()])/g, "$1").replace(/([()])\s*/g, "$1");
  result = result.replace(/([A-Za-zℓ])\s+(\d)/g, "$1$2");
  result = result.replace(/(\d)\s+([A-Za-z])/g, "$1$2");
  return result.replace(/\s+/g, " ").trim();
}

function stripHtmlForToc(value: string): string {
  const withoutKatexMathMl = value.replace(
    /<span class="katex-mathml">[\s\S]*?<\/span>/g,
    ""
  );
  const htmlStripped = withoutKatexMathMl.replace(/<[^>]+>/g, " ");
  const withoutInlineMathDelimiters = htmlStripped.replace(/\$+([\s\S]*?)\$+/g, (_m, math: string) =>
    simplifyLatexForToc(math)
  );
  const compact = withoutInlineMathDelimiters
    .replace(/\s*([()])/g, "$1")
    .replace(/([()])\s*/g, "$1")
    .replace(/([A-Za-zℓ])\s+(\d)/g, "$1$2")
    .replace(/(\d)\s+([A-Za-z])/g, "$1$2");
  return compact.replace(/\s+/g, " ").trim();
}

function slugify(value: string): string {
  const normalized = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return normalized || "section";
}

export function ChapterContent({ lesson }: Props) {
  const [tab, setTab] = useState<"web" | "refs" | "pdf">("web");
  const [activeTocId, setActiveTocId] = useState("");
  const [tocVisible, setTocVisible] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { t, lang } = useLang();
  const englishReferences = lesson.references.filter((reference) => reference.language === "en");
  const frenchReferences = lesson.references.filter((reference) => reference.language === "fr");

  const renderedContent = useMemo(() => processLatex(lesson.content), [lesson.content]);
  const localizedRenderedContent = useMemo(() => {
    return renderedContent.replace(
      /<sup class="lesson-cite" data-cite-en="([^"]*)" data-cite-fr="([^"]*)">\[[^\]]*\]<\/sup>/g,
      (_match, enRaw: string, frRaw: string) => {
        const preferred = lang === "fr" ? frRaw : enRaw;
        const fallback = lang === "fr" ? enRaw : frRaw;
        const value = preferred && preferred !== "?" ? preferred : fallback && fallback !== "?" ? fallback : "?";
        return `<sup class="lesson-cite">[${value}]</sup>`;
      }
    );
  }, [renderedContent, lang]);
  const sourceHeadingTexts = useMemo(() => {
    const sourceHeadingRegex = /<(h[2-4])>([\s\S]*?)<\/\1>/g;
    const headings: string[] = [];
    lesson.content.replace(sourceHeadingRegex, (_fullMatch, _tag: string, headingInner: string) => {
      const withoutInlineMathDelimiters = headingInner.replace(/\$+([\s\S]*?)\$+/g, (_m, math: string) =>
        simplifyLatexForToc(math)
      );
      const text = stripHtmlForToc(withoutInlineMathDelimiters);
      headings.push(text);
      return "";
    });
    return headings;
  }, [lesson.content]);
  const webContentWithToc = useMemo(() => {
    const toc: TocEntry[] = [];
    const usedIds: Record<string, number> = {};
    const headingRegex = /<(h[2-4])>([\s\S]*?)<\/\1>/g;
    let headingIndex = 0;

    const content = localizedRenderedContent.replace(
      headingRegex,
      (_fullMatch, tag: string, headingInner: string) => {
        const level = Number(tag.slice(1)) as 2 | 3 | 4;
        const text = sourceHeadingTexts[headingIndex] || stripHtmlForToc(headingInner);
        headingIndex += 1;
        const baseId = slugify(text);
        const current = usedIds[baseId] ?? 0;
        usedIds[baseId] = current + 1;
        const id = current > 0 ? `${baseId}-${current + 1}` : baseId;

        toc.push({ id, text, level });
        return `<${tag} id="${id}">${headingInner}</${tag}>`;
      }
    );

    return { content, toc };
  }, [localizedRenderedContent, sourceHeadingTexts]);

  useEffect(() => {
    if (tab !== "web" || webContentWithToc.toc.length === 0) return;

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
  }, [tab, webContentWithToc.toc]);

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
        <div
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "var(--amber)",
            textTransform: "uppercase",
            marginBottom: "0.65rem",
          }}
        >
          {t.chapter.lessonLabel} {String(lesson.number).padStart(2, "0")}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.45rem",
            color: "var(--text-heading)",
            marginBottom: "0.45rem",
          }}
        >
          {lang === "fr" ? lesson.titleFr : lesson.titleEn}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "1.05rem",
            color: "var(--amber-soft)",
            marginBottom: "0.9rem",
          }}
        >
          {lang === "fr" ? lesson.subtitleFr : lesson.subtitleEn}
        </p>
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
              href={`/glossary?q=${encodeURIComponent(topic)}`}
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

      {/* Tab switcher */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "1.5rem 1.5rem 0",
          display: "flex",
          gap: "0",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {(["web", "refs", "pdf"] as const).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setTab(tabKey)}
            style={{
              background: "none",
              border: "none",
              padding: "0.75rem 1.25rem",
              fontFamily: "var(--font-inter)",
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: tab === tabKey ? "var(--amber)" : "var(--text-dim)",
              cursor: "pointer",
              borderBottom:
                tab === tabKey
                  ? "2px solid var(--amber)"
                  : "2px solid transparent",
              marginBottom: "-1px",
              transition: "color 0.2s",
            }}
          >
            {tabKey === "web"
              ? t.chapter.tabOnline
              : tabKey === "refs"
                ? t.chapter.tabReferences
                : t.chapter.tabPdf}
          </button>
        ))}
      </div>

      {/* ─── Web Content ─── */}
      {tab === "web" && (
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "3rem 1.5rem",
          }}
        >
          <div className="lesson-web-layout">
            <div className="lesson-web-main">
              <div
                className="prose-quantum"
                dangerouslySetInnerHTML={{ __html: webContentWithToc.content }}
              />
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
                          marginLeft:
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
        </div>
      )}

      {/* ─── References ─── */}
      {tab === "refs" && (
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "2rem 1.5rem 3rem",
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
              {([
                {
                  index: 1,
                  title: t.chapter.refsEnglishTitle,
                  references: englishReferences,
                },
                {
                  index: 2,
                  title: t.chapter.refsFrenchTitle,
                  references: frenchReferences,
                },
              ] as const).map((section) => (
                <div key={section.index}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.05rem",
                      color: "var(--text-heading)",
                      marginBottom: "0.65rem",
                    }}
                  >
                    {section.index}. {section.title}
                  </h3>
                  {section.references.length === 0 ? (
                    <p
                      style={{
                        fontFamily: "var(--font-crimson)",
                        fontSize: "0.98rem",
                        color: "var(--text-secondary)",
                        margin: 0,
                      }}
                    >
                      {t.chapter.refsSectionEmpty}
                    </p>
                  ) : (
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "1.2rem",
                        display: "grid",
                        gap: "0.8rem",
                      }}
                    >
                      {section.references.map((reference, index) => (
                        <li key={`${reference.language}:${reference.key}`}>
                          <span
                            style={{
                              fontFamily: "var(--font-jetbrains)",
                              fontSize: "0.8rem",
                              color: "var(--text-dim)",
                              marginRight: "0.5rem",
                            }}
                          >
                            [{index + 1}]
                          </span>
                          <a
                            href={reference.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "var(--amber)",
                              textDecoration: "underline",
                              fontFamily: "var(--font-inter)",
                            }}
                          >
                            {reference.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── PDF Viewer ─── */}
      {tab === "pdf" && (
        <div
          style={{
            maxWidth: "900px",
            margin: "2rem auto",
            padding: "0 1.5rem",
          }}
        >
          <div
            className="pdf-embed"
            style={{
              background: "var(--bg-card)",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid var(--accent-border-sm)",
            }}
          >
            {/* PDF toolbar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 1rem",
                background: "var(--accent-bg-xs)",
                borderBottom: "1px solid var(--accent-border-sm)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.75rem",
                  color: "var(--text-dim)",
                }}
              >
                {lesson.pdfFile}
              </span>
              <a
                href={`/pdfs/${lesson.pdfFile}`}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "var(--accent-bg-md)",
                  border: "1px solid var(--accent-border-md)",
                  color: "var(--amber)",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "4px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                {t.chapter.downloadBtn}
              </a>
            </div>

            {/* The actual embed */}
            <iframe
              src={`/pdfs/${lesson.pdfFile}#toolbar=0`}
              style={{
                width: "100%",
                height: "80vh",
                minHeight: "600px",
                border: "none",
                background: "#fff",
              }}
              title={`${lang === "fr" ? lesson.titleFr : lesson.titleEn} - PDF`}
            />
          </div>
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "var(--font-inter)",
              fontSize: "0.78rem",
              color: "var(--text-dim)",
              textAlign: "center",
            }}
          >
            {t.chapter.pdfFallback}{" "}
            <a
              href={`/pdfs/${lesson.pdfFile}`}
              download
              style={{ color: "var(--amber)", textDecoration: "underline" }}
            >
              {t.chapter.pdfFallbackLink}
            </a>
            .
          </p>
        </div>
      )}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={lang === "fr" ? "Revenir en haut" : "Back to top"}
          title={lang === "fr" ? "Revenir en haut" : "Back to top"}
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
