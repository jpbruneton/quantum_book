import Link from "next/link";
import { bookMeta } from "@/lib/chapters";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(245,158,11,0.1)",
        background: "var(--bg-secondary)",
        padding: "3rem 1.5rem",
        marginTop: "6rem",
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
              color: "#f1f5f9",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ color: "var(--amber)" }}>Ψ</span> {bookMeta.title}
          </p>
          <p style={{ color: "var(--text-dim)", fontSize: "0.875rem", fontFamily: "var(--font-inter)" }}>
            {bookMeta.subtitle} &mdash; {bookMeta.edition}
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
            Navigation
          </p>
          {[
            { href: "/", label: "Home" },
            { href: "/chapters", label: "All Chapters" },
            { href: "/about", label: "About the Book" },
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
            Author
          </p>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", fontFamily: "var(--font-crimson)" }}>
            {bookMeta.author}
          </p>
          <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", fontFamily: "var(--font-crimson)" }}>
            {bookMeta.affiliation}
          </p>
        </div>
      </div>
      <div
        style={{
          maxWidth: "1100px",
          margin: "2rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          textAlign: "center",
          color: "var(--text-dim)",
          fontSize: "0.8rem",
          fontFamily: "var(--font-inter)",
        }}
      >
        © {bookMeta.year} {bookMeta.author}. All rights reserved.
      </div>
    </footer>
  );
}
