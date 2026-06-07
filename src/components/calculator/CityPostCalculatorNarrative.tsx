import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { costOfLivingIndexBudgetPhrase } from "@/lib/format/col-index";
import { formatGBP } from "@/lib/format/currency";
import { getCityAverageSalary } from "@/lib/data/regional-salary";
import type { UKCity } from "@/types/location";

interface CityPostCalculatorNarrativeProps {
  city: UKCity;
  grossSalary?: number;
  isExplicitSalary?: boolean;
}

/**
 * SSR narrative block beneath the calculator — prevents thin-content flags.
 * Regional baseline copy only; user salary referenced separately in hero when explicit.
 */
export function CityPostCalculatorNarrative({
  city,
  grossSalary,
  isExplicitSalary = false,
}: CityPostCalculatorNarrativeProps) {
  const metrics = getCityLocalMetrics(city);
  const regionalBaseline = getCityAverageSalary(city);

  return (
    <article
      className="mt-8 rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="post-calc-narrative-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Regional context
      </p>
      <h2
        id="post-calc-narrative-heading"
        className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl"
      >
        {city.cityName} Professional Landscape &amp; Regional Earnings Drivers
      </h2>

      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
        <p>
          Among working-age residents in this localized region, senior
          professionals and specialists routinely match regional benchmarks
          before bonus distributions. Use the live engine to stress-test your
          specific salary parameters against localized council metrics.
        </p>

        {isExplicitSalary && grossSalary !== undefined && grossSalary > 0 && (
          <p>
            Your active calculation uses a {formatGBP(grossSalary)} gross
            salary input for {city.cityName}. Regional median benchmarks below
            reference the separate {formatGBP(regionalBaseline)} area average —
            not this figure.
          </p>
        )}

        <p>
          Working in {city.cityName}? With a regional gross baseline of{" "}
          {formatGBP(regionalBaseline)}, professionals in the {city.region}{" "}
          region need to factor in localized council tax allocations (Band{" "}
          {metrics.councilTaxBand}, ~{formatGBP(metrics.avgCouncilTax)}/year)
          and {costOfLivingIndexBudgetPhrase(metrics.costOfLivingIndex)}.
        </p>
      </div>
    </article>
  );
}
