import type { Metadata } from "next";
import Link from "next/link";
import {
  getCitiesGroupedByRegion,
  getUKCities,
  getUKRegions,
} from "@/lib/data/load-cities";
import { getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "UK Salary Calculators by City & Region",
  description:
    "Browse 254+ free UK salary and income tax calculators organised by region. Calculate take-home pay, Income Tax, and National Insurance for every major city and town.",
  alternates: {
    canonical: `${getSiteUrl()}/salary/uk`,
  },
};

export default function UKSalaryHubPage() {
  const cities = getUKCities();
  const regions = getUKRegions();
  const grouped = getCitiesGroupedByRegion();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          UK Salary Calculators Directory
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-500">
          Explore {cities.length} city and town calculators across{" "}
          {regions.length} UK regions. Each page includes local salary
          baselines, tax breakdowns, and affordability insights — all indexed
          for fast discovery.
        </p>
        <p className="text-sm text-slate-400">
          <Link href="/" className="font-medium text-emerald-600 hover:underline">
            ← Back to home
          </Link>
        </p>
      </header>

      <nav
        aria-label="UK regions"
        className="mt-8 flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
      >
        {regions.map((region) => (
          <a
            key={region}
            href={`#region-${region.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-md bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            {region}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        {regions.map((region) => {
          const regionCities = grouped.get(region) ?? [];

          return (
            <section
              key={region}
              id={`region-${region.toLowerCase().replace(/\s+/g, "-")}`}
              className="scroll-mt-24"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                {region}
                <span className="ml-2 text-sm font-normal text-slate-400">
                  ({regionCities.length})
                </span>
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {regionCities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/salary/uk/${city.slug}`}
                      className="block rounded-lg border border-slate-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-emerald-100 hover:text-emerald-700"
                    >
                      {city.cityName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
