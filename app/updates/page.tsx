"use client";

import { useLang } from "@/app/context/LangContext";

export default function UpdatesPage() {
  const { t } = useLang();
  const updates = t.updates;
  const lead = updates.description || updates.comingSoon;

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "var(--amber)",
              marginBottom: "0.75rem",
            }}
          >
            {updates.label}
          </p>
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
        </div>

        {updates.entries.length > 0 ? (
          <>
            <div
              style={{
                marginBottom: "1.2rem",
                fontFamily: "var(--font-inter)",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
              }}
            >
              {updates.latestTitle}
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              {updates.entries.map((entry) => (
                <article
                  key={`${entry.date}-${entry.title}`}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--accent-border-sm)",
                    borderRadius: "8px",
                    padding: "1.25rem 1.5rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.75rem",
                      color: "var(--text-dim)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {entry.date}
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.25rem",
                      color: "var(--text-heading)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {entry.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-crimson)",
                      fontSize: "1rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                    }}
                  >
                    {entry.body}
                  </p>
                </article>
              ))}
            </div>
          </>
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
