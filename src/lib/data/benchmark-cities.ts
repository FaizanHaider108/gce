import { getUKCityBySlug } from "./load-cities";
import type { UKCity } from "@/types/location";

const BENCHMARK_SLUGS = [
  "salary-calculator-london",
  "salary-calculator-manchester",
  "salary-calculator-edinburgh",
] as const;

/** Resolves the 3 UK benchmark cities for regional salary comparison. */
export function getBenchmarkCities(): UKCity[] {
  return BENCHMARK_SLUGS.map((slug) => getUKCityBySlug(slug)).filter(
    (city): city is UKCity => city !== undefined,
  );
}
