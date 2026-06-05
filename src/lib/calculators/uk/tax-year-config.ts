import type { TaxYearId } from "@/types/calculator";

export interface ScottishTaxConfig {
  starterUpper: number;
  basicUpper: number;
  intermediateUpper: number;
  higherUpper: number;
  advancedUpper: number;
  starterRate: number;
  basicRate: number;
  intermediateRate: number;
  higherRate: number;
  advancedRate: number;
  topRate: number;
}

export interface StudentLoanConfig {
  plan1Threshold: number;
  plan2Threshold: number;
  plan5Threshold: number;
  postgraduateThreshold: number;
  undergraduateRate: number;
  postgraduateRate: number;
}

export interface TaxYearConfig {
  id: TaxYearId;
  label: string;
  isCurrent: boolean;
  personalAllowance: number;
  paTaperThreshold: number;
  paZeroThreshold: number;
  basicRateBandWidth: number;
  higherRateTaxableUpper: number;
  basicRate: number;
  higherRate: number;
  additionalRate: number;
  niPrimaryThreshold: number;
  niUpperEarningsLimit: number;
  niMainRate: number;
  niAdditionalRate: number;
  scottish: ScottishTaxConfig;
  studentLoan: StudentLoanConfig;
}

/** Scottish Income Tax 2025/26 — gross earnings upper thresholds. */
const SCOTTISH_2025_26: ScottishTaxConfig = {
  starterUpper: 15_397,
  basicUpper: 27_491,
  intermediateUpper: 43_662,
  higherUpper: 75_000,
  advancedUpper: 125_140,
  starterRate: 0.19,
  basicRate: 0.2,
  intermediateRate: 0.21,
  higherRate: 0.42,
  advancedRate: 0.45,
  topRate: 0.48,
};

/**
 * Scottish Income Tax 2026/27 — statutory gross earnings upper thresholds.
 * Starter £12,571–£16,537 (£3,967) | Basic £16,538–£29,526 (£12,988)
 * | Intermediate £29,527–£43,662 | Higher £43,663–£75,000
 * | Advanced £75,001–£125,140 | Top above £125,140.
 */
const SCOTTISH_2026_27: ScottishTaxConfig = {
  starterUpper: 16_537,
  basicUpper: 29_526,
  intermediateUpper: 43_662,
  higherUpper: 75_000,
  advancedUpper: 125_140,
  starterRate: 0.19,
  basicRate: 0.2,
  intermediateRate: 0.21,
  higherRate: 0.42,
  advancedRate: 0.45,
  topRate: 0.48,
};

const STUDENT_LOAN_2025_26: StudentLoanConfig = {
  plan1Threshold: 24_930,
  plan2Threshold: 27_295,
  plan5Threshold: 25_000,
  postgraduateThreshold: 21_000,
  undergraduateRate: 0.09,
  postgraduateRate: 0.06,
};

const STUDENT_LOAN_2026_27: StudentLoanConfig = {
  plan1Threshold: 24_930,
  plan2Threshold: 28_470,
  plan5Threshold: 25_000,
  postgraduateThreshold: 21_000,
  undergraduateRate: 0.09,
  postgraduateRate: 0.06,
};

const BASE_THRESHOLDS = {
  personalAllowance: 12_570,
  paTaperThreshold: 100_000,
  paZeroThreshold: 125_140,
  basicRateBandWidth: 37_700,
  higherRateTaxableUpper: 112_570,
  basicRate: 0.2,
  higherRate: 0.4,
  additionalRate: 0.45,
  niPrimaryThreshold: 12_570,
  niUpperEarningsLimit: 50_270,
  niMainRate: 0.08,
  niAdditionalRate: 0.02,
};

export const TAX_YEAR_CONFIGS: Record<TaxYearId, TaxYearConfig> = {
  "2025/26": {
    id: "2025/26",
    label: "2025/26",
    isCurrent: false,
    ...BASE_THRESHOLDS,
    scottish: SCOTTISH_2025_26,
    studentLoan: STUDENT_LOAN_2025_26,
  },
  "2026/27": {
    id: "2026/27",
    label: "2026/27 (Current)",
    isCurrent: true,
    ...BASE_THRESHOLDS,
    scottish: SCOTTISH_2026_27,
    studentLoan: STUDENT_LOAN_2026_27,
  },
};

export const DEFAULT_TAX_YEAR: TaxYearId = "2026/27";
export const UK_TAX_YEAR = DEFAULT_TAX_YEAR;

export function getTaxYearConfig(taxYear: TaxYearId = DEFAULT_TAX_YEAR): TaxYearConfig {
  return TAX_YEAR_CONFIGS[taxYear];
}

export const TAX_YEAR_OPTIONS = Object.values(TAX_YEAR_CONFIGS).map((config) => ({
  value: config.id,
  label: config.label,
}));
