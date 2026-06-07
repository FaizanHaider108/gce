"use client";

import { useMemo, useState } from "react";
import {
  BuildingIcon,
  PoundSterlingIcon,
  ShieldCheckIcon,
} from "@/components/icons/FinanceIcons";
import { MetricBadge } from "@/components/ui/MetricBadge";
import {
  calculateUKSalary,
  DEFAULT_GROSS_SALARY,
  DEFAULT_TAX_YEAR,
} from "@/lib/calculators/uk";
import { formatGBP } from "@/lib/format/currency";
import { usePersistedSalary } from "@/lib/hooks/usePersistedSalary";
import { buildCitySeoCluster } from "@/lib/seo/city-page-seo";
import { getDynamicIntro } from "@/lib/seo/dynamic-intro";
import type { StudentLoanPlan, TaxYearId } from "@/types/calculator";
import type { UKCity } from "@/types/location";
import { FinancialDisclaimer } from "@/components/legal/FinancialDisclaimer";
import { AccountantBanner } from "@/components/marketing/AccountantBanner";
import { CityPageMetadataSync } from "@/components/seo/CityPageMetadataSync";
import { CalculatorOptions } from "./CalculatorOptions";
import { MarketInsights } from "./MarketInsights";
import { ResultsTable } from "./ResultsTable";
import { SalaryDonutChart } from "./SalaryDonutChart";
import { SalaryInput } from "./SalaryInput";
import { UserSalaryLandscape } from "./UserSalaryLandscape";

interface SalaryCalculatorProps {
  city: UKCity;
  /** Annual gross from URL or server — overrides stale localStorage when provided. */
  initialSalary?: number;
}

export function SalaryCalculator({
  city,
  initialSalary,
}: SalaryCalculatorProps) {
  const { salary: grossSalary, setSalary: setGrossSalary, isExplicitSalary } =
    usePersistedSalary(initialSalary ?? DEFAULT_GROSS_SALARY, initialSalary);
  const [taxYear, setTaxYear] = useState<TaxYearId>(DEFAULT_TAX_YEAR);
  const [pensionPercent, setPensionPercent] = useState(0);
  const [studentLoan, setStudentLoan] = useState<StudentLoanPlan>("none");

  const results = useMemo(
    () =>
      calculateUKSalary(grossSalary, city.region, {
        taxYear,
        pensionPercent,
        studentLoan,
      }),
    [grossSalary, city.region, taxYear, pensionPercent, studentLoan],
  );

  const seoCluster = useMemo(
    () =>
      buildCitySeoCluster(city.cityName, {
        taxYear,
        grossSalary,
        isExplicitSalary,
      }),
    [city.cityName, taxYear, grossSalary, isExplicitSalary],
  );

  const introCopy = useMemo(
    () =>
      getDynamicIntro(city, {
        grossSalary,
        isExplicitSalary,
      }),
    [city, grossSalary, isExplicitSalary],
  );

  return (
    <section className="space-y-8">
      <CityPageMetadataSync
        city={city}
        grossSalary={grossSalary}
        isExplicitSalary={isExplicitSalary}
      />

      <header className="space-y-5">
        <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span className="truncate">
            {city.region} · {taxYear} Tax Year
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {seoCluster.h1}
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
          {introCopy}
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <MetricBadge
            icon={<BuildingIcon className="h-4 w-4 shrink-0" />}
            label="City / Region"
            value={`${city.cityName}, ${city.region}`}
          />
          <MetricBadge
            icon={<PoundSterlingIcon className="h-4 w-4 shrink-0" />}
            label="Gross Salary"
            value={formatGBP(grossSalary)}
          />
          <MetricBadge
            icon={<ShieldCheckIcon className="h-4 w-4 shrink-0" />}
            label="Total Deductions"
            value={formatGBP(results.totalDeductions)}
          />
        </div>
      </header>

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <CalculatorOptions
          taxYear={taxYear}
          onTaxYearChange={setTaxYear}
          pensionPercent={pensionPercent}
          onPensionChange={setPensionPercent}
          studentLoan={studentLoan}
          onStudentLoanChange={setStudentLoan}
        />
        <SalaryInput value={grossSalary} onChange={setGrossSalary} />
      </div>

      {isExplicitSalary && grossSalary > 0 && (
        <UserSalaryLandscape city={city} grossSalary={grossSalary} />
      )}

      <MarketInsights city={city} grossSalary={grossSalary} />

      <div>
        <div className="mb-4 flex items-center space-x-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
            <ShieldCheckIcon className="h-4 w-4" />
          </span>
          <h2 className="text-lg font-semibold text-slate-900">
            Tax &amp; Deductions Breakdown
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({taxYear})
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <ResultsTable results={results} />
          <SalaryDonutChart results={results} />
          <AccountantBanner
            city={city}
            variant="inline"
            grossSalary={grossSalary}
            isExplicitSalary={isExplicitSalary}
          />
        </div>
      </div>

      <FinancialDisclaimer />
    </section>
  );
}
