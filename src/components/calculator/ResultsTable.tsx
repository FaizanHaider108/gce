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
  showWhen?: boolean;
}

function toMonthly(yearly: number): number {
  return Number.parseFloat((yearly / 12).toFixed(2));
}

function toWeekly(yearly: number): number {
  return Number.parseFloat((yearly / 52).toFixed(2));
}

export function ResultsTable({ results }: ResultsTableProps) {
  const incomeTaxRows: ResultRow[] = results.incomeTax.bands.map((band) => ({
    label: band.label,
    yearly: band.amount,
    monthly: toMonthly(band.amount),
    weekly: toWeekly(band.amount),
    emphasis: "negative" as const,
    hideIfZero: true,
  }));

  const rows: ResultRow[] = [
    {
      label: "Gross Salary",
      yearly: results.grossSalary,
      monthly: toMonthly(results.grossSalary),
      weekly: toWeekly(results.grossSalary),
      emphasis: "neutral",
    },
    {
      label: `Pension Contribution${results.pension.percent > 0 ? ` (${results.pension.percent}%)` : ""}`,
      yearly: results.pension.yearly,
      monthly: results.pension.monthly,
      weekly: results.pension.weekly,
      emphasis: "negative",
      hideIfZero: true,
    },
    {
      label: "Salary after Pension Sacrifice",
      yearly: results.adjustedGross,
      monthly: toMonthly(results.adjustedGross),
      weekly: toWeekly(results.adjustedGross),
      emphasis: "neutral",
      showWhen: results.pension.percent > 0,
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
    ...incomeTaxRows,
    {
      label: "Total Income Tax",
      yearly: results.incomeTax.total,
      monthly: toMonthly(results.incomeTax.total),
      weekly: toWeekly(results.incomeTax.total),
      emphasis: "negative",
    },
    {
      label: `National Insurance — 8% on taxable earnings above ${formatGBP(results.niPrimaryThreshold)}`,
      yearly: results.nationalInsurance.mainRate,
      monthly: toMonthly(results.nationalInsurance.mainRate),
      weekly: toWeekly(results.nationalInsurance.mainRate),
      emphasis: "negative",
      hideIfZero: true,
    },
    {
      label: `National Insurance — 2% on earnings above ${formatGBP(results.niUpperEarningsLimit)}`,
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
      label: `Student Loan Repayment${results.studentLoan.plan !== "none" ? ` (${results.studentLoan.label})` : ""}`,
      yearly: results.studentLoan.yearly,
      monthly: results.studentLoan.monthly,
      weekly: results.studentLoan.weekly,
      emphasis: "negative",
      hideIfZero: true,
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

  const visibleRows = rows.filter((row) => {
    if (row.showWhen === false) return false;
    return !row.hideIfZero || row.yearly > 0;
  });

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
    <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
      {results.taxJurisdiction === "scotland" && (
        <p className="border-b border-slate-100 bg-emerald-50/50 px-4 py-2.5 text-xs text-emerald-800 sm:px-4 sm:text-sm">
          Scottish Income Tax rates applied ({results.taxYear}). NI is calculated
          UK-wide.
        </p>
      )}
      <table className="w-full table-fixed text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80">
            <th className="w-[40%] px-3 py-3 text-xs font-semibold text-slate-600 sm:px-4 sm:text-sm">
              Breakdown
            </th>
            <th className="px-2 py-3 text-right text-xs font-semibold text-slate-600 sm:px-3 sm:text-sm">
              Yearly
            </th>
            <th className="px-2 py-3 text-right text-xs font-semibold text-slate-600 sm:px-3 sm:text-sm">
              Monthly
            </th>
            <th className="px-2 py-3 text-right text-xs font-semibold text-slate-600 sm:px-3 sm:text-sm">
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
                <td
                  className={`px-3 py-2.5 text-xs sm:px-4 sm:py-3 sm:text-sm ${styles.label}`}
                >
                  {row.label}
                </td>
                <td
                  className={`px-2 py-2.5 text-right text-xs tabular-nums sm:px-3 sm:py-3 sm:text-sm ${styles.value}`}
                >
                  {row.emphasis === "negative" && row.yearly > 0 ? "−" : ""}
                  {formatGBP(row.yearly)}
                </td>
                <td
                  className={`px-2 py-2.5 text-right text-xs tabular-nums sm:px-3 sm:py-3 sm:text-sm ${styles.value}`}
                >
                  {row.emphasis === "negative" && row.monthly > 0 ? "−" : ""}
                  {formatGBP(row.monthly)}
                </td>
                <td
                  className={`px-2 py-2.5 text-right text-xs tabular-nums sm:px-3 sm:py-3 sm:text-sm ${styles.value}`}
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
