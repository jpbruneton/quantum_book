"use client";
import { useMemo, useState } from "react";
import type { Chapter } from "@/lib/chapters";
import { processLatex } from "@/lib/latex";
import { useLang } from "@/app/context/LangContext";

interface Props {
  chapter: Chapter;
}

export function ChapterContent({ chapter }: Props) {
  const [tab, setTab] = useState<"web" | "pdf">("web");
  const { t } = useLang();

  const renderedContent = useMemo(
    () => processLatex(chapter.content),
    [chapter.content]
  );

  return (
    <>
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
        {(["web", "pdf"] as const).map((tabKey) => (
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
            {tabKey === "web" ? t.chapter.tabOnline : t.chapter.tabPdf}
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
                {chapter.pdfFile}
              </span>
              <a
                href={`/pdfs/${chapter.pdfFile}`}
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
              src={`/pdfs/${chapter.pdfFile}#toolbar=0`}
              style={{
                width: "100%",
                height: "80vh",
                minHeight: "600px",
                border: "none",
                background: "#fff",
              }}
              title={`${chapter.title} - PDF`}
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
              href={`/pdfs/${chapter.pdfFile}`}
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
