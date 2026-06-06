import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { COMPLIANCE_EMAIL, CORPORATE_EMAIL, getSiteUrl } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Global Calculator Engine — how we handle data, cookies, analytics, and third-party advertising.",
  alternates: {
    canonical: `${getSiteUrl()}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy for Global Calculator Engine">
      <p>
        Global Calculator Engine (&quot;GCE&quot;, &quot;we&quot;, &quot;us&quot;)
        operates the website at globalcalculatorengine.vercel.app and
        associated UK salary calculator tools. This Privacy Policy explains how
        we collect, use, and protect information when you use our services.
      </p>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Who we are
        </h2>
        <p>
          Global Calculator Engine is a UK-focused financial technology platform
          providing HMRC-aligned salary estimation tools and professional
          accounting service routes. For privacy enquiries contact{" "}
          <a
            href={`mailto:${COMPLIANCE_EMAIL}`}
            className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            {COMPLIANCE_EMAIL}
          </a>
          . General enquiries:{" "}
          <a
            href={`mailto:${CORPORATE_EMAIL}`}
            className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            {CORPORATE_EMAIL}
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Financial data &amp; calculator inputs
        </h2>
        <p>
          We do not collect, store, or transmit personal salary figures, tax
          codes, or National Insurance inputs entered into Global Calculator
          Engine tools. All salary calculations are processed client-side within
          your browser session or rendered server-side from anonymized regional
          baselines — never linked to your identity.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Cookies and analytics
        </h2>
        <p>
          We may use first-party and third-party analytics cookies (including
          Google Analytics) to understand aggregate traffic patterns, improve
          calculator performance, and measure directory navigation. You can
          disable cookies through your browser settings.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Third-party services
        </h2>
        <p>
          Global Calculator Engine may integrate third-party services including
          WhatsApp Business for accountant enquiries and advertising networks.
          These providers operate under their own privacy policies. We do not
          sell personal data to third parties.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Your rights
        </h2>
        <p>
          Under UK GDPR you may request access to, correction of, or deletion of
          any personal data we hold. Submit requests to{" "}
          <a
            href={`mailto:${COMPLIANCE_EMAIL}`}
            className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            {COMPLIANCE_EMAIL}
          </a>
          . We respond within 30 days.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Policy updates
        </h2>
        <p>
          Global Calculator Engine may update this policy to reflect regulatory
          or operational changes. The effective date of the current version is
          displayed at the top of this page. Continued use of our services
          constitutes acceptance of the updated policy.
        </p>
      </section>
    </LegalPageLayout>
  );
}
