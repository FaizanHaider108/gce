import { getCityCounty } from "@/lib/data/city-location";
import type { UKCity } from "@/types/location";

export interface CityFaqItem {
  id: string;
  question: string;
  answer: string;
}

function resolveCityName(city: UKCity): string {
  return city.cityName?.trim() || "your city";
}

function resolveCounty(city: UKCity): string {
  return getCityCounty(city)?.trim() || city.region?.trim() || "the UK";
}

function isScotlandCity(city: UKCity): boolean {
  return resolveCounty(city).toLowerCase() === "scotland";
}

function buildFaqAnswers(city: UKCity): { a1: string; a2: string; a3: string } {
  const cityName = resolveCityName(city);
  const county = resolveCounty(city);
  const isScotland = isScotlandCity(city);

  const a1 = isScotland
    ? `Our engine is completely synchronized with the latest HMRC tax thresholds for the 2026/27 fiscal year. For professionals in ${cityName}, it dynamically computes localized parameters, including precise Scottish tax bands, to ensure your estimated net projection is highly accurate.`
    : `Our engine is completely synchronized with the latest HMRC tax thresholds for the 2026/27 fiscal year. For professionals in ${cityName}, it computes your exact localized allowance brackets to ensure your estimated net projection is highly accurate.`;

  const a2 = isScotland
    ? `Yes. The system automatically cross-references your earnings with local financial baselines in the Scotland region, parsing specific localized tax bands and national insurance adjustments.`
    : `Yes. The system automatically cross-references your earnings with local financial baselines in the ${county} region, parsing standard UK tax thresholds and national insurance adjustments.`;

  const a3 = `Absolutely. Local enterprises, freelancers, and remote payroll managers across ${cityName} utilize this calculation layout to estimate employer liabilities, baseline gross contractor values, and accurate net contractor metrics.`;

  return { a1, a2, a3 };
}

/** Three localized FAQ items — shared by UI accordion and FAQPage JSON-LD. */
export function buildCityFaqItems(city: UKCity): CityFaqItem[] {
  const cityName = resolveCityName(city);
  const { a1, a2, a3 } = buildFaqAnswers(city);

  return [
    {
      id: "faq-accuracy",
      question: `How accurate is the 2026/27 salary calculator for ${cityName}?`,
      answer: a1,
    },
    {
      id: "faq-regional",
      question: `Does this calculator account for regional variables in ${cityName}?`,
      answer: a2,
    },
    {
      id: "faq-business",
      question: `Can businesses in ${cityName} use this tool for payroll planning?`,
      answer: a3,
    },
  ];
}
