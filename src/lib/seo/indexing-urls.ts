import { getAllUKCityRouteIds } from "@/lib/data/city-routes";
import { getAllServiceSlugs } from "@/lib/data/services";
import { getUKCities } from "@/lib/data/load-cities";
import { getSiteUrl } from "@/lib/site/config";

/**
 * All indexable URLs for Google Indexing API bulk submission.
 * Generated live from the cities dictionary — never hardcoded.
 */
export function getAllIndexableUrls(): string[] {
  const base = getSiteUrl();
  const staticPaths = [
    "/",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/uk-calculator-directory",
    "/uk-calculator-directory",
  ];

  const cityPaths = getAllUKCityRouteIds().map(
    (slug) => `/uk-salary-calculator/${slug}`,
  );

  const servicePaths = getAllServiceSlugs().map((slug) => `/services/${slug}`);

  return [...staticPaths, ...cityPaths, ...servicePaths].map(
    (path) => `${base}${path}`,
  );
}

/** Metadata for indexing scripts — includes live city count for validation. */
export function getIndexingManifest() {
  return {
    generatedAt: new Date().toISOString(),
    siteUrl: getSiteUrl(),
    cityCount: getUKCities().length,
    totalUrls: getAllIndexableUrls().length,
    urls: getAllIndexableUrls(),
  };
}
