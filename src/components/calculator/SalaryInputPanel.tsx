"use client";

import { PoundSterlingIcon } from "@/components/icons/FinanceIcons";
import {
  annualToHourly,
  DEFAULT_HOURS_PER_WEEK,
  HOURS_PER_WEEK_OPTIONS,
  hourlyToAnnual,
  type HoursPerWeek,
  type SalaryInputMode,
} from "@/lib/calculators/uk/salary-converter";

interface SalaryInputPanelProps {
  inputMode: SalaryInputMode;
  onInputModeChange: (mode: SalaryInputMode) => void;
  annualSalary: number;
  onAnnualSalaryChange: (value: number) => void;
  hourlyRate: number;
  onHourlyRateChange: (value: number) => void;
  hoursPerWeek: HoursPerWeek;
  onHoursPerWeekChange: (value: HoursPerWeek) => void;
}

const TABS: { id: SalaryInputMode; label: string }[] = [
  { id: "annual", label: "Annual Salary" },
  { id: "hourly", label: "Hourly Rate" },
];

export function SalaryInputPanel({
  inputMode,
  onInputModeChange,
  annualSalary,
  onAnnualSalaryChange,
  hourlyRate,
  onHourlyRateChange,
  hoursPerWeek,
  onHoursPerWeekChange,
}: SalaryInputPanelProps) {
  const handleTabChange = (mode: SalaryInputMode) => {
    if (mode === inputMode) return;

    if (mode === "hourly") {
      onHourlyRateChange(annualToHourly(annualSalary, hoursPerWeek));
    } else {
      onAnnualSalaryChange(hourlyToAnnual(hourlyRate, hoursPerWeek));
    }

    onInputModeChange(mode);
  };

  const handleHourlyChange = (value: number) => {
    onHourlyRateChange(value);
    onAnnualSalaryChange(hourlyToAnnual(value, hoursPerWeek));
  };

  const handleHoursChange = (value: HoursPerWeek) => {
    onHoursPerWeekChange(value);
    if (inputMode === "hourly") {
      onAnnualSalaryChange(hourlyToAnnual(hourlyRate, value));
    }
  };

  return (
    <div className="space-y-4">
      <div className="inline-flex w-full rounded-xl border border-slate-200 bg-slate-100/80 p-1 sm:w-auto">
        {TABS.map((tab) => {
          const isActive = inputMode === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out sm:flex-none sm:px-6 ${
                isActive
                  ? "bg-white font-bold text-slate-900 shadow-sm ring-1 ring-slate-200/80"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              aria-pressed={isActive}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {inputMode === "annual" ? (
        <div className="w-full">
          <label
            htmlFor="annual-salary"
            className="mb-3 flex items-center space-x-2 text-sm font-medium text-slate-700"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
              <PoundSterlingIcon className="h-3.5 w-3.5" />
            </span>
            <span>Annual Gross Salary</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-semibold text-slate-400">
              £
            </span>
            <input
              id="annual-salary"
              type="number"
              min={0}
              step={1000}
              inputMode="numeric"
              value={annualSalary || ""}
              onChange={(event) => {
                const parsed = Number.parseInt(event.target.value, 10);
                onAnnualSalaryChange(
                  Number.isNaN(parsed) ? 0 : Math.max(0, parsed),
                );
              }}
              className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-4 pl-10 pr-4 text-2xl font-semibold text-slate-900 transition focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Annual gross salary"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="min-w-0 flex-1">
              <label
                htmlFor="hourly-rate"
                className="mb-3 flex items-center space-x-2 text-sm font-medium text-slate-700"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                  <PoundSterlingIcon className="h-3.5 w-3.5" />
                </span>
                <span>Hourly Rate</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-semibold text-slate-400">
                  £
                </span>
                <input
                  id="hourly-rate"
                  type="number"
                  min={0}
                  step={0.01}
                  inputMode="decimal"
                  value={hourlyRate || ""}
                  onChange={(event) => {
                    const parsed = Number.parseFloat(event.target.value);
                    handleHourlyChange(
                      Number.isNaN(parsed) ? 0 : Math.max(0, parsed),
                    );
                  }}
                  className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-4 pl-10 pr-16 text-2xl font-semibold text-slate-900 transition focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  aria-label="Hourly rate"
                />
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-sm font-medium text-slate-400">
                  / hr
                </span>
              </div>
            </div>

            <div className="w-full lg:w-44">
              <label
                htmlFor="hours-per-week"
                className="mb-3 block text-sm font-medium text-slate-700"
              >
                Hours per Week
              </label>
              <select
                id="hours-per-week"
                value={hoursPerWeek}
                onChange={(event) =>
                  handleHoursChange(
                    Number.parseFloat(event.target.value) as HoursPerWeek,
                  )
                }
                className="w-full rounded-xl border border-slate-100 bg-slate-50/50 px-3 py-4 text-base font-semibold text-slate-900 transition focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {HOURS_PER_WEEK_OPTIONS.map((hours) => (
                  <option key={hours} value={hours}>
                    {hours % 1 === 0 ? hours : hours.toFixed(1)} hours
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Based on a standard 52-week working calendar year.
          </p>
        </div>
      )}
    </div>
  );
}

export { DEFAULT_HOURS_PER_WEEK };
