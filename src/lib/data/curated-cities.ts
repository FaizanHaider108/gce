import type { UKCity } from "@/types/location";
import { UK_NATIONS, type UKNation } from "./uk-nation";
import { getUKCities } from "./load-cities";

/** High-traffic curated cities — homepage & footer (max 4–6 per nation). */
export const CURATED_NATION_SLUGS: Record<UKNation, string[]> = {
  England: [
    "salary-calculator-london",
    "salary-calculator-manchester",
    "salary-calculator-birmingham",
    "salary-calculator-leeds",
    "salary-calculator-bristol",
    "salary-calculator-liverpool",
  ],
  Scotland: [
    "salary-calculator-edinburgh",
    "salary-calculator-glasgow",
    "salary-calculator-aberdeen",
    "salary-calculator-dundee",
  ],
  Wales: [
    "salary-calculator-cardiff",
    "salary-calculator-swansea",
    "salary-calculator-newport",
    "salary-calculator-wrexham",
  ],
  "Northern Ireland": [
    "salary-calculator-belfast",
    "salary-calculator-derry",
    "salary-calculator-lisburn",
    "salary-calculator-newry",
  ],
};

const CURATED_SLUG_SET = new Set(
  Object.values(CURATED_NATION_SLUGS).flat(),
);

export function getCuratedNationCities(): Record<UKNation, UKCity[]> {
  const cities = getUKCities();
  const bySlug = new Map(cities.map((city) => [city.slug, city]));

  return {
    England: CURATED_NATION_SLUGS.England.map((slug) => bySlug.get(slug)).filter(
      (city): city is UKCity => city !== undefined,
    ),
    Scotland: CURATED_NATION_SLUGS.Scotland.map((slug) =>
      bySlug.get(slug),
    ).filter((city): city is UKCity => city !== undefined),
    Wales: CURATED_NATION_SLUGS.Wales.map((slug) => bySlug.get(slug)).filter(
      (city): city is UKCity => city !== undefined,
    ),
    "Northern Ireland": CURATED_NATION_SLUGS["Northern Ireland"]
      .map((slug) => bySlug.get(slug))
      .filter((city): city is UKCity => city !== undefined),
  };
}

export function isCuratedCity(city: UKCity): boolean {
  return CURATED_SLUG_SET.has(city.slug);
}

export function nationToAnchorId(nation: UKNation): string {
  return nation.toLowerCase().replace(/\s+/g, "-");
}

export function anchorIdToNation(anchorId: string): UKNation | null {
  const normalised = anchorId.toLowerCase().trim();
  return (
    UK_NATIONS.find((nation) => nationToAnchorId(nation) === normalised) ?? null
  );
}
