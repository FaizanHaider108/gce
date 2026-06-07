import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";
import {
  getCityEconomicTier,
  pickTierVariantIndex,
  type CityEconomicTier,
} from "./city-economic-tier";

type InsightBuilder = (city: UKCity, metrics: ReturnType<typeof getCityLocalMetrics>) => string;

const MAJOR_METRO_INSIGHTS: InsightBuilder[] = [
  (city, m) =>
    `${city.cityName}'s earnings profile is shaped by a dense concentration of technology, financial services, corporate consulting, and digital infrastructure employers. Median packages above ${formatGBP(m.avgSalary)} frequently reflect cross-border client billing, fintech product teams, and regulated professional services — not retail or hospitality baselines alone. Relocating into ${city.region} without modelling Scottish or RUK tax bands against this professional mix routinely understates real take-home differentials.`,
  (city, m) =>
    `In ${city.cityName}, elevated salary baselines near ${formatGBP(m.avgSalary)} track back to institutional banking corridors, cloud engineering campuses, and management consultancy partnerships that anchor the ${city.region} labour market. Bonus structures, RSU vesting, and pension salary sacrifice are common — making gross headline figures a poor proxy for monthly cash flow without running the full HMRC deduction stack below.`,
  (city, m) =>
    `${city.cityName} functions as a Tier-1 UK earnings cluster where legal, audit, software engineering, and investment operations teams compress into a single commuting basin. The ${m.costOfLivingIndex} cost-of-living index and ${m.rentPercent}% rent-to-salary pressure are direct consequences of that corporate density — professionals negotiating offers here should benchmark net pay, not gross alone.`,
];

const MANUFACTURING_INSIGHTS: InsightBuilder[] = [
  (city, m) =>
    `${city.cityName}'s payroll landscape is anchored by advanced engineering, automotive supply chains, precision manufacturing, and regional logistics hubs that keep median gross pay near ${formatGBP(m.avgSalary)}. Shift premiums, overtime bands, and apprenticeship-to-technician progression paths dominate earnings — distinct from London-style bonus culture. ${city.region} Class 1 NI and PAYE still apply identically, but take-home planning must account for stable base wages rather than variable equity.`,
  (city, m) =>
    `Industrial heritage still defines ${city.cityName}: aerospace subcontractors, food-processing plants, warehouse automation, and rail maintenance depots sustain the ${city.region} employment base. Salaries around ${formatGBP(m.avgSalary)} often bundle employer pension contributions and site allowances — line managers use these figures when benchmarking contractor day rates against permanent PAYE packages.`,
  (city, m) =>
    `Engineering technicians, production planners, and HSE-qualified supervisors form the earnings core of ${city.cityName}, with ${m.rentPercent}% of a typical ${formatGBP(m.avgSalary)} salary absorbed by housing before utilities. Manufacturing employers in ${city.region} increasingly compete on net pay transparency as skilled trades shortages push headline salaries upward.`,
];

const COASTAL_SERVICE_INSIGHTS: InsightBuilder[] = [
  (city, m) =>
    `${city.cityName}'s labour market leans on coastal tourism seasons, NHS district trusts, council-backed services, and independent retail — producing a median near ${formatGBP(m.avgSalary)} that differs materially from metropolitan fintech curves. Seasonal hiring spikes and part-year contracts make annualised gross figures essential for accurate tax modelling on this page.`,
  (city, m) =>
    `Smaller municipal economies like ${city.cityName} blend hospitality, marine services, care-sector employers, and public administration into a stable but modest earnings band around ${formatGBP(m.avgSalary)}. Band ${m.councilTaxBand} council tax and a ${m.costOfLivingIndex} COL index mean disposable income hinges on consistent PAYE planning rather than equity windfalls.`,
  (city, m) =>
    `Local service economies across ${city.region} — including ${city.cityName} — distribute earnings across district nursing, FE colleges, visitor accommodation, and regional logistics spokes. Gross pay near ${formatGBP(m.avgSalary)} supports a different lifestyle calculus than Tier-1 cities; use the calculator below to translate that into defensible monthly net figures before relocating.`,
];

