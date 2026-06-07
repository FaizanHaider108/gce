import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";
import { formatSalaryForSeo } from "./city-page-seo";

/**
 * YMYL-compliant accountant CTA body — salary state must match the active calculator viewport.
 */
export function buildAccountantCtaCopy(
  city: UKCity,
  options: {
    userGrossSalary?: number;
    isExplicitSalary?: boolean;
  } = {},
): string {
  const { userGrossSalary, isExplicitSalary } = options;
  const metrics = getCityLocalMetrics(city);
  const cityName = city.cityName;
  const hasUserSalary =
    isExplicitSalary && userGrossSalary !== undefined && userGrossSalary > 0;

  if (hasUserSalary) {
    const salaryLabel = formatSalaryForSeo(userGrossSalary);
    return `On your ${salaryLabel} gross salary in ${cityName}, HMRC deductions may be eroding more take-home pay than necessary. Our accredited UK tax accountants review ${salaryLabel} PAYE structures, reclaim overpaid tax, and legally optimise your net income — connect on WhatsApp for a confidential ${cityName} tax assessment.`;
  }

  const benchmarkLabel = formatGBP(metrics.avgSalary);
  return `Professionals earning near the ${benchmarkLabel} typical benchmark salary in ${cityName} routinely overpay HMRC without structured tax planning. Our chartered UK accountants help ${cityName} residents legally reduce deductions against local Band ${metrics.councilTaxBand} council tax and ${metrics.rentPercent}% rent pressure — speak with a specialist via WhatsApp today.`;
}
