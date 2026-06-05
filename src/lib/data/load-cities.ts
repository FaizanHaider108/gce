import ukCitiesDataset from "@/data/uk/uk-cities.json";
import type { UKCitiesDataset, UKCity } from "@/types/location";

const datasets: Record<string, UKCitiesDataset> = {
  uk: ukCitiesDataset as UKCitiesDataset,
};

export function getUKCities(): UKCity[] {
  return datasets.uk.cities;
}

export function getUKCityBySlug(slug: string): UKCity | undefined {
  return getUKCities().find((city) => city.slug === slug);
}

export function getAllUKCitySlugs(): string[] {
  return getUKCities().map((city) => city.slug);
}

/**
 * Country-agnostic loader pattern — extend with getUSCities(), etc.
 */
export function getCitiesByCountry(countryCode: string): UKCity[] {
  const dataset = datasets[countryCode.toLowerCase()];
  return dataset?.cities ?? [];
}
