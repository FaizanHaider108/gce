import { calculateUKTax } from "@/lib/calculators/uk/tax-summary";
import { isScottishRegion, UK_TAX_YEAR } from "@/lib/calculators/uk";
import { getCityLocalMetrics } from "@/lib/data/city-local-metrics";
import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { formatGBP } from "@/lib/format/currency";
import { pickCityContent, TAX_REGION_HEADINGS } from "@/lib/seo/content-variations";
import type { UKCity } from "@/types/location";

interface CityTaxBreakdownSummaryProps {
  city: UKCity;
}

export function CityTaxBreakdownSummary({ city }: CityTaxBreakdownSummaryProps) {
  const avgSalary = getCityAverageSalary(city);
  const metrics = getCityLocalMetrics(city);
  const isScotland = isScottishRegion(city.region);
  const breakdown = calculateUKTax(avgSalary, isScotland);

  const heading = pickCityContent(city, metrics, TAX_REGION_HEADINGS)(city);

  return (
    <section
      className="no-print rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="city-tax-summary-heading"
    >
      <h2
        id="city-tax-summary-heading"
        className="text-lg font-semibold text-slate-900"
      >
        {heading} — {UK_TAX_YEAR} Baseline
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Working in {city.cityName}? With an average gross salary of{" "}
        {formatGBP(avgSalary)}, professionals in the {city.region} region need
        to factor in localized council tax allocations (Band{" "}
        {metrics.councilTaxBand}, ~{formatGBP(metrics.avgCouncilTax)}/year) and
        a {metrics.costOfLivingIndex} cost-of-living index when budgeting net
        pay.
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-100">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-4 py-3 font-semibold text-slate-600 sm:px-6">
                Component
              </th>
              <th className="px-4 py-3 text-right font-semibold text-slate-600 sm:px-6">
                Amount ({UK_TAX_YEAR})
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 text-slate-700 sm:px-6">Gross Salary</td>
              <td className="px-4 py-3 text-right font-medium tabular-nums text-slate-900 sm:px-6">
                {formatGBP(avgSalary)}
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 text-slate-700 sm:px-6">
                Personal Allowance
              </td>
              <td className="px-4 py-3 text-right font-medium tabular-nums text-slate-900 sm:px-6">
                {formatGBP(breakdown.personalAllowance)}
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 text-slate-700 sm:px-6">
                Estimated Income Tax
              </td>
              <td className="px-4 py-3 text-right font-medium tabular-nums text-slate-900 sm:px-6">
                {formatGBP(breakdown.incomeTax)}
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 text-slate-700 sm:px-6">
                Estimated National Insurance
              </td>
              <td className="px-4 py-3 text-right font-medium tabular-nums text-slate-900 sm:px-6">
                {formatGBP(breakdown.nationalInsurance)}
              </td>
            </tr>
            <tr className="bg-emerald-50/50">
              <td className="px-4 py-3 font-semibold text-emerald-800 sm:px-6">
                Net Take-Home Pay
              </td>
              <td className="px-4 py-3 text-right font-semibold tabular-nums text-emerald-800 sm:px-6">
                {formatGBP(breakdown.netTakeHome)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
