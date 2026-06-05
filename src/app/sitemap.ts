import type { MetadataRoute } from "next";
import { getAllUKCitySlugs } from "@/lib/data/load-cities";
import { getSiteUrl } from "@/lib/site/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const citySlugs = getAllUKCitySlugs();

  const homepage: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  };

  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${baseUrl}/salary/uk/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [homepage, ...cityPages];
}
