import {
  getCityEconomicBenchmark,
  getCityWageBenchmarkCopy,
} from "@/lib/data/city-economic-metadata";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";

interface CityWageBenchmarkingProps {
  city: UKCity;
}

/** SSR static wage benchmark block — unique per-city economic tokens in initial HTML. */
export function CityWageBenchmarking({ city }: CityWageBenchmarkingProps) {
  const benchmark = getCityEconomicBenchmark(city);
  const narrative = getCityWageBenchmarkCopy(city);

  return (
    <article
      className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="wage-benchmark-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Regional averages only
      </p>
      <h2
        id="wage-benchmark-heading"
        className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl"
      >
        Official {city.cityName} Wage Benchmarking &amp; Economic Drivers
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            City median salary
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums text-slate-900">
            {formatGBP(benchmark.cityMedianSalary)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Dominant sectors
          </p>
          <p className="mt-1 text-sm font-medium leading-snug text-slate-700">
            {benchmark.dominantSectors}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
        {narrative}
      </p>
    </article>
  );
}
