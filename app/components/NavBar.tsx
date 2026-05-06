"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import { useLang } from "@/app/context/LangContext";
import { useState } from "react";

export function NavBar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const desktopLinks = [
    { href: "/", label: t.nav.home },
    { href: "/chapters", label: t.nav.chapters },
    { href: "/exercises", label: t.nav.exercises },
    { href: "/glossary", label: t.nav.glossary },
    { href: "/about", label: t.nav.about },
  ];

  const mobileLinks = [
    { href: "/", label: t.nav.home },
    { href: "/chapters", label: t.nav.chapters },
    { href: "/exercises", label: t.nav.exercises },
    { href: "/glossary", label: t.nav.glossary },
    { href: "/about", label: t.nav.about },
  ];

  const langLabels: Record<"en" | "fr", string> = {
    fr: "Français",
    en: "English",
  };

  const LangToggle = ({ small }: { small?: boolean }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        border: "1px solid var(--border)",
        borderRadius: "4px",
        overflow: "hidden",
        fontFamily: "var(--font-inter)",
        fontSize: small ? "0.8rem" : "0.75rem",
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          style={{
            background: lang === l ? "var(--amber)" : "transparent",
            color: lang === l ? (theme === "dark" ? "#0a0b0f" : "#ffffff") : "var(--text-secondary)",
            border: "none",
            padding: small ? "0.45rem 0.75rem" : "0.35rem 0.65rem",
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "background 0.2s, color 0.2s",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {langLabels[l]}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile-btn { display: none; }
        @media (max-width: 700px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
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
            gap: "1rem",
          }}
        >
          {/* Desktop nav */}
          <div
            className="nav-desktop"
            style={{
              gap: "1.5rem",
              alignItems: "center",
              flexWrap: "wrap",
              minWidth: 0,
            }}
          >
            {/* Language toggle: left of Home */}
            <LangToggle />

            {desktopLinks.map((link) => (
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
          </div>

          {/* Mobile: hamburger + theme toggle */}
          <div
            className="nav-mobile-btn"
            style={{ alignItems: "center", gap: "0.75rem", flex: 1, justifyContent: "space-between" }}
          >
            {/* Lang toggle visible on mobile bar */}
            <LangToggle small />

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
                  flexShrink: 0,
                }}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  width: "34px",
                  height: "34px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                <span style={{ display: "block", width: "16px", height: "1.5px", background: "currentColor", transition: "transform 0.2s", transform: menuOpen ? "translateY(5.5px) rotate(45deg)" : "none" }} />
                <span style={{ display: "block", width: "16px", height: "1.5px", background: "currentColor", transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: "block", width: "16px", height: "1.5px", background: "currentColor", transition: "transform 0.2s", transform: menuOpen ? "translateY(-5.5px) rotate(-45deg)" : "none" }} />
              </button>
            </div>
          </div>

          {/* Desktop theme toggle */}
          <div className="nav-desktop" style={{ alignItems: "center", flexShrink: 0 }}>
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

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid var(--border)",
              background: "var(--nav-bg)",
              backdropFilter: "blur(12px)",
              padding: "0.75rem 1.5rem 1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: pathname === link.href ? "var(--amber)" : "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "0.25rem 0",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
