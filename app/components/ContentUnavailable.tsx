"use client";
import { useLang } from "@/app/context/LangContext";
export function ContentUnavailable() {
  const {t} = useLang();
  return <div style={{maxWidth: 860, margin: "4rem auto", padding: "1.5rem"}}>
    <h1>{t.common.translationPending}</h1><p>{t.common.contentUnavailable}</p>
  </div>;
}
