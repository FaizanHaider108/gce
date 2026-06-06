import { getSiteUrl } from "@/lib/site/config";
import type { AccountingService } from "@/lib/data/services";

export function buildServiceJsonLd(service: AccountingService) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/services/${service.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: service.title,
      url: pageUrl,
      description: service.shortDescription,
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
      priceRange: "££",
      knowsAbout: [
        "UK Tax Law",
        "HMRC Compliance",
        "Chartered Accounting",
        "VAT Returns",
        "Corporation Tax",
      ],
      provider: {
        "@type": "Organization",
        name: "Global Calculator Engine",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `Global Calculator Engine — ${service.title}`,
      url: pageUrl,
      description: service.shortDescription,
      address: {
        "@type": "PostalAddress",
        addressCountry: "UK",
      },
      priceRange: "££",
      currenciesAccepted: "GBP",
    },
  ];
}
