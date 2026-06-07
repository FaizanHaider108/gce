import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { formatGBP } from "@/lib/format/currency";
import {
  getCityIndustryInsight,
  getCityJobMarketInsight,
  getCityTierLabel,
} from "@/lib/seo/city-industry-insights";
import type { UKCity } from "@/types/location";

interface CityProfessionalLandscapeProps {
  city: UKCity;
}

/**
 * SSR regional-baseline narrative only — no user salary state.
 * Isolated from the active calculator block to prevent variable cross-fire.
 */
export function CityProfessionalLandscape({ city }: CityProfessionalLandscapeProps) {
  const industryInsight = getCityIndustryInsight(city);
  const jobInsight = getCityJobMarketInsight(city);
  const tierLabel = getCityTierLabel(city);
  const regionalBaseline = getCityAverageSalary(city);

  return (
    <article
      className="no-print rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="professional-landscape-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Regional averages only
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
        {tierLabel}
      </p>
      <h2
        id="professional-landscape-heading"
        className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl"
      >
        {city.cityName} Regional Economic Baseline — Professional Landscape
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        All figures below reference the {formatGBP(regionalBaseline)} area
        median only. They do not reflect salary values entered in the calculator
        above.
      </p>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
        <p>{industryInsight}</p>
        <p>{jobInsight}</p>
      </div>
    </article>
  );
}
