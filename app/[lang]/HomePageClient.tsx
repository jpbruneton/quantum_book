"use client";
import Link from "next/link";
import Image from "next/image";
import { type Theme } from "@/lib/chapters";
import { useLang } from "@/app/context/LangContext";
import { useLocalizedPath } from "@/lib/useLocalizedPath";

export default function HomePageClient({ webThemes }: { webThemes: Theme[] }) {
  const { t, lang } = useLang();
  const lp = useLocalizedPath();
  const book = t.book;
  const paragraphs = book.description.split(/\n\n+/).map(text => text.trim()).filter(Boolean);
  return (
    <div className="quantum-home">
      <section className="home-welcome" aria-labelledby="home-title">
        <div className="home-welcome-inner">
          <div className="home-welcome-heading">
            <p className="home-eyebrow">{t.home.badge}</p>
            <h1 id="home-title">{book.title}</h1>
            {book.subtitle.trim() && <p className="home-welcome-subtitle">{book.subtitle}</p>}
          </div>
          <div className="home-welcome-cover">
            <Image src="/figs/front.png" alt={book.title} width={300} height={400}
              priority sizes="(max-width: 640px) 80px, (max-width: 900px) 180px, 260px" />
          </div>
          <nav className="home-entry-links" aria-label={t.home.contentsLabel}>
            <Link className="home-entry-link home-entry-primary" prefetch={false} href={lp("/chapters")}>
              <span>{t.nav.chapters}</span><span className="home-entry-arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="home-entry-link" prefetch={false} href={lp("/exercises")}>
              <span>{t.nav.exercises}</span><span className="home-entry-arrow" aria-hidden="true">→</span>
            </Link>
          </nav>
          <div className="home-welcome-summary">
            {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <Link className="home-about-link" prefetch={false} href={lp("/about")}>{t.home.aboutBook}</Link>
          </div>
        </div>
      </section>
      <section className="home-theme-section" aria-labelledby="home-themes-title">
        <div className="home-theme-inner">
          <p className="home-eyebrow">{t.home.contentsLabel}</p>
          <h2 id="home-themes-title">{t.home.exploreTitle}</h2>
          <div className="home-theme-grid">
            {webThemes.map(theme => (
              <Link key={theme.slug} className="home-theme-card chapter-card" prefetch={false}
                href={lp(`/chapters/${theme.slug}`)}>
                <span className="home-theme-number">{t.home.themePrefix} {String(theme.number).padStart(2, "0")}</span>
                <h3>{lang === "fr" ? theme.titleFr : theme.titleEn}</h3>
                <p>{lang === "fr" ? theme.descriptionFr : theme.descriptionEn}</p>
                <span className="home-theme-open">{t.home.readTheme}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
