import type { Metadata } from "next";
import Link from "next/link";
import { CityFullDirectory } from "@/components/home/CityFullDirectory";
import { getUKCities } from "@/lib/data/load-cities";
import { getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "UK Salary Calculator Directory — All Cities A–Z",
  description:
    "Complete A–Z directory of 254+ UK salary and income tax calculators across England, Scotland, Wales, and Northern Ireland. Global Calculator Engine.",
  alternates: {
    canonical: `${getSiteUrl()}/uk-calculator-directory`,
  },
};

export default function UKCalculatorDirectoryPage() {
  const cities = getUKCities();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          UK Salary Calculator Directory
        </h1>
        <p className="text-base leading-relaxed text-slate-500">
          Global Calculator Engine hosts {cities.length} localized HMRC-aligned
          salary calculators. Browse the complete A–Z index by nation below.
        </p>
        <p className="text-sm text-slate-400">
          <Link href="/" className="font-medium text-emerald-600 hover:underline">
            ← Back to home
          </Link>
        </p>
      </header>

      <nav
        aria-label="Jump to nation"
        className="mt-8 flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
      >
        {(["England", "Scotland", "Wales", "Northern Ireland"] as const).map(
          (nation) => (
            <a
              key={nation}
              href={`#${nation.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700"
            >
              {nation}
            </a>
          ),
        )}
      </nav>

      <div className="mt-10">
        <CityFullDirectory cities={cities} />
      </div>
    </main>
  );
}
