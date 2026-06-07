import Link from "next/link";

interface FinancialDisclaimerProps {
  className?: string;
}

export function FinancialDisclaimer({ className = "" }: FinancialDisclaimerProps) {
  return (
    <aside
      className={`rounded-xl border border-amber-200/80 bg-amber-50/60 px-5 py-4 text-sm leading-relaxed text-amber-950 ${className}`}
      role="note"
      aria-label="Financial disclaimer"
    >
      <p className="font-semibold text-amber-900">Disclaimer</p>
      <p className="mt-2">
        uktaxcalculation is an estimation utility mapped to projected
        UK/Scottish tax brackets for the 2026/27 fiscal year. While our
        calculations are synchronized with baseline HMRC data, individual
        financial liabilities vary based on student loans, corporate benefits,
        and custom tax codes. This output does not constitute binding
        financial, legal, or professional accounting advice. For formal HMRC
        filings, corporate tax optimization, or structured accounts sign-off,
        connect directly with our qualified team of UK Chartered Accountants via
        our{" "}
        <Link
          href="/services/vat-returns"
          className="font-medium text-amber-900 underline decoration-amber-400/80 underline-offset-2 hover:text-amber-950"
        >
          active priority service routes
        </Link>
        .
      </p>
    </aside>
  );
}
