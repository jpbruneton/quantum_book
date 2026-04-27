"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { useLang } from "@/app/context/LangContext";
import { exerciseMatchesQuery } from "@/lib/exerciseIndexUtils";

export interface ThemePdfLinks {
  frAvecSolutions: string | null;
  frSansSolutions: string | null;
  enAvecSolutions: string | null;
  enSansSolutions: string | null;
}

export interface ThemeCard {
  slug: string;
  number: number;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  hasContentFr: boolean;
  hasContentEn: boolean;
  pdfLinks: ThemePdfLinks;
}

export interface ExerciseIndexCard {
  id: string;
  /** Numéro global dans la bibliothèque (1, 2, …) pour l'affichage web. */
  displayNumber: number;
  titleHtml: string;
  titleTex: string;
  keywords: string[];
  themeNumber: number;
  themeSlug: string;
  source: "library" | "legacy";
}

interface Props {
  themes: ThemeCard[];
  indexFr: ExerciseIndexCard[];
  indexEn: ExerciseIndexCard[];
}

export function ExercisesClient({ themes, indexFr, indexEn }: Props) {
  const { lang } = useLang();
  const [query, setQuery] = useState("");

  const t = {
    fr: {
      title: "Exercices corrigés",
      subtitle:
        "Bibliothèque d'exercices : recherche par titre ou mots-clés, ou accès par thème du livre.",
      themePrefix: "Thème",
      open: "Ouvrir la série →",
      comingSoon: "À venir",
      searchPlaceholder: "Rechercher (titre, mots-clés)…",
      searchLabel: "Recherche dans la bibliothèque",
      byTheme: "Par thème",
      noMatch: "Aucun exercice ne correspond à cette requête.",
      keywordsLabel: "Mots-clés",
      exercisePrefix: "Exercice",
      /** PDF d’exercices : uniquement les fichiers FR sur le site FR. */
      pdfFrSans: "Tous les exercices du thème — sans corrigés (PDF)",
      pdfFrAvec: "Tous les exercices du thème — avec corrigés (PDF)",
    },
    en: {
      title: "Solved Exercises",
      subtitle: "Exercise library: search by title or keywords, or browse by book theme.",
      themePrefix: "Theme",
      open: "Open set →",
      comingSoon: "Coming soon",
      searchPlaceholder: "Search (title, keywords)…",
      searchLabel: "Search the library",
      byTheme: "By theme",
      noMatch: "No exercises match this query.",
      keywordsLabel: "Keywords",
      exercisePrefix: "Exercise",
      /** PDF d’exercices : uniquement les fichiers EN sur le site EN. */
      pdfEnSans: "All exercises for this theme — statements only (PDF)",
      pdfEnAvec: "All exercises for this theme — with solutions (PDF)",
    },
  }[lang];

  const index = lang === "fr" ? indexFr : indexEn;

  const filtered = useMemo(
    () => index.filter((e) => exerciseMatchesQuery(e, query)),
    [index, query]
  );

  const byTheme = useMemo(() => {
    const map = new Map<number, ExerciseIndexCard[]>();
    for (const e of filtered) {
      const list = map.get(e.themeNumber);
      if (list) list.push(e);
      else map.set(e.themeNumber, [e]);
    }
    return map;
  }, [filtered]);

  const orderedThemeNumbers = useMemo(() => {
    return themes.map((th) => th.number).filter((n) => {
      const cards = byTheme.get(n);
      return cards !== undefined && cards.length > 0;
    });
  }, [themes, byTheme]);

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 700,
            color: "var(--text-heading)",
            marginBottom: "0.75rem",
          }}
        >
          {t.title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-crimson)",
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}
        >
          {t.subtitle}
        </p>

        <label
          htmlFor="exercise-search"
          style={{
            display: "block",
            fontFamily: "var(--font-crimson)",
            fontSize: "0.85rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "0.5rem",
          }}
        >
          {t.searchLabel}
        </label>
        <input
          id="exercise-search"
          type="search"
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          placeholder={t.searchPlaceholder}
          autoComplete="off"
          style={{
            width: "100%",
            maxWidth: "520px",
            padding: "0.65rem 1rem",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--bg-secondary)",
            color: "var(--text-heading)",
            fontFamily: "var(--font-crimson)",
            fontSize: "1rem",
            marginBottom: "2.5rem",
          }}
        />

        {filtered.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              color: "var(--text-secondary)",
              fontStyle: "italic",
              marginBottom: "2.5rem",
            }}
          >
            {t.noMatch}
          </p>
        ) : null}

        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.35rem",
            fontWeight: 600,
            color: "var(--text-heading)",
            marginBottom: "1.25rem",
          }}
        >
          {t.byTheme}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {orderedThemeNumbers.map((themeNumber) => {
            const theme = themes.find((th) => th.number === themeNumber);
            if (!theme) return null;
            const cards = byTheme.get(themeNumber);
            if (!cards || cards.length === 0) return null;
            const title = lang === "fr" ? theme.titleFr : theme.titleEn;
            const hasContent = lang === "fr" ? theme.hasContentFr : theme.hasContentEn;
            const pdf = theme.pdfLinks;
            const hasPdf =
              lang === "fr"
                ? pdf.frAvecSolutions !== null || pdf.frSansSolutions !== null
                : pdf.enAvecSolutions !== null || pdf.enSansSolutions !== null;

            const linkStyle: CSSProperties = {
              fontFamily: "var(--font-crimson)",
              fontSize: "0.88rem",
              color: "var(--accent)",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            };

            return (
              <section key={themeNumber}>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "1rem 1.25rem",
                    background: "var(--bg-secondary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-crimson)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {t.themePrefix} {themeNumber}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "var(--text-heading)",
                      }}
                    >
                      {title}
                    </div>
                    {hasContent ? (
                      <Link
                        href={`/exercises/${theme.slug}`}
                        style={{
                          display: "inline-block",
                          padding: "0.35rem 0.9rem",
                          border: "1px solid var(--accent)",
                          borderRadius: "4px",
                          color: "var(--accent)",
                          fontFamily: "var(--font-crimson)",
                          fontSize: "0.9rem",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.open}
                      </Link>
                    ) : (
                      <span
                        style={{
                          fontFamily: "var(--font-crimson)",
                          fontSize: "0.9rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {t.comingSoon}
                      </span>
                    )}
                  </div>
                  {hasPdf ? (
                    <div
                      style={{
                        marginTop: "0.85rem",
                        paddingTop: "0.85rem",
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.4rem",
                          alignItems: "flex-start",
                        }}
                      >
                        {lang === "fr" ? (
                          <>
                            {pdf.frSansSolutions !== null ? (
                              <a href={pdf.frSansSolutions} download style={linkStyle}>
                                {t.pdfFrSans}
                              </a>
                            ) : null}
                            {pdf.frAvecSolutions !== null ? (
                              <a href={pdf.frAvecSolutions} download style={linkStyle}>
                                {t.pdfFrAvec}
                              </a>
                            ) : null}
                          </>
                        ) : (
                          <>
                            {pdf.enSansSolutions !== null ? (
                              <a href={pdf.enSansSolutions} download style={linkStyle}>
                                {t.pdfEnSans}
                              </a>
                            ) : null}
                            {pdf.enAvecSolutions !== null ? (
                              <a href={pdf.enAvecSolutions} download style={linkStyle}>
                                {t.pdfEnAvec}
                              </a>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {cards.map((card) => {
                    const href =
                      hasContent && theme.slug.length > 0
                        ? `/exercises/${theme.slug}#${card.id}`
                        : null;
                    const cardInner = (
                      <>
                        <div
                          style={{
                            fontFamily: "var(--font-crimson)",
                            fontSize: "0.95rem",
                            color: "var(--text-heading)",
                            lineHeight: 1.5,
                          }}
                        >
                          <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                            {t.exercisePrefix} {card.displayNumber}
                          </span>
                          <span style={{ color: "var(--text-secondary)", margin: "0 0.35rem" }}>—</span>
                          <span style={{ fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: card.titleHtml }} />
                        </div>
                        {card.keywords.length > 0 ? (
                          <div
                            style={{
                              fontFamily: "var(--font-crimson)",
                              fontSize: "0.85rem",
                              color: "var(--text-secondary)",
                              marginTop: "0.45rem",
                              lineHeight: 1.45,
                            }}
                          >
                            <span style={{ fontWeight: 600 }}>{t.keywordsLabel} : </span>
                            {card.keywords.join(" · ")}
                          </div>
                        ) : null}
                      </>
                    );
                    const cardShellStyle: CSSProperties = {
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "0.9rem 1.1rem",
                      background: "var(--bg-primary)",
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                    };
                    return href ? (
                      <Link
                        key={`${card.themeSlug}-${card.id}-${card.titleTex}`}
                        href={href}
                        scroll={false}
                        className="exercise-index-card-link"
                        style={cardShellStyle}
                      >
                        {cardInner}
                      </Link>
                    ) : (
                      <div
                        key={`${card.themeSlug}-${card.id}-${card.titleTex}`}
                        style={{
                          ...cardShellStyle,
                          display: "block",
                        }}
                      >
                        {cardInner}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
