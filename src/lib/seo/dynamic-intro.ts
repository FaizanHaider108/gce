import { calculateUKSalary } from "@/lib/calculators/uk";
import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";
import { pickVariation } from "./content-variations";
import { getSpunIntro } from "./city-page-content";

function rentPercentOfSalary(annualRent: number, grossSalary: number): number {
  return Math.round((annualRent / grossSalary) * 100);
}

const USER_INTRO_TEMPLATES = [
  (
    city: UKCity,
    grossSalary: number,
    rentPercent: number,
    netMonthly: number,
  ) =>
    `Negotiating in ${city.cityName}? Local rent pressure absorbs roughly ${rentPercent}% of a ${formatGBP(grossSalary)} salary before living costs. Use this HMRC-aligned calculator to forecast your ${formatGBP(netMonthly)} indicative net monthly pay under current ${city.region} tax rules.`,
  (
    city: UKCity,
    grossSalary: number,
    rentPercent: number,
    netMonthly: number,
  ) =>
    `On your ${formatGBP(grossSalary)} gross salary in ${city.cityName}, estimated rent (${formatGBP(getCityLocalMetrics(city).avgRentMonthly)}/mo) represents ${rentPercent}% of earnings — with indicative net monthly take-home near ${formatGBP(netMonthly)} after ${city.region} Income Tax and National Insurance.`,
  (
    city: UKCity,
    grossSalary: number,
    rentPercent: number,
    _netMonthly: number,
  ) =>
    `Modelling ${formatGBP(grossSalary)} in ${city.cityName}? At a cost-of-living index of ${getCityLocalMetrics(city).costOfLivingIndex}, housing costs consume roughly ${rentPercent}% of your gross pay. Enter pension and student loan options below for a precise ${city.region} breakdown.`,
] as const;

/**
 * Hero subheadline — uses the active user salary when explicit, otherwise regional benchmark intro.
 */
export function getDynamicIntro(
  city: UKCity,
  options: {
    grossSalary: number;
    isExplicitSalary: boolean;
  },
): string {
  const { grossSalary, isExplicitSalary } = options;

  if (!isExplicitSalary || grossSalary <= 0) {
    return getSpunIntro(city);
  }

  const metrics = getCityLocalMetrics(city);
  const rentPercent = rentPercentOfSalary(
    metrics.avgRentMonthly * 12,
    grossSalary,
  );
  const calc = calculateUKSalary(grossSalary, city.region);
  const template = pickVariation(city, USER_INTRO_TEMPLATES);

  return template(city, grossSalary, rentPercent, calc.netSalary.monthly);
}

/** One-line regional benchmark disclaimer for sections below the calculator. */
export function getRegionalBenchmarkDisclaimer(city: UKCity): string {
  const avg = getCityAverageSalary(city);
  return `The sections below reference the ${formatGBP(avg)} regional average salary for ${city.cityName} — not your active calculator input above.`;
}
