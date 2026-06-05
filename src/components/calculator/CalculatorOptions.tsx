"use client";

import { TAX_YEAR_OPTIONS } from "@/lib/calculators/uk";
import type { StudentLoanPlan, TaxYearId } from "@/types/calculator";

const STUDENT_LOAN_OPTIONS: { value: StudentLoanPlan; label: string }[] = [
  { value: "none", label: "None" },
  { value: "plan1", label: "Plan 1" },
  { value: "plan2", label: "Plan 2" },
  { value: "plan5", label: "Plan 5" },
  { value: "postgraduate", label: "Postgraduate Loan" },
];

interface CalculatorOptionsProps {
  taxYear: TaxYearId;
  onTaxYearChange: (value: TaxYearId) => void;
  pensionPercent: number;
  onPensionChange: (value: number) => void;
  studentLoan: StudentLoanPlan;
  onStudentLoanChange: (value: StudentLoanPlan) => void;
}

const selectClassName =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20";

export function CalculatorOptions({
  taxYear,
  onTaxYearChange,
  pensionPercent,
  onPensionChange,
  studentLoan,
  onStudentLoanChange,
}: CalculatorOptionsProps) {
  return (
    <div className="mb-8 space-y-6 border-b border-slate-100 pb-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="tax-year"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Tax Year
          </label>
          <select
            id="tax-year"
            value={taxYear}
            onChange={(e) => onTaxYearChange(e.target.value as TaxYearId)}
            className={selectClassName}
          >
            {TAX_YEAR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="student-loan"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Student Loan
          </label>
          <select
            id="student-loan"
            value={studentLoan}
            onChange={(e) =>
              onStudentLoanChange(e.target.value as StudentLoanPlan)
            }
            className={selectClassName}
          >
            {STUDENT_LOAN_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <label
            htmlFor="pension-percent"
            className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700"
          >
            <span>Workplace Pension Contribution (%)</span>
            <span className="tabular-nums text-emerald-600">{pensionPercent}%</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              id="pension-percent"
              type="range"
              min={0}
              max={40}
              step={1}
              value={pensionPercent}
              onChange={(e) => onPensionChange(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-500"
              aria-label="Workplace pension contribution percentage"
            />
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={pensionPercent}
              onChange={(e) => {
                const parsed = Number.parseInt(e.target.value, 10);
                onPensionChange(
                  Number.isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed)),
                );
              }}
              className="w-16 shrink-0 rounded-lg border border-slate-200 px-2 py-2 text-center text-sm font-semibold tabular-nums text-slate-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              aria-label="Pension percentage value"
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            Pre-tax salary sacrifice — deducted before Income Tax and NI. Student
            loan repayments always use your original contractual gross salary.
          </p>
        </div>
      </div>
    </div>
  );
}
