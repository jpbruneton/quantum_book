"use client";

import { useLang } from "@/app/context/LangContext";
import type { UpdateEntry } from "@/lib/i18n";

function sortEntriesNewestFirst(entries: readonly UpdateEntry[]): UpdateEntry[] {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}

export default function BlogPage() {
  const { t } = useLang();
  const updates = t.updates;
  const lead = updates.description || updates.comingSoon;
  const sorted = sortEntriesNewestFirst(updates.entries);

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <header style={{ marginBottom: "2.25rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              fontWeight: 700,
              color: "var(--text-heading)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            {updates.title}
          </h1>
          {lead ? (
            <p
              style={{
                fontFamily: "var(--font-crimson)",
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                maxWidth: "760px",
              }}
            >
              {lead}
            </p>
          ) : null}
        </header>

        {sorted.length > 0 ? (
          <section>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                marginBottom: "1.35rem",
              }}
            >
              {updates.timelineLabel}
            </p>
            <div
              style={{
                position: "relative",
                paddingLeft: "1.35rem",
                borderLeft: "2px solid var(--accent-border-md)",
              }}
            >
              {sorted.map((entry, index) => (
                <article
                  key={`${entry.date}-${entry.title}`}
                  style={{
                    position: "relative",
                    marginBottom: index < sorted.length - 1 ? "1.5rem" : 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "calc(-1.35rem - 1px)",
                      top: "0.4rem",
                      width: "10px",
                      height: "10px",
                      transform: "translateX(-50%)",
                      borderRadius: "50%",
                      background: "var(--amber)",
                      boxShadow: "0 0 0 3px var(--bg-primary)",
                    }}
                    aria-hidden
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.75rem",
                      color: "var(--text-dim)",
                      marginBottom: "0.45rem",
                    }}
                  >
                    {entry.date}
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: "var(--text-heading)",
                      marginBottom: "0.5rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {entry.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-crimson)",
                      fontSize: "1.02rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.75,
                      textAlign: "justify",
                    }}
                  >
                    {entry.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {updates.description && updates.comingSoon ? (
          <p
            style={{
              marginTop: "1.5rem",
              fontFamily: "var(--font-inter)",
              fontSize: "0.85rem",
              color: "var(--text-dim)",
            }}
          >
            {updates.comingSoon}
          </p>
        ) : null}
      </div>
    </div>
  );
}
