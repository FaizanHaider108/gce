import { getCityEconomicBenchmark } from "@/lib/data/city-economic-metadata";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";

interface CitySalaryIntentComparisonProps {
  city: UKCity;
  grossSalary: number;
  isExplicitSalary: boolean;
}

/**
 * SSR salary intent evaluation — contrasts URL/user salary against city median.
 * Rendered server-side from searchParams for crawler-visible conditional copy.
 */
export function CitySalaryIntentComparison({
  city,
  grossSalary,
  isExplicitSalary,
}: CitySalaryIntentComparisonProps) {
  const { cityMedianSalary } = getCityEconomicBenchmark(city);
  const medianLabel = formatGBP(cityMedianSalary);
  const salaryLabel = formatGBP(grossSalary);

  let evaluation: string;

  if (!isExplicitSalary) {
    evaluation = `Enter your gross salary in the calculator above to compare your package against the ${city.cityName} regional median of ${medianLabel}. Every adjustment recalculates Income Tax, National Insurance, and net take-home against ${city.region} bands in real time.`;
  } else if (grossSalary > cityMedianSalary) {
    evaluation = `Your custom calculated gross salary of ${salaryLabel} places your net purchasing power comfortably above the local ${city.cityName} regional average benchmark of ${medianLabel}.`;
  } else if (grossSalary < cityMedianSalary) {
    evaluation = `Your custom calculated gross salary of ${salaryLabel} tracks below the local ${city.cityName} regional economic median of ${medianLabel}, making smart budget planning against local council tax bands essential.`;
  } else {
    evaluation = `Your custom calculated gross salary of ${salaryLabel} aligns closely with the ${city.cityName} regional economic median of ${medianLabel} — use the breakdown above to model pension sacrifice and student loan impacts on net cash flow.`;
  }

  return (
    <section
      className="rounded-xl border border-slate-200 bg-slate-50/90 px-5 py-4 sm:px-6 sm:py-5"
      aria-labelledby="salary-intent-heading"
    >
      <h2
        id="salary-intent-heading"
        className="text-base font-semibold text-slate-900 sm:text-lg"
      >
        How Your Salary Compares in {city.cityName}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
        {evaluation}
      </p>
    </section>
  );
}
