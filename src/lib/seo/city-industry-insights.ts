import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { costOfLivingIndexWithBaseline } from "@/lib/format/col-index";
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
    `${city.cityName} functions as a Tier-1 UK earnings cluster where legal, audit, software engineering, and investment operations teams compress into a single commuting basin. At the regional baseline of ${formatGBP(m.avgSalary)}, ${costOfLivingIndexWithBaseline(m.costOfLivingIndex)} and ${m.rentPercent}% rent-to-salary pressure are direct consequences of that corporate density.`,
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
    `Smaller municipal economies like ${city.cityName} blend hospitality, marine services, care-sector employers, and public administration into a stable but modest regional baseline around ${formatGBP(m.avgSalary)}. Band ${m.councilTaxBand} council tax and ${costOfLivingIndexWithBaseline(m.costOfLivingIndex)} mean disposable income at the area median hinges on consistent PAYE planning rather than equity windfalls.`,
  (city, m) =>
    `Local service economies across ${city.region} — including ${city.cityName} — distribute earnings across district nursing, FE colleges, visitor accommodation, and regional logistics spokes. The regional gross baseline of ${formatGBP(m.avgSalary)} supports a different lifestyle calculus than Tier-1 cities at the area median.`,
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

  const baseline = formatGBP(metrics.avgSalary);

  const tierClosers: Record<CityEconomicTier, string> = {
    major_metro: `${popClause}the regional gross baseline of ${baseline} reflects concentrated technology, financial services, and consulting employers — not individual offer packages entered in the calculator above.`,
    manufacturing_hub: `${popClause}the ${baseline} area median anchors maintenance engineers, CNC operators, and logistics coordinators with structured overtime — a regional benchmark independent of personal salary inputs.`,
    coastal_service: `${popClause}hospitality supervisors, district nurses, and council officers cluster around the ${baseline} regional baseline with lower variance than national metros.`,
    regional_professional: `${popClause}qualified accountants, project surveyors, and operations managers sustain the ${baseline} area median — competitive within ${city.region} at the regional average only.`,
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
