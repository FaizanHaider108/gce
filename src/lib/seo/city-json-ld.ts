import { getSiteUrl } from "@/lib/site/config";
import type { UKCity } from "@/types/location";

export function buildCityFinancialProductJsonLd(city: UKCity) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/salary/uk/${city.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: `Salary and Tax Calculator for ${city.cityName}`,
    description: `Programmatic financial engine calculating accurate net take-home salary, income tax, and national insurance for workers in ${city.cityName}, United Kingdom.`,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "Global Calculator Engine",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "GBP",
    },
    areaServed: {
      "@type": "City",
      name: city.cityName,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.region,
      },
    },
  };
}

export function buildCityPlaceJsonLd(city: UKCity) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/salary/uk/${city.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `Salary & Income Tax Calculator for ${city.cityName}`,
    url: pageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.cityName,
      addressRegion: city.region,
      addressCountry: "GB",
    },
    description: `Calculate take-home pay and tax deductions for professionals working in ${city.cityName}, ${city.region}, United Kingdom.`,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: city.region,
    },
  };
}
