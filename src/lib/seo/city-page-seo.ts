import { UK_TAX_YEAR } from "@/lib/calculators/uk";

export type CitySeoMode = "directory" | "calculation";

export interface CitySeoCluster {
  mode: CitySeoMode;
  title: string;
  h1: string;
  description: string;
}

/** Whole-pound SEO formatting — e.g. £65,700 */
export function formatSalaryForSeo(amount: number): string {
  return `£${Math.round(amount).toLocaleString("en-GB")}`;
}

export function buildCitySeoCluster(
  location: string,
  options: {
    taxYear?: string;
    grossSalary?: number;
    isExplicitSalary?: boolean;
  } = {},
): CitySeoCluster {
  const taxYear = options.taxYear ?? UK_TAX_YEAR;
  const { grossSalary, isExplicitSalary } = options;
  const hasActiveSalary =
    isExplicitSalary && grossSalary !== undefined && grossSalary > 0;

  if (hasActiveSalary) {
    const salaryLabel = formatSalaryForSeo(grossSalary);
    return {
      mode: "calculation",
      title: `Take Home Pay on a ${salaryLabel} Salary in ${location} (${taxYear})`,
      h1: `UK Salary Calculator ${taxYear} — ${salaryLabel} Net Pay Breakdown for ${location}`,
      description: `See your monthly, weekly, and annual net take-home pay on a ${salaryLabel} gross salary under the official ${taxYear} HMRC tax rules for ${location}.`,
    };
  }

  return {
    mode: "directory",
    title: `${location} Salary Calculator | Take Home Pay ${taxYear}`,
    h1: `UK Salary Calculator ${taxYear} — Live Net Pay Breakdown for ${location}`,
    description: `Calculate your exact UK take-home pay, net income tax, and National Insurance contributions in ${location} for the ${taxYear} tax year.`,
  };
}
