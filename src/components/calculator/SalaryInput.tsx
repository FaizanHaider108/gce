"use client";

import { PoundSterlingIcon } from "@/components/icons/FinanceIcons";

interface SalaryInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export function SalaryInput({
  value,
  onChange,
  label = "Annual Gross Salary",
}: SalaryInputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="gross-salary"
        className="mb-3 flex items-center space-x-2 text-sm font-medium text-slate-700"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
          <PoundSterlingIcon className="h-3.5 w-3.5" />
        </span>
        <span>{label}</span>
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-semibold text-slate-400">
          £
        </span>
        <input
          id="gross-salary"
          type="number"
          min={0}
          step={1000}
          inputMode="numeric"
          value={value || ""}
          onChange={(event) => {
            const parsed = Number.parseInt(event.target.value, 10);
            onChange(Number.isNaN(parsed) ? 0 : Math.max(0, parsed));
          }}
          className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-4 pl-10 pr-4 text-2xl font-semibold text-slate-900 transition focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          aria-label={label}
        />
      </div>
    </div>
  );
}
