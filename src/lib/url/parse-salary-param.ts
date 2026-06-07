/** Parse `?salary=` query param — shared by server pages and client loaders. */
export function parseSalaryParam(raw: string | null | undefined): number | undefined {
  if (!raw) return undefined;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 0) return undefined;
  return parsed;
}
