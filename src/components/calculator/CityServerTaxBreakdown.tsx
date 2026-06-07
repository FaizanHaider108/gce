import { ShieldCheckIcon } from "@/components/icons/FinanceIcons";
import { calculateUKSalary, UK_TAX_YEAR } from "@/lib/calculators/uk";
import type { UKCity } from "@/types/location";
import { ResultsTable } from "./ResultsTable";

interface CityServerTaxBreakdownProps {
  city: UKCity;
  grossSalary: number;
}

/**
 * SSR tax schedule — full bracket rows in initial HTML for non-JS crawlers.
 * Hidden after client hydration; live calculator table takes over for users.
 */
export function CityServerTaxBreakdown({
  city,
  grossSalary,
}: CityServerTaxBreakdownProps) {
  const results = calculateUKSalary(grossSalary, city.region);

  return (
    <div id="ssr-tax-breakdown" className="mt-8">
      <div className="mb-4 flex items-center space-x-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
          <ShieldCheckIcon className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-semibold text-slate-900">
          Tax &amp; Deductions Breakdown
          <span className="ml-2 text-sm font-normal text-slate-400">
            ({UK_TAX_YEAR})
          </span>
        </h2>
      </div>
      <ResultsTable results={results} />
    </div>
  );
}
