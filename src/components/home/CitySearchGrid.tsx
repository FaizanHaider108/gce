"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BuildingIcon } from "@/components/icons/FinanceIcons";
import type { UKCity } from "@/types/location";

interface CitySearchGridProps {
  cities: UKCity[];
}

export function CitySearchGrid({ cities }: CitySearchGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalised = query.trim().toLowerCase();
    if (!normalised) return cities;

    return cities.filter(
      (city) =>
        city.cityName.toLowerCase().includes(normalised) ||
        city.region.toLowerCase().includes(normalised) ||
        city.slug.toLowerCase().includes(normalised),
    );
  }, [cities, query]);

  return (
    <section id="cities" className="scroll-mt-24">
      <div className="mb-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            UK City Salary Calculators
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Search {cities.length} cities and towns — filter by name or region.
          </p>
        </div>
        <div className="relative">
          <label htmlFor="city-search" className="sr-only">
            Search UK cities
          </label>
          <input
            id="city-search"
            type="search"
            placeholder="Search e.g. Manchester, Scotland, Yorkshire…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-100 bg-white py-3.5 pl-4 pr-4 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        {query && (
          <p className="text-sm text-slate-500">
            Showing {filtered.length} of {cities.length} calculators
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-100 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            No cities match &ldquo;{query}&rdquo;. Try a different name or
            region.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/salary/uk/${city.slug}`}
                className="group block rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                    <BuildingIcon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-slate-900 group-hover:text-emerald-700 sm:text-lg">
                      {city.cityName}
                    </h3>
                    <p className="truncate text-sm text-slate-500">
                      {city.region}
                    </p>
                    {city.metadata?.averageSalary && (
                      <p className="mt-1 text-sm font-medium text-slate-600">
                        Avg. £
                        {city.metadata.averageSalary.toLocaleString("en-GB")}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
