import {
  COMPLIANCE_EMAIL,
  CORPORATE_EMAIL,
  getSiteUrl,
} from "@/lib/site/config";

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Global Calculator Engine",
    url: siteUrl,
    logo: `${siteUrl}/favicon-96x96.png`,
    email: CORPORATE_EMAIL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CORPORATE_EMAIL,
        availableLanguage: ["English"],
        areaServed: "GB",
      },
      {
        "@type": "ContactPoint",
        contactType: "compliance",
        email: COMPLIANCE_EMAIL,
        availableLanguage: ["English"],
        areaServed: "GB",
      },
    ],
    sameAs: [siteUrl],
    description:
      "UK salary calculator and chartered accounting services platform aligned to HMRC 2026/27 standards.",
    knowsAbout: [
      "UK Income Tax",
      "HMRC Compliance",
      "Chartered Accounting",
      "ACCA Standards",
    ],
  };
}

export function buildWebSiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Global Calculator Engine",
    url: siteUrl,
    inLanguage: "en-GB",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/uk-calculator-directory?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Platform-level FinancialService — YMYL trust signal for crawlers. */
export function buildPlatformFinancialServiceJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Global Calculator Engine",
    description: "HMRC-aligned UK Salary and Take-Home Pay Calculator",
    url: siteUrl,
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    knowsAbout: [
      "UK Income Tax",
      "HMRC Tax Compliance",
      "National Insurance",
      "Take-Home Pay",
    ],
  };
}

/** Platform ProfessionalService — YMYL trust signal in root layout head. */
export function buildPlatformProfessionalServiceJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Global Calculator Engine — HMRC-Aligned Financial Tools",
    url: siteUrl,
    description:
      "YMYL compliant UK salary calculators aligned to HMRC 2026/27 Tax Code Guidelines.",
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    knowsAbout: [
      "HMRC 2026/27 Tax Code Guidelines",
      "UK Income Tax",
      "National Insurance",
      "Chartered Accounting",
    ],
  };
}

/** Platform FinancialProduct — calculator product schema for financial crawlers. */
export function buildPlatformFinancialProductJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "UK Salary Calculator 2026/27",
    url: siteUrl,
    description:
      "Free take-home pay calculator aligned to HMRC 2026/27 Tax Code Guidelines.",
    category: "Tax Calculator",
    provider: {
      "@type": "Organization",
      name: "Global Calculator Engine",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
  };
}

export function buildSiteWideJsonLd() {
  return [
    buildOrganizationJsonLd(),
    buildWebSiteJsonLd(),
    buildPlatformFinancialServiceJsonLd(),
    buildPlatformProfessionalServiceJsonLd(),
    buildPlatformFinancialProductJsonLd(),
  ];
}

export function buildComplianceOrganizationNote(): string {
  return `Compliance enquiries: ${COMPLIANCE_EMAIL}`;
}
