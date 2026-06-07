import Link from "next/link";
import { ShieldCheckIcon } from "@/components/icons/FinanceIcons";
import {
  TRUST_DATA_SOURCES,
  TRUST_EXPERT_REVIEWER,
  TRUST_LAST_REVIEWED,
} from "@/lib/site/trust-compliance";
import { LEAD_FINANCIAL_ARCHITECT } from "@/lib/site/trust-profile";

/** SSR trust ribbon — visible E-E-A-T signals on every city calculator page. */
export function TrustComplianceRibbon() {
  return (
    <aside
      className="no-print rounded-xl border border-emerald-200 bg-emerald-50/50 px-5 py-4 sm:px-6"
      aria-label="Trust and compliance verification"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
          <ShieldCheckIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0 space-y-2 text-sm leading-relaxed text-slate-700">
          <p className="font-semibold text-slate-900">
            Trust &amp; Compliance Verification
          </p>
          <ul className="space-y-1.5">
            <li>
              <strong>Last Reviewed &amp; Verified:</strong> {TRUST_LAST_REVIEWED}
            </li>
            <li>
              <strong>Expert Reviewed By:</strong>{" "}
              <Link href="/about" className="font-medium text-emerald-700 hover:underline">
                {TRUST_EXPERT_REVIEWER}
              </Link>{" "}
              — led by{" "}
              <Link href="/about" className="font-medium text-emerald-700 hover:underline">
                {LEAD_FINANCIAL_ARCHITECT.name}
              </Link>
            </li>
            <li>
              <strong>Primary Data Sources:</strong> Synchronized directly with{" "}
              {TRUST_DATA_SOURCES.map((source, index) => (
                <span key={source}>
                  {index > 0 && (index === TRUST_DATA_SOURCES.length - 1 ? ", and " : ", ")}
                  <Link href="/about" className="text-emerald-700 hover:underline">
                    {source}
                  </Link>
                </span>
              ))}
              .
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
