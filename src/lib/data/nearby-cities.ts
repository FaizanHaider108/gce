import type { UKCity } from "@/types/location";
import { REGION_ADJACENCY } from "./region-adjacency";
import { getCitiesByRegion, getUKCities } from "./load-cities";

const NEARBY_CITY_LIMIT = 10;

/**
 * Returns up to 10 geographically clustered cities for static internal linking.
 * Priority: alphabetical neighbours within the same region, then adjacent regions.
 */
export function getNearbyCities(
  currentCity: UKCity,
  limit = NEARBY_CITY_LIMIT,
): UKCity[] {
  const nearby: UKCity[] = [];
  const seen = new Set<string>([currentCity.slug]);

  const addCity = (city: UKCity) => {
    if (nearby.length >= limit) return;
    if (seen.has(city.slug)) return;
    seen.add(city.slug);
    nearby.push(city);
  };

  const regionCities = getCitiesByRegion(currentCity.region).sort((a, b) =>
    a.cityName.localeCompare(b.cityName, "en-GB"),
  );

  const currentIndex = regionCities.findIndex(
    (city) => city.slug === currentCity.slug,
  );

  if (currentIndex >= 0) {
    for (let offset = 1; offset < regionCities.length; offset++) {
      if (nearby.length >= limit) break;
      const before = regionCities[currentIndex - offset];
      const after = regionCities[currentIndex + offset];
      if (before) addCity(before);
      if (after) addCity(after);
    }
  } else {
    for (const city of regionCities) {
      if (nearby.length >= limit) break;
      addCity(city);
    }
  }

  const adjacentRegions = REGION_ADJACENCY[currentCity.region] ?? [];
  for (const region of adjacentRegions) {
    if (nearby.length >= limit) break;
    for (const city of getCitiesByRegion(region)) {
      if (nearby.length >= limit) break;
      addCity(city);
    }
  }

  if (nearby.length < limit) {
    for (const city of getUKCities()) {
      if (nearby.length >= limit) break;
      addCity(city);
    }
  }

  return nearby.slice(0, limit);
}
