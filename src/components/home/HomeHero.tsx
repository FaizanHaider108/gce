import { ShieldCheckIcon } from "@/components/icons/FinanceIcons";
import { UK_TAX_YEAR } from "@/lib/calculators/uk";
import { HOME_H1 } from "@/lib/seo/home-metadata";

interface HomeHeroProps {
  totalCities: number;
}

export function HomeHero({ totalCities }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white px-6 py-10 shadow-sm sm:px-10 sm:py-14">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-50 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative space-y-5">
        <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
          <ShieldCheckIcon className="h-3.5 w-3.5 shrink-0" />
          <span>100% Accurate · {UK_TAX_YEAR} Tax Rules</span>
        </div>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-tight">
          {HOME_H1}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
          Global Calculator Engine delivers hyper-local, HMRC-accurate salary
          calculators across {totalCities}+ UK cities. Instantly model Income Tax,
          National Insurance, and net pay — built for professionals, relocators,
          and anyone negotiating their next offer.
        </p>
      </div>
    </section>
  );
}
