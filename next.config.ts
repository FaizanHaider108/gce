import type { NextConfig } from "next";
import ukCitiesDataset from "./src/data/uk/uk-cities.json";

const SLUG_PREFIX = "salary-calculator-";

function getCityRouteId(slug: string): string {
  return slug.startsWith(SLUG_PREFIX) ? slug.slice(SLUG_PREFIX.length) : slug;
}

const cityRedirects = ukCitiesDataset.cities.flatMap((city) => {
  const routeId = getCityRouteId(city.slug);
  const destination = `/uk-salary-calculator/${city.slug}`;
  const redirects: { source: string; destination: string; permanent: boolean }[] =
    [
      {
        source: `/salary/uk/${city.slug}`,
        destination,
        permanent: true,
      },
    ];

  if (routeId !== city.slug) {
    redirects.push({
      source: `/salary/uk/${routeId}`,
      destination,
      permanent: true,
    });
  }

  return redirects;
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/salary/uk",
        destination: "/uk-calculator-directory",
        permanent: true,
      },
      {
        source: "/services/bookkeeping-bank-reconciliations",
        destination: "/services/bookkeeping",
        permanent: true,
      },
      {
        source: "/services/self-assessment-tax-returns",
        destination: "/services/self-assessment",
        permanent: true,
      },
      ...cityRedirects,
    ];
  },
};

export default nextConfig;
