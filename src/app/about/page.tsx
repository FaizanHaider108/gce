import type { Metadata } from "next";
import Link from "next/link";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { CORPORATE_EMAIL, getSiteUrl } from "@/lib/site/config";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "About Global Calculator Engine | UK Chartered Tax Professionals",
  description:
    "About Global Calculator Engine — ACCA-aligned UK tax professionals, HMRC 2026/27 salary calculators, and chartered accounting services.",
  alternates: {
    canonical: `${getSiteUrl()}/about`,
  },
};

export default function AboutPage() {
  return (
    <LegalPageLayout title="About Global Calculator Engine">
      <p>
        Global Calculator Engine is a UK-focused financial technology platform
        built to deliver transparent, HMRC-aligned salary and tax estimation
        tools for professionals, relocators, and corporate finance teams across
        every major city and region in the United Kingdom.
      </p>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Chartered credentials &amp; professional standards
        </h2>
        <p>
          Our accounting service routes are delivered by qualified UK tax
          professionals operating under chartered accounting membership
          frameworks including ACCA guidelines. We maintain continuous
          professional development sweeps against HMRC manual updates, Finance
          Act revisions, and Scottish Income Tax band changes to ensure every
          calculator and advisory output reflects current statutory law.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Technical expertise &amp; tax engine integrity
        </h2>
        <p>
          Our calculation engine is maintained against published HMRC thresholds
          for the {UK_TAX_YEAR} tax year, including Personal Allowance tapering,
          Class 1 National Insurance bands, Scottish Income Tax rates, and
          student loan repayment thresholds. Each of our 254+ city calculators
          applies the correct regional tax framework automatically based on
          localized geographic metadata — with jurisdictional FAQ copy and
          schema adjusted per nation.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Professional accounting services
        </h2>
        <p>
          Beyond our free estimation tools, Global Calculator Engine connects
          businesses and individuals with qualified UK tax professionals and
          corporate specialists. Our service routes cover VAT Returns, CT600
          Corporation Tax filings, Year-End Accounts, payroll operations, and
          strategic HMRC tax planning — delivered by chartered accountants with
          direct experience in UK compliance frameworks.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Trust, transparency &amp; YMYL compliance
        </h2>
        <p>
          All calculators on this platform are mapped to absolute HMRC{" "}
          {UK_TAX_YEAR} standards. We do not store personal salary inputs, and
          every estimate is accompanied by a clear YMYL financial disclaimer.
          Our privacy policy is reviewed continuously with a published
          validation timestamp, and cookie consent is enforced site-wide for
          regulatory compliance.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Contact &amp; service routes
        </h2>
        <p>
          Explore our{" "}
          <Link
            href="/services/vat-returns"
            className="font-medium text-emerald-600 hover:underline"
          >
            professional service routes
          </Link>
          , browse the{" "}
          <Link
            href="/uk-calculator-directory"
            className="font-medium text-emerald-600 hover:underline"
          >
            UK calculator directory
          </Link>
          , email{" "}
          <a
            href={`mailto:${CORPORATE_EMAIL}`}
            className="font-medium text-emerald-600 hover:underline"
          >
            {CORPORATE_EMAIL}
          </a>
          , or{" "}
          <Link
            href="/contact"
            className="font-medium text-emerald-600 hover:underline"
          >
            contact our team
          </Link>{" "}
          for priority accounting support.
        </p>
      </section>
    </LegalPageLayout>
  );
}
