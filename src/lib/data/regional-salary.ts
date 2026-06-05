import type { UKCity } from "@/types/location";

/** London & Greater London */
const LONDON_AVERAGE = 45_200;

/** South East & East of England economic cluster */
const SOUTH_EAST_AVERAGE = 39_100;

/** Scotland, West Midlands, North West England */
const MID_TIER_AVERAGE = 35_800;

/** Wales, Yorkshire, and all other UK regional baselines */
const BASELINE_AVERAGE = 34_600;

const LONDON_REGIONS = new Set(["Greater London", "London"]);

const SOUTH_EAST_REGIONS = new Set([
  "Kent",
  "Surrey",
  "East Sussex",
  "West Sussex",
  "Hampshire",
  "Berkshire",
  "Buckinghamshire",
  "Essex",
  "Hertfordshire",
  "Bedfordshire",
  "Cambridgeshire",
  "Norfolk",
  "Suffolk",
  "Oxfordshire",
]);

const MID_TIER_REGIONS = new Set([
  "Scotland",
  "West Midlands",
  "Greater Manchester",
  "Merseyside",
  "Lancashire",
  "Cheshire",
]);

const YORKSHIRE_REGIONS = new Set([
  "West Yorkshire",
  "South Yorkshire",
  "North Yorkshire",
  "East Riding of Yorkshire",
]);

/**
 * Programmatic regional average salary estimator (2025/26 UK baselines).
 * Overrides stale per-city JSON metadata with region-driven economics.
 */
export function getRegionalAverageSalary(region: string): number {
  if (LONDON_REGIONS.has(region)) {
    return LONDON_AVERAGE;
  }

  if (SOUTH_EAST_REGIONS.has(region)) {
    return SOUTH_EAST_AVERAGE;
  }

  if (MID_TIER_REGIONS.has(region)) {
    return MID_TIER_AVERAGE;
  }

  if (region === "Wales" || YORKSHIRE_REGIONS.has(region)) {
    return BASELINE_AVERAGE;
  }

  return BASELINE_AVERAGE;
}

export function getCityAverageSalary(city: UKCity): number {
  return getRegionalAverageSalary(city.region);
}
