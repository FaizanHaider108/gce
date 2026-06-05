import type { ReactNode } from "react";

interface MetricBadgeProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function MetricBadge({ icon, label, value }: MetricBadgeProps) {
  return (
    <div className="flex w-full min-w-0 items-center space-x-2 rounded-lg border border-slate-100 bg-white px-3 py-2.5 shadow-sm sm:w-auto sm:max-w-xs">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
