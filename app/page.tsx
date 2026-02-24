import Link from "next/link";
import { chapters, bookMeta } from "@/lib/chapters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${bookMeta.title}: ${bookMeta.subtitle} — Free Online`,
};

function WaveBackground() {
  return (
    <div className="wave-bg">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,160 C180,80 360,240 540,160 C720,80 900,240 1080,160 C1260,80 1350,200 1440,160 L1440,320 L0,320 Z"
          fill="#f59e0b"
        />
        <path
          d="M0,200 C200,120 400,280 600,200 C800,120 1000,280 1200,200 C1350,140 1400,220 1440,200 L1440,320 L0,320 Z"
          fill="#f59e0b"
        />
      </svg>
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,120 C240,200 480,40 720,120 C960,200 1200,40 1440,120 L1440,320 L0,320 Z"
          fill="#f59e0b"
        />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* ─── Hero ─── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "6rem 1.5rem",
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
            background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
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
            <div
              className="animate-fade-up stagger-1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "100px",
                padding: "0.3rem 1rem",
                marginBottom: "2rem",
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--amber)",
              }}
            >
              <span>●</span> Free Online Edition
            </div>

            <h1
              className="animate-fade-up stagger-2 amber-glow"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#f8fafc",
                marginBottom: "1rem",
              }}
            >
              {bookMeta.title}
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
              {bookMeta.subtitle}
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
              }}
            >
              {bookMeta.description}
            </p>

            <div
              className="animate-fade-up stagger-5"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              <Link
                href="/chapters"
                style={{
                  background: "var(--amber)",
                  color: "#0a0b0f",
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
                Read Online →
              </Link>
              <Link
                href="/about"
                style={{
                  border: "1px solid rgba(245,158,11,0.3)",
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
                About the Book
              </Link>
            </div>

            {/* Meta info */}
            <div
              className="animate-fade-up stagger-6"
              style={{
                display: "flex",
                gap: "2rem",
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {[
                { label: "Chapters", value: `${chapters.length}` },
                { label: "Edition", value: bookMeta.edition },
                { label: "Format", value: "Web + PDF" },
              ].map((stat) => (
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

          {/* Right: Book cover placeholder */}
          <div
            className="animate-fade-up stagger-3"
            style={{
              position: "relative",
              aspectRatio: "3/4",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow:
                "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.2), inset 0 0 60px rgba(245,158,11,0.03)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(145deg, #0f1a2e 0%, #0a0f1a 40%, #0d1525 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2.5rem",
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Decorative math on the cover */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.07,
                  fontSize: "6rem",
                  fontFamily: "var(--font-playfair)",
                  userSelect: "none",
                }}
              >
                Ψ
              </div>
              <div
                style={{
                  width: "60px",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, transparent, var(--amber), transparent)",
                  marginBottom: "2rem",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#f1f5f9",
                  marginBottom: "0.5rem",
                  letterSpacing: "0.05em",
                }}
              >
                {bookMeta.title}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "var(--amber-soft)",
                  marginBottom: "3rem",
                }}
              >
                {bookMeta.subtitle}
              </p>
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(245,158,11,0.3)",
                  marginBottom: "1.5rem",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-crimson)",
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                }}
              >
                {bookMeta.author}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.75rem",
                  color: "var(--text-dim)",
                  marginTop: "0.25rem",
                }}
              >
                {bookMeta.year}
              </p>

              {/* Corner decorations */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map(
                (pos) => (
                  <div
                    key={pos}
                    style={{
                      position: "absolute",
                      top: pos.startsWith("top") ? "1rem" : "auto",
                      bottom: pos.startsWith("bottom") ? "1rem" : "auto",
                      left: pos.endsWith("left") ? "1rem" : "auto",
                      right: pos.endsWith("right") ? "1rem" : "auto",
                      width: "20px",
                      height: "20px",
                      borderTop: pos.startsWith("top")
                        ? "1px solid rgba(245,158,11,0.3)"
                        : "none",
                      borderBottom: pos.startsWith("bottom")
                        ? "1px solid rgba(245,158,11,0.3)"
                        : "none",
                      borderLeft: pos.endsWith("left")
                        ? "1px solid rgba(245,158,11,0.3)"
                        : "none",
                      borderRight: pos.endsWith("right")
                        ? "1px solid rgba(245,158,11,0.3)"
                        : "none",
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Chapters preview ─── */}
      <section style={{ padding: "6rem 1.5rem", background: "var(--bg-secondary)" }}>
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
              Contents
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#f1f5f9",
                lineHeight: 1.2,
              }}
            >
              Explore the Chapters
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {chapters.map((chapter, i) => (
              <Link
                key={chapter.slug}
                href={`/chapters/${chapter.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="chapter-card"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(245,158,11,0.12)",
                    borderRadius: "8px",
                    padding: "1.75rem",
                    cursor: "pointer",
                    height: "100%",
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
                      Ch {String(chapter.number).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.7rem",
                        color: "var(--text-dim)",
                      }}
                    >
                      {chapter.readingTime}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "#f1f5f9",
                      marginBottom: "0.4rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {chapter.title}
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
                    Read chapter →
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
          {[
            {
              icon: "∫",
              title: "Full Math Rendering",
              body: "All equations rendered with KaTeX — crisp LaTeX-quality math in your browser.",
            },
            {
              icon: "⬇",
              title: "PDF Downloads",
              body: "Every chapter available as a downloadable PDF for offline study.",
            },
            {
              icon: "◎",
              title: "Free & Open Access",
              body: "Complete text freely available online. No paywalls, no sign-up required.",
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                padding: "2.5rem 2rem",
                borderRadius: "8px",
                border: "1px solid rgba(245,158,11,0.1)",
                background: "var(--bg-secondary)",
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
                  color: "#f1f5f9",
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
