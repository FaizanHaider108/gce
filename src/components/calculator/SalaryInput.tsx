"use client";

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
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-semibold text-slate-500">
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
          className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-10 pr-4 text-2xl font-semibold text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label={label}
        />
      </div>
    </div>
  );
}
