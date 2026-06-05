import { TrendingUpIcon } from "@/components/icons/FinanceIcons";
import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";

interface MarketInsightsProps {
  city: UKCity;
  grossSalary: number;
}

function getComparisonText(
  grossSalary: number,
  averageSalary: number,
  region: string,
): string {
  const formatted = formatGBP(grossSalary);

  if (grossSalary > averageSalary * 1.05) {
    return `If you are earning ${formatted}, you are earning above the local baseline for the ${region} area.`;
  }

  if (grossSalary < averageSalary * 0.95) {
    return `If you are earning ${formatted}, you are earning below the local baseline for the ${region} area.`;
  }

  return `If you are earning ${formatted}, you are close to the local baseline for the ${region} area.`;
}

export function MarketInsights({ city, grossSalary }: MarketInsightsProps) {
  const averageSalary = getCityAverageSalary(city);

  return (
    <aside className="no-print rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start space-x-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <TrendingUpIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="flex items-center space-x-2 text-sm font-semibold uppercase tracking-wider text-slate-900">
            <span>Market Insights</span>
          </h2>
          <p className="mt-2 text-base leading-relaxed text-slate-500">
            Did you know? The average salary in{" "}
            <span className="font-medium text-slate-800">{city.cityName}</span>{" "}
            is roughly{" "}
            <span className="font-medium text-emerald-600">
              {formatGBP(averageSalary)}
            </span>{" "}
            based on {city.region} regional economic data.{" "}
            {getComparisonText(grossSalary, averageSalary, city.region)}
          </p>
        </div>
      </div>
    </aside>
  );
}
