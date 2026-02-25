"use client";

import { useLang } from "@/app/context/LangContext";

export function LanguageGate({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();

  if (lang === "en") {
    return (
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "720px",
            width: "100%",
            textAlign: "center",
            background: "var(--bg-card)",
            border: "1px solid var(--accent-border-sm)",
            borderRadius: "10px",
            padding: "2rem",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: "var(--text-heading)",
              marginBottom: "0.8rem",
            }}
          >
            English version not yet available
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            The English version is currently under preparation. Please switch
            back to FR to continue browsing the available content.
          </p>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
