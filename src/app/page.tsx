import Link from "next/link";
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
        <section className="mb-12 space-y-4">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-600">
            Programmatic SEO · MVP
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Global Calculator Engine
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Hyper-local UK salary calculators. Static pages, instant load times,
            built for {UK_TAX_YEAR} tax rules.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Featured UK City Calculators
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            {totalCities}+ local salary calculators live across the UK. Browse
            featured cities below or use{" "}
            <a href="/sitemap.xml" className="font-medium text-blue-600 hover:underline">
              sitemap.xml
            </a>{" "}
            for the full index. Every city page links to related nearby
            calculators for deeper crawl coverage.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/salary/uk/${city.slug}`}
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {city.cityName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{city.region}</p>
                  {city.metadata?.averageSalary && (
                    <p className="mt-3 text-sm text-slate-600">
                      Avg. salary: £
                      {city.metadata.averageSalary.toLocaleString("en-GB")}
                    </p>
                  )}
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
