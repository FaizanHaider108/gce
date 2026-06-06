import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Making Tax Digital (MTD) Compliant VAT Services",
  description:
    "MTD-compliant VAT bookkeeping, quarterly filings, and HMRC submission support for UK businesses. Global Calculator Engine accounting services.",
  alternates: {
    canonical: `${getSiteUrl()}/services/vat-returns`,
  },
};

export default function VATReturnsService() {
  return (
    <main className="prose prose-slate mx-auto max-w-4xl flex-1 px-4 py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-medium text-emerald-600 no-underline hover:underline"
      >
        ← Back to home
      </Link>

      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Making Tax Digital (MTD) Compliant VAT Services
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-slate-600">
        Value Added Tax accounting requires continuous oversight to shield your
        corporate margins from structural audits. We provide specialized dynamic
        bookkeeping and compliant electronic tracking configurations built to
        streamline your periodic filings seamlessly.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Who Needs to Register for UK VAT?
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600">
        Your business entity is legally required to register for VAT if its
        rolling 12-month taxable turnover outpaces the current legal threshold
        boundary of £90,000. Voluntary registration is also highly viable for
        earlier phase businesses looking to claim back substantial transactional
        inputs on capital setup expenses.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Our Comprehensive Processing Methodology
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600">
        We bridge your operational sales infrastructure with Making Tax Digital
        (MTD) compliant workflows. Our data specialists review your output
        transactions, itemize zero-rated items against standard 20% consumer
        lines, clean your internal purchases ledger, and reconcile every claim
        to construct error-free quarterly reports ready for secure HMRC
        submission.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Typical Filing Timelines & Payment Rules
      </h3>
      <p className="mb-8 leading-relaxed text-slate-600">
        VAT returns are standardly prepared on a rolling quarterly layout cycle.
        Both the secure electronic filing parameter and the corresponding
        electronic funding transfer must clear with HMRC exactly 1 calendar month
        and 7 days after the close of the designated accounting period to
        maintain an immaculate corporate profile.
      </p>

      <WhatsAppButton
        serviceName="VAT Returns"
        context="service-page"
        label="Inquire on WhatsApp"
        size="lg"
      />
    </main>
  );
}
