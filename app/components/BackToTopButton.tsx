"use client";
import { useLang } from "@/app/context/LangContext";
import { useScrollThreshold } from "@/app/hooks/useScrollThreshold";

/** Keep viewport state outside the long lesson's React subtree. */
export function BackToTopButton({ lessonKey }: { lessonKey: string }) {
  const visible = useScrollThreshold(280, lessonKey);
  const { t } = useLang();
  if (!visible) return null;
  return <button
    className="lesson-back-to-top"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label={t.common.backToTop}
    title={t.common.backToTop}
    style={{
      position: "fixed", right: "1.2rem", bottom: "1.2rem",
      width: "42px", height: "42px", borderRadius: "999px",
      border: "1px solid var(--accent-border-md)", background: "var(--bg-card)",
      color: "var(--amber)", boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
      cursor: "pointer", zIndex: 40, fontSize: "1.1rem", lineHeight: 1,
    }}
  >↑</button>;
}
