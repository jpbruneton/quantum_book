import { bookMeta, chapters } from "@/lib/chapters";
import type { Metadata } from "next";
import { ChapterList } from "./ChapterList";

export const metadata: Metadata = {
  title: "Chapters",
  description: `Browse all ${chapters.length} chapters of ${bookMeta.title}`,
};

export default function ChaptersPage() {
  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--amber)",
              marginBottom: "0.75rem",
            }}
          >
            TABLE OF CONTENTS
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            All Chapters
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              maxWidth: "520px",
            }}
          >
            Each chapter is available to read online with full math rendering, or to download as a PDF.
          </p>
        </div>

        {/* Chapter list */}
        <ChapterList />
      </div>
    </div>
  );
}
