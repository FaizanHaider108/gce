import {
  getCityIndustryInsight,
  getCityJobMarketInsight,
  getCityTierLabel,
} from "@/lib/seo/city-industry-insights";
import type { UKCity } from "@/types/location";

interface CityProfessionalLandscapeProps {
  city: UKCity;
}

/** SSR industry-specific economic narrative — replaces formulaic template footprints. */
export function CityProfessionalLandscape({ city }: CityProfessionalLandscapeProps) {
  const industryInsight = getCityIndustryInsight(city);
  const jobInsight = getCityJobMarketInsight(city);
  const tierLabel = getCityTierLabel(city);

  return (
    <article
      className="no-print rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="professional-landscape-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
        {tierLabel}
      </p>
      <h2
        id="professional-landscape-heading"
        className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl"
      >
        {city.cityName} Professional Landscape &amp; Earnings Drivers
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
        <p>{industryInsight}</p>
        <p>{jobInsight}</p>
      </div>
    </article>
  );
}
