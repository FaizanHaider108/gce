export {
  calculateUKSalary,
  calculatePersonalAllowanceLegacy as calculatePersonalAllowance,
  isScottishRegion,
} from "./tax-engine";
export {
  ADDITIONAL_RATE,
  BASIC_RATE,
  BASIC_RATE_GROSS_UPPER,
  DEFAULT_GROSS_SALARY,
  HIGHER_RATE,
  HIGHER_RATE_GROSS_UPPER,
  NI_ADDITIONAL_RATE,
  NI_MAIN_RATE,
  NI_PRIMARY_THRESHOLD,
  NI_UPPER_EARNINGS_LIMIT,
  PA_TAPER_THRESHOLD,
  PA_ZERO_THRESHOLD,
  PERSONAL_ALLOWANCE,
  UK_TAX_YEAR,
} from "./constants";
export {
  DEFAULT_TAX_YEAR,
  getTaxYearConfig,
  TAX_YEAR_CONFIGS,
  TAX_YEAR_OPTIONS,
} from "./tax-year-config";
