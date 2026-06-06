import { calculateUKSalary } from "@/lib/calculators/uk";
import { hashCitySlug } from "@/lib/seo/content-variations";
import type { UKCity } from "@/types/location";
import { getCityAverageSalary } from "./regional-salary";

export interface CityLocalMetrics {
  avgSalary: number;
  rentPercent: number;
  avgCouncilTax: number;
  avgRentMonthly: number;
  netMonthly: number;
}

/** Band D council tax averages (illustrative regional baselines, GBP/year). */
const REGION_COUNCIL_TAX: Record<string, number> = {
  Scotland: 1420,
  Wales: 1980,
  "Northern Ireland": 1280,
  "Greater London": 1950,
  London: 1950,
  Kent: 2180,
  Surrey: 2240,
  "Greater Manchester": 2050,
  Merseyside: 1980,
  Lancashire: 1920,
  Yorkshire: 2010,
  "West Yorkshire": 2010,
  "South Yorkshire": 1980,
  "North Yorkshire": 2040,
  "East Riding of Yorkshire": 1990,
};

const DEFAULT_COUNCIL_TAX = 2100;

/**
 * City-specific affordability metrics derived from regional salary baselines,
 * cost-of-living index, and a deterministic slug hash for per-city uniqueness.
 */
export function getCityLocalMetrics(city: UKCity): CityLocalMetrics {
  const avgSalary = getCityAverageSalary(city);
  const costOfLivingIndex = city.metadata?.costOfLivingIndex ?? 65;
  const slugJitter = hashCitySlug(city.slug) % 7;

  const rentPercent = Math.min(
    38,
    Math.max(
      18,
      Math.round(20 + (costOfLivingIndex - 55) * 0.22 + slugJitter * 0.6),
    ),
  );

  const avgCouncilTax =
    REGION_COUNCIL_TAX[city.region] ?? DEFAULT_COUNCIL_TAX;

  const calc = calculateUKSalary(avgSalary, city.region);
  const netMonthly = calc.netSalary.monthly;
  const avgRentMonthly = Math.round(netMonthly * (rentPercent / 100));

  return {
    avgSalary,
    rentPercent,
    avgCouncilTax,
    avgRentMonthly,
    netMonthly,
  };
}
