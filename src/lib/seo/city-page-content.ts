import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import type { UKCity } from "@/types/location";
import { getCityIndustryInsight } from "./city-industry-insights";
import {
  CTA_HOOK_TEMPLATES,
  FAQ_INTRO_TEMPLATES,
  pickCityContent,
  type ContentContext,
} from "./content-variations";

function buildContext(city: UKCity): ContentContext {
  return { city, metrics: getCityLocalMetrics(city) };
}

/** Benchmark-mode hero intro — tier-specific industry narrative, not formulaic templates. */
export function getSpunIntro(city: UKCity): string {
  return getCityIndustryInsight(city);
}

export function getSpunCtaHook(city: UKCity): string {
  const ctx = buildContext(city);
  return pickCityContent(city, ctx.metrics, CTA_HOOK_TEMPLATES)(ctx);
}

export function getSpunFaqIntro(city: UKCity): string {
  const ctx = buildContext(city);
  return pickCityContent(city, ctx.metrics, FAQ_INTRO_TEMPLATES)(ctx);
}
