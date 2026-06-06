import { getCitySalaryPath } from "@/lib/data/city-routes";
import { getCityCounty } from "@/lib/data/city-location";
import { buildCityFaqItems } from "@/lib/seo/city-faq-content";
import { getSiteUrl } from "@/lib/site/config";
import type { UKCity } from "@/types/location";

function cityPageUrl(city: UKCity): string {
  return `${getSiteUrl()}${getCitySalaryPath(city)}`;
}

const FINANCIAL_SERVICE_KNOWS_ABOUT = [
  "UK Income Tax",
  "HMRC Tax Bands 2026/27",
  "National Insurance Deductions",
  "Corporate Tax Compliance",
  "VAT Returns",
] as const;

/** YMYL dual schema: SoftwareApplication + FinancialService per city page. */
export function buildCityDualJsonLd(city: UKCity) {
  const pageUrl = cityPageUrl(city);

  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `Global Calculator Engine - ${city.cityName?.trim() || "UK City"} Edition`,
      url: pageUrl,
      operatingSystem: "All",
      applicationCategory: "BusinessApplication",
      description: `Localized HMRC 2026/27 compliant tax simulation engine mapping precise net pay metrics for ${city.cityName?.trim() || "UK"} professionals.`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      name: "UK Chartered Accounting & Corporate Tax Advisory",
      url: pageUrl,
      description: `HMRC-authorized financial solutions managing VAT Returns, CT600 Corporation Tax, and Strategic Payroll Operations in ${city.cityName?.trim() || "the UK"}.`,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.cityName?.trim() || "United Kingdom",
        addressRegion: getCityCounty(city),
        addressCountry: "UK",
      },
      knowsAbout: [...FINANCIAL_SERVICE_KNOWS_ABOUT],
      priceRange: "££",
    },
  ];
}

/** FAQPage schema for city landing pages — mirrors accordion Q&A content. */
export function buildCityFaqJsonLd(city: UKCity) {
  const items = buildCityFaqItems(city);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
