"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons/FinanceIcons";
import {
  calculateUKSalary,
  NI_ADDITIONAL_RATE,
  NI_MAIN_RATE,
  NI_PRIMARY_THRESHOLD,
  NI_UPPER_EARNINGS_LIMIT,
  PA_TAPER_THRESHOLD,
  PA_ZERO_THRESHOLD,
  PERSONAL_ALLOWANCE,
  UK_TAX_YEAR,
} from "@/lib/calculators/uk";
import { getCityAverageSalary } from "@/lib/data/regional-salary";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

function buildFAQItems(city: UKCity): FAQItem[] {
  const averageSalary = getCityAverageSalary(city);
  const standardCalc = calculateUKSalary(averageSalary);

  return [
    {
      id: "tax-standard",
      question: `How much tax do I pay on a standard salary in ${city.cityName}?`,
      answer: `On a typical gross salary of ${formatGBP(averageSalary)} in ${city.cityName}, you would pay approximately ${formatGBP(standardCalc.incomeTax.total)} in Income Tax and ${formatGBP(standardCalc.nationalInsurance.total)} in National Insurance (${UK_TAX_YEAR} estimates). That leaves a net take-home pay of around ${formatGBP(standardCalc.netSalary.yearly)} per year, or ${formatGBP(standardCalc.netSalary.monthly)} per month.`,
    },
    {
      id: "personal-allowance",
      question: `What is the Personal Allowance for the ${UK_TAX_YEAR} tax year in ${city.region}?`,
      answer: `The standard UK Personal Allowance for ${UK_TAX_YEAR} is ${formatGBP(PERSONAL_ALLOWANCE)} per year across ${city.region} and the entire UK. If your gross income exceeds ${formatGBP(PA_TAPER_THRESHOLD)}, the allowance tapers by £1 for every £2 earned above that threshold, reaching £0 at ${formatGBP(PA_ZERO_THRESHOLD)}. Income above your remaining allowance is taxed at 20% (basic), 40% (higher), and 45% (additional) depending on your total earnings.`,
    },
    {
      id: "national-insurance",
      question: `Is National Insurance different in ${city.cityName}?`,
      answer: `No — Class 1 Employee National Insurance is set nationally by HMRC and is identical in ${city.cityName}, ${city.region}, and across the UK. For ${UK_TAX_YEAR}, you pay 0% on the first ${formatGBP(NI_PRIMARY_THRESHOLD)}, ${NI_MAIN_RATE * 100}% on earnings between ${formatGBP(NI_PRIMARY_THRESHOLD)} and ${formatGBP(NI_UPPER_EARNINGS_LIMIT)}, and ${NI_ADDITIONAL_RATE * 100}% on any earnings above ${formatGBP(NI_UPPER_EARNINGS_LIMIT)}. Your actual contributions may vary with pension salary sacrifice, benefits in kind, and employment status.`,
    },
  ];
}

interface CityFAQProps {
  city: UKCity;
}

export function CityFAQ({ city }: CityFAQProps) {
  const items = buildFAQItems(city);
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="no-print mt-12" aria-labelledby="city-faq-heading">
      <h2
        id="city-faq-heading"
        className="text-xl font-semibold text-slate-900 sm:text-2xl"
      >
        Frequently Asked Questions — {city.cityName}
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        Common questions about salary, tax, and National Insurance in{" "}
        {city.region}.
      </p>

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
                className="border-t border-slate-50 bg-slate-50/50 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-500 sm:px-6 sm:text-base"
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
