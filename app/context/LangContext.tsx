"use client";
import {createContext, useContext, useMemo} from "react";
import {useRouter} from "next/navigation";
import {translationsFromUi, type Lang, type Translations} from "@/lib/i18n";
import type {Catalog} from "@/lib/catalog";
import type {Theme} from "@/lib/chapters";
import {swapLocaleInPath} from "@/lib/localeRoutes";
interface LangContextValue {lang: Lang; setLang: (lang: Lang) => void; t: Translations; webThemes: Theme[]}
const LangContext = createContext<LangContextValue | null>(null);
export function LangProvider({children, initialLang, initialUi, initialThemes}: {
  children: React.ReactNode; initialLang: Lang; initialUi: Catalog["ui"]; initialThemes: Theme[];
}) {
  const router = useRouter();
  const t = useMemo(() => translationsFromUi(initialUi), [initialUi]);
  const setLang = (lang: Lang) => {
    if (lang !== initialLang) router.push(swapLocaleInPath(window.location.pathname, lang));
  };
  return <LangContext.Provider value={{lang: initialLang, setLang, t, webThemes: initialThemes}}>{children}</LangContext.Provider>;
}
export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("Language context must be rendered inside LangProvider");
  return context;
}
