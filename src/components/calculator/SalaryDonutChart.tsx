"use client";

import type { UKSalaryCalculation } from "@/types/calculator";
import { formatGBP } from "@/lib/format/currency";

interface SalaryDonutChartProps {
  results: UKSalaryCalculation;
}

interface ChartSegment {
  id: string;
  label: string;
  value: number;
  color: string;
  bgClass: string;
  textClass: string;
}

const RADIUS = 54;
const STROKE = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function buildSegments(results: UKSalaryCalculation): ChartSegment[] {
  return [
    {
      id: "net",
      label: "Net Take-Home Salary",
      value: results.netSalary.yearly,
      color: "#10b981",
      bgClass: "bg-emerald-500",
      textClass: "text-emerald-700",
    },
    {
      id: "tax",
      label: "Income Tax",
      value: results.incomeTax.total,
      color: "#f59e0b",
      bgClass: "bg-amber-500",
      textClass: "text-amber-700",
    },
    {
      id: "ni",
      label: "National Insurance",
      value: results.nationalInsurance.total,
      color: "#6366f1",
      bgClass: "bg-indigo-500",
      textClass: "text-indigo-700",
    },
  ];
}

export function SalaryDonutChart({ results }: SalaryDonutChartProps) {
  const gross = results.grossSalary;
  const segments = buildSegments(results).filter((s) => s.value > 0);

  if (gross <= 0) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Enter a salary to see your distribution chart.
        </p>
      </div>
    );
  }

  let dashOffset = 0;

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">
        Salary Distribution
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        How your {formatGBP(gross)} gross salary is allocated
      </p>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
        <div className="relative shrink-0">
          <svg
            viewBox="0 0 120 120"
            className="h-44 w-44 sm:h-48 sm:w-48"
            role="img"
            aria-label="Salary distribution donut chart"
          >
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={STROKE}
            />
            {segments.map((segment) => {
              const pct = segment.value / gross;
              const dashLength = pct * CIRCUMFERENCE;
              const circle = (
                <circle
                  key={segment.id}
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={STROKE}
                  strokeDasharray={`${dashLength} ${CIRCUMFERENCE - dashLength}`}
                  strokeDashoffset={-dashOffset}
                  strokeLinecap="butt"
                  transform="rotate(-90 60 60)"
                  className="transition-all duration-500 ease-out"
                />
              );
              dashOffset += dashLength;
              return circle;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Take-Home
            </span>
            <span className="text-xl font-bold text-emerald-600 sm:text-2xl">
              {((results.netSalary.yearly / gross) * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <ul className="w-full min-w-0 space-y-3 sm:max-w-[200px]">
          {buildSegments(results).map((segment) => {
            const pct = gross > 0 ? (segment.value / gross) * 100 : 0;
            return (
              <li
                key={segment.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <div className="flex min-w-0 items-center space-x-2">
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full ${segment.bgClass}`}
                    aria-hidden="true"
                  />
                  <span className="truncate text-slate-600">{segment.label}</span>
                </div>
                <div className={`shrink-0 font-semibold tabular-nums ${segment.textClass}`}>
                  {pct.toFixed(1)}%
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center text-xs">
        <div>
          <p className="font-medium text-emerald-600">
            {formatGBP(results.netSalary.yearly)}
          </p>
          <p className="text-slate-400">Net</p>
        </div>
        <div>
          <p className="font-medium text-amber-600">
            {formatGBP(results.incomeTax.total)}
          </p>
          <p className="text-slate-400">Tax</p>
        </div>
        <div>
          <p className="font-medium text-indigo-600">
            {formatGBP(results.nationalInsurance.total)}
          </p>
          <p className="text-slate-400">NI</p>
        </div>
      </div>
    </div>
  );
}
