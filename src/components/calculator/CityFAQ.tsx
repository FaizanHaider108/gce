"use client";

import { useMemo, useState } from "react";
import { ChevronDownIcon } from "@/components/icons/FinanceIcons";
import { getSpunFaqIntro } from "@/lib/seo/city-page-content";
import { buildCityFaqItems } from "@/lib/seo/city-faq-content";
import {
  FAQ_HEADING_VARIATIONS,
  pickVariation,
} from "@/lib/seo/content-variations";
import type { UKCity } from "@/types/location";

interface CityFAQProps {
  city: UKCity;
}

export function CityFAQ({ city }: CityFAQProps) {
  const items = useMemo(() => buildCityFaqItems(city), [city]);
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const faqHeading = pickVariation(city, FAQ_HEADING_VARIATIONS)(city);
  const faqIntro = getSpunFaqIntro(city);

  return (
    <section className="no-print mt-12" aria-labelledby="city-faq-heading">
      <h2
        id="city-faq-heading"
        className="text-xl font-semibold text-slate-900 sm:text-2xl"
      >
        {faqHeading}
      </h2>
      <p className="mt-2 text-sm text-slate-500">{faqIntro}</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        {items.map((item, index) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={index > 0 ? "border-t border-slate-100" : ""}
            >
              <button
                type="button"
                id={`faq-button-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-slate-50 sm:px-6"
              >
                <span className="text-sm font-medium text-slate-800 sm:text-base">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-180 text-emerald-500" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-button-${item.id}`}
                hidden={!isOpen}
                className="overflow-hidden border-t border-slate-50 bg-slate-50/50 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-500 transition-all duration-300 ease-in-out sm:px-6 sm:text-base"
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
