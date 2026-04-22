"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getWebThemes } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";

interface GlossaryOccurrence {
  themeSlug: string;
  themeNumber: number;
  themeTitle: string;
  lessonNumber: number;
  lessonSubtitle: string;
}

interface GlossaryItem {
  keyword: string;
  occurrences: GlossaryOccurrence[];
}

function normalizeKeyword(value: string): string {
  return value.trim().toLowerCase();
}

function GlossaryIntro() {
  const { lang } = useLang();
  const title = lang === "fr" ? "Glossaire des mots-clés" : "Keyword Glossary";
  const subtitle =
    lang === "fr"
      ? "Cliquez sur un mot-clé pour voir toutes les leçons qui l'utilisent."
      : "Click a keyword to see every lesson that uses it.";

  return (
    <div style={{ maxWidth: "850px" }}>
      <h1
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(1.9rem, 4vw, 2.5rem)",
          color: "var(--text-heading)",
          marginBottom: "0.6rem",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontFamily: "var(--font-crimson)",
          fontSize: "1.05rem",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          marginBottom: "1.2rem",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function GlossaryFilterAndList() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const selectedKeywordRaw = searchParams.get("q") || "";
  const selectedKeyword = selectedKeywordRaw.trim();
  const selectedKeywordNormalized = normalizeKeyword(selectedKeywordRaw);

  const glossaryItems = useMemo<GlossaryItem[]>(() => {
    const map = new Map<string, GlossaryItem>();
    const themes = getWebThemes();

    for (const theme of themes) {
      for (const lesson of theme.lessons) {
        const topics = lang === "fr" ? lesson.topicsFr : lesson.topicsEn;
        for (const topic of topics) {
          const normalized = normalizeKeyword(topic);
          if (!map.has(normalized)) {
            map.set(normalized, {
              keyword: topic,
              occurrences: [],
            });
          }
          map.get(normalized)?.occurrences.push({
            themeSlug: theme.slug,
            themeNumber: theme.number,
            themeTitle: lang === "fr" ? theme.titleFr : theme.titleEn,
            lessonNumber: lesson.number,
            lessonSubtitle: lang === "fr" ? lesson.subtitleFr : lesson.subtitleEn,
          });
        }
      }
    }

    return Array.from(map.values()).sort((a, b) =>
      a.keyword.localeCompare(b.keyword, lang === "fr" ? "fr" : "en", {
        sensitivity: "base",
      })
    );
  }, [lang]);

  const filteredItems = useMemo(() => {
    if (!selectedKeywordNormalized) return glossaryItems;
    return glossaryItems.filter(
      (item) => normalizeKeyword(item.keyword) === selectedKeywordNormalized
    );
  }, [glossaryItems, selectedKeywordNormalized]);

  const allKeywordsLabel = lang === "fr" ? "Tous les mots-clés" : "All keywords";
  const relatedLessonsLabel = lang === "fr" ? "Leçons associées" : "Related lessons";
  const noResultLabel =
    lang === "fr"
      ? "Aucun mot-clé trouvé pour ce filtre."
      : "No keyword found for this filter.";

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
        <Link
          href="/glossary"
          style={{
            background: !selectedKeyword ? "var(--accent-bg-md)" : "var(--accent-bg-xs)",
            border: "1px solid var(--accent-border-sm)",
            borderRadius: "100px",
            padding: "0.25rem 0.78rem",
            fontFamily: "var(--font-inter)",
            fontSize: "0.76rem",
            color: !selectedKeyword ? "var(--amber)" : "var(--text-secondary)",
            textDecoration: "none",
          }}
        >
          {allKeywordsLabel}
        </Link>
        {glossaryItems.map((item) => {
          const isActive =
            normalizeKeyword(item.keyword) === selectedKeywordNormalized &&
            selectedKeywordNormalized.length > 0;
          return (
            <Link
              key={item.keyword}
              href={`/glossary?q=${encodeURIComponent(item.keyword)}`}
              style={{
                background: isActive ? "var(--accent-bg-md)" : "var(--accent-bg-xs)",
                border: "1px solid var(--accent-border-sm)",
                borderRadius: "100px",
                padding: "0.25rem 0.78rem",
                fontFamily: "var(--font-inter)",
                fontSize: "0.76rem",
                color: isActive ? "var(--amber)" : "var(--text-secondary)",
                textDecoration: "none",
              }}
            >
              {item.keyword}
            </Link>
          );
        })}
      </div>

      {filteredItems.length === 0 ? (
        <p
          style={{
            fontFamily: "var(--font-crimson)",
            fontSize: "1rem",
            color: "var(--text-secondary)",
          }}
        >
          {noResultLabel}
        </p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {filteredItems.map((item) => (
            <section
              key={item.keyword}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--accent-border-sm)",
                borderRadius: "10px",
                padding: "1rem 1.1rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.15rem",
                  color: "var(--text-heading)",
                  marginBottom: "0.35rem",
                }}
              >
                {item.keyword}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: "0.6rem",
                }}
              >
                {relatedLessonsLabel}
              </p>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {item.occurrences.map((occurrence, index) => (
                  <Link
                    key={`${occurrence.themeSlug}-${occurrence.lessonNumber}-${index}`}
                    href={`/chapters/${occurrence.themeSlug}?lesson=${occurrence.lessonNumber}`}
                    style={{
                      display: "block",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      fontFamily: "var(--font-crimson)",
                      fontSize: "1rem",
                    }}
                  >
                    {lang === "fr"
                      ? `Thème ${occurrence.themeNumber} (${occurrence.themeTitle}) - Leçon n°${occurrence.lessonNumber} : ${occurrence.lessonSubtitle}`
                      : `Theme ${occurrence.themeNumber} (${occurrence.themeTitle}) - Lesson ${occurrence.lessonNumber}: ${occurrence.lessonSubtitle}`}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

export default function GlossaryPage() {
  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "3rem 1.5rem 4rem",
      }}
    >
      <GlossaryIntro />
      <Suspense fallback={null}>
        <GlossaryFilterAndList />
      </Suspense>
    </main>
  );
}
