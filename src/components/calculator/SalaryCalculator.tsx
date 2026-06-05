"use client";

import { useMemo } from "react";
import { calculateUKSalary, DEFAULT_GROSS_SALARY } from "@/lib/calculators/uk";
import { usePersistedSalary } from "@/lib/hooks/usePersistedSalary";
import type { UKCity } from "@/types/location";
import { MarketInsights } from "./MarketInsights";
import { ResultsTable } from "./ResultsTable";
import { SalaryInput } from "./SalaryInput";

interface SalaryCalculatorProps {
  city: UKCity;
  initialSalary?: number;
}

export function SalaryCalculator({
  city,
  initialSalary = DEFAULT_GROSS_SALARY,
}: SalaryCalculatorProps) {
  const [grossSalary, setGrossSalary] = usePersistedSalary(initialSalary);
  const results = useMemo(
    () => calculateUKSalary(grossSalary),
    [grossSalary],
  );

  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-wider text-blue-600">
          {city.region} · United Kingdom
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Salary &amp; Income Tax Calculator for {city.cityName}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Estimate your UK take-home pay after Income Tax and National Insurance.
          Enter your annual gross salary below to see yearly and monthly
          breakdowns for workers in {city.cityName}.
        </p>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <SalaryInput value={grossSalary} onChange={setGrossSalary} />
      </div>

      <MarketInsights city={city} grossSalary={grossSalary} />

      <ResultsTable results={results} />
    </section>
  );
}
