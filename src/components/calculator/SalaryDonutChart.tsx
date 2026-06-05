"use client";

import { useMemo, useState } from "react";
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
  legendHoverClass: string;
}

const CX = 60;
const CY = 60;
const RADIUS = 54;
const STROKE = 14;
const STROKE_HOVER = 16;
/** ~2px visual gap between slices at this radius */
const SEGMENT_GAP_DEG = 2.5;

function buildSegments(results: UKSalaryCalculation): ChartSegment[] {
  return [
    {
      id: "net",
      label: "Net Take-Home Salary",
      value: results.netSalary.yearly,
      color: "#10b981",
      bgClass: "bg-emerald-500",
      textClass: "text-emerald-600",
      legendHoverClass: "hover:border-emerald-200 hover:bg-emerald-50/60",
    },
    {
      id: "tax",
      label: "Income Tax",
      value: results.incomeTax.total,
      color: "#f43f5e",
      bgClass: "bg-rose-500",
      textClass: "text-rose-600",
      legendHoverClass: "hover:border-rose-200 hover:bg-rose-50/60",
    },
    {
      id: "ni",
      label: "National Insurance",
      value: results.nationalInsurance.total,
      color: "#3b82f6",
      bgClass: "bg-blue-500",
      textClass: "text-blue-600",
      legendHoverClass: "hover:border-blue-200 hover:bg-blue-50/60",
    },
  ];
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const sweep = endDeg - startDeg;
  if (sweep <= 0) return "";

  const start = polar(cx, cy, r, endDeg);
  const end = polar(cx, cy, r, startDeg);
  const large = sweep > 180 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

interface ArcSegment extends ChartSegment {
  startDeg: number;
  endDeg: number;
  pct: number;
}

function buildArcSegments(
  segments: ChartSegment[],
  gross: number,
): ArcSegment[] {
  const active = segments.filter((s) => s.value > 0);
  const totalGap = active.length * SEGMENT_GAP_DEG;
  const availableDeg = 360 - totalGap;
  let cursor = 0;

  return active.map((segment) => {
    const sweep = (segment.value / gross) * availableDeg;
    const arc: ArcSegment = {
      ...segment,
      startDeg: cursor,
      endDeg: cursor + sweep,
      pct: (segment.value / gross) * 100,
    };
    cursor += sweep + SEGMENT_GAP_DEG;
    return arc;
  });
}

export function SalaryDonutChart({ results }: SalaryDonutChartProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const gross = results.grossSalary;
  const allSegments = useMemo(() => buildSegments(results), [results]);
  const arcSegments = useMemo(
    () => buildArcSegments(allSegments, gross),
    [allSegments, gross],
  );

  const netSegment = allSegments.find((s) => s.id === "net");
  const hoveredSegment =
    allSegments.find((s) => s.id === hoveredId) ?? netSegment;

  const centerValue = hoveredSegment
    ? `${((hoveredSegment.value / gross) * 100).toFixed(1)}%`
    : "0.0%";

  const centerLabel =
    hoveredId === null
      ? "Take-Home Pay"
      : hoveredSegment?.label ?? "Take-Home Pay";

  if (gross <= 0) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          Enter a salary to see your distribution chart.
        </p>
      </div>
    );
  }

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
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={STROKE}
            />
            {arcSegments.map((segment) => {
              const isHovered = hoveredId === segment.id;
              const isDimmed = hoveredId !== null && !isHovered;

              return (
                <path
                  key={segment.id}
                  d={arcPath(CX, CY, RADIUS, segment.startDeg, segment.endDeg)}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={isHovered ? STROKE_HOVER : STROKE}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all duration-300 ease-in-out"
                  style={{
                    opacity: isDimmed ? 0.35 : 1,
                    filter: isHovered
                      ? `drop-shadow(0 0 6px ${segment.color}66)`
                      : undefined,
                  }}
                  onMouseEnter={() => setHoveredId(segment.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              );
            })}
          </svg>

          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out"
            aria-hidden="true"
          >
            <span className="text-2xl font-extrabold tabular-nums text-slate-900">
              {hoveredId === null
                ? `${((results.netSalary.yearly / gross) * 100).toFixed(1)}%`
                : centerValue}
            </span>
            <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {centerLabel}
            </span>
          </div>
        </div>

        <ul className="w-full min-w-0 space-y-2.5 sm:max-w-[220px]">
          {allSegments.map((segment) => {
            const pct = (segment.value / gross) * 100;
            const isHovered = hoveredId === segment.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <li key={segment.id}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left text-sm transition-all duration-300 ease-in-out ${segment.legendHoverClass} ${
                    isHovered ? "scale-105 border-slate-200 bg-slate-50 shadow-sm" : ""
                  }`}
                  style={{ opacity: isDimmed ? 0.45 : 1 }}
                  onMouseEnter={() => setHoveredId(segment.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(segment.id)}
                  onBlur={() => setHoveredId(null)}
                >
                  <div className="flex min-w-0 items-center space-x-2.5">
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${segment.bgClass} transition-transform duration-300 ease-in-out ${
                        isHovered ? "scale-125" : ""
                      }`}
                      aria-hidden="true"
                    />
                    <span className="truncate text-slate-600">{segment.label}</span>
                  </div>
                  <span
                    className={`shrink-0 font-semibold tabular-nums ${segment.textClass}`}
                  >
                    {pct.toFixed(1)}%
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center text-xs">
        <div
          className="rounded-lg py-1 transition-all duration-300 ease-in-out hover:scale-105"
          onMouseEnter={() => setHoveredId("net")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <p className="font-semibold text-emerald-600">
            {formatGBP(results.netSalary.yearly)}
          </p>
          <p className="text-slate-400">Net</p>
        </div>
        <div
          className="rounded-lg py-1 transition-all duration-300 ease-in-out hover:scale-105"
          onMouseEnter={() => setHoveredId("tax")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <p className="font-semibold text-rose-600">
            {formatGBP(results.incomeTax.total)}
          </p>
          <p className="text-slate-400">Tax</p>
        </div>
        <div
          className="rounded-lg py-1 transition-all duration-300 ease-in-out hover:scale-105"
          onMouseEnter={() => setHoveredId("ni")}
          onMouseLeave={() => setHoveredId(null)}
        >
          <p className="font-semibold text-blue-600">
            {formatGBP(results.nationalInsurance.total)}
          </p>
          <p className="text-slate-400">NI</p>
        </div>
      </div>
    </div>
  );
}
