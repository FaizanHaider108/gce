import { calculateUKSalary } from "@/lib/calculators/uk";
import { hashCitySlug } from "@/lib/seo/content-variations";
import type { UKCity } from "@/types/location";
import { getCityAverageSalary } from "./regional-salary";

export interface CityLocalMetrics {
  avgSalary: number;
  avgRentMonthly: number;
  /** ((avgRent * 12) / avgSalary) * 100 */
  rentPercent: number;
  avgCouncilTax: number;
  councilTaxBand: string;
  costOfLivingIndex: number;
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

function estimateCouncilTaxBand(costOfLivingIndex: number): string {
  if (costOfLivingIndex >= 85) return "E";
  if (costOfLivingIndex >= 75) return "D";
  if (costOfLivingIndex >= 62) return "C";
  return "B";
}

/**
 * Per-city local metrics sourced from uk-cities.json metadata (COL index)
 * plus regional salary baselines. Rent % uses the mandated gross formula.
 */
export function getCityLocalMetrics(city: UKCity): CityLocalMetrics {
  const avgSalary = getCityAverageSalary(city);
  const costOfLivingIndex = city.metadata?.costOfLivingIndex ?? 65;
  const slugJitter = hashCitySlug(city.slug) % 11;

  const avgRentMonthly = Math.round(
    620 + (costOfLivingIndex - 50) * 12 + slugJitter * 16,
  );

  const rentPercent = Math.round(
    ((avgRentMonthly * 12) / avgSalary) * 100,
  );

  const avgCouncilTax =
    REGION_COUNCIL_TAX[city.region] ?? DEFAULT_COUNCIL_TAX;

  const calc = calculateUKSalary(avgSalary, city.region);

  return {
    avgSalary,
    avgRentMonthly,
    rentPercent,
    avgCouncilTax,
    councilTaxBand: estimateCouncilTaxBand(costOfLivingIndex),
    costOfLivingIndex,
    netMonthly: calc.netSalary.monthly,
  };
}
