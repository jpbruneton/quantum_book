"use client";
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { type Lang, translations } from "@/lib/i18n";
import { swapLocaleInPath } from "@/lib/localeRoutes";

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations.en;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LangProvider({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Lang;
}) {
  const router = useRouter();

  const setLang = (newLang: Lang) => {
    if (newLang === initialLang) {
      return;
    }
    const nextPath =
      typeof window !== "undefined"
        ? swapLocaleInPath(window.location.pathname, newLang)
        : `/${newLang}`;
    router.push(nextPath);
  };

  return (
    <LangContext.Provider
      value={{
        lang: initialLang,
        setLang,
        t: translations[initialLang] as typeof translations.en,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
