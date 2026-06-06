import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Professional Corporate Bookkeeping Solutions",
  description:
    "Cloud-based bookkeeping, bank reconciliations, and cashflow reporting for UK small businesses and freelancers. Global Calculator Engine.",
  alternates: {
    canonical: `${getSiteUrl()}/services/bookkeeping`,
  },
};

export default function BookkeepingService() {
  return (
    <main className="prose prose-slate mx-auto max-w-4xl flex-1 px-4 py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-medium text-emerald-600 no-underline hover:underline"
      >
        ← Back to home
      </Link>

      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        Professional Corporate Bookkeeping Solutions
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-slate-600">
        Maintaining structured, accessible financial ledgers is the
        foundational element of any commercial enterprise. Our cloud-based
        bookkeeping optimization services allow small businesses and freelancers
        to maintain crystal-clear transaction maps effortlessly.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Who Needs Professional Bookkeeping?
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600">
        Every scaling business entity, individual contractor, and corporate
        partnership requires a continuous bookkeeping process. Under standard UK
        Companies House rules, failing to preserve organized records for up to 6
        years can prompt severe operational review parameters and significant
        financial fines.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Our Dedicated Processing Methodology
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600">
        We integrate automated transaction collection layers directly across your
        commercial banking gateways and internal point-of-sale profiles. Our
        systems instantly reconcile invoices, map supplier overheads, categorize
        standard corporate expenses, and output transparent cashflow balance
        statements so you always possess accurate insight into your running
        margins.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Typical Filing Timelines & Financial Reporting
      </h3>
      <p className="mb-8 leading-relaxed text-slate-600">
        While ledger reconciliations happen on a continuous weekly or monthly
        sequence to keep your cashflow tracking metrics fresh, these clean
        entries compile directly into your broader quarterly VAT computations
        and annual year-end financial sheets, cutting down your accounting
        costs substantially over time.
      </p>

      <WhatsAppButton
        serviceName="Bookkeeping"
        context="service-page"
        label="Inquire on WhatsApp"
        size="lg"
      />
    </main>
  );
}
