import type { Metadata } from "next";
import Link from "next/link";
import { CityDirectoryExplorer } from "@/components/home/CityDirectoryExplorer";
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
          salary calculators. Search by city name or switch between nation tabs
          to browse the complete A–Z index.
        </p>
        <p className="text-sm text-slate-400">
          <Link href="/" className="font-medium text-emerald-600 hover:underline">
            ← Back to home
          </Link>
        </p>
      </header>

      <CityDirectoryExplorer cities={cities} />
    </main>
  );
}
