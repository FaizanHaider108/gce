import Link from "next/link";
import { BuildingIcon } from "@/components/icons/FinanceIcons";
import { getRelatedCities } from "@/lib/data/load-cities";
import type { UKCity } from "@/types/location";

interface RelatedCitiesProps {
  city: UKCity;
}

export function RelatedCities({ city }: RelatedCitiesProps) {
  const related = getRelatedCities(city);

  if (related.length === 0) {
    return null;
  }

  return (
    <aside className="no-print mt-12 rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600">
          <BuildingIcon className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-semibold text-slate-900">
          Related Salary Calculators in {city.region}
        </h2>
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Compare take-home pay estimates for nearby cities and towns in{" "}
        {city.region} and surrounding areas.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {related.map((relatedCity) => (
          <li key={relatedCity.slug}>
            <Link
              href={`/salary/uk/${relatedCity.slug}`}
              className="inline-block rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {relatedCity.cityName}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
