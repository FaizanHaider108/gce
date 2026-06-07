import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityCalculatorHero } from "@/components/calculator/CityCalculatorHero";
import { CityContentGuide } from "@/components/calculator/CityContentGuide";
import { CityEconomicSnapshot } from "@/components/calculator/CityEconomicSnapshot";
import { CityPostCalculatorNarrative } from "@/components/calculator/CityPostCalculatorNarrative";
import { CityProfessionalLandscape } from "@/components/calculator/CityProfessionalLandscape";
import { CityServerTaxBreakdown } from "@/components/calculator/CityServerTaxBreakdown";
import { EducationalResources } from "@/components/calculator/EducationalResources";
import { RegionalBenchmarksSection } from "@/components/calculator/RegionalBenchmarksSection";
import { CityLocalInsight } from "@/components/calculator/CityLocalInsight";
import { CityTaxBreakdownSummary } from "@/components/calculator/CityTaxBreakdownSummary";
import { RegionalSalaryComparison } from "@/components/calculator/RegionalSalaryComparison";
import { NearbyCities } from "@/components/calculator/NearbyCities";
import { RelocationCTA } from "@/components/calculator/RelocationCTA";
import { SalaryCalculator } from "@/components/calculator/SalaryCalculator";
import { TrustComplianceRibbon } from "@/components/legal/TrustComplianceRibbon";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { getBenchmarkCities } from "@/lib/data/benchmark-cities";
import {
  getAllUKCityRouteIds,
  getCitySalaryPath,
  getUKCityByRouteId,
} from "@/lib/data/city-routes";
import { getSiteUrl, SITE_NAME } from "@/lib/site/config";
import { buildCityFaqData } from "@/lib/seo/city-faq-content";
import { buildCityFaqJsonLd } from "@/lib/seo/city-json-ld";
import { buildCitySeoCluster } from "@/lib/seo/city-page-seo";
import { resolveServerSalaryState } from "@/lib/url/resolve-server-salary";

interface PageProps {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ salary?: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllUKCityRouteIds().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { city: routeId } = await params;
  const city = getUKCityByRouteId(routeId);

  if (!city) {
    return { title: "Calculator Not Found" };
  }

  const salaryState = resolveServerSalaryState(await searchParams);
  const seo = buildCitySeoCluster(city.cityName, {
    taxYear: UK_TAX_YEAR,
    grossSalary: salaryState.grossSalary,
    isExplicitSalary: salaryState.isExplicitSalary,
  });
  const title = seo.title;
  const description = seo.description;
  const pageUrl = `${getSiteUrl()}${getCitySalaryPath(city)}`;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: [
      `${city.cityName} salary calculator`,
      `${city.cityName} take home pay`,
      `${city.cityName} income tax`,
      `${city.region} salary calculator`,
      "UK tax calculator",
      "National Insurance calculator",
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_GB",
      url: pageUrl,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function UKCitySalaryPage({
  params,
  searchParams,
}: PageProps) {
  const { city: routeId } = await params;
  const city = getUKCityByRouteId(routeId);

  if (!city) {
    notFound();
  }

  const salaryState = resolveServerSalaryState(await searchParams);
  const benchmarkCities = getBenchmarkCities();
  const faq = buildCityFaqData(city);
  const faqJsonLd = buildCityFaqJsonLd(city);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <section className="space-y-8">
        <CityCalculatorHero
          city={city}
          grossSalary={salaryState.grossSalary}
          isExplicitSalary={salaryState.isExplicitSalary}
        />

        <CityServerTaxBreakdown
          city={city}
          grossSalary={salaryState.grossSalary}
        />

        <SalaryCalculator
          city={city}
          initialSalary={salaryState.urlSalary}
        />

        <CityPostCalculatorNarrative
          city={city}
          grossSalary={salaryState.grossSalary}
          isExplicitSalary={salaryState.isExplicitSalary}
        />
      </section>

      <div className="mt-6">
        <TrustComplianceRibbon />
      </div>

      <RegionalBenchmarksSection city={city}>
        <CityProfessionalLandscape city={city} />
        <CityEconomicSnapshot city={city} />
        <CityTaxBreakdownSummary city={city} />
        <CityLocalInsight city={city} />
      </RegionalBenchmarksSection>
      <RegionalSalaryComparison
        currentCity={city}
        benchmarkCities={benchmarkCities}
        initialSalary={salaryState.urlSalary}
      />
      <CityContentGuide city={city} />
      <NearbyCities city={city} />
      <EducationalResources city={city} />

      <div className="no-print mt-12 w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h4 className="mb-2 text-lg font-semibold text-slate-800">
              {faq.q1}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">{faq.a1}</p>
          </div>

          <div className="border-b border-slate-100 pb-4">
            <h4 className="mb-2 text-lg font-semibold text-slate-800">
              {faq.q2}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">{faq.a2}</p>
          </div>

          <div className="pb-2">
            <h4 className="mb-2 text-lg font-semibold text-slate-800">
              {faq.q3}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">{faq.a3}</p>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      </div>

      <RelocationCTA />
    </main>
  );
}
