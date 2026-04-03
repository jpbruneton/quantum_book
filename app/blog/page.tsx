"use client";

import { useLang } from "@/app/context/LangContext";

export default function BlogPage() {
  const { t } = useLang();
  const updates = t.updates;
  const [featured, ...posts] = updates.entries;

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        <header style={{ marginBottom: "2.5rem" }}>
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
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              maxWidth: "760px",
            }}
          >
            {updates.description}
          </p>
        </header>

        {featured && (
          <section style={{ marginBottom: "2rem" }}>
            <article
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--accent-border-sm)",
                borderRadius: "10px",
                padding: "1.5rem 1.75rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--amber)",
                  marginBottom: "0.5rem",
                }}
              >
                {updates.latestTitle}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.75rem",
                  color: "var(--text-dim)",
                  marginBottom: "0.6rem",
                }}
              >
                {featured.date}
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.35rem",
                  color: "var(--text-heading)",
                  marginBottom: "0.6rem",
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-crimson)",
                  fontSize: "1.02rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  marginBottom: "0.8rem",
                }}
              >
                {featured.body}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.8rem",
                  color: "var(--amber)",
                  fontWeight: 600,
                }}
              >
                Lire l'article →
              </span>
            </article>
          </section>
        )}

        {posts.length > 0 && (
          <section style={{ display: "grid", gap: "1rem" }}>
            {posts.map((entry) => (
              <article
                key={`${entry.date}-${entry.title}`}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--accent-border-sm)",
                  borderRadius: "8px",
                  padding: "1.2rem 1.4rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.75rem",
                    color: "var(--text-dim)",
                    marginBottom: "0.55rem",
                  }}
                >
                  {entry.date}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.12rem",
                    color: "var(--text-heading)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {entry.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-crimson)",
                    fontSize: "0.98rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {entry.body}
                </p>
              </article>
            ))}
          </section>
        )}

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
      </div>
    </div>
  );
}
