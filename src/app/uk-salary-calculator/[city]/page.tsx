import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityContentGuide } from "@/components/calculator/CityContentGuide";
import { CityFAQ } from "@/components/calculator/CityFAQ";
import { CityLocalInsight } from "@/components/calculator/CityLocalInsight";
import { CityTaxBreakdownSummary } from "@/components/calculator/CityTaxBreakdownSummary";
import { RegionalSalaryComparison } from "@/components/calculator/RegionalSalaryComparison";
import { RelatedCities } from "@/components/calculator/RelatedCities";
import { RelocationCTA } from "@/components/calculator/RelocationCTA";
import { SalaryCalculator } from "@/components/calculator/SalaryCalculator";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { getBenchmarkCities } from "@/lib/data/benchmark-cities";
import {
  getAllUKCityRouteIds,
  getCitySalaryPath,
  getUKCityByRouteId,
} from "@/lib/data/city-routes";
import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { getSiteUrl } from "@/lib/site/config";

interface PageProps {
  params: Promise<{ city: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllUKCityRouteIds().map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city: routeId } = await params;
  const city = getUKCityByRouteId(routeId);

  if (!city) {
    return { title: "Calculator Not Found" };
  }

  const title = `Salary & Income Tax Calculator for ${city.cityName}`;
  const metrics = getCityLocalMetrics(city);
  const description = `Calculate your ${UK_TAX_YEAR} take-home pay in ${city.cityName}, ${city.region}. Avg salary £${metrics.avgSalary.toLocaleString("en-GB")}, rent ${metrics.rentPercent}% of gross, COL index ${metrics.costOfLivingIndex}. Free Income Tax & NI calculator.`;
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
      siteName: "Global Calculator Engine",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function UKCitySalaryPage({ params }: PageProps) {
  const { city: routeId } = await params;
  const city = getUKCityByRouteId(routeId);

  if (!city) {
    notFound();
  }

  const benchmarkCities = getBenchmarkCities();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <SalaryCalculator city={city} />
      <div className="mt-8 space-y-8">
        <CityTaxBreakdownSummary city={city} />
        <CityLocalInsight city={city} />
      </div>
      <RegionalSalaryComparison
        currentCity={city}
        benchmarkCities={benchmarkCities}
      />
      <CityContentGuide city={city} />
      <RelatedCities city={city} />
      <CityFAQ city={city} />
      <RelocationCTA />
    </main>
  );
}
