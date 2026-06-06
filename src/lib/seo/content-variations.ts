import type { UKCity } from "@/types/location";

/** Deterministic hash from city slug — stable across builds and renders. */
export function hashCitySlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getCityVariationIndex(
  city: UKCity,
  variationCount: number,
): number {
  return hashCitySlug(city.slug) % variationCount;
}

export function pickVariation<T>(city: UKCity, variations: readonly T[]): T {
  return variations[getCityVariationIndex(city, variations.length)];
}

// ─── Calculator intro hooks (below H1) ───────────────────────────────────────

export const INTRO_HOOK_VARIATIONS = [
  (city: UKCity) =>
    `Model your exact ${city.region} take-home pay with our HMRC-aligned engine. Enter your annual gross salary to see Income Tax, National Insurance, pension, and student loan deductions for professionals in ${city.cityName}.`,
  (city: UKCity) =>
    `Whether you are negotiating an offer or comparing roles in ${city.cityName}, this calculator breaks down your ${city.region} net salary across weekly, monthly, and annual pay periods using current UK tax rules.`,
  (city: UKCity) =>
    `Workers across ${city.cityName} and ${city.region} use this tool to forecast net pay after statutory deductions. Adjust tax year, pension, and student loan settings to match your personal circumstances.`,
] as const;

// ─── Section heading variations ───────────────────────────────────────────────

export const COST_OF_LIVING_HEADINGS = [
  (city: UKCity) => `Cost of Living & Net Salary in ${city.cityName}`,
  (city: UKCity) => `How Far Your Pay Goes in ${city.cityName}`,
  (city: UKCity) => `${city.cityName} Living Costs vs Take-Home Pay`,
] as const;

export const JOB_MARKET_HEADINGS = [
  (city: UKCity) => `Average Job Market Trends in ${city.cityName}`,
  (city: UKCity) => `${city.region} Salary Benchmarks for ${city.cityName}`,
  (city: UKCity) => `Local Earnings Outlook — ${city.cityName}`,
] as const;

export const TAX_REGION_HEADINGS = [
  (city: UKCity) => `Tax & Take-Home Pay in ${city.region}`,
  (city: UKCity) => `Income Tax Rules for ${city.cityName} Workers`,
  (city: UKCity) => `${city.region} Tax & NI Deductions Explained`,
] as const;

export const HOUSING_INSIGHT_HEADINGS = [
  (city: UKCity) => `Local Housing & Salary Pressure in ${city.cityName}`,
  (city: UKCity) => `${city.cityName} Rent vs Net Income`,
  (city: UKCity) => `Affordability Snapshot — ${city.cityName}`,
] as const;

// ─── FAQ intro variations ─────────────────────────────────────────────────────

export const FAQ_INTRO_VARIATIONS = [
  (city: UKCity) =>
    `Practical answers about salary, tax, and National Insurance for residents of ${city.cityName} and the wider ${city.region} area.`,
  (city: UKCity) =>
    `Key questions ${city.cityName} workers ask about PAYE, Personal Allowance, and Class 1 NI — answered with ${city.region}-specific context.`,
  (city: UKCity) =>
    `Explore how UK tax rules apply to your earnings in ${city.cityName}, with figures tied to current HMRC thresholds.`,
] as const;

export const FAQ_HEADING_VARIATIONS = [
  (city: UKCity) => `Frequently Asked Questions — ${city.cityName}`,
  (city: UKCity) => `${city.cityName} Salary & Tax FAQ`,
  (city: UKCity) => `Common Tax Questions in ${city.cityName}`,
] as const;

// ─── Cost-of-living paragraph openers (spun syntax) ───────────────────────────

export const COL_OPENER_VARIATIONS = [
  (city: UKCity, region: string) =>
    `Professionals based in ${city.cityName}, ${region},`,
  (city: UKCity, region: string) =>
    `If you live and work in ${city.cityName} (${region}),`,
  (city: UKCity, region: string) =>
    `For employees rooted in ${city.cityName} within ${region},`,
] as const;
