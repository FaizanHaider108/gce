import type { MetadataRoute } from "next";
import { getAllUKCitySlugs } from "@/lib/data/load-cities";
import { CANONICAL_SITE_URL, getSiteUrl } from "@/lib/site/config";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITEMAP BASE URL CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * All <loc> entries are built from getSiteUrl(), which resolves in this order:
 *
 *   1. NEXT_PUBLIC_SITE_URL  (Vercel env var — preferred for production)
 *   2. CANONICAL_SITE_URL    (fallback constant in src/lib/site/config.ts)
 *
 * Current production URL:  https://gce-4ozu.vercel.app
 * Future custom domain:    https://globalcalculatorengine.com
 *
 * To switch to the custom domain in 3 days:
 *   → Vercel Dashboard → Settings → Environment Variables → Production
 *   → Add: NEXT_PUBLIC_SITE_URL = https://globalcalculatorengine.com
 *   → Redeploy (sitemap.xml will update automatically)
 *
 * Example output URL:
 *   https://gce-4ozu.vercel.app/salary/uk/salary-calculator-aberdeen
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

// Exported for build-time verification / tests
export { CANONICAL_SITE_URL, SITEMAP_BASE_URL };
