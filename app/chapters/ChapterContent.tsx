"use client";
import { useState } from "react";
import type { Chapter } from "@/lib/chapters";

// Simple KaTeX-like math rendering using span markers
// In production, install react-katex and import <InlineMath> / <BlockMath>
// For now we render the HTML content with dangerouslySetInnerHTML
// Math expressions inside the HTML are rendered inline by the browser
// since we load KaTeX CSS globally. Full rendering requires katex.renderToString.

interface Props {
  chapter: Chapter;
}

export function ChapterContent({ chapter }: Props) {
  const [tab, setTab] = useState<"web" | "pdf">("web");

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
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {(["web", "pdf"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: "none",
              border: "none",
              padding: "0.75rem 1.25rem",
              fontFamily: "var(--font-inter)",
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: tab === t ? "var(--amber)" : "var(--text-dim)",
              cursor: "pointer",
              borderBottom: tab === t ? "2px solid var(--amber)" : "2px solid transparent",
              marginBottom: "-1px",
              transition: "color 0.2s",
            }}
          >
            {t === "web" ? "Read Online" : "PDF Viewer"}
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
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
          <div
            style={{
              marginTop: "3rem",
              padding: "1.5rem",
              background: "rgba(245,158,11,0.04)",
              border: "1px solid rgba(245,158,11,0.12)",
              borderRadius: "6px",
              fontFamily: "var(--font-crimson)",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
            }}
          >
            <strong style={{ color: "var(--amber)" }}>Note:</strong> This is a
            preview excerpt. Download the full PDF for the complete chapter,
            exercises, and solutions.
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
              border: "1px solid rgba(245,158,11,0.12)",
            }}
          >
            {/* PDF toolbar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 1rem",
                background: "rgba(245,158,11,0.05)",
                borderBottom: "1px solid rgba(245,158,11,0.1)",
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
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.25)",
                  color: "var(--amber)",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "4px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                ↓ Download
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
            If the PDF doesn't display,{" "}
            <a
              href={`/pdfs/${chapter.pdfFile}`}
              download
              style={{ color: "var(--amber)", textDecoration: "underline" }}
            >
              click here to download it
            </a>
            .
          </p>
        </div>
      )}
    </>
  );
}
