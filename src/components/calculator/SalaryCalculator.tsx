"use client";

import { useMemo, useState } from "react";
import {
  BuildingIcon,
  PoundSterlingIcon,
  ShieldCheckIcon,
} from "@/components/icons/FinanceIcons";
import { MetricBadge } from "@/components/ui/MetricBadge";
import {
  annualToHourly,
  calculateUKSalary,
  DEFAULT_GROSS_SALARY,
  DEFAULT_HOURS_PER_WEEK,
  DEFAULT_TAX_YEAR,
  type HoursPerWeek,
  type SalaryInputMode,
} from "@/lib/calculators/uk";
import { formatGBP } from "@/lib/format/currency";
import { usePersistedSalary } from "@/lib/hooks/usePersistedSalary";
import type { StudentLoanPlan, TaxYearId } from "@/types/calculator";
import type { UKCity } from "@/types/location";
import { CalculatorOptions } from "./CalculatorOptions";
import { MarketInsights } from "./MarketInsights";
import { ResultsTable } from "./ResultsTable";
import { SalaryDonutChart } from "./SalaryDonutChart";
import { SalaryInputPanel } from "./SalaryInputPanel";

interface SalaryCalculatorProps {
  city: UKCity;
  initialSalary?: number;
}

export function SalaryCalculator({
  city,
  initialSalary = DEFAULT_GROSS_SALARY,
}: SalaryCalculatorProps) {
  const [grossSalary, setGrossSalary] = usePersistedSalary(initialSalary);
  const [inputMode, setInputMode] = useState<SalaryInputMode>("annual");
  const [hourlyRate, setHourlyRate] = useState(() =>
    annualToHourly(initialSalary, DEFAULT_HOURS_PER_WEEK),
  );
  const [hoursPerWeek, setHoursPerWeek] =
    useState<HoursPerWeek>(DEFAULT_HOURS_PER_WEEK);
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

  const salaryConversion = useMemo(
    () => ({
      inputMode,
      hourlyRate,
      hoursPerWeek,
    }),
    [inputMode, hourlyRate, hoursPerWeek],
  );

  return (
    <section className="space-y-8">
      <header className="space-y-5">
        <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span className="truncate">
            {city.region} · {taxYear} Tax Year
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          Salary &amp; Income Tax Calculator for {city.cityName}
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
          Estimate your UK take-home pay after Income Tax, National Insurance,
          pension contributions, and student loan repayments. Enter your annual
          or hourly gross salary below to see yearly, monthly, and weekly
          breakdowns for workers in {city.cityName}.
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
        <SalaryInputPanel
          inputMode={inputMode}
          onInputModeChange={setInputMode}
          annualSalary={grossSalary}
          onAnnualSalaryChange={setGrossSalary}
          hourlyRate={hourlyRate}
          onHourlyRateChange={setHourlyRate}
          hoursPerWeek={hoursPerWeek}
          onHoursPerWeekChange={setHoursPerWeek}
        />
      </div>

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
          <div className="min-w-0">
            <ResultsTable
              results={results}
              salaryConversion={salaryConversion}
            />
          </div>
          <div className="min-w-0">
            <SalaryDonutChart results={results} />
          </div>
        </div>
      </div>
    </section>
  );
}
