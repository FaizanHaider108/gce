import {
  BuildingIcon,
  PoundSterlingIcon,
  ShieldCheckIcon,
} from "@/components/icons/FinanceIcons";
import { MetricBadge } from "@/components/ui/MetricBadge";
import { calculateUKSalary, UK_TAX_YEAR } from "@/lib/calculators/uk";
import { formatGBP } from "@/lib/format/currency";
import { buildCitySeoCluster } from "@/lib/seo/city-page-seo";
import { getDynamicIntro } from "@/lib/seo/dynamic-intro";
import type { UKCity } from "@/types/location";

interface CityCalculatorHeroProps {
  city: UKCity;
  grossSalary: number;
  isExplicitSalary: boolean;
}

/** SSR hero — H1, intro, and metric badges present in initial HTML for crawlers. */
export function CityCalculatorHero({
  city,
  grossSalary,
  isExplicitSalary,
}: CityCalculatorHeroProps) {
  const seoCluster = buildCitySeoCluster(city.cityName, {
    taxYear: UK_TAX_YEAR,
    grossSalary,
    isExplicitSalary,
  });

  const introCopy = getDynamicIntro(city, { grossSalary, isExplicitSalary });
  const results = calculateUKSalary(grossSalary, city.region);

  return (
    <header className="space-y-5">
      <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
        <span className="truncate">
          {city.region} · {UK_TAX_YEAR} Tax Year
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {seoCluster.h1}
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
        {introCopy}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <MetricBadge
          icon={<BuildingIcon className="h-4 w-4 shrink-0" />}
          label="City / Region"
          value={`${city.cityName}, ${city.region}`}
        />
        <MetricBadge
          icon={<PoundSterlingIcon className="h-4 w-4 shrink-0" />}
          label="Gross Salary"
          value={formatGBP(grossSalary)}
        />
        <MetricBadge
          icon={<ShieldCheckIcon className="h-4 w-4 shrink-0" />}
          label="Total Deductions"
          value={formatGBP(results.totalDeductions)}
        />
      </div>
    </header>
  );
}
