import type { UKCity } from "@/types/location";
import { getAllUKCitySlugs, getUKCities, getUKCityBySlug } from "./load-cities";

const SLUG_PREFIX = "salary-calculator-";

/** Legacy short id, e.g. `aberdeen` from `salary-calculator-aberdeen`. */
export function getCityRouteId(city: UKCity): string {
  return city.slug.startsWith(SLUG_PREFIX)
    ? city.slug.slice(SLUG_PREFIX.length)
    : city.slug;
}

export function getCitySalaryPath(city: UKCity): string {
  return `/uk-salary-calculator/${city.slug}`;
}

export function getCityLinkLabel(city: UKCity): string {
  return `Calculate Net Pay in ${city.cityName}`;
}

export const CITY_LINK_CLASS =
  "text-blue-600 hover:underline font-medium block py-1";

export function getAllUKCityRouteIds(): string[] {
  return getAllUKCitySlugs();
}

/** Resolve by full slug or legacy short id. */
export function getUKCityByRouteId(routeId: string): UKCity | undefined {
  const bySlug = getUKCityBySlug(routeId);
  if (bySlug) return bySlug;

  return getUKCities().find((city) => getCityRouteId(city) === routeId);
}
