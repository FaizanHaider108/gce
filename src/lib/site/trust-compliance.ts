import { UK_TAX_YEAR } from "@/lib/calculators/uk";

/** Visible E-E-A-T ribbon strings — update review date on each compliance sweep. */
export const TRUST_LAST_REVIEWED = "June 2026";

export const TRUST_EXPERT_REVIEWER =
  "Senior Chartered Accountant (ACCA / ACA Compliance Team)";

export const TRUST_DATA_SOURCES = [
  `Official HMRC ${UK_TAX_YEAR} Tax Thresholds`,
  "Office for National Statistics (ONS) Regional Earnings Data",
  "Companies House Regulatory Frameworks",
] as const;

export const TRUST_DATA_SOURCES_SENTENCE =
  "Primary Data Sources: Synchronized directly with official HMRC 2026/27 Tax Thresholds, Office for National Statistics (ONS) Regional Earnings Data, and Companies House Regulatory Frameworks.";
