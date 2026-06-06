import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/lib/data/services";
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

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITEMAP_BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITEMAP_BASE_URL}/salary/uk`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${SITEMAP_BASE_URL}/salary/uk/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: `${SITEMAP_BASE_URL}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [...staticPages, ...cityPages, ...servicePages];
}

export { CANONICAL_SITE_URL, SITEMAP_BASE_URL };
