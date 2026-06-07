import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { CORPORATE_EMAIL, getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for uktaxcalculation — disclaimer, intellectual property, and governing law.",
  alternates: {
    canonical: `${getSiteUrl()}/terms`,
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service for uktaxcalculation">
      <p>
        These Terms of Service govern your use of uktaxcalculation at
        globalcalculatorengine.vercel.app and all associated UK salary
        calculators, directory pages, and professional service routes. By
        accessing uktaxcalculation you agree to these terms in full.
      </p>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Nature of our services
        </h2>
        <p>
          uktaxcalculation provides free HMRC-aligned salary estimation
          tools mapped to {UK_TAX_YEAR} tax thresholds and optional connections
          to qualified UK Chartered Accountants for formal accounting services.
          Calculator outputs are educational estimates — not regulated financial
          advice.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Disclaimer of liability
        </h2>
        <p>
          Salary, Income Tax, and National Insurance figures produced by
          uktaxcalculation are for general informational purposes only. While
          synchronized to published HMRC baselines, individual liabilities vary
          based on tax codes, benefits in kind, student loans, and corporate
          structures. uktaxcalculation accepts no liability for decisions made on the basis of
          calculator estimates. Always consult a qualified UK accountant before
          making binding financial decisions.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Acceptable use
        </h2>
        <p>
          You may not scrape, bulk-harvest, or republish uktaxcalculation
          content without written permission. Automated access that degrades
          service performance or circumvents rate limits is prohibited. City
          calculator pages are intended for individual professional and
          relocation use.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Intellectual property
        </h2>
        <p>
          The uktaxcalculation brand, programmatic tax engine, UI
          components, localized content frameworks, and schema implementations
          are the exclusive property of uktaxcalculation. Unauthorised
          reproduction or derivative commercial use is prohibited.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Governing law
        </h2>
        <p>
          These terms are governed by the laws of England and Wales. Disputes
          shall be subject to the exclusive jurisdiction of the courts of
          England and Wales.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Contact
        </h2>
        <p>
          Questions about these terms:{" "}
          <a
            href={`mailto:${CORPORATE_EMAIL}`}
            className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            {CORPORATE_EMAIL}
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
