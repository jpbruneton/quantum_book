"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { bookMeta } from "@/lib/chapters";

const links = [
  { href: "/", label: "Home" },
  { href: "/chapters", label: "Chapters" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(10,11,15,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(245,158,11,0.1)",
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
            color: "#f1f5f9",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: "var(--amber)" }}>Ψ</span> {bookMeta.title}
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
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
          <Link
            href="/chapters"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "var(--amber)",
              padding: "0.4rem 1rem",
              borderRadius: "4px",
              fontFamily: "var(--font-inter)",
              fontSize: "0.8rem",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "background 0.2s",
            }}
          >
            Read Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
