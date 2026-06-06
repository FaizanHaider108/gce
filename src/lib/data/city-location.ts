import type { UKCity } from "@/types/location";

/**
 * Administrative county / region label for schema and local SEO.
 * Maps from city metadata — never a hardcoded HQ address.
 */
export function getCityCounty(city: UKCity): string {
  return city.region;
}
