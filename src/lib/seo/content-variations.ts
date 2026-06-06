import { formatGBP } from "@/lib/format/currency";
import type { CityLocalMetrics } from "@/lib/data/city-local-metrics";
import type { UKCity } from "@/types/location";

export interface ContentContext {
  city: UKCity;
  metrics: CityLocalMetrics;
}

/** Deterministic hash from city slug — stable across builds and renders. */
export function hashCitySlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Seed combines city name length and local salary baseline per SEO spec. */
export function getContentSeed(city: UKCity, avgSalary: number): number {
  return city.cityName.length + avgSalary;
}

export function pickBySeed<T>(seed: number, variations: readonly T[]): T {
  return variations[Math.abs(seed) % variations.length];
}

export function pickCityContent<T>(
  city: UKCity,
  metrics: CityLocalMetrics,
  variations: readonly T[],
): T {
  return pickBySeed(getContentSeed(city, metrics.avgSalary), variations);
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

// ─── H1 intro paragraphs (metrics-injected, structurally distinct) ───────────

export const INTRO_HOOK_TEMPLATES = [
  (ctx: ContentContext) =>
    `With a ${formatGBP(ctx.metrics.avgSalary)} regional salary baseline and average monthly rent near ${formatGBP(ctx.metrics.avgRentMonthly)} (${ctx.metrics.rentPercent}% of gross earnings), ${ctx.city.cityName} professionals can model precise ${ctx.city.region} deductions below — Income Tax, National Insurance, pension, and student loans included.`,
  (ctx: ContentContext) =>
    `${ctx.city.cityName} sits at a cost-of-living index of ${ctx.metrics.costOfLivingIndex} (UK average = 100). Against typical Band ${ctx.metrics.councilTaxBand} council tax of ${formatGBP(ctx.metrics.avgCouncilTax)} per year, enter your gross pay to see how ${ctx.city.region} PAYE and NI reshape your monthly budget.`,
  (ctx: ContentContext) =>
    `Negotiating in ${ctx.city.cityName}? Local rent pressure absorbs roughly ${ctx.metrics.rentPercent}% of a ${formatGBP(ctx.metrics.avgSalary)} salary before living costs. Use this HMRC-aligned calculator to forecast weekly, monthly, and annual take-home pay under current ${ctx.city.region} tax rules.`,
  (ctx: ContentContext) =>
    `From ${ctx.city.region} payroll teams to remote workers relocating to ${ctx.city.cityName}, this engine maps statutory deductions against local affordability — ${formatGBP(ctx.metrics.avgRentMonthly)} average rent, ${ctx.metrics.costOfLivingIndex} COL index, and ${formatGBP(ctx.metrics.netMonthly)} indicative net monthly pay on the regional baseline.`,
] as const;

// ─── CTA banner contextual hooks ─────────────────────────────────────────────

export const CTA_HOOK_TEMPLATES = [
  (ctx: ContentContext) =>
    `At ${ctx.metrics.rentPercent}% rent-to-salary pressure and Band ${ctx.metrics.councilTaxBand} council tax near ${formatGBP(ctx.metrics.avgCouncilTax)}, ${ctx.city.cityName} earners often overpay HMRC — our chartered accountants recover margin.`,
  (ctx: ContentContext) =>
    `When ${formatGBP(ctx.metrics.avgRentMonthly)} monthly rent meets a ${ctx.metrics.costOfLivingIndex} COL index, tax planning matters in ${ctx.city.cityName}. Speak with a UK accountant on WhatsApp.`,
  (ctx: ContentContext) =>
    `High deductions on a ${formatGBP(ctx.metrics.avgSalary)} ${ctx.city.region} salary? Strategic tax planning in ${ctx.city.cityName} can improve net pay beyond the ${ctx.metrics.rentPercent}% rent burden shown above.`,
] as const;

// ─── FAQ section intros ─────────────────────────────────────────────────────

export const FAQ_INTRO_TEMPLATES = [
  (ctx: ContentContext) =>
    `Residents of ${ctx.city.cityName} earning near ${formatGBP(ctx.metrics.avgSalary)} with ${ctx.metrics.rentPercent}% gross rent pressure ask these PAYE and NI questions most often.`,
  (ctx: ContentContext) =>
    `Below are ${ctx.city.region}-specific answers tied to ${ctx.city.cityName}'s Band ${ctx.metrics.councilTaxBand} council tax baseline (${formatGBP(ctx.metrics.avgCouncilTax)}) and current HMRC thresholds.`,
  (ctx: ContentContext) =>
    `Explore how Income Tax and Class 1 NI apply in ${ctx.city.cityName} — with local context on ${formatGBP(ctx.metrics.avgRentMonthly)} rent and a COL index of ${ctx.metrics.costOfLivingIndex}.`,
] as const;

export const FAQ_HEADING_VARIATIONS = [
  (city: UKCity) => `Frequently Asked Questions — ${city.cityName}`,
  (city: UKCity) => `${city.cityName} Salary & Tax FAQ`,
  (city: UKCity) => `Common Tax Questions in ${city.cityName}`,
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
  (city: UKCity) => `${city.cityName} Rent vs Gross Income`,
  (city: UKCity) => `Affordability Snapshot — ${city.cityName}`,
] as const;

export const COL_OPENER_VARIATIONS = [
  (city: UKCity, region: string) =>
    `Professionals based in ${city.cityName}, ${region},`,
  (city: UKCity, region: string) =>
    `If you live and work in ${city.cityName} (${region}),`,
  (city: UKCity, region: string) =>
    `For employees rooted in ${city.cityName} within ${region},`,
] as const;
