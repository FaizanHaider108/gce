import type { Metadata } from "next";
import Link from "next/link";
import { CityFullDirectory } from "@/components/home/CityFullDirectory";
import { nationToAnchorId } from "@/lib/data/curated-cities";
import { getUKCities } from "@/lib/data/load-cities";
import { UK_NATIONS } from "@/lib/data/uk-nation";
import { getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "UK Salary Calculator Directory — All Cities A–Z",
  description:
    "Browse 254+ free UK salary calculators across England, Scotland, Wales, and Northern Ireland. HMRC 2026/27 income tax, National Insurance, and take-home pay tools for every major city.",
  alternates: {
    canonical: `${getSiteUrl()}/uk-calculator-directory`,
  },
  openGraph: {
    title: "UK Salary Calculator Directory — 254+ Cities",
    description:
      "Complete crawlable A–Z directory of UK city salary and tax calculators by nation.",
    locale: "en_GB",
    type: "website",
    url: `${getSiteUrl()}/uk-calculator-directory`,
  },
};

export default function UKCalculatorDirectoryPage() {
  const cities = getUKCities();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <header className="max-w-4xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          UK Salary Calculator Directory
        </h1>
        <p className="text-base leading-relaxed text-slate-500">
          Global Calculator Engine hosts {cities.length} localized HMRC-aligned
          salary calculators spanning{" "}
          <strong className="font-medium text-slate-700">England</strong>,{" "}
          <strong className="font-medium text-slate-700">Scotland</strong>,{" "}
          <strong className="font-medium text-slate-700">Wales</strong>, and{" "}
          <strong className="font-medium text-slate-700">
            Northern Ireland
          </strong>
          . Every city page below is fully indexed in this server-rendered
          directory — use the nation jump links to navigate regional sections
          without JavaScript.
        </p>
        <p className="text-sm leading-relaxed text-slate-500">
          Whether you are relocating to Manchester, negotiating in Edinburgh,
          budgeting in Cardiff, or comparing take-home pay in Belfast, each
          calculator applies the correct {`2026/27`} tax framework including
          Scottish Income Tax bands where applicable, Class 1 National Insurance
          thresholds, and naturalized regional salary baselines.
        </p>
        <p className="text-sm text-slate-400">
          <Link href="/" className="font-medium text-emerald-600 hover:underline">
            ← Back to home
          </Link>
        </p>
      </header>

      <nav
        aria-label="Jump to UK nation sections"
        className="mt-8 flex flex-wrap gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
      >
        {UK_NATIONS.map((nation) => (
          <a
            key={nation}
            href={`#${nationToAnchorId(nation)}`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {nation}
          </a>
        ))}
      </nav>

      <div className="mt-10">
        <CityFullDirectory cities={cities} />
      </div>
    </main>
  );
}
