import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { hashCitySlug } from "@/lib/seo/content-variations";
import {
  getCityEconomicTier,
  type CityEconomicTier,
} from "@/lib/seo/city-economic-tier";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";

export interface CityEconomicBenchmark {
  cityMedianSalary: number;
  dominantSectors: string;
}

const TIER_SECTOR_POOLS: Record<CityEconomicTier, readonly string[]> = {
  major_metro: [
    "financial services, technology, and professional consulting",
    "investment banking, legal services, and cloud engineering",
    "management consulting, fintech product teams, and regulated audit",
    "corporate law, software engineering, and institutional asset management",
  ],
  manufacturing_hub: [
    "advanced manufacturing, automotive supply chains, and engineering operations",
    "aerospace subcontracting, precision tooling, and industrial logistics",
    "food processing, rail maintenance, and warehouse automation",
    "production planning, HSE-qualified supervision, and skilled trades",
  ],
  coastal_service: [
    "hospitality, healthcare, and public administration",
    "coastal tourism, district nursing, and council-backed services",
    "marine services, independent retail, and FE college staffing",
    "visitor accommodation, care-sector employers, and regional logistics",
  ],
  regional_professional: [
    "accountancy, NHS management, and regional business services",
    "civil engineering consultancies, insurance operations, and data-centre staffing",
    "university spin-outs, mid-market SaaS firms, and legal aid clinics",
    "shared service centres, life-sciences QA labs, and building societies",
  ],
};

/** Slug-level sector overrides for high-traffic metros — extra pSEO differentiation. */
const CITY_SECTOR_OVERRIDES: Partial<Record<string, string>> = {
  "salary-calculator-birmingham":
    "advanced manufacturing, financial services, and public-sector administration",
  "salary-calculator-manchester":
    "digital media, professional services, and advanced manufacturing",
  "salary-calculator-london":
    "global banking, technology, and corporate legal services",
  "salary-calculator-edinburgh":
    "financial services, public administration, and technology",
  "salary-calculator-leeds":
    "financial shared services, healthcare, and digital commerce",
  "salary-calculator-glasgow":
    "shipbuilding heritage, fintech, and NHS district operations",
  "salary-calculator-bristol":
    "aerospace engineering, creative technology, and professional services",
  "salary-calculator-liverpool":
    "port logistics, healthcare, and digital creative industries",
};

type BenchmarkCopyBuilder = (
  city: UKCity,
  medianLabel: string,
  sectors: string,
) => string;

const BENCHMARK_COPY_TEMPLATES: readonly BenchmarkCopyBuilder[] = [
  (city, median, sectors) =>
    `According to baseline economic distributions, the current median gross annual earnings baseline for professionals within ${city.cityName} sits at approximately ${median}. The local employment market is heavily anchored by massive operational footprints within ${sectors}.`,
  (city, median, sectors) =>
    `Regional payroll surveys for ${city.cityName} place the typical gross annual package near ${median}, with hiring momentum concentrated across ${sectors}. Professionals benchmarking relocation offers into ${city.region} should treat this figure as the area median — not an individual offer ceiling.`,
  (city, median, sectors) =>
    `In ${city.cityName}, ONS-aligned modelling indicates a ${median} gross earnings midpoint for full-time professionals. Dominant payroll contributors include ${sectors}, shaping council-tax and rental pressure distinct from national averages.`,
  (city, median, sectors) =>
    `The ${city.cityName} wage landscape centres on a ${median} regional gross baseline, sustained by employer clusters in ${sectors}. This localized median underpins the council tax and cost-of-living paragraphs throughout this calculator page.`,
  (city, median, sectors) =>
    `Economic activity across ${city.cityName} compresses median gross pay around ${median}, driven primarily by ${sectors}. Use this baseline when contrasting your own salary input against ${city.region} tax and affordability metrics below.`,
];

/**
 * Resolves localized economic benchmark tokens for every city.
 * Uses per-city JSON overrides when present; otherwise derives from tier + slug hash.
 */
export function getCityEconomicBenchmark(city: UKCity): CityEconomicBenchmark {
  const cityMedianSalary =
    city.metadata?.cityMedianSalary ?? getCityAverageSalary(city);

  const dominantSectors =
    city.metadata?.dominantSectors ??
    CITY_SECTOR_OVERRIDES[city.slug] ??
    pickTierSectors(city);

  return { cityMedianSalary, dominantSectors };
}

function pickTierSectors(city: UKCity): string {
  const tier = getCityEconomicTier(city);
  const pool = TIER_SECTOR_POOLS[tier];
  const index = hashCitySlug(city.slug) % pool.length;
  return pool[index];
}

/** Deterministic benchmark narrative — unique DOM text per city slug at SSR. */
export function getCityWageBenchmarkCopy(city: UKCity): string {
  const { cityMedianSalary, dominantSectors } = getCityEconomicBenchmark(city);
  const medianLabel = formatGBP(cityMedianSalary);
  const templateIndex = hashCitySlug(city.slug) % BENCHMARK_COPY_TEMPLATES.length;
  return BENCHMARK_COPY_TEMPLATES[templateIndex](
    city,
    medianLabel,
    dominantSectors,
  );
}
