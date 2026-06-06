import type { UKCity } from "@/types/location";

export type UKNation = "England" | "Scotland" | "Wales" | "Northern Ireland";

export const UK_NATIONS: UKNation[] = [
  "England",
  "Scotland",
  "Wales",
  "Northern Ireland",
];

export function getUKNation(region: string): UKNation {
  if (region === "Scotland") return "Scotland";
  if (region === "Wales") return "Wales";
  if (region === "Northern Ireland") return "Northern Ireland";
  return "England";
}

export function groupCitiesByNation(
  cities: UKCity[],
): Record<UKNation, UKCity[]> {
  const grouped: Record<UKNation, UKCity[]> = {
    England: [],
    Scotland: [],
    Wales: [],
    "Northern Ireland": [],
  };

  for (const city of cities) {
    grouped[getUKNation(city.region)].push(city);
  }

  for (const nation of UK_NATIONS) {
    grouped[nation].sort((a, b) =>
      a.cityName.localeCompare(b.cityName, "en-GB"),
    );
  }

  return grouped;
}
