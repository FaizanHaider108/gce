import Link from "next/link";
import { BuildingIcon, ShieldCheckIcon } from "@/components/icons/FinanceIcons";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { getFeaturedUKCities, getUKCities } from "@/lib/data/load-cities";

export default function HomePage() {
  const cities = getFeaturedUKCities();
  const totalCities = getUKCities().length;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <section className="mb-12 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <ShieldCheckIcon className="h-3.5 w-3.5" />
            100% Accurate · {UK_TAX_YEAR} Tax Rules
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Free Financial &amp; Tax Tools for the UK
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-500">
            Calculate your exact take-home pay, income tax, and National Insurance
            deductions across {totalCities}+ UK cities with our up-to-date
            programmatic salary engine.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Featured UK City Calculators
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Browse featured cities below or use{" "}
            <a
              href="/sitemap.xml"
              className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              sitemap.xml
            </a>{" "}
            for the full index of {totalCities}+ calculators.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/salary/uk/${city.slug}`}
                  className="group block rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                      <BuildingIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700">
                        {city.cityName}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {city.region}
                      </p>
                      {city.metadata?.averageSalary && (
                        <p className="mt-2 text-sm font-medium text-slate-600">
                          Avg. salary: £
                          {city.metadata.averageSalary.toLocaleString("en-GB")}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
