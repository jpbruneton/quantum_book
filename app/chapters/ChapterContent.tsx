"use client";
import { useMemo, useState } from "react";
import type { Lesson } from "@/lib/chapters";
import { processLatex } from "@/lib/latex";
import { useLang } from "@/app/context/LangContext";

interface Props {
  lesson: Lesson;
}

export function ChapterContent({ lesson }: Props) {
  const [tab, setTab] = useState<"web" | "refs" | "pdf">("web");
  const { t, lang } = useLang();
  const englishReferences = lesson.references.filter((reference) => reference.language === "en");
  const frenchReferences = lesson.references.filter((reference) => reference.language === "fr");

  const renderedContent = useMemo(
    () => processLatex(lesson.content),
    [lesson.content]
  );

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
            <span
              key={topic}
              style={{
                background: "var(--accent-bg-sm)",
                border: "1px solid var(--accent-border-sm)",
                borderRadius: "100px",
                padding: "0.2rem 0.75rem",
                fontFamily: "var(--font-inter)",
                fontSize: "0.74rem",
                color: "var(--amber)",
              }}
            >
              {topic}
            </span>
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
            maxWidth: "800px",
            margin: "0 auto",
            padding: "3rem 1.5rem",
          }}
        >
          <div
            className="prose-quantum"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />
          <div
            style={{
              marginTop: "3rem",
              padding: "1.5rem",
              background: "var(--accent-bg-xs)",
              border: "1px solid var(--accent-border-sm)",
              borderRadius: "6px",
              fontFamily: "var(--font-crimson)",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
            }}
          >
            <strong style={{ color: "var(--amber)" }}>
              {t.chapter.noteTitle}
            </strong>{" "}
            {t.chapter.noteBody}
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
                      {section.references.map((reference) => (
                        <li key={`${reference.language}:${reference.url}:${reference.label}`}>
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
    </>
  );
}
