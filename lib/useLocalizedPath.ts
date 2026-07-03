"use client";

import { useLang } from "@/app/context/LangContext";
import { localizedPath } from "@/lib/localeRoutes";

export function useLocalizedPath() {
  const { lang } = useLang();
  return (path: string) => localizedPath(lang, path);
}
