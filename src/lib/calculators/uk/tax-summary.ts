import { PERSONAL_ALLOWANCE } from "./constants";
import { DEFAULT_TAX_YEAR } from "./tax-year-config";
import { calculateUKSalary } from "./tax-engine";

export interface UKTaxSummary {
  personalAllowance: number;
  incomeTax: number;
  nationalInsurance: number;
  netTakeHome: number;
}

/**
 * City-page tax matrix summary for 2026/27.
 * Delegates to the full HMRC-aligned engine (Scottish bands when applicable).
 */
export function calculateUKTax(
  grossSalary: number,
  isScotland: boolean,
): UKTaxSummary {
  const region = isScotland ? "Scotland" : "England";
  const result = calculateUKSalary(grossSalary, region, {
    taxYear: DEFAULT_TAX_YEAR,
  });

  return {
    personalAllowance: PERSONAL_ALLOWANCE,
    incomeTax: result.incomeTax.total,
    nationalInsurance: result.nationalInsurance.total,
    netTakeHome: result.netSalary.yearly,
  };
}
