import { UK_TAX_YEAR } from "@/lib/calculators/uk";

const VALUE_CARDS = [
  {
    title: "254+ UK Cities Mapped",
    description:
      "Hyper-localized financial directory mapping baseline salaries, cost projections, and net take-home calculations across every major region.",
  },
  {
    title: `HMRC ${UK_TAX_YEAR} Accurate`,
    description:
      "Engineered to precision using updated personal allowance thresholds, updated class 1 NI adjustments, and specific dynamic Scottish tax bands.",
  },
  {
    title: "100% Free to Use",
    description:
      "Instant enterprise-grade financial estimations. Seamlessly optimized for individual professionals, local freelancers, and scaling business entities.",
  },
] as const;

interface HomeValueCardsProps {
  totalCities?: number;
}

export function HomeValueCards({ totalCities = 254 }: HomeValueCardsProps) {
  const cards = VALUE_CARDS.map((card, index) =>
    index === 0
      ? {
          ...card,
          title: `${totalCities}+ UK Cities Mapped`,
        }
      : card,
  );

  return (
    <section
      aria-label="Platform value highlights"
      className="my-8 grid grid-cols-1 gap-6 md:grid-cols-3"
    >
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-emerald-100 hover:shadow-md"
        >
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            {card.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {card.description}
          </p>
        </article>
      ))}
    </section>
  );
}
