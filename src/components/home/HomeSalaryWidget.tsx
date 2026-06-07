"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  calculateUKSalary,
  DEFAULT_GROSS_SALARY,
  DEFAULT_TAX_YEAR,
} from "@/lib/calculators/uk";
import {
  buildFullReportPath,
  getJurisdictionDefaultCity,
  JURISDICTION_REGION,
  type TaxJurisdiction,
} from "@/lib/data/home-jurisdiction";
import { formatGBP } from "@/lib/format/currency";
import { usePersistedSalary } from "@/lib/hooks/usePersistedSalary";
import type { UKCity } from "@/types/location";

type PayFrequency = "annual" | "monthly";

interface HomeSalaryWidgetProps {
  defaultCity: UKCity;
}

export function HomeSalaryWidget({ defaultCity }: HomeSalaryWidgetProps) {
  const { salary: annualGross, setSalary: setAnnualGross } = usePersistedSalary(
    DEFAULT_GROSS_SALARY,
  );
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("annual");
  const [jurisdiction, setJurisdiction] = useState<TaxJurisdiction>("England");
  const [showResults, setShowResults] = useState(true);

  const region = JURISDICTION_REGION[jurisdiction];
  const reportCity = getJurisdictionDefaultCity(jurisdiction);
  const fullReportPath = buildFullReportPath(jurisdiction, annualGross);

  const results = useMemo(
    () => calculateUKSalary(annualGross, region, { taxYear: DEFAULT_TAX_YEAR }),
    [annualGross, region],
  );

  const displayInputValue =
    payFrequency === "annual"
      ? annualGross
      : Number.parseFloat((annualGross / 12).toFixed(2));

  const handleSalaryChange = (raw: number) => {
    const nextAnnual =
      payFrequency === "annual" ? raw : Math.round(raw * 12);
    setAnnualGross(Math.max(0, nextAnnual));
    setShowResults(true);
  };

  const handleCalculate = () => {
    setShowResults(true);
    document
      .getElementById("home-calc-results")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const netDisplay =
    payFrequency === "annual"
      ? results.netSalary.yearly
      : results.netSalary.monthly;
  const taxDisplay =
    payFrequency === "annual"
      ? results.incomeTax.total
      : Number.parseFloat((results.incomeTax.total / 12).toFixed(2));
  const niDisplay =
    payFrequency === "annual"
      ? results.nationalInsurance.total
      : Number.parseFloat(
          (results.nationalInsurance.total / 12).toFixed(2),
        );

  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end">
          <div className="flex-1 space-y-4">
            <div>
              <label
                htmlFor="home-gross-salary"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                {payFrequency === "annual"
                  ? "Gross Salary (Annual)"
                  : "Gross Salary (Monthly)"}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-semibold text-slate-400">
                  £
                </span>
                <input
                  id="home-gross-salary"
                  type="number"
                  min={0}
                  step={payFrequency === "annual" ? 1000 : 100}
                  inputMode="numeric"
                  value={displayInputValue || ""}
                  onChange={(event) => {
                    const parsed = Number.parseFloat(event.target.value);
                    handleSalaryChange(Number.isNaN(parsed) ? 0 : parsed);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-2xl font-semibold text-slate-900 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div
                className="inline-flex rounded-lg border border-slate-200 bg-white p-1"
                role="group"
                aria-label="Pay frequency"
              >
                {(["annual", "monthly"] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setPayFrequency(freq)}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${
                      payFrequency === freq
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <span className="font-medium">Tax region:</span>
                <select
                  value={jurisdiction}
                  onChange={(event) =>
                    setJurisdiction(event.target.value as TaxJurisdiction)
                  }
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-slate-800 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  aria-label="Tax jurisdiction"
                >
                  <option value="England">England</option>
                  <option value="Scotland">Scotland</option>
                  <option value="Wales">Wales</option>
                  <option value="Northern Ireland">Northern Ireland</option>
                </select>
              </label>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full shrink-0 rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 lg:w-auto"
          >
            Calculate Take-Home Pay
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          HMRC {DEFAULT_TAX_YEAR} rules · {jurisdiction} tax bands · synced with
          city calculators for {defaultCity.cityName} and 254+ UK locations
        </p>
      </div>

      {showResults && annualGross > 0 && (
        <div id="home-calc-results" className="space-y-4" aria-live="polite">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Net Take-Home ({payFrequency})
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-900">
                {formatGBP(netDisplay)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Income Tax ({payFrequency})
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                {formatGBP(taxDisplay)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                National Insurance ({payFrequency})
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-slate-900">
                {formatGBP(niDisplay)}
              </p>
            </div>
          </div>

          {fullReportPath && reportCity && (
            <div className="flex flex-col items-stretch gap-2 sm:items-center">
              <Link
                href={fullReportPath}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-slate-900 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 sm:w-auto"
              >
                View Complete {jurisdiction} Tax Breakdown
                <span aria-hidden="true">→</span>
              </Link>
              <p className="text-center text-xs text-slate-400">
                Opens your full {formatGBP(annualGross)} report for{" "}
                {reportCity.cityName} with {jurisdiction} tax bands, pension
                options, and local economic data
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
