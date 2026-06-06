import Link from "next/link";
import {
  nationToAnchorId,
} from "@/lib/data/curated-cities";
import {
  CITY_LINK_CLASS,
  getCityLinkLabel,
  getCitySalaryPath,
} from "@/lib/data/city-routes";
import { groupCitiesByNation, UK_NATIONS } from "@/lib/data/uk-nation";
import type { UKCity } from "@/types/location";

interface CityFullDirectoryProps {
  cities: UKCity[];
}

/** Full A–Z multi-column directory — isolated from homepage to avoid link-farm signals. */
export function CityFullDirectory({ cities }: CityFullDirectoryProps) {
  const grouped = groupCitiesByNation(cities);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
      {UK_NATIONS.map((nation) => (
        <section
          key={nation}
          id={nationToAnchorId(nation)}
          className="scroll-mt-28"
          aria-labelledby={`directory-${nationToAnchorId(nation)}`}
        >
          <h2
            id={`directory-${nationToAnchorId(nation)}`}
            className="border-b border-slate-100 pb-2 text-lg font-semibold text-slate-900"
          >
            {nation}
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({grouped[nation].length})
            </span>
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-1">
            {grouped[nation].map((city) => (
              <li key={city.slug}>
                <Link href={getCitySalaryPath(city)} className={CITY_LINK_CLASS}>
                  {getCityLinkLabel(city)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
