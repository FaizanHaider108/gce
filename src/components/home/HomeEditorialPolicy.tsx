import Link from "next/link";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { TRUST_LAST_REVIEWED } from "@/lib/site/trust-compliance";
import { LEAD_FINANCIAL_ARCHITECT } from "@/lib/site/trust-profile";

export function HomeEditorialPolicy() {
  return (
    <section
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
      aria-labelledby="editorial-policy-heading"
    >
      <h2
        id="editorial-policy-heading"
        className="text-xl font-semibold text-slate-900 sm:text-2xl"
      >
        Editorial &amp; Data Accuracy Policy
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
        <p>
          Global Calculator Engine is built and maintained by a cross-functional
          squad of financial compliance professionals, chartered accountants, and
          senior system developers. We are not an anonymous utility — our{" "}
          <Link href="/about" className="font-medium text-emerald-600 hover:underline">
            governance profile
          </Link>{" "}
          names the experts responsible for every tax engine release.
        </p>
        <p>
          <strong className="font-medium text-slate-800">
            Validation routine:
          </strong>{" "}
          The calculation core is verified weekly against active HMRC manual
          updates, ONS regional earnings releases, and Finance Act revisions for
          the {UK_TAX_YEAR} tax year. Scottish Income Tax band changes trigger
          immediate jurisdictional copy and schema updates across all affected
          city routes.
        </p>
        <p>
          <strong className="font-medium text-slate-800">
            Last compliance sweep:
          </strong>{" "}
          {TRUST_LAST_REVIEWED}, overseen by {LEAD_FINANCIAL_ARCHITECT.name}{" "}
          and the ACCA / ACA compliance team. Every figure displayed on this
          platform is an estimate — users should cross-reference final payslips
          and HMRC Personal Tax Accounts before making binding decisions.
        </p>
        <p>
          Explore our{" "}
          <Link href="/guides" className="font-medium text-emerald-600 hover:underline">
            financial resource hub
          </Link>{" "}
          for long-form guides on UK tax, regional salaries, and career
          progression — designed to complement the 254+ city calculators above.
        </p>
      </div>
    </section>
  );
}
