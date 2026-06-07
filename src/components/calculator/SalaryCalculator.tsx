"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldCheckIcon } from "@/components/icons/FinanceIcons";
import {
  calculateUKSalary,
  DEFAULT_GROSS_SALARY,
  DEFAULT_TAX_YEAR,
} from "@/lib/calculators/uk";
import { usePersistedSalary } from "@/lib/hooks/usePersistedSalary";
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

  useEffect(() => {
    const ssrBreakdown = document.getElementById("ssr-tax-breakdown");
    if (ssrBreakdown) {
      ssrBreakdown.hidden = true;
    }
  }, []);

  return (
    <section className="space-y-8">
      <CityPageMetadataSync
        city={city}
        grossSalary={grossSalary}
        isExplicitSalary={isExplicitSalary}
      />

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

      <div id="live-tax-breakdown">
        <div className="mb-4 flex items-center space-x-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
            <ShieldCheckIcon className="h-4 w-4" />
          </span>
          <h2 className="text-lg font-semibold text-slate-900">
            Live Tax &amp; Deductions Breakdown
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
