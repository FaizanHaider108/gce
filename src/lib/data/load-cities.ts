import ukCitiesDataset from "@/data/uk/uk-cities.json";
import type { UKCitiesDataset, UKCity } from "@/types/location";
import { REGION_ADJACENCY } from "./region-adjacency";

const datasets: Record<string, UKCitiesDataset> = {
  uk: ukCitiesDataset as UKCitiesDataset,
};

const RELATED_CITY_LIMIT = 5;

export function getUKCities(): UKCity[] {
  return datasets.uk.cities;
}

export function getUKCityBySlug(slug: string): UKCity | undefined {
  return getUKCities().find((city) => city.slug === slug);
}

export function getAllUKCitySlugs(): string[] {
  return getUKCities().map((city) => city.slug);
}

export function getCitiesByRegion(region: string): UKCity[] {
  return getUKCities().filter((city) => city.region === region);
}

/** All unique regions sorted alphabetically. */
export function getUKRegions(): string[] {
  const regions = new Set(getUKCities().map((city) => city.region));
  return [...regions].sort((a, b) => a.localeCompare(b, "en-GB"));
}

/** Cities grouped by region for directory hub pages. */
export function getCitiesGroupedByRegion(): Map<string, UKCity[]> {
  const grouped = new Map<string, UKCity[]>();

  for (const city of getUKCities()) {
    const list = grouped.get(city.region) ?? [];
    list.push(city);
    grouped.set(city.region, list);
  }

  for (const [region, cities] of grouped) {
    cities.sort((a, b) => a.cityName.localeCompare(b.cityName, "en-GB"));
    grouped.set(region, cities);
  }

  return grouped;
}

/**
 * Returns 4–5 related cities for internal linking.
 * Priority: same region → adjacent regions (from REGION_ADJACENCY).
 */
export function getRelatedCities(currentCity: UKCity, limit = RELATED_CITY_LIMIT): UKCity[] {
  const allCities = getUKCities();
  const related: UKCity[] = [];
  const seen = new Set<string>([currentCity.slug]);

  const addFromRegion = (region: string) => {
    for (const city of allCities) {
      if (related.length >= limit) return;
      if (city.region !== region) continue;
      if (seen.has(city.slug)) continue;
      seen.add(city.slug);
      related.push(city);
    }
  };

  addFromRegion(currentCity.region);

  const adjacentRegions = REGION_ADJACENCY[currentCity.region] ?? [];
  for (const region of adjacentRegions) {
    if (related.length >= limit) break;
    addFromRegion(region);
  }

  return related.slice(0, limit);
}

const FEATURED_SLUGS = new Set([
  "salary-calculator-london",
  "salary-calculator-manchester",
  "salary-calculator-birmingham",
  "salary-calculator-leeds",
  "salary-calculator-glasgow",
  "salary-calculator-liverpool",
  "salary-calculator-bristol",
  "salary-calculator-sheffield",
  "salary-calculator-edinburgh",
  "salary-calculator-cardiff",
  "salary-calculator-belfast",
  "salary-calculator-newcastle-upon-tyne",
  "salary-calculator-nottingham",
  "salary-calculator-leicester",
  "salary-calculator-coventry",
  "salary-calculator-brighton",
  "salary-calculator-southampton",
  "salary-calculator-portsmouth",
  "salary-calculator-oxford",
  "salary-calculator-cambridge",
  "salary-calculator-bath",
  "salary-calculator-york",
  "salary-calculator-reading",
  "salary-calculator-milton-keynes",
]);

/** Curated hub list — full dataset still generates 250+ static routes. */
export function getFeaturedUKCities(): UKCity[] {
  const cities = getUKCities();
  return cities.filter((city) => FEATURED_SLUGS.has(city.slug));
}

/**
 * Country-agnostic loader pattern — extend with getUSCities(), etc.
 */
export function getCitiesByCountry(countryCode: string): UKCity[] {
  const dataset = datasets[countryCode.toLowerCase()];
  return dataset?.cities ?? [];
}

export { getCityAverageSalary, getRegionalAverageSalary } from "./regional-salary";
