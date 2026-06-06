"use client";



import Link from "next/link";

import { useMemo, useState } from "react";

import {

  CITY_LINK_CLASS,

  getCityLinkLabel,

  getCityRouteId,

  getCitySalaryPath,

} from "@/lib/data/city-routes";

import { getCityAverageSalary } from "@/lib/data/regional-salary";

import type { UKCity } from "@/types/location";

import { CityDirectoryTabs } from "./CityDirectoryTabs";



interface CitySearchGridProps {

  cities: UKCity[];

}



export function CitySearchGrid({ cities }: CitySearchGridProps) {

  const [query, setQuery] = useState("");



  const filtered = useMemo(() => {

    const normalised = query.trim().toLowerCase();

    if (!normalised) return [];



    return cities.filter(

      (city) =>

        city.cityName.toLowerCase().includes(normalised) ||

        city.region.toLowerCase().includes(normalised) ||

        city.slug.toLowerCase().includes(normalised) ||

        getCityRouteId(city).toLowerCase().includes(normalised),

    );

  }, [cities, query]);



  const isSearching = query.trim().length > 0;



  return (

    <section id="cities" className="scroll-mt-24">

      <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">

        <label

          htmlFor="city-search"

          className="block text-sm font-semibold text-slate-900"

        >

          Find your city calculator

        </label>

        <p className="mt-1 text-sm text-slate-500">

          Search {cities.length}+ UK cities and towns — or browse by nation

          below.

        </p>

        <div className="relative mt-4">

          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">

            <svg

              className="h-5 w-5"

              fill="none"

              viewBox="0 0 24 24"

              stroke="currentColor"

              strokeWidth="2"

              aria-hidden="true"

            >

              <circle cx="11" cy="11" r="8" />

              <path d="m21 21-4.35-4.35" strokeLinecap="round" />

            </svg>

          </span>

          <input

            id="city-search"

            type="search"

            placeholder="Type a city name, e.g. Bristol, Leeds, Edinburgh…"

            value={query}

            onChange={(e) => setQuery(e.target.value)}

            autoComplete="off"

            className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-4 pl-12 pr-4 text-base text-slate-900 transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"

          />

        </div>

        {isSearching && filtered.length > 0 && (

          <p className="mt-3 text-sm text-slate-500">

            Showing {filtered.length} of {cities.length} calculators

          </p>

        )}

      </div>



      <h2 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">

        UK City Salary Calculators

      </h2>



      {isSearching ? (

        filtered.length === 0 ? (

          <div className="rounded-xl border border-slate-100 bg-white px-6 py-14 text-center shadow-sm">

            <p className="text-base text-slate-600">

              No calculator found for this location. Try searching another city.

            </p>

          </div>

        ) : (

          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">

            {filtered.map((city) => (

              <li key={city.slug}>

                <Link href={getCitySalaryPath(city)} className={CITY_LINK_CLASS}>

                  {getCityLinkLabel(city)}

                </Link>

                <p className="pl-0 text-xs text-slate-400">

                  {city.region} · Avg. £

                  {getCityAverageSalary(city).toLocaleString("en-GB")}

                </p>

              </li>

            ))}

          </ul>

        )

      ) : (

        <CityDirectoryTabs cities={cities} variant="grid" scope="curated" />

      )}

    </section>

  );

}

