import { calculateUKSalary, UK_TAX_YEAR } from "@/lib/calculators/uk";
import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";

const DEFAULT_COST_OF_LIVING_INDEX = 65;

interface CityContentGuideProps {
  city: UKCity;
}

export function CityContentGuide({ city }: CityContentGuideProps) {
  const averageSalary = getCityAverageSalary(city);
  const costOfLivingIndex =
    city.metadata?.costOfLivingIndex ?? DEFAULT_COST_OF_LIVING_INDEX;
  const avgCalc = calculateUKSalary(averageSalary);
  const population = city.metadata?.population;

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
          Cost of Living &amp; Net Salary in {city.cityName}
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-500">
          <p>
            Workers in {city.cityName}, {city.region}, typically take home around{" "}
            {formatGBP(avgCalc.netSalary.yearly)} per year ({formatGBP(avgCalc.netSalary.monthly)}{" "}
            monthly) on a regional average gross salary of {formatGBP(averageSalary)} after
            {UK_TAX_YEAR} Income Tax and National Insurance deductions.
          </p>
          <p>
            With a cost-of-living index of {costOfLivingIndex} (UK average = 100),{" "}
            {city.cityName} has {colContext} compared to the national baseline. Your
            net salary should be weighed against local rent, transport, and household
            expenses in {city.region} when assessing how far your pay goes.
          </p>
          <p>
            Use the calculator above to model your exact take-home figure — weekly,
            monthly, and annual — before committing to a job offer or rental agreement
            in {city.cityName}.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Average Job Market Trends
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-500">
          The typical average gross salary here is around{" "}
          <span className="font-medium text-slate-900">
            {formatGBP(averageSalary)}
          </span>{" "}
          based on current {city.region} labour market data. Earning above this
          threshold puts you in a strong financial position within the local market.
          {population
            ? ` With a working population of roughly ${population.toLocaleString("en-GB")} residents, ${city.cityName} offers a competitive ${city.region} job market across public sector, healthcare, retail, and professional services.`
            : ` ${city.cityName} sits within a competitive ${city.region} job market spanning public sector, healthcare, retail, and professional services.`}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Tax &amp; Take-Home Pay in {city.region}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-500">
          Income Tax and National Insurance in {city.cityName} follow the same{" "}
          {UK_TAX_YEAR} UK-wide rules as every other city — there are no local
          payroll tax variations within {city.region}. The Personal Allowance,
          basic rate (20%), higher rate (40%), and Class 1 NI thresholds apply
          identically, meaning your postcode does not change your statutory
          deductions — only your gross salary and benefits do.
        </p>
      </section>
    </article>
  );
}
