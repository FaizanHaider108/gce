import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import type { UKCity } from "@/types/location";
import {
  CTA_HOOK_TEMPLATES,
  FAQ_INTRO_TEMPLATES,
  INTRO_HOOK_TEMPLATES,
  pickCityContent,
  type ContentContext,
} from "./content-variations";

function buildContext(city: UKCity): ContentContext {
  return { city, metrics: getCityLocalMetrics(city) };
}

export function getSpunIntro(city: UKCity): string {
  const ctx = buildContext(city);
  return pickCityContent(city, ctx.metrics, INTRO_HOOK_TEMPLATES)(ctx);
}

export function getSpunCtaHook(city: UKCity): string {
  const ctx = buildContext(city);
  return pickCityContent(city, ctx.metrics, CTA_HOOK_TEMPLATES)(ctx);
}

export function getSpunFaqIntro(city: UKCity): string {
  const ctx = buildContext(city);
  return pickCityContent(city, ctx.metrics, FAQ_INTRO_TEMPLATES)(ctx);
}
