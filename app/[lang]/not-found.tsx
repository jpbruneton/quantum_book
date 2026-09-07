"use client";

import Link from "next/link";
import { useLang } from "@/app/context/LangContext";

export default function NotFound() {
  const { lang, t } = useLang();
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "5rem",
          color: "rgba(245,158,11,0.15)",
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: "1rem",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "2rem",
          fontWeight: 700,
          color: "#f1f5f9",
          marginBottom: "1rem",
        }}
      >
        {t.common.notFoundTitle}
      </h1>
      <p
        style={{
          fontFamily: "var(--font-crimson)",
          color: "var(--text-secondary)",
          marginBottom: "2rem",
          maxWidth: "400px",
        }}
      >
        {t.common.notFoundBody}
      </p>
      <Link
        href={`/${lang}`}
        style={{
          background: "var(--amber)",
          color: "#0a0b0f",
          padding: "0.75rem 1.75rem",
          borderRadius: "6px",
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {t.common.backHome}
      </Link>
    </div>
  );
}
