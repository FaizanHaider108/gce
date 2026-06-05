"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex w-full items-center justify-center rounded-lg border border-slate-600 bg-slate-800/50 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-700/50 sm:w-auto"
    >
      Download Tax Breakdown (Print)
    </button>
  );
}
