export interface ExerciseSearchable {
  titleTex: string;
  keywords: string[];
}

export function normalizeSearchText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s,.+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeQuery(query: string): string[] {
  const n = normalizeSearchText(query);
  if (!n) return [];
  return n.split(/\s+/).filter((t) => t.length > 0);
}

export function exerciseMatchesQuery(entry: ExerciseSearchable, query: string): boolean {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return true;
  const hayTitle = normalizeSearchText(entry.titleTex);
  const hayKw = entry.keywords.map(normalizeSearchText).join(" ");
  const hay = `${hayTitle} ${hayKw}`;
  return tokens.every((t) => hay.includes(t));
}
