"use client";
import Link from "next/link";
import Image from "next/image";
import { chapters, bookMeta } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";

function WaveBackground() {
  return (
    <div className="wave-bg">
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,160 C180,80 360,240 540,160 C720,80 900,240 1080,160 C1260,80 1350,200 1440,160 L1440,320 L0,320 Z" />
        <path d="M0,200 C200,120 400,280 600,200 C800,120 1000,280 1200,200 C1350,140 1400,220 1440,200 L1440,320 L0,320 Z" />
      </svg>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,120 C240,200 480,40 720,120 C960,200 1200,40 1440,120 L1440,320 L0,320 Z" />
      </svg>
    </div>
  );
}

export default function HomePage() {
  const { t, lang } = useLang();
  const book = t.book;

  const stats = [
    { label: t.home.stats.chapters, value: `${chapters.length}` },
    { label: t.home.stats.edition, value: book.edition },
    { label: t.home.stats.format, value: t.home.stats.formatValue },
  ];

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* ─── Hero ─── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          overflow: "hidden",
          padding: "4.5rem 1.5rem 3rem",
        }}
      >
        <WaveBackground />

        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, var(--glow-radial) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "5rem",
            alignItems: "center",
            width: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Left: Text */}
          <div>
            <h1
              className="animate-fade-up stagger-2 amber-glow"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--text-bright)",
                marginBottom: "1rem",
              }}
            >
              {book.title}
            </h1>

            <p
              className="animate-fade-up stagger-3"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--amber-soft)",
                marginBottom: "1.5rem",
              }}
            >
              {book.subtitle}
            </p>

            <p
              className="animate-fade-up stagger-4"
              style={{
                fontFamily: "var(--font-crimson)",
                fontSize: "1.15rem",
                color: "var(--text-secondary)",
                maxWidth: "520px",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                textAlign: "justify",
                whiteSpace: "pre-line",
              }}
            >
              {book.description}
            </p>

            <div
              className="animate-fade-up stagger-5"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <Link
                href="/chapters"
                style={{
                  background: "var(--amber)",
                  color: "var(--bg-primary)",
                  padding: "0.85rem 2rem",
                  borderRadius: "6px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "opacity 0.2s",
                }}
              >
                {t.home.readOnline}
              </Link>
              <Link
                href="/about"
                style={{
                  border: "1px solid var(--accent-border-lg)",
                  color: "var(--amber)",
                  padding: "0.85rem 2rem",
                  borderRadius: "6px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                {t.home.aboutBook}
              </Link>
            </div>

            {/* Meta stats */}
            <div
              className="animate-fade-up stagger-6"
              style={{
                display: "flex",
                gap: "2rem",
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border-subtle)",
              }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--amber)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Book cover */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.9rem",
              width: "100%",
              maxWidth: "380px",
            }}
          >
            <button
              disabled
              style={{
                background: "var(--accent-bg-md)",
                border: "1px solid var(--accent-border-lg)",
                color: "var(--amber)",
                padding: "0.65rem 1rem",
                borderRadius: "6px",
                fontFamily: "var(--font-inter)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                opacity: 0.8,
                cursor: "not-allowed",
              }}
            >
              {t.home.fullBookDownload}
            </button>
            <div
              className="animate-fade-up stagger-3"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3/4",
                borderRadius: "8px",
                overflow: "hidden",
                background: "var(--bg-card)",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.3), 0 0 0 1px var(--accent-border-md), inset 0 0 60px var(--accent-glow)",
              }}
            >
              <Image
                src="/figs/front.png"
                alt={book.title}
                fill
                priority
                sizes="(max-width: 900px) 70vw, 380px"
                style={{
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 38%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "1.1rem",
                  right: "1.1rem",
                  top: "1rem",
                  textAlign: "center",
                  color: "#f8fafc",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: "0",
                    textShadow: "0 2px 14px rgba(0,0,0,0.5)",
                  }}
                >
                  {book.title}
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "1.1rem",
                  right: "1.1rem",
                  bottom: "1rem",
                  textAlign: "center",
                  color: "#f8fafc",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    color: "#f8fafc",
                    marginBottom: "0.55rem",
                    textShadow: "0 2px 10px rgba(0,0,0,0.45)",
                  }}
                >
                  {book.subtitle}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    color: "#e2e8f0",
                    textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                  }}
                >
                  {bookMeta.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Chapters preview ─── */}
      <section
        style={{
          padding: "6rem 1.5rem",
          background: "var(--bg-secondary)",
          transition: "background 0.25s ease",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--amber)",
                marginBottom: "0.75rem",
              }}
            >
              {t.home.contentsLabel}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "var(--text-heading)",
                lineHeight: 1.2,
              }}
            >
              {t.home.exploreTitle}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {chapters.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/chapters/${chapter.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="chapter-card"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--accent-border-sm)",
                    borderRadius: "8px",
                    padding: "1.75rem",
                    cursor: "pointer",
                    height: "100%",
                    transition: "background 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "0.75rem",
                        color: "var(--amber)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {t.home.chapterPrefix} {String(chapter.number).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "var(--text-heading)",
                      marginBottom: "0.4rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {lang === "fr" ? chapter.titleFr : chapter.titleEn}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontStyle: "italic",
                      fontSize: "0.875rem",
                      color: "var(--amber-soft)",
                      marginBottom: "0.875rem",
                    }}
                  >
                    {chapter.subtitle}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-crimson)",
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {chapter.description}
                  </p>
                  <div
                    style={{
                      marginTop: "1.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.775rem",
                      color: "var(--amber)",
                    }}
                  >
                    {t.home.readChapter}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features strip ─── */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {t.home.features.map((f) => (
            <div
              key={f.title}
              style={{
                padding: "2.5rem 2rem",
                borderRadius: "8px",
                border: "1px solid var(--accent-border-sm)",
                background: "var(--bg-secondary)",
                transition: "background 0.25s ease",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "2.5rem",
                  color: "var(--amber)",
                  marginBottom: "1rem",
                  opacity: 0.8,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--text-heading)",
                  marginBottom: "0.75rem",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-crimson)",
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