const REGIONAL_PROFESSIONAL_INSIGHTS: InsightBuilder[] = [
  (city, m) =>
    `${city.cityName} sits in a balanced ${city.region} professional market where accountancy practices, NHS management tiers, university spin-outs, and mid-market SaaS firms set salaries around ${formatGBP(m.avgSalary)}. Unlike London, earnings growth here tracks partner promotions and public-sector pay bands more than investment-banking bonuses — making jurisdiction-correct tax modelling the decisive variable in relocation decisions.`,
  (city, m) =>
    `Regional professional services — legal aid clinics, civil engineering consultancies, insurance operations, and data-centre staffing — sustain ${city.cityName}'s ${formatGBP(m.avgSalary)} baseline. With rent consuming ${m.rentPercent}% of gross at typical ${city.region} tenancy rates, professionals comparing offers from Birmingham, Leeds, or ${city.cityName} should anchor decisions on net monthly cash, not advertised gross.`,
  (city, m) =>
    `${city.cityName} benefits from ${city.region}'s diversified employer mix: shared service centres, life-sciences QA labs, and regional building societies all publish PAYE packages near ${formatGBP(m.avgSalary)}. The absence of a single dominant sector reduces boom-bust volatility — but also caps explosive gross spikes unless you transition into remote roles billed from higher-rate clients.`,
];

const TIER_INSIGHT_MAP: Record<CityEconomicTier, InsightBuilder[]> = {
  major_metro: MAJOR_METRO_INSIGHTS,
  manufacturing_hub: MANUFACTURING_INSIGHTS,
  coastal_service: COASTAL_SERVICE_INSIGHTS,
  regional_professional: REGIONAL_PROFESSIONAL_INSIGHTS,
};

export function getCityIndustryInsight(city: UKCity): string {
  const tier = getCityEconomicTier(city);
  const metrics = getCityLocalMetrics(city);
  const builders = TIER_INSIGHT_MAP[tier];
  const index = pickTierVariantIndex(city, builders.length);
  return builders[index]!(city, metrics);
}

export function getCityJobMarketInsight(city: UKCity): string {
  const tier = getCityEconomicTier(city);
  const metrics = getCityLocalMetrics(city);
  const population = city.metadata?.population;

  const popClause = population
    ? `Among roughly ${population.toLocaleString("en-GB")} working-age residents, `
    : "Across the local workforce, ";

  const tierClosers: Record<CityEconomicTier, string> = {
    major_metro: `${popClause}senior software engineers, audit managers, and quantitative analysts routinely clear ${formatGBP(metrics.avgSalary)} before bonus — consult the live calculator to stress-test your offer against ${city.region} tax bands.`,
    manufacturing_hub: `${popClause}maintenance engineers, CNC operators, and logistics coordinators anchor pay near ${formatGBP(metrics.avgSalary)} with structured overtime — model your payslip deductions before accepting a site-transfer package.`,
    coastal_service: `${popClause}hospitality supervisors, district nurses, and council officers typically cluster around ${formatGBP(metrics.avgSalary)} with lower variance than national metros — essential for accurate monthly budgeting in ${city.cityName}.`,
    regional_professional: `${popClause}qualified accountants, project surveyors, and operations managers sustain a ${formatGBP(metrics.avgSalary)} median — competitive within ${city.region} but sensitive to pension sacrifice elections.`,
  };

  return tierClosers[tier];
}

export function getCityTierLabel(city: UKCity): string {
  const labels: Record<CityEconomicTier, string> = {
    major_metro: "Major UK Metro & Financial Hub",
    manufacturing_hub: "Industrial & Manufacturing Centre",
    coastal_service: "Coastal & Local Service Economy",
    regional_professional: "Regional Professional Services Market",
  };
  return labels[getCityEconomicTier(city)];
}
