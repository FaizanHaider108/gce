import { hashCitySlug } from "@/lib/seo/content-variations";
import type { UKCity } from "@/types/location";

export type CityEconomicTier =
  | "major_metro"
  | "manufacturing_hub"
  | "coastal_service"
  | "regional_professional";

const MAJOR_METRO_SLUGS = new Set([
  "salary-calculator-london",
  "salary-calculator-manchester",
  "salary-calculator-edinburgh",
  "salary-calculator-birmingham",
  "salary-calculator-leeds",
  "salary-calculator-glasgow",
  "salary-calculator-bristol",
  "salary-calculator-liverpool",
  "salary-calculator-cardiff",
  "salary-calculator-belfast",
  "salary-calculator-cambridge",
  "salary-calculator-oxford",
  "salary-calculator-reading",
  "salary-calculator-newcastle-upon-tyne",
  "salary-calculator-nottingham",
  "salary-calculator-southampton",
  "salary-calculator-brighton",
]);

const MANUFACTURING_REGIONS = new Set([
  "West Midlands",
  "South Yorkshire",
  "West Yorkshire",
  "Lancashire",
  "Greater Manchester",
  "Merseyside",
  "Tyne and Wear",
  "North East England",
  "Staffordshire",
  "Derbyshire",
  "Nottinghamshire",
  "Leicestershire",
]);

const COASTAL_REGIONS = new Set([
  "Cornwall",
  "Devon",
  "Dorset",
  "Norfolk",
  "Suffolk",
  "East Sussex",
  "West Sussex",
  "Kent",
  "Hampshire",
  "Isle of Wight",
]);

const MANUFACTURING_CITY_KEYWORDS = [
  "sheffield",
  "stoke",
  "coventry",
  "derby",
  "hull",
  "middlesbrough",
  "sunderland",
  "blackburn",
  "burnley",
  "rochdale",
  "oldham",
  "bolton",
  "wigan",
  "swansea",
  "port",
  "plymouth",
];

export function getCityEconomicTier(city: UKCity): CityEconomicTier {
  if (MAJOR_METRO_SLUGS.has(city.slug)) {
    return "major_metro";
  }

  const slugId = city.slug.replace("salary-calculator-", "");
  if (
    MANUFACTURING_CITY_KEYWORDS.some((keyword) => slugId.includes(keyword)) ||
    (MANUFACTURING_REGIONS.has(city.region) &&
      (city.metadata?.population ?? 200_000) >= 90_000)
  ) {
    return "manufacturing_hub";
  }

  const population = city.metadata?.population ?? 0;
  const col = city.metadata?.costOfLivingIndex ?? 65;

  if (
    COASTAL_REGIONS.has(city.region) ||
    population < 105_000 ||
    (col < 62 && population < 140_000)
  ) {
    return "coastal_service";
  }

  return "regional_professional";
}

export function pickTierVariantIndex(
  city: UKCity,
  variantCount: number,
): number {
  const tier = getCityEconomicTier(city);
  const tierSeed = hashCitySlug(city.slug) + tier.length * 17;
  return tierSeed % variantCount;
}
