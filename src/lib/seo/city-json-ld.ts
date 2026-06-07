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

/** YMYL multi-layer schema matrix for city pages — SSR in layout. */
export function buildCityDualJsonLd(city: UKCity) {
  const pageUrl = cityPageUrl(city);
  const cityLabel = city.cityName?.trim() || "UK City";

  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `Global Calculator Engine - ${cityLabel} Edition`,
      url: pageUrl,
      operatingSystem: "All",
      applicationCategory: "BusinessApplication",
      description: `Localized HMRC 2026/27 compliant tax simulation engine mapping precise net pay metrics for ${cityLabel} professionals.`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      name: "UK Chartered Accounting & Corporate Tax Advisory",
      url: pageUrl,
      description: `HMRC-authorized financial solutions managing VAT Returns, CT600 Corporation Tax, and Strategic Payroll Operations in ${cityLabel}.`,
      address: {
        "@type": "PostalAddress",
        addressLocality: cityLabel,
        addressRegion: getCityCounty(city),
        addressCountry: "UK",
      },
      knowsAbout: [...FINANCIAL_SERVICE_KNOWS_ABOUT],
      priceRange: "££",
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `HMRC-Aligned Salary Advisory — ${cityLabel}`,
      url: pageUrl,
      description:
        "YMYL compliant take-home pay modelling aligned to HMRC 2026/27 Tax Code Guidelines.",
      areaServed: {
        "@type": "City",
        name: cityLabel,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: getCityCounty(city),
        },
      },
      knowsAbout: [
        "HMRC 2026/27 Tax Code Guidelines",
        "UK Income Tax",
        "National Insurance",
        "Take-Home Pay",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: `${cityLabel} UK Salary & Take-Home Pay Calculator`,
      url: pageUrl,
      description:
        "Mathematical net pay simulation aligned to HMRC 2026/27 Tax Code Guidelines.",
      category: "Tax Calculator",
      provider: {
        "@type": "Organization",
        name: "Global Calculator Engine",
        url: getSiteUrl(),
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
        availability: "https://schema.org/InStock",
      },
    },
  ];
}

/** FAQPage schema for city landing pages — mirrors accordion Q&A content. */
export function buildCityFaqJsonLd(city: UKCity) {
  return generateFAQSchema(city);
}

/** FAQPage JSON-LD generator — identical text block to UI accordion. */
export function generateFAQSchema(city: UKCity) {
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
