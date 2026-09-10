"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import { useLang } from "@/app/context/LangContext";
import type { Lang } from "@/lib/i18n";
import { useLocalizedPath } from "@/lib/useLocalizedPath";
import { swapLocaleInPath } from "@/lib/localeRoutes";
import { useEffect, useRef, useState } from "react";

const MORE_LANGUAGES: { code: Exclude<Lang, "fr" | "en">; flag: string; nativeName: string }[] = [
  { code: "de", flag: "🇩🇪", nativeName: "Deutsch" },
  { code: "es", flag: "🇪🇸", nativeName: "Español" },
  { code: "pt", flag: "🇵🇹", nativeName: "Português" },
  { code: "it", flag: "🇮🇹", nativeName: "Italiano" },
  { code: "pl", flag: "🇵🇱", nativeName: "Polski" },
  { code: "ru", flag: "🇷🇺", nativeName: "Русский" },
  { code: "zh", flag: "🇨🇳", nativeName: "中文" },
  { code: "ja", flag: "🇯🇵", nativeName: "日本語" },
  { code: "ko", flag: "🇰🇷", nativeName: "한국어" },
  { code: "hi", flag: "🇮🇳", nativeName: "हिन्दी" },
  { code: "vi", flag: "🇻🇳", nativeName: "Tiếng Việt" },
  { code: "ar", flag: "🇸🇦", nativeName: "العربية" },
  { code: "id", flag: "🇮🇩", nativeName: "Bahasa Indonesia" },
  { code: "tr", flag: "🇹🇷", nativeName: "Türkçe" },
  { code: "bn", flag: "🇧🇩", nativeName: "বাংলা" },
  { code: "ur", flag: "🇵🇰", nativeName: "اردو" },
  { code: "sw", flag: "🇹🇿", nativeName: "Kiswahili" },
  { code: "fa", flag: "🇮🇷", nativeName: "فارسی" },
];

const MORE_LABELS: Record<Lang, string> = {
  fr: "Plus…",
  en: "More…",
  de: "Mehr…",
  es: "Más…",
  pt: "Mais…",
  it: "Altro…",
  pl: "Więcej…",
  ru: "Ещё…",
  zh: "更多…",
  ja: "その他…",
  ko: "더 보기…",
  hi: "और…",
  vi: "Thêm…",
  ar: "المزيد…",
  id: "Lainnya…",
  tr: "Daha fazla…",
  bn: "আরও…",
  ur: "مزید…",
  sw: "Zaidi…",
  fa: "بیشتر…",
};

function MoreLanguagesMenu({
  lang,
  onSelect,
  small,
}: {
  lang: Lang;
  onSelect: (lang: Lang) => void;
  small?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickAway = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickAway);
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        containerRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickAway);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const moreLabel = MORE_LABELS[lang] ?? "More…";

  return (
    <div ref={containerRef} style={{ position: small ? "static" : "relative", flexShrink: 0 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={small ? moreLabel : undefined}
        style={{
          background: "transparent",
          color: "var(--text-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          padding: small ? "0.45rem 0" : "0.35rem 0.65rem",
          width: small ? "42px" : undefined,
          cursor: "pointer",
          fontFamily: "var(--font-inter)",
          fontSize: small ? "0.8rem" : "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.3rem",
          lineHeight: 1,
        }}
      >
        {small ? "+" : moreLabel}
        {!small && <span style={{ fontSize: "0.65em" }}>{open ? "▲" : "▼"}</span>}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 0.4rem)",
            insetInlineStart: 0,
            zIndex: 60,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            padding: "0.4rem",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(120px, 1fr))",
            gap: "0.15rem",
            minWidth: "260px",
            maxHeight: "calc(100dvh - 84px)",
            overflowY: "auto",
          }}
        >
          {MORE_LANGUAGES.map(({ code, flag, nativeName }) => (
            <button
              key={code}
              aria-pressed={lang === code}
              lang={code}
              type="button"
              onClick={() => {
                setOpen(false);
                onSelect(code);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "transparent",
                border: "none",
                borderRadius: "4px",
                padding: "0.4rem 0.5rem",
                cursor: "pointer",
                textAlign: "start",
                fontFamily: "var(--font-inter)",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--accent-bg-xs, rgba(200,150,60,0.08))")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}
            >
              <span aria-hidden="true" style={{ fontSize: "1.1rem", lineHeight: 1 }}>{flag}</span>
              <span dir="auto">{nativeName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { lang, t } = useLang();
  const lp = useLocalizedPath();
  const [menuOpen, setMenuOpen] = useState(false);

  const desktopLinks = [
    { href: lp("/"), label: t.nav.home },
    { href: lp("/chapters"), label: t.nav.chapters },
    { href: lp("/exercises"), label: t.nav.exercises },
    { href: lp("/quiz"), label: t.nav.quiz },
    { href: lp("/glossary"), label: t.nav.glossary },
    { href: lp("/about"), label: t.nav.about },
  ];

  const mobileLinks = desktopLinks;

  const langLabels: Record<"en" | "fr", string> = {
    fr: "Français",
    en: "English",
  };

  const langLabelsShort: Record<"en" | "fr", string> = {
    fr: "FR",
    en: "EN",
  };

  const switchLang = (nextLang: Lang) => {
    setMenuOpen(false);
    if (nextLang === lang) return;
    router.push(swapLocaleInPath(pathname, nextLang) + window.location.search + window.location.hash);
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
          aria-pressed={lang === l}
          type="button"
          onClick={() => switchLang(l)}
          style={{
            background: lang === l ? "var(--amber)" : "transparent",
            color: lang === l ? (theme === "dark" ? "#0a0b0f" : "#ffffff") : "var(--text-secondary)",
            border: "none",
            width: small ? "42px" : undefined,
            padding: small ? "0.45rem 0.75rem" : "0.35rem 0.65rem",
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "background 0.2s, color 0.2s",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {small ? langLabelsShort[l] : langLabels[l]}
        </button>
      ))}
    </div>
  );

  return (
    <>
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
            {/* Language toggle + more-languages menu, stacked and flush */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              <LangToggle />
              <MoreLanguagesMenu lang={lang} onSelect={switchLang} />
            </div>

            {desktopLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${pathname === link.href ? " nav-link-active" : ""}`}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.09em",
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
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
              <LangToggle small />
              <MoreLanguagesMenu lang={lang} onSelect={switchLang} small />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? t.common.lightMode : t.common.darkMode}
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
                aria-label={t.common.toggleMenu}
                aria-expanded={menuOpen}
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
          <div className="nav-desktop" style={{ alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? t.common.lightMode : t.common.darkMode}
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
            className="nav-mobile-btn"
            style={{
              borderTop: "1px solid var(--border)",
              background: "var(--nav-bg)",
              backdropFilter: "blur(12px)",
              padding: "0.75rem 1.5rem 1rem",
              flexDirection: "column",
              gap: "0.75rem",
              maxHeight: "calc(100dvh - 64px)",
              overflowY: "auto",
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
