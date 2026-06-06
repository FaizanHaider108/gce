import { CheckCircle2 } from "lucide-react";
import { getSpunCtaHook } from "@/lib/seo/city-page-content";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { UKCity } from "@/types/location";

interface AccountantBannerProps {
  city?: UKCity;
  cityName?: string;
  variant?: "default" | "inline";
}

const BULLETS = [
  "Certified UK Experts",
  "100% Accurate & HMRC Compliant",
  "Real-time WhatsApp Support",
] as const;

export function AccountantBanner({
  city,
  cityName,
  variant = "default",
}: AccountantBannerProps) {
  const resolvedCityName = city?.cityName ?? cityName;
  const locationHint = resolvedCityName ? ` in ${resolvedCityName}` : "";
  const ctaHook = city
    ? getSpunCtaHook(city)
    : `From Year-End Accounts to Strategic Tax Planning, we maximise your take-home pay${locationHint} and ensure 100% HMRC compliance.`;

  if (variant === "inline") {
    return (
      <section
        className="no-print rounded-xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 px-5 py-4 text-white shadow-sm"
        aria-labelledby="accountant-banner-heading"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-2">
            <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              UK Chartered Accountants Team
            </span>
            <h2
              id="accountant-banner-heading"
              className="text-lg font-bold leading-snug tracking-tight"
            >
              Paying Too Much Tax? Let Our UK Accountants Handle It.
            </h2>
            <p className="max-w-xl text-xs leading-relaxed text-slate-300">
              {ctaHook}
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-1.5 text-xs text-slate-300"
                >
                  <CheckCircle2
                    className="h-3 w-3 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <WhatsAppButton
            context={resolvedCityName ? "city" : "banner"}
            cityName={resolvedCityName}
            label="Chat on WhatsApp"
            size="sm"
            pulse
            className="w-full shrink-0 sm:w-auto"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className="no-print rounded-xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 px-6 py-5 text-white shadow-sm"
      aria-labelledby="accountant-banner-heading"
    >
      <div className="space-y-3">
        <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
          UK Chartered Accountants Team
        </span>

        <div className="space-y-2">
          <h2
            id="accountant-banner-heading"
            className="text-xl font-bold leading-snug tracking-tight"
          >
            Paying Too Much Tax? Let Our Dedicated UK Accountants Handle It.
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300">
            {ctaHook}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
          {BULLETS.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-1.5 text-xs text-slate-300"
            >
              <CheckCircle2
                className="h-3.5 w-3.5 shrink-0 text-emerald-400"
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <WhatsAppButton
          context={resolvedCityName ? "city" : "banner"}
          cityName={resolvedCityName}
          label="Chat with an Accountant on WhatsApp"
          size="md"
          pulse
          className="w-full sm:w-auto"
        />
      </div>
    </section>
  );
}
