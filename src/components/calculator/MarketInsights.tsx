import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";

const DEFAULT_AVERAGE_SALARY = 34_000;

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
  const averageSalary = city.metadata?.averageSalary ?? DEFAULT_AVERAGE_SALARY;

  return (
    <aside className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-700">
        Market Insights
      </h2>
      <p className="mt-3 text-base leading-relaxed text-slate-700">
        Did you know? The average salary in{" "}
        <span className="font-medium text-slate-900">{city.cityName}</span> is
        roughly{" "}
        <span className="font-medium text-slate-900">
          {formatGBP(averageSalary)}
        </span>
        . {getComparisonText(grossSalary, averageSalary, city.region)}
      </p>
    </aside>
  );
}
