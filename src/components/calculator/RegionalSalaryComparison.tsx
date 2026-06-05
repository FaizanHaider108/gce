"use client";

import Link from "next/link";
import { useMemo } from "react";
import { calculateUKSalary, DEFAULT_GROSS_SALARY } from "@/lib/calculators/uk";
import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { formatGBP } from "@/lib/format/currency";
import { usePersistedSalary } from "@/lib/hooks/usePersistedSalary";
import type { UKCity } from "@/types/location";

const BENCHMARK_SLUGS = [
  "salary-calculator-london",
  "salary-calculator-manchester",
  "salary-calculator-edinburgh",
] as const;

interface RegionalSalaryComparisonProps {
  currentCity: UKCity;
  benchmarkCities: UKCity[];
}

export function RegionalSalaryComparison({
  currentCity,
  benchmarkCities,
}: RegionalSalaryComparisonProps) {
  const [grossSalary] = usePersistedSalary(DEFAULT_GROSS_SALARY);

  const takeHome = useMemo(
    () => calculateUKSalary(grossSalary).netSalary.yearly,
    [grossSalary],
  );

  const currentCityAverage = useMemo(
    () => getCityAverageSalary(currentCity),
    [currentCity],
  );

  const londonAverage = useMemo(
    () =>
      getCityAverageSalary(
        benchmarkCities.find((c) => c.slug === "salary-calculator-london") ?? {
          cityName: "London",
          slug: "salary-calculator-london",
          region: "Greater London",
          country: "UK",
        },
      ),
    [benchmarkCities],
  );

  const orderedBenchmarks = useMemo(() => {
    return BENCHMARK_SLUGS.map((slug) =>
      benchmarkCities.find((city) => city.slug === slug),
    ).filter((city): city is UKCity => city !== undefined);
  }, [benchmarkCities]);

  if (orderedBenchmarks.length === 0) {
    return null;
  }

  return (
    <section
      className="no-print mt-12"
      aria-labelledby="regional-comparison-heading"
    >
      <h2
        id="regional-comparison-heading"
        className="text-xl font-semibold text-slate-900 sm:text-2xl"
      >
        How does your {currentCity.cityName} salary compare across the UK?
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Benchmark your {formatGBP(grossSalary)} gross salary against major UK
        labour markets.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-4 py-3 text-sm font-semibold text-slate-600 sm:px-6">
                City
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600 sm:px-6">
                Est. Take-Home
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600 sm:px-6">
                Local Avg. Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {orderedBenchmarks.map((city) => (
              <tr
                key={city.slug}
                className="border-b border-slate-100 last:border-b-0"
              >
                <td className="px-4 py-3 text-sm sm:px-6">
                  <Link
                    href={`/salary/uk/${city.slug}`}
                    className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    {city.cityName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium tabular-nums text-slate-900 sm:px-6">
                  {formatGBP(takeHome)}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium tabular-nums text-slate-600 sm:px-6">
                  {formatGBP(getCityAverageSalary(city))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 px-5 py-4 text-sm leading-relaxed text-slate-600">
        Earning {formatGBP(grossSalary)} in {currentCity.cityName} leaves you
        with the same baseline statutory deductions as other UK locations, but
        your purchasing power depends on the regional baseline. For instance,
        the average income threshold in London is around{" "}
        <span className="font-medium text-slate-800">
          {formatGBP(londonAverage)}
        </span>{" "}
        compared to{" "}
        <span className="font-medium text-slate-800">
          {formatGBP(currentCityAverage)}
        </span>{" "}
        in {currentCity.cityName}.
      </p>
    </section>
  );
}
