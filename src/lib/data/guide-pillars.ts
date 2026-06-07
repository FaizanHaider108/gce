export interface GuidePillar {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  readMinutes: number;
}

export const GUIDE_PILLARS: GuidePillar[] = [
  {
    slug: "uk-tax-national-insurance-guide-2026",
    title: "UK Tax & National Insurance Comprehensive Guide 2026",
    shortDescription:
      "Complete walkthrough of PAYE Income Tax bands, Class 1 NI thresholds, Scottish rates, and student loan deductions for the 2026/27 tax year.",
    category: "Tax Compliance",
    readMinutes: 12,
  },
  {
    slug: "uk-regional-salary-benchmarking-guide",
    title: "The Definitive UK Regional Salary & Wage Benchmarking Guide",
    shortDescription:
      "How ONS regional earnings data maps to city-level baselines — and how to compare gross offers across England, Scotland, Wales, and Northern Ireland.",
    category: "Salary Data",
    readMinutes: 10,
  },
  {
    slug: "uk-cost-of-living-municipalities-guide",
    title: "Cost of Living Variations Across Major UK Municipalities",
    shortDescription:
      "Council tax bands, rental pressure indices, and disposable income modelling across 254+ UK cities using verified COL benchmarks.",
    category: "Affordability",
    readMinutes: 9,
  },
  {
    slug: "uk-salary-negotiation-career-guide",
    title: "Professional Salary Negotiation & Career Progression Strategies",
    shortDescription:
      "Evidence-based tactics for negotiating gross packages, pension sacrifice, and bonus structures without sacrificing net take-home pay.",
    category: "Career Strategy",
    readMinutes: 11,
  },
  {
    slug: "uk-highest-paying-occupations-guide",
    title: "Highest Paying Occupations and In-Demand Skills in the UK Market",
    shortDescription:
      "Sector-by-sector analysis of technology, finance, engineering, healthcare, and public sector earnings trajectories for 2026.",
    category: "Labour Market",
    readMinutes: 13,
  },
];

export function getGuideBySlug(slug: string): GuidePillar | undefined {
  return GUIDE_PILLARS.find((guide) => guide.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDE_PILLARS.map((guide) => guide.slug);
}

export function getGuidePath(slug: string): string {
  return `/guides/${slug}`;
}
