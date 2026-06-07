import Link from "next/link";
import { BuildingIcon } from "@/components/icons/FinanceIcons";
import { getCityLinkLabel, getCitySalaryPath } from "@/lib/data/city-routes";
import { getNearbyCities } from "@/lib/data/nearby-cities";
import type { UKCity } from "@/types/location";

interface NearbyCitiesProps {
  city: UKCity;
}

/** Static SSR anchor links — top 10 geographically clustered nearby calculators. */
export function NearbyCities({ city }: NearbyCitiesProps) {
  const nearby = getNearbyCities(city);

  if (nearby.length === 0) {
    return null;
  }

  return (
    <aside className="no-print mt-12 rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center space-x-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
          <BuildingIcon className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-semibold text-slate-900">
          Nearby Salary Calculators — {city.region}
        </h2>
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Compare take-home pay across the closest cities and towns near{" "}
        {city.cityName}. All links are fully crawlable — no JavaScript required.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {nearby.map((nearbyCity) => (
          <li key={nearbyCity.slug}>
            <a
              href={getCitySalaryPath(nearbyCity)}
              className="block rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {getCityLinkLabel(nearbyCity)}
              <span className="mt-0.5 block text-xs font-normal text-slate-400">
                {nearbyCity.region}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm">
        <Link
          href="/uk-calculator-directory/regions"
          className="font-semibold text-emerald-600 hover:underline"
        >
          Browse all UK regions &amp; 254+ city calculators →
        </Link>
      </p>
    </aside>
  );
}
