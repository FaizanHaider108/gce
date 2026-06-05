import Link from "next/link";
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
    <aside className="no-print mt-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">
        Related Salary Calculators in {city.region}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Compare take-home pay estimates for nearby cities and towns in{" "}
        {city.region} and surrounding areas.
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {related.map((relatedCity) => (
          <li key={relatedCity.slug}>
            <Link
              href={`/salary/uk/${relatedCity.slug}`}
              className="text-sm font-medium text-blue-600 underline-offset-2 hover:text-blue-800 hover:underline"
            >
              {relatedCity.cityName}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
