import { calculateUKSalary, isScottishRegion, UK_TAX_YEAR } from "@/lib/calculators/uk";
import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { costOfLivingIndexWithBaseline } from "@/lib/format/col-index";
import { formatGBP } from "@/lib/format/currency";
import { getCityJobMarketInsight } from "@/lib/seo/city-industry-insights";
import {
  COL_OPENER_VARIATIONS,
  COST_OF_LIVING_HEADINGS,
  JOB_MARKET_HEADINGS,
  pickVariation,
  TAX_REGION_HEADINGS,
} from "@/lib/seo/content-variations";
import type { UKCity } from "@/types/location";

const DEFAULT_COST_OF_LIVING_INDEX = 65;

interface CityContentGuideProps {
  city: UKCity;
}

export function CityContentGuide({ city }: CityContentGuideProps) {
  const averageSalary = getCityAverageSalary(city);
  const metrics = getCityLocalMetrics(city);
  const costOfLivingIndex =
    city.metadata?.costOfLivingIndex ?? DEFAULT_COST_OF_LIVING_INDEX;
  const avgCalc = calculateUKSalary(averageSalary, city.region);
  const isScotland = isScottishRegion(city.region);
  const jobMarketInsight = getCityJobMarketInsight(city);

  const colHeading = pickVariation(city, COST_OF_LIVING_HEADINGS)(city);
  const jobHeading = pickVariation(city, JOB_MARKET_HEADINGS)(city);
  const taxHeading = pickVariation(city, TAX_REGION_HEADINGS)(city);
  const colOpener = pickVariation(city, COL_OPENER_VARIATIONS);

  const colContext =
    costOfLivingIndex >= 80
      ? "higher-than-average living costs"
      : costOfLivingIndex >= 65
        ? "moderate living costs"
        : "relatively affordable living costs";

  return (
    <article className="no-print mt-10 space-y-8 border-t border-slate-100 pt-10">
      <section>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {colHeading}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-500">
          <p>
            {colOpener(city, city.region)} typically take home around{" "}
            {formatGBP(avgCalc.netSalary.yearly)} per year (
            {formatGBP(avgCalc.netSalary.monthly)} monthly) on an{" "}
            <strong>official UK regional salary baseline</strong> of{" "}
            {formatGBP(averageSalary)} after{" "}
            <strong>{UK_TAX_YEAR} Income Tax</strong> and{" "}
            <strong>National Insurance</strong> deductions calculated under{" "}
            <strong>HMRC statutory guidelines</strong>.
          </p>
          <p>
            With {costOfLivingIndexWithBaseline(costOfLivingIndex)},{" "}
            {city.cityName} has {colContext}. At the regional baseline, rent at{" "}
            {formatGBP(metrics.avgRentMonthly)}/month equates to{" "}
            {metrics.rentPercent}% of the {formatGBP(metrics.avgSalary)} gross
            benchmark, while Band {metrics.councilTaxBand} council tax in{" "}
            {city.region} averages {formatGBP(metrics.avgCouncilTax)} per year.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {jobHeading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-500">
          {jobMarketInsight}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {taxHeading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-500">
          {isScotland ? (
            <>
              Calculated using the official Scottish Income Tax rates and
              thresholds set by the Scottish Government for the {UK_TAX_YEAR}{" "}
              tax year — including Starter (19%), Basic (20%), Intermediate
              (21%), Higher (42%), and Top (48%) bands. National Insurance
              remains UK-wide under HMRC Class 1 rules with no Scottish
              variation.
            </>
          ) : city.region === "Northern Ireland" ? (
            <>
              Income Tax and National Insurance in {city.cityName} follow UK-wide
              HMRC {UK_TAX_YEAR} rules shared with England and Wales — not the
              separate Scottish band structure. Personal Allowance, basic rate
              (20%), higher rate (40%), and Class 1 NI thresholds apply
              identically across Northern Ireland.
            </>
          ) : city.region === "Wales" ? (
            <>
              Income Tax and National Insurance in {city.cityName} follow UK-wide
              HMRC {UK_TAX_YEAR} rules. Wales uses the same Income Tax bands as
              England — Personal Allowance, 20% basic rate, 40% higher rate, and
              standard Class 1 NI thresholds — with no devolved Welsh Income Tax
              variation.
            </>
          ) : (
            <>
              Income Tax and National Insurance in {city.cityName} follow
              standard {UK_TAX_YEAR} England HMRC rules. The Personal Allowance,
              basic rate (20%), higher rate (40%), and Class 1 NI thresholds are
              applied under UK-wide statutory guidelines for {city.region}.
            </>
          )}
        </p>
      </section>
    </article>
  );
}
