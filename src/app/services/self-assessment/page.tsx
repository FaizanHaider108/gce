import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "HMRC Self-Assessment Tax Return Filing Services",
  description:
    "Qualified chartered accounting team for HMRC Self-Assessment tax returns — sole traders, directors, landlords, and high earners. Global Calculator Engine.",
  alternates: {
    canonical: `${getSiteUrl()}/services/self-assessment`,
  },
};

export default function SelfAssessmentService() {
  return (
    <main className="prose prose-slate mx-auto max-w-4xl flex-1 px-4 py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-medium text-emerald-600 no-underline hover:underline"
      >
        ← Back to home
      </Link>

      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        HMRC Self-Assessment Tax Return Filing Services
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-slate-600">
        Navigating the complexities of self-employed filing parameters can be
        resource-draining. Our qualified chartered accounting team structures
        your personal tax submissions safely, maximizing statutory allowances and
        guaranteeing complete compliance with HMRC deadlines.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Who Needs to File a Self-Assessment?
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600">
        Under standard UK regulations, you must submit an annual tax filing if
        you operate as a sole trader earning over £1,000, serve as a corporate
        director, receive untaxed rental income, earn high-net dividend
        revenues, or need to pay the High Income Child Benefit Charge because
        your personal income scales past standard thresholds.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Our Dedicated Processing Methodology
      </h3>
      <p className="mb-4 leading-relaxed text-slate-600">
        We employ a thorough, secure onboarding cycle to complete your
        submission. First, we ingest your digital transactional summaries, bank
        statements, and expense receipts. Next, our technical tax practitioners
        compute all eligible operating deductions—including home-office
        variables and capital allowances—minimizing your net tax footprint
        before running a final audit sweep.
      </p>

      <h3 className="mb-3 mt-6 text-xl font-bold text-slate-800">
        Typical Filing Timelines & Statutory Deadlines
      </h3>
      <p className="mb-8 leading-relaxed text-slate-600">
        The UK fiscal cycle runs strictly from April 6th to April 5th of the
        following year. Paper submissions must hit HMRC by October 31st, whereas
        electronic registrations and final online balance settlements must be
        completely finalized by January 31st. Missing these dates triggers
        immediate automatic fines, which our team helps you eliminate
        completely.
      </p>

      <WhatsAppButton
        serviceName="Self-Assessment Tax Returns"
        context="service-page"
        label="Inquire on WhatsApp"
        size="lg"
      />
    </main>
  );
}
