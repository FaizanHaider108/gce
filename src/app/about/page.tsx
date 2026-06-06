import type { Metadata } from "next";
import Link from "next/link";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { CORPORATE_EMAIL, getSiteUrl } from "@/lib/site/config";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Global Calculator Engine — UK tax professionals, HMRC-aligned salary calculators, and chartered accounting services for businesses and professionals.",
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
          Our expertise
        </h2>
        <p>
          Our calculation engine is maintained against published HMRC thresholds
          for the {UK_TAX_YEAR} tax year, including Personal Allowance tapering,
          Class 1 National Insurance bands, Scottish Income Tax rates, and
          student loan repayment thresholds. Each city calculator applies the
          correct regional tax framework automatically based on localized
          geographic metadata.
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
          Trust &amp; compliance standards
        </h2>
        <p>
          All calculators on this platform are mapped to absolute HMRC{" "}
          {UK_TAX_YEAR} standards. We do not store personal salary inputs, and
          every estimate is accompanied by a clear YMYL financial disclaimer.
          For binding advice, formal filings, or accounts sign-off, we recommend
          engaging our qualified accounting team directly.
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
