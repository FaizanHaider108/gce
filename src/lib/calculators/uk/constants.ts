/** UK income tax & NI thresholds — default 2026/27 tax year (official HMRC rates). */
export { DEFAULT_TAX_YEAR, UK_TAX_YEAR } from "./tax-year-config";

import { getTaxYearConfig } from "./tax-year-config";

const config = getTaxYearConfig();

/** Standard Personal Allowance — 0% Income Tax and 0% NI on this portion. */
export const PERSONAL_ALLOWANCE = config.personalAllowance;

/** Personal Allowance tapers by £1 for every £2 earned above this gross income. */
export const PA_TAPER_THRESHOLD = config.paTaperThreshold;

/** Personal Allowance reaches £0 at this gross income level. */
export const PA_ZERO_THRESHOLD = config.paZeroThreshold;

/** Gross income ceiling for the basic-rate (20%) band. */
export const BASIC_RATE_GROSS_UPPER = 50_270;

/** Gross income ceiling for the higher-rate (40%) band. */
export const HIGHER_RATE_GROSS_UPPER = config.paZeroThreshold;

/** Width of the basic-rate band applied to taxable income (after PA). */
export const BASIC_RATE_BAND_WIDTH = config.basicRateBandWidth;

/** Top of the higher-rate band applied to taxable income (after PA). */
export const HIGHER_RATE_TAXABLE_UPPER = config.higherRateTaxableUpper;

export const BASIC_RATE = config.basicRate;
export const HIGHER_RATE = config.higherRate;
export const ADDITIONAL_RATE = config.additionalRate;

/** Class 1 Employee NI — Primary Threshold (same as PA). */
export const NI_PRIMARY_THRESHOLD = config.niPrimaryThreshold;

/** Class 1 Employee NI — Upper Earnings Limit. */
export const NI_UPPER_EARNINGS_LIMIT = config.niUpperEarningsLimit;

export const NI_MAIN_RATE = config.niMainRate;
export const NI_ADDITIONAL_RATE = config.niAdditionalRate;

export const DEFAULT_GROSS_SALARY = 35_000;
