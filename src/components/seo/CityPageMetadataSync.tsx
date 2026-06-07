"use client";

import { useEffect } from "react";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { buildCitySeoCluster } from "@/lib/seo/city-page-seo";
import type { UKCity } from "@/types/location";

interface CityPageMetadataSyncProps {
  city: UKCity;
  grossSalary: number;
  isExplicitSalary: boolean;
}

function upsertMeta(name: string, content: string, attribute: "name" | "property") {
  let element = document.querySelector(
    `meta[${attribute}="${name}"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

/** Keeps document title + meta description aligned with the active calculator salary state. */
export function CityPageMetadataSync({
  city,
  grossSalary,
  isExplicitSalary,
}: CityPageMetadataSyncProps) {
  useEffect(() => {
    const cluster = buildCitySeoCluster(city.cityName, {
      taxYear: UK_TAX_YEAR,
      grossSalary,
      isExplicitSalary,
    });

    document.title = cluster.title;
    upsertMeta("description", cluster.description, "name");
    upsertMeta("og:title", cluster.title, "property");
    upsertMeta("og:description", cluster.description, "property");
    upsertMeta("twitter:title", cluster.title, "name");
    upsertMeta("twitter:description", cluster.description, "name");
  }, [city.cityName, grossSalary, isExplicitSalary]);

  return null;
}
