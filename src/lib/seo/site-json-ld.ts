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

export function buildSiteWideJsonLd() {
  return [buildOrganizationJsonLd(), buildWebSiteJsonLd()];
}

export function buildComplianceOrganizationNote(): string {
  return `Compliance enquiries: ${COMPLIANCE_EMAIL}`;
}
