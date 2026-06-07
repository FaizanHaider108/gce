import type { ReactNode } from "react";
import { getRegionalBenchmarkDisclaimer } from "@/lib/seo/dynamic-intro";
import type { UKCity } from "@/types/location";

interface RegionalBenchmarksSectionProps {
  city: UKCity;
  children: ReactNode;
}

export function RegionalBenchmarksSection({
  city,
  children,
}: RegionalBenchmarksSectionProps) {
  return (
    <section
      className="no-print mt-10 space-y-8 border-t border-slate-200 pt-10"
      aria-labelledby="regional-benchmarks-heading"
    >
      <header className="space-y-2">
        <h2
          id="regional-benchmarks-heading"
          className="text-xl font-semibold text-slate-900 sm:text-2xl"
        >
          Regional Averages &amp; Local Benchmarks
        </h2>
        <p className="text-sm leading-relaxed text-slate-500">
          {getRegionalBenchmarkDisclaimer(city)}
        </p>
      </header>
      {children}
    </section>
  );
}
