/** UK income tax & NI thresholds — 2025/26 tax year (official HMRC rates). */
export const UK_TAX_YEAR = "2025/26";

/** Standard Personal Allowance — 0% Income Tax and 0% NI on this portion. */
export const PERSONAL_ALLOWANCE = 12_570;

/** Personal Allowance tapers by £1 for every £2 earned above this gross income. */
export const PA_TAPER_THRESHOLD = 100_000;

/** Personal Allowance reaches £0 at this gross income level. */
export const PA_ZERO_THRESHOLD = 125_140;

/** Gross income ceiling for the basic-rate (20%) band. */
export const BASIC_RATE_GROSS_UPPER = 50_270;

/** Gross income ceiling for the higher-rate (40%) band. */
export const HIGHER_RATE_GROSS_UPPER = 125_140;

/** Width of the basic-rate band applied to taxable income (after PA). */
export const BASIC_RATE_BAND_WIDTH = 37_700;

/** Top of the higher-rate band applied to taxable income (after PA). */
export const HIGHER_RATE_TAXABLE_UPPER = 112_570;

export const BASIC_RATE = 0.2;
export const HIGHER_RATE = 0.4;
export const ADDITIONAL_RATE = 0.45;

/** Class 1 Employee NI — Primary Threshold (same as PA). */
export const NI_PRIMARY_THRESHOLD = 12_570;

/** Class 1 Employee NI — Upper Earnings Limit. */
export const NI_UPPER_EARNINGS_LIMIT = 50_270;

export const NI_MAIN_RATE = 0.08;
export const NI_ADDITIONAL_RATE = 0.02;

export const DEFAULT_GROSS_SALARY = 35_000;
