import type { UKSalaryCalculation } from "@/types/calculator";
import { formatGBP } from "@/lib/format/currency";

interface ResultsTableProps {
  results: UKSalaryCalculation;
}

interface ResultRow {
  label: string;
  yearly: number;
  monthly: number;
  highlight?: boolean;
  emphasis?: "positive" | "negative";
}

export function ResultsTable({ results }: ResultsTableProps) {
  const rows: ResultRow[] = [
    {
      label: "Gross Salary",
      yearly: results.grossSalary,
      monthly: results.grossSalary / 12,
    },
    {
      label: "Personal Allowance (0% tax)",
      yearly: results.personalAllowance,
      monthly: results.personalAllowance / 12,
    },
    {
      label: "Income Tax (Basic 20%)",
      yearly: results.incomeTax.basicRate,
      monthly: results.incomeTax.basicRate / 12,
      emphasis: "negative",
    },
    {
      label: "Income Tax (Higher 40%)",
      yearly: results.incomeTax.higherRate,
      monthly: results.incomeTax.higherRate / 12,
      emphasis: "negative",
    },
    {
      label: "Total Income Tax",
      yearly: results.incomeTax.total,
      monthly: results.incomeTax.total / 12,
      emphasis: "negative",
    },
    {
      label: "National Insurance (est. 8%)",
      yearly: results.nationalInsurance,
      monthly: results.nationalInsurance / 12,
      emphasis: "negative",
    },
    {
      label: "Total Deductions",
      yearly: results.totalDeductions,
      monthly: results.totalDeductions / 12,
      emphasis: "negative",
    },
    {
      label: "Net Take-Home Salary",
      yearly: results.netSalary.yearly,
      monthly: results.netSalary.monthly,
      highlight: true,
      emphasis: "positive",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-3 text-sm font-semibold text-slate-600 sm:px-6">
              Breakdown
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600 sm:px-6">
              Yearly
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600 sm:px-6">
              Monthly
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className={`border-b border-slate-100 last:border-b-0 ${
                row.highlight ? "bg-emerald-50/60" : ""
              }`}
            >
              <td
                className={`px-4 py-3 text-sm sm:px-6 ${
                  row.highlight
                    ? "font-semibold text-emerald-900"
                    : "text-slate-700"
                }`}
              >
                {row.label}
              </td>
              <td
                className={`px-4 py-3 text-right text-sm font-medium sm:px-6 ${
                  row.emphasis === "negative"
                    ? "text-red-600"
                    : row.emphasis === "positive"
                      ? "text-emerald-700"
                      : "text-slate-900"
                } ${row.highlight ? "font-bold" : ""}`}
              >
                {row.emphasis === "negative" && row.yearly > 0 ? "−" : ""}
                {formatGBP(row.yearly)}
              </td>
              <td
                className={`px-4 py-3 text-right text-sm font-medium sm:px-6 ${
                  row.emphasis === "negative"
                    ? "text-red-600"
                    : row.emphasis === "positive"
                      ? "text-emerald-700"
                      : "text-slate-900"
                } ${row.highlight ? "font-bold" : ""}`}
              >
                {row.emphasis === "negative" && row.monthly > 0 ? "−" : ""}
                {formatGBP(row.monthly)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
