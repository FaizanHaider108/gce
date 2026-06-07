"use client";

import { calculateUKSalary } from "@/lib/calculators/uk";
import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { formatGBP } from "@/lib/format/currency";
import { getCityTierLabel } from "@/lib/seo/city-industry-insights";
import type { UKCity } from "@/types/location";

interface UserSalaryLandscapeProps {
  city: UKCity;
  grossSalary: number;
}

function rentPercentOfSalary(annualRent: number, gross: number): number {
  return Math.round((annualRent / gross) * 100);
}

/**
 * Active user-input narrative — every token references the entered gross salary only.
 * Rendered exclusively when isExplicitSalary is true inside the calculator block.
 */
export function UserSalaryLandscape({
  city,
  grossSalary,
}: UserSalaryLandscapeProps) {
  const metrics = getCityLocalMetrics(city);
  const calc = calculateUKSalary(grossSalary, city.region);
  const rentPercent = rentPercentOfSalary(metrics.avgRentMonthly * 12, grossSalary);
  const tierLabel = getCityTierLabel(city);

  return (
    <aside
      className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5 sm:p-6"
      aria-labelledby="user-salary-landscape-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
        Your active calculation · {tierLabel}
      </p>
      <h2
        id="user-salary-landscape-heading"
        className="mt-1 text-lg font-semibold text-slate-900"
      >
        Earnings Context for Your {formatGBP(grossSalary)} Salary in{" "}
        {city.cityName}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        Among professionals in {city.cityName}, senior earners at your specified{" "}
        {formatGBP(grossSalary)} gross package — before bonus or pension
        sacrifice — face an estimated {rentPercent}% rent burden against local
        tenancy costs of {formatGBP(metrics.avgRentMonthly)}/month. Under{" "}
        {city.region} tax rules, your modelled net monthly take-home is{" "}
        {formatGBP(calc.netSalary.monthly)} with total deductions of{" "}
        {formatGBP(calc.totalDeductions)} on this exact {formatGBP(grossSalary)}{" "}
        input.
      </p>
    </aside>
  );
}
