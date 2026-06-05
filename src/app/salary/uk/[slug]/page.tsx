import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SalaryCalculator } from "@/components/calculator/SalaryCalculator";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import {
  getAllUKCitySlugs,
  getUKCityBySlug,
} from "@/lib/data/load-cities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Reads uk-cities.json at build time and pre-renders one static HTML page
 * per city. Add a city to the JSON → it gets a new route on next deploy.
 */
export async function generateStaticParams() {
  return getAllUKCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getUKCityBySlug(slug);

  if (!city) {
    return { title: "Calculator Not Found" };
  }

  const title = `Salary & Income Tax Calculator for ${city.cityName}`;
  const description = `Calculate your ${UK_TAX_YEAR} take-home pay in ${city.cityName}, ${city.region}. Free UK salary calculator with Income Tax, National Insurance, and net monthly pay breakdown.`;

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
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function UKCitySalaryPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getUKCityBySlug(slug);

  if (!city) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <SalaryCalculator city={city} />
      </main>
      <SiteFooter />
    </>
  );
}
