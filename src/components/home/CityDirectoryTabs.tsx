"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  anchorIdToNation,
  getCuratedNationCities,
  nationToAnchorId,
} from "@/lib/data/curated-cities";
import {
  CITY_LINK_CLASS,
  getCityLinkLabel,
  getCitySalaryPath,
} from "@/lib/data/city-routes";
import {
  groupCitiesByNation,
  UK_NATIONS,
  type UKNation,
} from "@/lib/data/uk-nation";
import type { UKCity } from "@/types/location";

const DIRECTORY_HUB = "/uk-calculator-directory";
const REGIONAL_INDEX = "/uk-calculator-directory/regions";

interface CityDirectoryTabsProps {
  cities: UKCity[];
  /** Compact text links vs card layout */
  variant?: "grid" | "cards";
  /** Homepage shows curated cities only; directory hub shows full A–Z lists */
  scope?: "curated" | "full";
  /** Sync active nation tab with URL hash (directory page deep links) */
  syncHash?: boolean;
}

export function CityDirectoryTabs({
  cities,
  variant = "grid",
  scope = "full",
  syncHash = false,
}: CityDirectoryTabsProps) {
  const grouped = useMemo(() => groupCitiesByNation(cities), [cities]);
  const curated = useMemo(() => getCuratedNationCities(), []);
  const [activeNation, setActiveNation] = useState<UKNation>("England");

  useEffect(() => {
    if (!syncHash) return;

    const applyHash = () => {
      const nation = anchorIdToNation(window.location.hash.slice(1));
      if (nation) setActiveNation(nation);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [syncHash]);

  const selectNation = (nation: UKNation) => {
    setActiveNation(nation);
    if (syncHash) {
      const anchor = nationToAnchorId(nation);
      window.history.replaceState(null, "", `#${anchor}`);
    }
  };

  const displayCities = (nation: UKNation): UKCity[] =>
    scope === "curated" ? curated[nation] : grouped[nation];

  return (
    <div>
      <div
        role="tablist"
        aria-label="UK nations"
        className="flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white p-2 shadow-sm"
      >
        {UK_NATIONS.map((nation) => {
          const count =
            scope === "curated"
              ? curated[nation].length
              : grouped[nation].length;
          const isActive = activeNation === nation;

          return (
            <button
              key={nation}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${nation}`}
              id={`tab-${nation}`}
              onClick={() => selectNation(nation)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {nation}
              <span
                className={`ml-1.5 text-xs ${isActive ? "text-slate-300" : "text-slate-400"}`}
              >
                ({count}
                {scope === "curated" ? ` of ${grouped[nation].length}` : ""})
              </span>
            </button>
          );
        })}
      </div>

      {UK_NATIONS.map((nation) => {
        const nationCities = displayCities(nation);
        const isActive = activeNation === nation;

        return (
          <div
            key={nation}
            id={`panel-${nation}`}
            role="tabpanel"
            aria-labelledby={`tab-${nation}`}
            hidden={!isActive}
            className="mt-6"
          >
            <ul
              className={
                variant === "cards"
                  ? "grid gap-4 sm:grid-cols-2"
                  : "grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3"
              }
            >
              {nationCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={getCitySalaryPath(city)}
                    className={
                      variant === "cards"
                        ? "block rounded-xl border border-slate-100 bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-emerald-100 hover:text-emerald-700"
                        : CITY_LINK_CLASS
                    }
                  >
                    {getCityLinkLabel(city)}
                    {variant === "cards" && (
                      <span className="mt-0.5 block text-xs font-normal text-slate-400">
                        {city.region}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {scope === "curated" && (
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                <a
                  href={`${DIRECTORY_HUB}#${nationToAnchorId(nation)}`}
                  className="text-sm font-semibold text-emerald-600 hover:underline"
                >
                  View all {nation} calculators ({grouped[nation].length}) →
                </a>
                <a
                  href={REGIONAL_INDEX}
                  className="text-sm font-semibold text-slate-600 hover:underline"
                >
                  Regional sitemap index →
                </a>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
