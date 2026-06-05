import Link from "next/link";
import { PrintButton } from "./PrintButton";

export function RelocationCTA() {
  return (
    <section
      className="no-print mt-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg sm:p-8"
      aria-labelledby="relocation-cta-heading"
    >
      <h2
        id="relocation-cta-heading"
        className="text-xl font-semibold sm:text-2xl"
      >
        Planning a relocation or salary negotiation?
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
        Compare your take-home pay against the UK&apos;s highest-paying city or
        save your personalised tax breakdown as a PDF for your records.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href="/salary/uk/salary-calculator-london"
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400 sm:w-auto"
        >
          Compare with London Salary
        </Link>
        <PrintButton />
      </div>
    </section>
  );
}
