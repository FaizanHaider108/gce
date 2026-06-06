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

export const metadata: Metadata = {
  title: {
    absolute:
      "UK Salary Calculator 2026/27 | Free Income Tax & Take-Home Pay Tool",
  },
  description:
    "Calculate your 2026/27 UK take-home pay across 254+ cities in England, Scotland, Wales, and Northern Ireland. Free HMRC-aligned Income Tax, National Insurance, and Scottish band calculator.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "UK Salary Calculator 2026/27 | Free Income Tax & Take-Home Pay Tool",
    description:
      "254+ hyper-local UK salary calculators with 2026/27 HMRC tax, NI, and net pay estimates.",
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
    title: "UK Salary Calculator 2026/27 | Free Take-Home Pay Tool",
    description:
      "Free HMRC-aligned salary calculator for 254+ UK cities. Income Tax, NI, and net pay.",
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
