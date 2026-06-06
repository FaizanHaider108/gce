import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "HMRC & Companies House Year-End Financial Reporting",
  description:
    "Statutory year-end accounts, CT600 Corporation Tax, and Companies House filings for UK limited companies. Global Calculator Engine.",
  alternates: {
    canonical: `${getSiteUrl()}/services/year-end-accounts`,
  },
};

export default function YearEndAccountsService() {
  return (
    <main className="prose prose-slate mx-auto max-w-4xl flex-1 px-4 py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-medium text-emerald-600 no-underline hover:underline"
      >
        ← Back to home
      </Link>

      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        HMRC & Companies House Year-End Financial Reporting
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-slate-600">
        Closing your annual corporate ledger requires deep familiarity with the
        structural documentation standards enforced across UK institutions. We
        construct, balance, and submit your statutory corporate account
        summaries with extreme precision.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Who Needs to File Statutory Year-End Accounts?
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600">
        All active or dormant UK Limited Companies (Ltd) must prepare and submit
        formal balance statements, directors&apos; reports, and profit-and-loss
        filings annually. This remains a strict legal requirement regardless of
        whether the business generated operational net profits or recorded
        trading losses.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Our Comprehensive Processing Methodology
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600">
        Our qualified chartered professionals translate your historical yearly
        records into formalized statutory structures. We map all fixed capital
        resources, reconcile liabilities, run balance validation matrices, and
        calculate your exact Corporation Tax burden (CT600 layout) to guarantee
        compliance before signing off your annual books.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Typical Filing Timelines & Corporate Deadlines
      </h3>
      <p className="mb-8 leading-relaxed text-slate-600">
        Statutory Accounts must hit Companies House exactly 9 months after your
        corporate financial year-end date. Separately, your calculated
        Corporation Tax liability balance must be paid to HMRC within 9 months
        and 1 day, while the actual CT600 return filing deadline sits exactly
        12 months after the period close.
      </p>

      <WhatsAppButton
        serviceName="Year-End Accounts"
        context="service-page"
        label="Inquire on WhatsApp"
        size="lg"
      />
    </main>
  );
}
