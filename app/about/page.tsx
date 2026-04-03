"use client";
import { bookMeta } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";

const AUTHOR_EXTERNAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/jean-philippe-bruneton-a5014822/",
    labelKey: "linkedin" as const,
  },
  {
    href: "https://scholar.google.com/citations?user=_IWT-z0AAAAJ&hl=en&oi=sra",
    labelKey: "scholar" as const,
  },
  {
    href: "https://github.com/jpbruneton",
    labelKey: "github" as const,
  },
];

export default function AboutPage() {
  const { t, lang } = useLang();
  const at = t.about;
  const book = t.book;
  const detailItems = [
    { label: at.detailLabels.author, value: bookMeta.author },
    { label: at.detailLabels.affiliation, value: bookMeta.affiliation },
    { label: at.detailLabels.edition, value: book.edition },
    { label: at.detailLabels.year, value: bookMeta.year },
  ];

  const sectionStyle = {
    marginBottom: "3.5rem",
    paddingBottom: "3.5rem",
    borderBottom: "1px solid var(--border-subtle)",
  };

  const h2Style = {
    fontFamily: "var(--font-playfair)",
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "var(--text-heading)",
    marginBottom: "1.25rem",
    borderLeft: "3px solid var(--amber)",
    paddingLeft: "1rem",
  };

  const bodyStyle = {
    fontFamily: "var(--font-crimson)",
    fontSize: "1.1rem",
    color: "var(--text-secondary)",
    lineHeight: 1.85,
    marginBottom: "1.25rem",
  };

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
            {at.label}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--text-heading)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            {book.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "1.3rem",
              color: "var(--amber-soft)",
            }}
          >
            {book.subtitle}
          </p>
        </div>

        {/* Description */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>{at.aboutBookTitle}</h2>
          {lang === "en" ? (
            <p style={{ ...bodyStyle, fontWeight: 700, color: "var(--text-heading)" }}>
              {at.translationWarning}
            </p>
          ) : null}
          <p style={{ ...bodyStyle, textAlign: "justify", whiteSpace: "pre-line" }}>
            {book.description}
          </p>
          <p style={{ ...bodyStyle, marginBottom: 0 }}>{at.aboutBookBody2}</p>
        </div>

        {/* Book details */}
        <div style={sectionStyle}>
          <h2 style={{ ...h2Style, marginBottom: "1.5rem" }}>
            {at.bookDetails}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {detailItems.map((item) => (
              <div
                key={item.label}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--accent-border-sm)",
                  borderRadius: "6px",
                  padding: "1rem 1.25rem",
                  transition: "background 0.25s ease",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--text-dim)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-crimson)",
                    fontSize: "1rem",
                    color: "var(--text-heading)",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Author bio */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>{at.authorTitle}</h2>
          <p style={{ ...bodyStyle, marginBottom: "1rem" }}>
            <strong style={{ color: "var(--amber-soft)" }}>
              {bookMeta.author}
            </strong>{" "}
            {at.authorBioSuffix}{bookMeta.affiliation}. {at.authorBioRest}
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-dim)",
              marginBottom: "0.5rem",
            }}
          >
            {at.authorLinksHeading}
          </p>
          <ul
            style={{
              margin: 0,
              paddingLeft: "1.25rem",
              fontFamily: "var(--font-crimson)",
              fontSize: "1.05rem",
              color: "var(--text-secondary)",
              lineHeight: 1.9,
            }}
          >
            {AUTHOR_EXTERNAL_LINKS.map((item) => {
              const label =
                item.labelKey === "linkedin"
                  ? at.authorLinkLinkedIn
                  : item.labelKey === "scholar"
                    ? at.authorLinkGoogleScholar
                    : at.authorLinkGitHub;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--amber)", textDecoration: "underline" }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
