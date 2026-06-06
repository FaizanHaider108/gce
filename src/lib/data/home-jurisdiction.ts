import { getCitySalaryPath } from "@/lib/data/city-routes";
import { getUKCityBySlug } from "@/lib/data/load-cities";
import type { UKCity } from "@/types/location";

export type TaxJurisdiction =
  | "England"
  | "Scotland"
  | "Wales"
  | "Northern Ireland";

/** Representative city per nation — tax bands match the homepage jurisdiction selector. */
export const JURISDICTION_DEFAULT_CITY_SLUG: Record<TaxJurisdiction, string> = {
  England: "salary-calculator-london",
  Scotland: "salary-calculator-edinburgh",
  Wales: "salary-calculator-cardiff",
  "Northern Ireland": "salary-calculator-belfast",
};

export const JURISDICTION_REGION: Record<TaxJurisdiction, string> = {
  England: "Kent",
  Scotland: "Scotland",
  Wales: "Wales",
  "Northern Ireland": "Northern Ireland",
};

export function getJurisdictionDefaultCity(
  jurisdiction: TaxJurisdiction,
): UKCity | undefined {
  const slug = JURISDICTION_DEFAULT_CITY_SLUG[jurisdiction];
  return getUKCityBySlug(slug);
}

export function buildFullReportPath(
  jurisdiction: TaxJurisdiction,
  annualGross: number,
): string | null {
  const city = getJurisdictionDefaultCity(jurisdiction);
  if (!city) return null;

  const basePath = getCitySalaryPath(city);
  const params = new URLSearchParams();
  if (annualGross > 0) {
    params.set("salary", String(Math.round(annualGross)));
  }
  params.set("from", "home");
  return `${basePath}?${params.toString()}`;
}
