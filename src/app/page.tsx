import type { Metadata } from "next";
import { CitySearchGrid } from "@/components/home/CitySearchGrid";
import { HomeCalculationGuide } from "@/components/home/HomeCalculationGuide";
import { HomeEditorialPolicy } from "@/components/home/HomeEditorialPolicy";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeValueCards } from "@/components/home/HomeValueCards";
import { AccountantBanner } from "@/components/marketing/AccountantBanner";
import { getUKCities, getUKCityBySlug } from "@/lib/data/load-cities";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
} from "@/lib/seo/home-metadata";
import { getSiteUrl } from "@/lib/site/config";

const SITE_URL = getSiteUrl();
const OG_IMAGE = `${SITE_URL}/web-app-manifest-512x512.png`;

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
  const defaultCity =
    getUKCityBySlug("salary-calculator-london") ?? cities[0]!;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <div className="space-y-12">
        <HomeHero totalCities={cities.length} defaultCity={defaultCity} />
        <HomeValueCards totalCities={cities.length} />
        <CitySearchGrid cities={cities} />
        <HomeCalculationGuide />
        <HomeEditorialPolicy />
        <AccountantBanner />
      </div>
    </main>
  );
}
