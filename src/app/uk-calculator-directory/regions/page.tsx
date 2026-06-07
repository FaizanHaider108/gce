import type { Metadata } from "next";
import Link from "next/link";
import { getCityLinkLabel, getCitySalaryPath } from "@/lib/data/city-routes";
import { getCitiesGroupedByRegion, getUKCities } from "@/lib/data/load-cities";
import { UK_NATIONS } from "@/lib/data/uk-nation";
import { getSiteUrl } from "@/lib/site/config";

function regionToAnchorId(region: string): string {
  return region.toLowerCase().replace(/\s+/g, "-");
}

export const metadata: Metadata = {
  title: "UK Salary Calculator Regional Directory — All Regions & Cities",
  description:
    "Static regional index of 254+ UK salary calculators grouped by county and region. Crawlable links to every city take-home pay tool.",
  alternates: {
    canonical: `${getSiteUrl()}/uk-calculator-directory/regions`,
  },
};

export default function RegionalDirectoryPage() {
  const grouped = getCitiesGroupedByRegion();
  const regions = [...grouped.keys()].sort((a, b) =>
    a.localeCompare(b, "en-GB"),
  );
  const totalCities = getUKCities().length;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <header className="max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          UK Salary Calculator Regional Directory
        </h1>
        <p className="text-base leading-relaxed text-slate-500">
          Complete static index of {totalCities} hyper-local salary calculators
          organised by UK region. Every city below is a standard HTML anchor
          link — fully crawlable without JavaScript, pagination, or search
          queries.
        </p>
        <p className="text-sm text-slate-400">
          <Link href="/uk-calculator-directory" className="font-medium text-emerald-600 hover:underline">
            ← Nation directory (England, Scotland, Wales, NI)
          </Link>
        </p>
      </header>

      <nav
        aria-label="Jump to UK regions"
        className="mt-8 flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
      >
        {UK_NATIONS.map((nation) => (
          <a
            key={nation}
            href={`/uk-calculator-directory#${nation.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          >
            {nation}
          </a>
        ))}
        {regions.map((region) => (
          <a
            key={region}
            href={`#${regionToAnchorId(region)}`}
            className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          >
            {region}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        {regions.map((region) => {
          const cities = grouped.get(region) ?? [];
          return (
            <section
              key={region}
              id={regionToAnchorId(region)}
              className="scroll-mt-28"
              aria-labelledby={`region-${regionToAnchorId(region)}`}
            >
              <h2
                id={`region-${regionToAnchorId(region)}`}
                className="border-b border-slate-100 pb-2 text-xl font-semibold text-slate-900"
              >
                {region}
                <span className="ml-2 text-sm font-normal text-slate-400">
                  ({cities.length} cities)
                </span>
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {cities.map((city) => (
                  <li key={city.slug}>
                    <a
                      href={getCitySalaryPath(city)}
                      className="block py-1 text-sm font-medium text-blue-600 hover:underline"
                    >
                      {getCityLinkLabel(city)}
                    </a>
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
