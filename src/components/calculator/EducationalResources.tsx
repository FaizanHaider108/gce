import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { GUIDE_PILLARS, getGuidePath } from "@/lib/data/guide-pillars";
import { SITE_NAME } from "@/lib/site/config";
import type { UKCity } from "@/types/location";

interface EducationalResourcesProps {
  city: UKCity;
}

/** SSR internal link hub — connects city calculators to topical authority guides. */
export function EducationalResources({ city }: EducationalResourcesProps) {
  return (
    <section
      className="no-print mt-12 rounded-xl border border-slate-100 bg-slate-50/80 p-6 sm:p-8"
      aria-labelledby="educational-resources-heading"
    >
      <div className="flex items-center gap-2">
        <BookOpenIcon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        <h2
          id="educational-resources-heading"
          className="text-lg font-semibold text-slate-900"
        >
          Deep-Dive Guides for {city.cityName} Professionals
        </h2>
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Extend your {city.cityName} salary analysis with our editorial resource
        hub — structured for UK tax compliance, regional benchmarking, and
        career planning.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {GUIDE_PILLARS.map((guide) => (
          <li key={guide.slug}>
            <a
              href={getGuidePath(guide.slug)}
              className="flex h-full flex-col rounded-lg border border-white bg-white px-4 py-3 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                {guide.category}
              </span>
              <span className="mt-1 text-sm font-semibold text-slate-900">
                {guide.title}
              </span>
              <span className="mt-1 text-xs text-slate-500">
                {guide.readMinutes} min read
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm">
        <Link
          href="/guides"
          className="font-semibold text-emerald-600 hover:underline"
        >
          Browse the full {SITE_NAME} resource hub →
        </Link>
      </p>
    </section>
  );
}
