import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { formatGBP } from "@/lib/format/currency";
import {
  HOUSING_INSIGHT_HEADINGS,
  pickVariation,
} from "@/lib/seo/content-variations";
import type { UKCity } from "@/types/location";

interface CityLocalInsightProps {
  city: UKCity;
}

export function CityLocalInsight({ city }: CityLocalInsightProps) {
  const metrics = getCityLocalMetrics(city);
  const heading = pickVariation(city, HOUSING_INSIGHT_HEADINGS)(city);

  return (
    <section
      className="no-print rounded-xl border border-slate-100 bg-slate-50/80 px-5 py-4"
      aria-labelledby="local-insight-heading"
    >
      <h2
        id="local-insight-heading"
        className="text-lg font-semibold text-slate-900"
      >
        {heading}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        Based on the{" "}
        <strong className="font-medium text-slate-800">
          {formatGBP(metrics.avgSalary)}
        </strong>{" "}
        average salary in {city.cityName}, annual rent (
        {formatGBP(metrics.avgRentMonthly)}/mo) consumes{" "}
        <strong className="font-medium text-slate-800">
          {metrics.rentPercent}%
        </strong>{" "}
        of gross earnings — with a cost-of-living index of{" "}
        {metrics.costOfLivingIndex} and indicative net monthly pay of{" "}
        {formatGBP(metrics.netMonthly)}. Band {metrics.councilTaxBand} council
        tax in {city.region} averages{" "}
        <strong className="font-medium text-slate-800">
          {formatGBP(metrics.avgCouncilTax)}
        </strong>{" "}
        per year.
      </p>
    </section>
  );
}
