import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import {
  COMPLIANCE_EMAIL,
  CORPORATE_EMAIL,
  getSiteUrl,
} from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Contact uktaxcalculation",
  description:
    "Contact uktaxcalculation for UK salary calculator support, chartered accounting services, and HMRC compliance enquiries.",
  alternates: {
    canonical: `${getSiteUrl()}/contact`,
  },
};

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact uktaxcalculation">
      <p>
        uktaxcalculation provides HMRC-aligned salary calculators and
        professional UK accounting services. Reach our team using the channels
        below for calculator support, corporate tax advisory, or partnership
        enquiries.
      </p>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          General enquiries
        </h2>
        <p>
          Email{" "}
          <a
            href={`mailto:${CORPORATE_EMAIL}`}
            className="font-medium text-emerald-600 hover:underline"
          >
            {CORPORATE_EMAIL}
          </a>{" "}
          for accounting services, salary calculator questions, or business
          partnerships.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Privacy &amp; compliance
        </h2>
        <p>
          For data protection or compliance matters, contact{" "}
          <a
            href={`mailto:${COMPLIANCE_EMAIL}`}
            className="font-medium text-emerald-600 hover:underline"
          >
            {COMPLIANCE_EMAIL}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Priority WhatsApp support
        </h2>
        <p className="mb-4">
          Connect directly with our UK Chartered Accountants team for urgent tax
          planning, VAT returns, or corporate filing support.
        </p>
        <WhatsAppButton
          context="navbar"
          label="Chat with an Accountant on WhatsApp"
          size="md"
        />
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Service routes
        </h2>
        <p>
          Browse our{" "}
          <Link
            href="/services/vat-returns"
            className="font-medium text-emerald-600 hover:underline"
          >
            professional accounting services
          </Link>{" "}
          or the{" "}
          <Link
            href="/uk-calculator-directory"
            className="font-medium text-emerald-600 hover:underline"
          >
            full UK calculator directory
          </Link>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
