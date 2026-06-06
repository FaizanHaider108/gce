import { calculateUKSalary, isScottishRegion, UK_TAX_YEAR } from "@/lib/calculators/uk";
import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { formatGBP } from "@/lib/format/currency";
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
  const population = city.metadata?.population;

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
            With a cost-of-living index of {costOfLivingIndex} (UK average =
            100), {city.cityName} has {colContext}. At the local baseline,
            rent at {formatGBP(metrics.avgRentMonthly)}/month equates to{" "}
            {metrics.rentPercent}% of the {formatGBP(metrics.avgSalary)} gross
            baseline, while Band{" "}
            {metrics.councilTaxBand} council tax in {city.region} averages{" "}
            {formatGBP(metrics.avgCouncilTax)} per year.
          </p>
          <p>
            Use the calculator above to model your exact take-home figure —
            weekly, monthly, and annual — before committing to a job offer or
            rental agreement in {city.cityName}.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          {jobHeading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-500">
          The typical average gross salary here is around{" "}
          <strong className="font-medium text-slate-900">
            {formatGBP(averageSalary)}
          </strong>{" "}
          based on <strong>official UK regional salary baselines</strong> and
          current {city.region} labour market data. Earning above this threshold
          puts you in a strong financial position within the local market.
          {population
            ? ` With a working population of roughly ${population.toLocaleString("en-GB")} residents, ${city.cityName} offers a competitive ${city.region} job market across public sector, healthcare, retail, and professional services.`
            : ` ${city.cityName} sits within a competitive ${city.region} job market spanning public sector, healthcare, retail, and professional services.`}
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
              tax year. National Insurance remains UK-wide under HMRC Class 1
              rules — there are no local NI variations within {city.region}.
            </>
          ) : (
            <>
              Income Tax and National Insurance in {city.cityName} follow the
              same {UK_TAX_YEAR} England &amp; Wales rules. The Personal
              Allowance, basic rate (20%), higher rate (40%), and Class 1 NI
              thresholds apply UK-wide — only your gross salary and benefits
              determine your deductions.
            </>
          )}
        </p>
      </section>
    </article>
  );
}
