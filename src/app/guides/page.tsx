import type { Metadata } from "next";
import Link from "next/link";
import { GUIDE_PILLARS, getGuidePath } from "@/lib/data/guide-pillars";
import { getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "UK Financial Resource Hub — Tax, Salary & Career Guides",
  description:
    "Editorial guides on UK tax, National Insurance, regional salary benchmarking, cost of living, negotiation, and highest-paying occupations — by uktaxcalculation.",
  alternates: {
    canonical: `${getSiteUrl()}/guides`,
  },
};

export default function GuidesHubPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          UK Financial Resource Hub
        </h1>
        <p className="text-base leading-relaxed text-slate-500">
          uktaxcalculation is a content-driven financial resource — not
          just a tool collection. These foundational guides connect directly to
          our 254+ city salary calculators for airtight topical authority.
        </p>
        <p className="text-sm">
          <Link
            href="/uk-calculator-directory"
            className="font-medium text-emerald-600 hover:underline"
          >
            Browse all city calculators →
          </Link>
        </p>
      </header>

      <ul className="mt-10 space-y-4">
        {GUIDE_PILLARS.map((guide) => (
          <li key={guide.slug}>
            <a
              href={getGuidePath(guide.slug)}
              className="block rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-emerald-100 hover:shadow-md sm:p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                {guide.category} · {guide.readMinutes} min read
              </span>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {guide.shortDescription}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
