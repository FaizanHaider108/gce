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

/** Three localized FAQ items — shared by UI accordion and FAQPage JSON-LD. */
export function buildCityFaqItems(city: UKCity): CityFaqItem[] {
  const cityName = resolveCityName(city);
  const county = resolveCounty(city);

  return [
    {
      id: "faq-accuracy",
      question: `How accurate is the 2026/27 salary calculator for ${cityName}?`,
      answer: `Our engine is completely synchronized with the latest HMRC tax thresholds for the 2026/27 fiscal year. For professionals in ${cityName}, it dynamically computes localized parameters, including precise Scottish tax bands if applicable, to ensure your estimated net projection is highly accurate.`,
    },
    {
      id: "faq-regional",
      question: `Does this calculator account for regional variables in ${cityName}?`,
      answer: `Yes. The system automatically cross-references your earnings with local financial baselines in the ${county} region, parsing localized tax allocations and national insurance adjustments to verify your exact net take-home envelope.`,
    },
    {
      id: "faq-business",
      question: `Can businesses in ${cityName} use this tool for payroll planning?`,
      answer: `Absolutely. Local enterprises, freelancers, and remote payroll managers across ${cityName} utilize this calculation layout to estimate employer liabilities, baseline gross contractor values, and accurate net contractor metrics.`,
    },
  ];
}
