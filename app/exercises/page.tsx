import { existsSync } from "node:fs";
import { join } from "node:path";
import { getWebThemes } from "@/lib/chapters";
import { ExercisesClient } from "./ExercisesClient";

function exoTexExists(themeNumber: number, lang: "fr" | "en"): boolean {
  const fileName = lang === "fr" ? "exo.tex" : "exo.tex";
  const path = join(process.cwd(), "content", "tex", `theme${themeNumber}_${lang}`, fileName);
  return existsSync(path);
}

export default function ExercisesPage() {
  const themes = getWebThemes().map((theme) => ({
    slug: theme.slug,
    number: theme.number,
    titleFr: theme.titleFr,
    titleEn: theme.titleEn,
    descriptionFr: theme.descriptionFr,
    descriptionEn: theme.descriptionEn,
    hasContentFr: exoTexExists(theme.number, "fr"),
    hasContentEn: exoTexExists(theme.number, "en"),
  }));

  return <ExercisesClient themes={themes} />;
}
