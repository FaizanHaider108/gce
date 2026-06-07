import { getCitySalaryPath } from "@/lib/data/city-routes";
import { getSiteUrl } from "@/lib/site/config";
import type { UKCity } from "@/types/location";

const PUBLISHED_DATE = "2025-06-01";
const MODIFIED_DATE = "2026-06-01";

export function buildCityBreadcrumbJsonLd(city: UKCity) {
  const siteUrl = getSiteUrl();
  const cityPath = getCitySalaryPath(city);
  const cityUrl = `${siteUrl}${cityPath}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "UK Calculator Directory",
        item: `${siteUrl}/uk-calculator-directory`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${city.cityName} Salary Calculator`,
        item: cityUrl,
      },
    ],
  };
}

export function buildCityWebPageJsonLd(city: UKCity) {
  const siteUrl = getSiteUrl();
  const cityUrl = `${siteUrl}${getCitySalaryPath(city)}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `UK Salary Calculator 2026/27 — Live Net Pay Breakdown for ${city.cityName}`,
    url: cityUrl,
    inLanguage: "en-GB",
    datePublished: PUBLISHED_DATE,
    dateModified: MODIFIED_DATE,
    isPartOf: {
      "@type": "WebSite",
      name: "Global Calculator Engine",
      url: siteUrl,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "UK Calculator Directory",
          item: `${siteUrl}/uk-calculator-directory`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${city.cityName} Salary Calculator`,
          item: cityUrl,
        },
      ],
    },
    about: {
      "@type": "Place",
      name: city.cityName,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.cityName,
        addressRegion: city.region,
        addressCountry: "UK",
      },
    },
    mainEntity: {
      "@type": "FinancialProduct",
      name: `${city.cityName} UK Salary & Take-Home Pay Calculator`,
      description:
        "Mathematical net pay simulation aligned to HMRC 2026/27 Tax Code Guidelines.",
    },
  };
}

export function buildCitySupplementalJsonLd(city: UKCity) {
  return [buildCityBreadcrumbJsonLd(city), buildCityWebPageJsonLd(city)];
}
