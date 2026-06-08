import type { Metadata } from "next";
import Link from "next/link";
import { TrustComplianceRibbon } from "@/components/legal/TrustComplianceRibbon";
import { UK_TAX_YEAR, PERSONAL_ALLOWANCE } from "@/lib/calculators/uk";
import { getSiteUrl, SITE_NAME } from "@/lib/site/config";

export const metadata: Metadata = {
  title: `Comprehensive ${UK_TAX_YEAR} HMRC Tax Code & Personal Allowance Manual`,
  description: `Official ${UK_TAX_YEAR} UK Income Tax bands, Personal Allowance rules, National Insurance thresholds, and PAYE compliance reference by ${SITE_NAME}.`,
  alternates: {
    canonical: `${getSiteUrl()}/blog/uk-tax-guide-2026`,
  },
};

export default function UkTaxGuide2026Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <article>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
          HMRC reference · {UK_TAX_YEAR}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Comprehensive {UK_TAX_YEAR} HMRC Tax Code &amp; Personal Allowance
          Manual
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          This editorial reference explains how {SITE_NAME} aligns every city
          salary calculator to published HMRC thresholds for the {UK_TAX_YEAR}{" "}
          tax year — including Personal Allowance taper, Scottish Income Tax
          bands, and Class 1 National Insurance.
        </p>

        <section className="mt-8 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          <h2 className="text-lg font-semibold text-slate-900">
            Personal Allowance baseline
          </h2>
          <p>
            The standard Personal Allowance for {UK_TAX_YEAR} is £
            {PERSONAL_ALLOWANCE.toLocaleString("en-GB")}. Earnings above
            £100,000 trigger taper at £1 per £2 until the allowance reaches
            zero at £125,140.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">
            England, Wales &amp; Northern Ireland bands
          </h2>
          <p>
            Basic rate (20%), higher rate (40%), and additional rate (45%) apply
            to taxable income after allowances. National Insurance Class 1
            thresholds operate UK-wide regardless of devolved Income Tax.
          </p>

          <h2 className="text-lg font-semibold text-slate-900">
            Scottish Income Tax
          </h2>
          <p>
            Scottish taxpayers use Starter, Basic, Intermediate, Higher, and
            Top bands set by the Scottish Government. NI remains UK-wide under
            HMRC Class 1 rules.
          </p>
        </section>

        <p className="mt-8 text-sm">
          <Link
            href="/uk-calculator-directory"
            className="font-semibold text-emerald-600 hover:underline"
          >
            Browse all 254+ regional calculators →
          </Link>
        </p>
      </article>

      <div className="mt-8">
        <TrustComplianceRibbon />
      </div>
    </main>
  );
}
