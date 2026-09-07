import "server-only";
import { getCatalog } from "@/lib/catalog";
import { translationsFromUi, type Lang } from "@/lib/i18n";

export function getTranslations(lang: Lang) {
  return translationsFromUi(getCatalog(lang).ui);
}
