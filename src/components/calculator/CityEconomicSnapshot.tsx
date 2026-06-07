import { getCityNationalBenchmark } from "@/lib/data/city-national-benchmark";
import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { formatGBP } from "@/lib/format/currency";
import { hashCitySlug } from "@/lib/seo/content-variations";
import type { UKCity } from "@/types/location";

interface CityEconomicSnapshotProps {
  city: UKCity;
}

const SNAPSHOT_OPENERS = [
  (city: UKCity, benchmark: ReturnType<typeof getCityNationalBenchmark>) =>
    `In ${city.cityName}, the modelled regional gross salary baseline stands at ${formatGBP(benchmark.cityAvgSalary)} — ${benchmark.salaryDelta >= 0 ? `${benchmark.salaryDeltaPercent}% above` : `${Math.abs(benchmark.salaryDeltaPercent)}% below`} the UK national reference of ${formatGBP(benchmark.nationalAvgSalary)}.`,
  (city: UKCity, benchmark: ReturnType<typeof getCityNationalBenchmark>) =>
    `${city.cityName} professionals on the local ${formatGBP(benchmark.cityAvgSalary)} baseline retain approximately ${formatGBP(benchmark.cityNetMonthly)} net per month after ${city.region} tax rules — a ${benchmark.netDeltaMonthly >= 0 ? "+" : ""}${formatGBP(benchmark.netDeltaMonthly)} (${benchmark.netDeltaPercent >= 0 ? "+" : ""}${benchmark.netDeltaPercent}%) variance versus the ${formatGBP(benchmark.nationalNetMonthly)} UK national monthly average.`,
  (city: UKCity, benchmark: ReturnType<typeof getCityNationalBenchmark>) =>
    `Economic modelling for ${city.cityName} (${city.region}) maps a cost-of-living index of ${benchmark.costOfLivingIndex}, Band ${benchmark.councilTaxBand} council tax near ${formatGBP(benchmark.avgCouncilTax)}/year, and housing costs absorbing ${benchmark.rentPercent}% of the ${formatGBP(benchmark.cityAvgSalary)} gross baseline.`,
];

function pickSnapshotOpener(city: UKCity) {
  const index = hashCitySlug(city.slug) % SNAPSHOT_OPENERS.length;
  return SNAPSHOT_OPENERS[index];
}

export function CityEconomicSnapshot({ city }: CityEconomicSnapshotProps) {
  const benchmark = getCityNationalBenchmark(city);
  const metrics = getCityLocalMetrics(city);
  const opener = pickSnapshotOpener(city);

  const netComparison =
    benchmark.netDeltaMonthly >= 0
      ? `${formatGBP(benchmark.netDeltaMonthly)} higher than the UK national monthly net average of ${formatGBP(benchmark.nationalNetMonthly)}`
      : `${formatGBP(Math.abs(benchmark.netDeltaMonthly))} lower than the UK national monthly net average of ${formatGBP(benchmark.nationalNetMonthly)}`;

  const salaryComparison =
    benchmark.salaryDelta >= 0
      ? `${benchmark.salaryDeltaPercent}% above the UK national gross baseline`
      : `${Math.abs(benchmark.salaryDeltaPercent)}% below the UK national gross baseline`;

  return (
    <section
      className="no-print rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="city-economic-snapshot-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Regional averages only
      </p>
      <h2
        id="city-economic-snapshot-heading"
        className="text-lg font-semibold text-slate-900 sm:text-xl"
      >
        {city.cityName} Regional Salary Benchmarks
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Area-wide economic modelling at the local average — independent of your
        calculator input above.
      </p>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
        {opener(city, benchmark)}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Local avg salary
          </dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-slate-900">
            {formatGBP(benchmark.cityAvgSalary)}
          </dd>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Net monthly (local)
          </dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-emerald-800">
            {formatGBP(benchmark.cityNetMonthly)}
          </dd>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Council tax (Band {benchmark.councilTaxBand})
          </dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-slate-900">
            {formatGBP(benchmark.avgCouncilTax)}/yr
          </dd>
        </div>
        <div className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Rent burden
          </dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-slate-900">
            {metrics.rentPercent}% gross
          </dd>
        </div>
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
        At the {city.cityName} baseline, take-home pay is {netComparison}. Gross
        earnings sit {salaryComparison}, while monthly rent at{" "}
        {formatGBP(metrics.avgRentMonthly)} and a cost-of-living index of{" "}
        {benchmark.costOfLivingIndex} shape real disposable income for
        professionals relocating to {city.region}.
      </p>
    </section>
  );
}
