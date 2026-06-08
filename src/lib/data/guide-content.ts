import { UK_TAX_YEAR } from "@/lib/calculators/uk";

export interface GuideArticle {
  slug: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export const GUIDE_ARTICLES: Record<string, GuideArticle> = {
  "uk-tax-national-insurance-guide-2026": {
    slug: "uk-tax-national-insurance-guide-2026",
    sections: [
      {
        heading: "Understanding PAYE Income Tax in 2026/27",
        paragraphs: [
          `UK employees pay Income Tax through Pay As You Earn (PAYE). For the ${UK_TAX_YEAR} tax year, the Personal Allowance remains the foundation of every calculation — earnings below this threshold incur no Income Tax. Above it, England, Wales, and Northern Ireland use standard UK bands (basic 20%, higher 40%, additional 45%), while Scotland applies its own devolved band structure.`,
          "Global Calculator Engine synchronizes every city page against published HMRC thresholds weekly. When you enter a gross salary, the engine computes band-by-band tax, applies Personal Allowance taper for high earners above £100,000, and outputs weekly, monthly, and annual net figures.",
        ],
      },
      {
        heading: "Class 1 National Insurance",
        paragraphs: [
          "National Insurance is UK-wide — Scottish residents pay the same Class 1 employee NI as England. The main rate applies between the Primary Threshold and Upper Earnings Limit; an additional 2% rate applies above the UEL. Employer NI is separate and not included in take-home calculations on this platform.",
          "Student loan repayments (Plans 1, 2, 4, and Postgraduate) are deducted after tax and NI, calculated as a percentage of earnings above plan-specific thresholds.",
        ],
      },
    ],
  },
  "uk-regional-salary-benchmarking-guide": {
    slug: "uk-regional-salary-benchmarking-guide",
    sections: [
      {
        heading: "How Regional Baselines Are Constructed",
        paragraphs: [
          "Global Calculator Engine does not copy stale per-city JSON averages. Instead, each of the 254+ city pages applies a region-tier economic model — Greater London, South East, Mid Tier, and Baseline — with deterministic micro-variance per city name to prevent artificial salary bucketing.",
          "ONS Annual Survey of Hours and Earnings (ASHE) regional datasets inform our tier boundaries. When comparing Manchester against London, always model net pay under the correct tax jurisdiction rather than comparing gross alone.",
        ],
      },
      {
        heading: "Using City Calculators for Relocation",
        paragraphs: [
          "Select your destination city calculator, enter your offer gross, and compare the net monthly figure against your current city. The Regional Averages section on each page shows area-wide benchmarks independent of your personal input.",
        ],
      },
    ],
  },
  "uk-cost-of-living-municipalities-guide": {
    slug: "uk-cost-of-living-municipalities-guide",
    sections: [
      {
        heading: "Cost-of-Living Index Methodology",
        paragraphs: [
          "Each city carries a cost-of-living index where the UK average equals 100. Indices below 65 typically indicate affordable housing markets; indices above 85 signal premium rental pressure. Rent burden is expressed as a percentage of the regional gross salary baseline.",
          "Council tax Band estimates derive from regional Band D averages published by local authority statistical releases. These are illustrative — your actual band depends on property valuation.",
        ],
      },
    ],
  },
  "uk-salary-negotiation-career-guide": {
    slug: "uk-salary-negotiation-career-guide",
    sections: [
      {
        heading: "Negotiate on Net, Not Gross",
        paragraphs: [
          "A £5,000 gross increase can yield less than £3,000 net once higher-rate tax and NI acceleration apply. Before accepting any offer, run it through the city-specific calculator on this platform with pension percent and student loan plan configured.",
          "Salary sacrifice pension contributions reduce adjusted gross before tax — sometimes preserving Personal Allowance for earners near the £100,000 taper zone.",
        ],
      },
    ],
  },
  "uk-highest-paying-occupations-guide": {
    slug: "uk-highest-paying-occupations-guide",
    sections: [
      {
        heading: "Sector Earnings Leaders in 2026",
        paragraphs: [
          "Technology and financial services dominate Tier-1 metro earnings — software engineering, quantitative analysis, and audit partnership tracks routinely exceed regional medians by 40–80%. Manufacturing hubs compensate through stability, overtime, and pension rather than variable bonus.",
          "Healthcare consultants, specialist nurses, and NHS band 8a+ managers form the public-sector ceiling. Use city-tier industry insights on each calculator page to contextualize your sector against local employer mix.",
        ],
      },
    ],
  },
};
