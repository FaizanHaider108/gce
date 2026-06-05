import type { ReactNode } from "react";

interface MetricBadgeProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function MetricBadge({ icon, label, value }: MetricBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-lg border border-slate-100 bg-white px-3.5 py-2.5 shadow-sm">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
