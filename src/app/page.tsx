import { CitySearchGrid } from "@/components/home/CitySearchGrid";
import { HomeCalculationGuide } from "@/components/home/HomeCalculationGuide";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeValueCards } from "@/components/home/HomeValueCards";
import { AccountantBanner } from "@/components/marketing/AccountantBanner";
import { getUKCities } from "@/lib/data/load-cities";

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
