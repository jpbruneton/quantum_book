"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import { useLang } from "@/app/context/LangContext";

export function NavBar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const book = t.book;

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/chapters", label: t.nav.chapters },
    { href: "/about", label: t.nav.about },
    { href: "/updates", label: t.nav.updates },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--nav-bg)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "var(--text-heading)",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: "var(--amber)" }}>Ψ</span> {book.title}
        </Link>

        {/* Right side */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {/* Desktop nav links */}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.875rem",
                fontWeight: 400,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color:
                  pathname === link.href
                    ? "var(--amber)"
                    : "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "var(--amber)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color =
                  pathname === link.href
                    ? "var(--amber)"
                    : "var(--text-secondary)")
              }
            >
              {link.label}
            </Link>
          ))}

          {/* Language toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              overflow: "hidden",
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            {(["en", "fr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? "var(--amber)" : "transparent",
                  color: lang === l ? (theme === "dark" ? "#0a0b0f" : "#ffffff") : "var(--text-secondary)",
                  border: "none",
                  padding: "0.3rem 0.6rem",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  transition: "background 0.2s, color 0.2s",
                  lineHeight: 1,
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
              fontSize: "1rem",
              transition: "border-color 0.2s, color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--amber)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--amber)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
            }}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

        </div>
      </div>
    </nav>
  );
}
