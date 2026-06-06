import type { Metadata } from "next";
import { CitySearchGrid } from "@/components/home/CitySearchGrid";
import { HomeCalculationGuide } from "@/components/home/HomeCalculationGuide";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeValueCards } from "@/components/home/HomeValueCards";
import { AccountantBanner } from "@/components/marketing/AccountantBanner";
import { getUKCities } from "@/lib/data/load-cities";
import { getSiteUrl } from "@/lib/site/config";

const SITE_URL = getSiteUrl();
const OG_IMAGE = `${SITE_URL}/web-app-manifest-512x512.png`;

const HOME_TITLE =
  "UK Salary Calculator 2026/27 | Free Income Tax & Take-Home Pay Tool";
const HOME_DESCRIPTION =
  "Calculate your exact take-home pay with our HMRC-aligned UK salary calculator. Estimate your 2026/27 income tax, national insurance deductions, and net monthly breakdown instantly across 254+ cities.";

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    siteName: "Global Calculator Engine",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 512,
        height: 512,
        alt: "Global Calculator Engine UK Salary Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function HomePage() {
  const cities = getUKCities();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="space-y-12">
        <HomeHero totalCities={cities.length} />
        <HomeValueCards totalCities={cities.length} />
        <CitySearchGrid cities={cities} />
        <HomeCalculationGuide />
        <AccountantBanner />
      </div>
    </main>
  );
}
