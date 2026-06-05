import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Global Calculator Engine — disclaimer, intellectual property, and governing law.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service for Global Calculator Engine">
      <p>
        By using Global Calculator Engine, you agree to comply with and be bound
        by the following terms.
      </p>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Disclaimer of Liability
        </h2>
        <p>
          The salary, tax, and national insurance calculations provided on this
          website are for general informational and educational purposes only.
          While we strive to match official HMRC thresholds perfectly, these
          figures do not constitute formal financial, accounting, or legal advice.
          Always consult a qualified professional accountant before making
          real-world financial decisions.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Intellectual Property
        </h2>
        <p>
          The programmatic engine architecture, layouts, tool logic, and automated
          content frameworks are the property of Global Calculator Engine.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Governing Law
        </h2>
        <p>
          These terms are governed by and construed in accordance with the laws of
          the United Kingdom.
        </p>
      </section>
    </LegalPageLayout>
  );
}
