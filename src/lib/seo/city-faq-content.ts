import { getCityCounty } from "@/lib/data/city-location";
import type { UKCity } from "@/types/location";

export interface CityFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CityFaqData {
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
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

/** Exact populated FAQ matrix — shared by UI accordion and FAQPage JSON-LD. */
export function buildCityFaqData(city: UKCity): CityFaqData {
  const cityName = resolveCityName(city);
  const county = resolveCounty(city);
  const isScotland = isScotlandCity(city);

  return {
    q1: `How accurate is the 2026/27 salary calculator for ${cityName}?`,
    a1: isScotland
      ? `Our engine is completely synchronized with the latest HMRC tax thresholds for the 2026/27 fiscal year. For professionals in ${cityName}, it dynamically computes localized parameters, including precise Scottish tax bands, to ensure your estimated net projection is highly accurate.`
      : `Our engine is completely synchronized with the latest HMRC tax thresholds for the 2026/27 fiscal year. For professionals in ${cityName}, it computes your exact localized allowance brackets to ensure your estimated net projection is highly accurate.`,

    q2: `Does this calculator account for regional variables in ${cityName}?`,
    a2: isScotland
      ? `Yes. The system automatically cross-references your earnings with local financial baselines in the Scotland region, parsing specific localized tax bands, regional council tax metrics, and updated National Insurance thresholds to ensure absolute compliance.`
      : `Yes. The system automatically cross-references your earnings with local financial baselines in the ${county} region, parsing standard UK tax thresholds, regional cost variations, and updated National Insurance thresholds to ensure absolute compliance.`,

    q3: `Can businesses in ${cityName} use this tool for payroll planning?`,
    a3: `Absolutely. Local enterprises, freelancers, and remote payroll managers across ${cityName} utilize this calculation layout to estimate monthly employer liabilities, baseline gross contractor values, statutory pension parameters, and accurate net employee metrics before corporate submissions.`,
  };
}

/** Three localized FAQ items for accordion rendering. */
export function buildCityFaqItems(city: UKCity): CityFaqItem[] {
  const faq = buildCityFaqData(city);

  return [
    { id: "faq-accuracy", question: faq.q1, answer: faq.a1 },
    { id: "faq-regional", question: faq.q2, answer: faq.a2 },
    { id: "faq-business", question: faq.q3, answer: faq.a3 },
  ];
}
