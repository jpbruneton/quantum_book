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
    marginBottom: "2.35rem",
    paddingBottom: "2.35rem",
    borderBottom: "1px solid var(--border-subtle)",
  };

  const h2Style = {
    fontFamily: "var(--font-playfair)",
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "var(--text-heading)",
    marginBottom: "0.75rem",
    borderLeft: "3px solid var(--amber)",
    paddingLeft: "1rem",
  };

  const bodyStyle = {
    fontFamily: "var(--font-crimson)",
    fontSize: "1.1rem",
    color: "var(--text-secondary)",
    lineHeight: 1.68,
    marginBottom: "0.65rem",
  };

  const h1Style = {
    fontFamily: "var(--font-playfair)",
    fontSize: "clamp(2rem, 4.2vw, 2.75rem)",
    fontWeight: 700,
    color: "var(--text-heading)",
    lineHeight: 1.2,
    marginBottom: "2rem",
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        padding: "calc(5rem - 1cm) 1.5rem 5rem",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={h1Style}>{t.nav.about}</h1>
        {/* Project status */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>{at.aboutProjectTitle}</h2>
          <p style={{ ...bodyStyle, textAlign: "justify" }}>{at.aboutProjectLead}</p>
          <p style={{ ...bodyStyle, marginBottom: 0, textAlign: "justify" }}>
            <strong style={{ fontWeight: 700 }}>{at.aboutProjectOutlineLabel}</strong>{" "}
            {at.aboutProjectOutlineBody}
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
          {book.description
            .split(/\n\n+/)
            .map((block) => block.trim())
            .filter(Boolean)
            .map((paragraph, index, arr) => (
              <p
                key={index}
                style={{
                  ...bodyStyle,
                  textAlign: "justify",
                  marginBottom:
                    index < arr.length - 1 ? "0.4rem" : "0.65rem",
                }}
              >
                {paragraph}
              </p>
            ))}
          <p style={{ ...bodyStyle, marginBottom: 0, textAlign: "justify" }}>{at.aboutBookBody2}</p>
        </div>

        {/* Book details */}
        <div style={sectionStyle}>
          <h2 style={{ ...h2Style, marginBottom: "0.85rem" }}>
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
          <p style={{ ...bodyStyle, marginBottom: "0.65rem" }}>
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
              lineHeight: 1.55,
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
