import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CityContentGuide } from "@/components/calculator/CityContentGuide";
import { CityEconomicSnapshot } from "@/components/calculator/CityEconomicSnapshot";
import { CityProfessionalLandscape } from "@/components/calculator/CityProfessionalLandscape";
import { EducationalResources } from "@/components/calculator/EducationalResources";
import { RegionalBenchmarksSection } from "@/components/calculator/RegionalBenchmarksSection";
import { CityLocalInsight } from "@/components/calculator/CityLocalInsight";
import { CityTaxBreakdownSummary } from "@/components/calculator/CityTaxBreakdownSummary";
import { RegionalSalaryComparison } from "@/components/calculator/RegionalSalaryComparison";
import { NearbyCities } from "@/components/calculator/NearbyCities";
import { RelocationCTA } from "@/components/calculator/RelocationCTA";
import { SalaryCalculatorLoader } from "@/components/calculator/SalaryCalculatorLoader";
import { TrustComplianceRibbon } from "@/components/legal/TrustComplianceRibbon";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { getBenchmarkCities } from "@/lib/data/benchmark-cities";
import {
  getAllUKCityRouteIds,
  getCitySalaryPath,
  getUKCityByRouteId,
} from "@/lib/data/city-routes";
import { getSiteUrl } from "@/lib/site/config";
import { buildCitySeoCluster } from "@/lib/seo/city-page-seo";

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

  const seo = buildCitySeoCluster(city.cityName, { taxYear: UK_TAX_YEAR });
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

  // Absolute jurisdictional filter — county maps from region metadata
  const cityData = {
    cityName: city.cityName?.trim() || "your city",
    county: city.region?.trim() || "the UK",
  };
  const isScotland = cityData.county.toLowerCase() === "scotland";

  const faqQ1 = `How accurate is the 2026/27 salary calculator for ${cityData.cityName}?`;
  const faqA1 = isScotland
    ? `Our engine is completely synchronized with the latest HMRC tax thresholds for the 2026/27 fiscal year. For professionals in ${cityData.cityName}, it dynamically computes localized parameters, including precise Scottish tax bands, to ensure your estimated net projection is highly accurate.`
    : `Our engine is completely synchronized with the latest HMRC tax thresholds for the 2026/27 fiscal year. For professionals in ${cityData.cityName}, it computes your exact localized allowance brackets to ensure your estimated net projection is highly accurate.`;

  const faqQ2 = `Does this calculator account for regional variables in ${cityData.cityName}?`;
  const faqA2 = isScotland
    ? `Yes. The system automatically cross-references your earnings with local financial baselines in the Scotland region, parsing specific localized tax bands, regional council tax metrics, and updated National Insurance thresholds to ensure absolute compliance.`
    : `Yes. The system automatically cross-references your earnings with local financial baselines in the ${cityData.county} region, parsing standard UK tax thresholds, regional cost variations, and updated National Insurance thresholds to ensure absolute compliance.`;

  const faqQ3 = `Can businesses in ${cityData.cityName} use this tool for payroll planning?`;
  const faqA3 = `Absolutely. Local enterprises, freelancers, and remote payroll managers across ${cityData.cityName} utilize this calculation layout to estimate monthly employer liabilities, baseline gross contractor values, statutory pension parameters, and accurate net employee metrics before corporate submissions.`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: faqQ1,
        acceptedAnswer: { "@type": "Answer", text: faqA1 },
      },
      {
        "@type": "Question",
        name: faqQ2,
        acceptedAnswer: { "@type": "Answer", text: faqA2 },
      },
      {
        "@type": "Question",
        name: faqQ3,
        acceptedAnswer: { "@type": "Answer", text: faqA3 },
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <Suspense
        fallback={
          <div className="h-48 animate-pulse rounded-xl border border-slate-100 bg-white" />
        }
      >
        <SalaryCalculatorLoader city={city} />
      </Suspense>

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
              {faqQ1}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">{faqA1}</p>
          </div>

          <div className="border-b border-slate-100 pb-4">
            <h4 className="mb-2 text-lg font-semibold text-slate-800">
              {faqQ2}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">{faqA2}</p>
          </div>

          <div className="pb-2">
            <h4 className="mb-2 text-lg font-semibold text-slate-800">
              {faqQ3}
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">{faqA3}</p>
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
