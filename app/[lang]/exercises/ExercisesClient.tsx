"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { useLang } from "@/app/context/LangContext";
import { exerciseMatchesQuery } from "@/lib/exerciseIndexUtils";
import { exerciseDetailPath } from "@/lib/exerciseRoutes";
import { useLocalizedPath } from "@/lib/useLocalizedPath";

export interface ThemeCard {
  slug: string;
  number: number;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  hasContentFr: boolean;
  hasContentEn: boolean;
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
  const { lang, t: site } = useLang();
  const lp = useLocalizedPath();
  const [query, setQuery] = useState("");

  const t = site.exercises;

  const index = lang === "fr" ? indexFr : indexEn;
  const hasQuery = query.trim().length > 0;

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
        {index.length === 0 && <p>{t.unavailable}</p>}
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

        {!hasQuery ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {themes.map((theme) => {
              const title = lang === "fr" ? theme.titleFr : theme.titleEn;
              const hasContent = lang === "fr" ? theme.hasContentFr : theme.hasContentEn;

              return (
                <div
                  key={theme.number}
                  className="theme-square-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "190px",
                    border: "1px solid var(--accent-border-sm)",
                    borderRadius: "8px",
                    padding: "1.4rem 1.5rem",
                    background: "var(--bg-card)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-crimson)",
                        fontSize: "0.78rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--text-secondary)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {t.themePrefix} {theme.number}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--text-heading)",
                        lineHeight: 1.35,
                      }}
                    >
                      {title}
                    </div>
                  </div>

                  {hasContent ? (
                    <Link
                      href={lp(`/exercises/${theme.slug}`)}
                      prefetch={false}
                      className="theme-square-cta"
                    >
                      {t.open}
                    </Link>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : (
          <>
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
                        href={lp(`/exercises/${theme.slug}`)}
                        prefetch={false}
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
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {cards.map((card) => {
                    const href =
                      hasContent && theme.slug.length > 0
                        ? exerciseDetailPath(lang, theme.slug, card.id)
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
                        prefetch={false}
                        href={href}
                        scroll={true}
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
          </>
        )}
      </div>
    </div>
  );
}
