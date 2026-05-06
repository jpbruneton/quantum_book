"use client";
import Link from "next/link";
import { bookMeta } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";

export function Footer() {
  const { t } = useLang();
  const book = t.book;

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        padding: "3rem 1.5rem",
        marginTop: "6rem",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.1rem",
              color: "var(--text-heading)",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ color: "var(--amber)" }}>Ψ</span> {book.title}
          </p>
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "0.875rem",
              fontFamily: "var(--font-inter)",
            }}
          >
            {book.subtitle.trim()
              ? `${book.subtitle} — ${book.edition}`
              : book.edition}
          </p>
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-dim)",
              marginBottom: "0.75rem",
            }}
          >
            {t.footer.navigation}
          </p>
          {[
            { href: "/", label: t.footer.home },
            { href: "/chapters", label: t.footer.allChapters },
            { href: "/exercises", label: t.footer.exercises },
            { href: "/about", label: t.footer.aboutBook },
          ].map((l) => (
            <div key={l.href} style={{ marginBottom: "0.4rem" }}>
              <Link
                href={l.href}
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-crimson)",
                }}
              >
                {l.label}
              </Link>
            </div>
          ))}
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-dim)",
              marginBottom: "0.75rem",
            }}
          >
            {t.footer.author}
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              fontFamily: "var(--font-crimson)",
            }}
          >
            {bookMeta.author}
          </p>
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: "0.85rem",
              fontFamily: "var(--font-crimson)",
            }}
          >
            {bookMeta.affiliation}
          </p>
        </div>
      </div>
      <div
        style={{
          maxWidth: "1100px",
          margin: "2rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border-subtle)",
          textAlign: "center",
          color: "var(--text-dim)",
          fontSize: "0.8rem",
          fontFamily: "var(--font-inter)",
        }}
      >
        {t.footer.copyright(bookMeta.year, bookMeta.author)}
      </div>
    </footer>
  );
}
