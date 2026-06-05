import type { UKSalaryCalculation } from "@/types/calculator";
import { formatGBP } from "@/lib/format/currency";

interface ResultsTableProps {
  results: UKSalaryCalculation;
}

interface ResultRow {
  label: string;
  yearly: number;
  monthly: number;
  weekly: number;
  highlight?: boolean;
  emphasis?: "positive" | "negative" | "neutral";
  hideIfZero?: boolean;
}

function toMonthly(yearly: number): number {
  return Number.parseFloat((yearly / 12).toFixed(2));
}

function toWeekly(yearly: number): number {
  return Number.parseFloat((yearly / 52).toFixed(2));
}

export function ResultsTable({ results }: ResultsTableProps) {
  const rows: ResultRow[] = [
    {
      label: "Gross Salary",
      yearly: results.grossSalary,
      monthly: toMonthly(results.grossSalary),
      weekly: toWeekly(results.grossSalary),
      emphasis: "neutral",
    },
    {
      label: "Personal Allowance (tax-free)",
      yearly: results.personalAllowance,
      monthly: toMonthly(results.personalAllowance),
      weekly: toWeekly(results.personalAllowance),
      emphasis: "neutral",
    },
    {
      label: "Taxable Income (after allowance)",
      yearly: results.taxableIncome,
      monthly: toMonthly(results.taxableIncome),
      weekly: toWeekly(results.taxableIncome),
      emphasis: "neutral",
    },
    {
      label: "Income Tax — Basic Rate (20%)",
      yearly: results.incomeTax.basicRate,
      monthly: toMonthly(results.incomeTax.basicRate),
      weekly: toWeekly(results.incomeTax.basicRate),
      emphasis: "negative",
      hideIfZero: true,
    },
    {
      label: "Income Tax — Higher Rate (40%)",
      yearly: results.incomeTax.higherRate,
      monthly: toMonthly(results.incomeTax.higherRate),
      weekly: toWeekly(results.incomeTax.higherRate),
      emphasis: "negative",
      hideIfZero: true,
    },
    {
      label: "Income Tax — Additional Rate (45%)",
      yearly: results.incomeTax.additionalRate,
      monthly: toMonthly(results.incomeTax.additionalRate),
      weekly: toWeekly(results.incomeTax.additionalRate),
      emphasis: "negative",
      hideIfZero: true,
    },
    {
      label: "Total Income Tax",
      yearly: results.incomeTax.total,
      monthly: toMonthly(results.incomeTax.total),
      weekly: toWeekly(results.incomeTax.total),
      emphasis: "negative",
    },
    {
      label: "National Insurance — Main Rate (8%)",
      yearly: results.nationalInsurance.mainRate,
      monthly: toMonthly(results.nationalInsurance.mainRate),
      weekly: toWeekly(results.nationalInsurance.mainRate),
      emphasis: "negative",
      hideIfZero: true,
    },
    {
      label: "National Insurance — Additional Rate (2%)",
      yearly: results.nationalInsurance.additionalRate,
      monthly: toMonthly(results.nationalInsurance.additionalRate),
      weekly: toWeekly(results.nationalInsurance.additionalRate),
      emphasis: "negative",
      hideIfZero: true,
    },
    {
      label: "Total National Insurance",
      yearly: results.nationalInsurance.total,
      monthly: toMonthly(results.nationalInsurance.total),
      weekly: toWeekly(results.nationalInsurance.total),
      emphasis: "negative",
    },
    {
      label: "Total Deductions",
      yearly: results.totalDeductions,
      monthly: toMonthly(results.totalDeductions),
      weekly: toWeekly(results.totalDeductions),
      emphasis: "negative",
    },
    {
      label: "Net Take-Home Salary",
      yearly: results.netSalary.yearly,
      monthly: results.netSalary.monthly,
      weekly: results.netSalary.weekly,
      highlight: true,
      emphasis: "positive",
    },
  ];

  const visibleRows = rows.filter(
    (row) => !row.hideIfZero || row.yearly > 0,
  );

  const getRowStyles = (row: ResultRow) => {
    if (row.highlight) {
      return {
        row: "border-b-0 bg-emerald-100 ring-1 ring-inset ring-emerald-200",
        label: "py-4 text-base font-bold text-emerald-900",
        value: "py-4 text-base font-bold text-emerald-700",
      };
    }

    if (row.emphasis === "negative") {
      return {
        row: "bg-red-50/70",
        label: "text-red-800/80",
        value: "font-medium text-red-600/90",
      };
    }

    return {
      row: "",
      label: "text-slate-700",
      value: "font-medium text-slate-900",
    };
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm">
      <table className="w-full min-w-[32rem] text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80">
            <th className="px-4 py-3 text-sm font-semibold text-slate-600 sm:px-6">
              Breakdown
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600 sm:px-6">
              Yearly
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600 sm:px-6">
              Monthly
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-slate-600 sm:px-6">
              Weekly
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => {
            const styles = getRowStyles(row);

            return (
              <tr
                key={row.label}
                className={`border-b border-slate-100 last:border-b-0 ${styles.row}`}
              >
                <td className={`px-4 py-3 text-sm sm:px-6 ${styles.label}`}>
                  {row.label}
                </td>
                <td
                  className={`px-4 py-3 text-right text-sm tabular-nums sm:px-6 ${styles.value}`}
                >
                  {row.emphasis === "negative" && row.yearly > 0 ? "−" : ""}
                  {formatGBP(row.yearly)}
                </td>
                <td
                  className={`px-4 py-3 text-right text-sm tabular-nums sm:px-6 ${styles.value}`}
                >
                  {row.emphasis === "negative" && row.monthly > 0 ? "−" : ""}
                  {formatGBP(row.monthly)}
                </td>
                <td
                  className={`px-4 py-3 text-right text-sm tabular-nums sm:px-6 ${styles.value}`}
                >
                  {row.emphasis === "negative" && row.weekly > 0 ? "−" : ""}
                  {formatGBP(row.weekly)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
