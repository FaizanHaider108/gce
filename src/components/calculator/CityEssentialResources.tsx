import type { UKCity } from "@/types/location";

interface CityEssentialResourcesProps {
  city: UKCity;
}

const RESOURCE_LINKS = [
  {
    href: "/blog/uk-tax-guide-2026",
    label:
      "Comprehensive 2026/27 HMRC Tax Code & Personal Allowance Manual",
  },
  {
    href: "/uk-calculator-directory",
    label: "Browse All 254+ Regional UK Take-Home Pay Directories",
  },
  {
    href: "/about",
    label:
      "Review Our Editorial Policy & Certified ACCA Data Verification Baselines",
  },
] as const;

/** SSR internal resource matrix — plain crawlable anchors on every city page. */
export function CityEssentialResources({ city }: CityEssentialResourcesProps) {
  return (
    <nav
      className="no-print mt-12 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-6 shadow-sm sm:p-8"
      aria-labelledby="essential-resources-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
        {city.cityName} resource hub
      </p>
      <h2
        id="essential-resources-heading"
        className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl"
      >
        Essential UK Tax &amp; Career Advancement Resources
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Structured internal routes for tax compliance, regional directory
        navigation, and editorial verification — fully crawlable without
        JavaScript.
      </p>
      <ul className="mt-5 space-y-3">
        {RESOURCE_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="flex items-start gap-3 rounded-lg border border-white bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800 hover:shadow-md"
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700"
                aria-hidden="true"
              >
                →
              </span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
