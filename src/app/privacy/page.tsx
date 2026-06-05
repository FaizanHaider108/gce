import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Global Calculator Engine — how we handle data, cookies, analytics, and third-party advertising.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy for Global Calculator Engine">
      <p>
        Welcome to Global Calculator Engine. We value your privacy. This policy
        outlines how we handle data.
      </p>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Data Collection
        </h2>
        <p>
          We do not collect, store, or share any personal financial data,
          salaries, or tax inputs entered into our calculators. All calculations
          are processed purely client-side or programmatically within your browser
          session.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Cookies and Analytics
        </h2>
        <p>
          We may use standard browser tracking and third-party analytics cookies
          (such as Google Analytics) to monitor aggregate traffic and user trends
          to improve our tools.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Third-Party Advertising
        </h2>
        <p>
          We partner with third-party ad networks (like Google AdSense) which may
          serve cookies to deliver relevant ads based on your visits to this and
          other websites.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Contact Us
        </h2>
        <p>
          For privacy concerns, contact us at{" "}
          <a
            href="mailto:compliance@globalcalculatorengine.com"
            className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            compliance@globalcalculatorengine.com
          </a>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
}
