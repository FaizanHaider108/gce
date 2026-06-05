import type { MetadataRoute } from "next";
import { getAllUKCitySlugs } from "@/lib/data/load-cities";
import { CANONICAL_SITE_URL, getSiteUrl } from "@/lib/site/config";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITEMAP BASE URL CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * All <loc> entries resolve from getSiteUrl():
 *   1. NEXT_PUBLIC_SITE_URL  (Vercel env var)
 *   2. CANONICAL_SITE_URL    (src/lib/site/config.ts)
 *
 * Production URL: https://globalcalculatorengine.vercel.app
 *
 * Example:
 *   https://globalcalculatorengine.vercel.app/salary/uk/salary-calculator-aberdeen
 * ─────────────────────────────────────────────────────────────────────────────
 */
const SITEMAP_BASE_URL = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllUKCitySlugs();

  const homepage: MetadataRoute.Sitemap[number] = {
    url: SITEMAP_BASE_URL,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  };

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${SITEMAP_BASE_URL}/salary/uk/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [homepage, ...cityPages];
}

export { CANONICAL_SITE_URL, SITEMAP_BASE_URL };
