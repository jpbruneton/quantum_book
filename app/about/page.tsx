import { bookMeta, chapters } from "@/lib/chapters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `About ${bookMeta.title}: ${bookMeta.subtitle} by ${bookMeta.author}`,
};

export default function AboutPage() {
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
            ABOUT THE BOOK
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#f1f5f9",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            {bookMeta.title}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "1.3rem",
              color: "var(--amber-soft)",
            }}
          >
            {bookMeta.subtitle}
          </p>
        </div>

        {/* Description */}
        <div
          style={{
            marginBottom: "3.5rem",
            paddingBottom: "3.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#f1f5f9",
              marginBottom: "1.25rem",
              borderLeft: "3px solid var(--amber)",
              paddingLeft: "1rem",
            }}
          >
            About This Book
          </h2>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.85,
              marginBottom: "1.25rem",
            }}
          >
            {bookMeta.description}
          </p>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.85,
            }}
          >
            The text develops quantum mechanics from first principles, assuming a solid background
            in classical mechanics, electrodynamics, and the mathematics of linear algebra and
            differential equations. Proofs are given in full where they illuminate the physics,
            and numerous worked examples complement the theoretical exposition.
          </p>
        </div>

        {/* Book details */}
        <div
          style={{
            marginBottom: "3.5rem",
            paddingBottom: "3.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#f1f5f9",
              marginBottom: "1.5rem",
              borderLeft: "3px solid var(--amber)",
              paddingLeft: "1rem",
            }}
          >
            Book Details
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {[
              { label: "Author", value: bookMeta.author },
              { label: "Affiliation", value: bookMeta.affiliation },
              { label: "Edition", value: bookMeta.edition },
              { label: "Year", value: bookMeta.year },
              { label: "Chapters", value: `${chapters.length} chapters` },
              { label: "ISBN", value: bookMeta.isbn },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(245,158,11,0.1)",
                  borderRadius: "6px",
                  padding: "1rem 1.25rem",
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
                    color: "#f1f5f9",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Author bio */}
        <div
          style={{
            marginBottom: "3.5rem",
            paddingBottom: "3.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#f1f5f9",
              marginBottom: "1.25rem",
              borderLeft: "3px solid var(--amber)",
              paddingLeft: "1rem",
            }}
          >
            About the Author
          </h2>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.85,
            }}
          >
            <strong style={{ color: "var(--amber-soft)" }}>{bookMeta.author}</strong> is a
            physicist at {bookMeta.affiliation}. Their research interests span quantum field
            theory, quantum information, and the foundations of quantum mechanics. This book
            grew from lecture notes developed over many years of teaching graduate and
            advanced undergraduate courses.
          </p>
          {/* Replace with your actual bio */}
          <p
            style={{
              marginTop: "0.5rem",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8rem",
              color: "var(--text-dim)",
              fontStyle: "italic",
            }}
          >
            ✏️ Replace this bio in <code>app/about/page.tsx</code>
          </p>
        </div>

        {/* How to use */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "#f1f5f9",
              marginBottom: "1.25rem",
              borderLeft: "3px solid var(--amber)",
              paddingLeft: "1rem",
            }}
          >
            How to Use This Site
          </h2>
          <p
            style={{
              fontFamily: "var(--font-crimson)",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.85,
            }}
          >
            Each chapter can be read online via the <em>Read Online</em> tab, which renders
            all mathematical equations using KaTeX. Alternatively, switch to the{" "}
            <em>PDF Viewer</em> tab to view the typeset PDF directly in your browser, or
            download it for offline reading. All content is free and open access.
          </p>
        </div>
      </div>
    </div>
  );
}
