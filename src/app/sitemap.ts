import type { MetadataRoute } from "next";

import { getAllUKCityRouteIds } from "@/lib/data/city-routes";

import { getUKCities } from "@/lib/data/load-cities";

import { getAllGuideSlugs, getGuidePath } from "@/lib/data/guide-pillars";
import { getAllServiceSlugs } from "@/lib/data/services";

import { CANONICAL_SITE_URL, getSiteUrl } from "@/lib/site/config";



/**

 * Server-side dynamic sitemap — city entries fetched live from uk-cities.json

 * via getUKCities() / getAllUKCityRouteIds(). Never hardcoded.

 */

const SITEMAP_BASE_URL = getSiteUrl();



export default function sitemap(): MetadataRoute.Sitemap {

  const citySlugs = getAllUKCityRouteIds();

  const cityCount = getUKCities().length;



  if (citySlugs.length !== cityCount) {

    console.warn(

      `[sitemap] City slug count (${citySlugs.length}) !== dataset (${cityCount})`,

    );

  }



  const staticPages: MetadataRoute.Sitemap = [

    {

      url: SITEMAP_BASE_URL,

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 1,

    },

    {

      url: `${SITEMAP_BASE_URL}/uk-calculator-directory`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.9,

    },

    {

      url: `${SITEMAP_BASE_URL}/uk-calculator-directory/regions`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.85,

    },

    {

      url: `${SITEMAP_BASE_URL}/guides`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.85,

    },

    {

      url: `${SITEMAP_BASE_URL}/blog/uk-tax-guide-2026`,

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.8,

    },

    {

      url: `${SITEMAP_BASE_URL}/about`,

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.7,

    },

    {

      url: `${SITEMAP_BASE_URL}/privacy`,

      lastModified: new Date(),

      changeFrequency: "yearly",

      priority: 0.5,

    },

    {

      url: `${SITEMAP_BASE_URL}/terms`,

      lastModified: new Date(),

      changeFrequency: "yearly",

      priority: 0.5,

    },

    {

      url: `${SITEMAP_BASE_URL}/contact`,

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.6,

    },

  ];



  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({

    url: `${SITEMAP_BASE_URL}/uk-salary-calculator/${slug}`,

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



  const guidePages: MetadataRoute.Sitemap = getAllGuideSlugs().map((slug) => ({
    url: `${SITEMAP_BASE_URL}${getGuidePath(slug)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...cityPages, ...servicePages, ...guidePages];

}



export { CANONICAL_SITE_URL, SITEMAP_BASE_URL };

