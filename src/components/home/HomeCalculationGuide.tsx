"use client";

import { useState } from "react";
import { UK_TAX_YEAR, PERSONAL_ALLOWANCE } from "@/lib/calculators/uk";

const SECTIONS = [
  {
    id: "personal-allowance",
    title: `How the ${UK_TAX_YEAR} Personal Allowance works`,
    content: `The UK Personal Allowance for ${UK_TAX_YEAR} is set at £${PERSONAL_ALLOWANCE.toLocaleString("en-GB")}, meaning the first portion of your gross salary is taxed at 0% for Income Tax purposes. Global Calculator Engine applies this threshold before any banded rates are calculated. Once your income exceeds £100,000, the allowance tapers by £1 for every £2 earned above that level, eventually reaching zero at £125,140. Our engine models this taper automatically so high earners see an accurate marginal rate rather than a flat basic-rate estimate.`,
  },
  {
    id: "national-insurance",
    title: "Class 1 National Insurance in 2026/27",
    content:
      "Employee Class 1 National Insurance is calculated separately from Income Tax and uses its own threshold structure. For 2026/27, NI is charged at 8% on earnings between the Primary Threshold (£12,570) and the Upper Earnings Limit (£50,270), with a reduced 2% rate applied to earnings above that ceiling. Unlike Income Tax, NI does not use the Personal Allowance taper — which is why our breakdown table always shows tax and NI as distinct line items. Pension contributions made through salary sacrifice can reduce both your taxable income and NI liability, and the calculator accounts for this when you adjust the pension percentage slider.",
  },
  {
    id: "regional-tax",
    title: "Regional tax distribution: England, Scotland, Wales & NI",
    content:
      "Income Tax rates differ across the UK nations. England, Wales, and Northern Ireland share the same UK-wide bands: 20% basic rate, 40% higher rate, and 45% additional rate. Scotland operates an independent band structure with Starter (19%), Basic (20%), Intermediate (21%), Higher (42%), Advanced (45%), and Top (48%) rates. When you open a city calculator, the engine reads the city's region metadata and automatically selects the correct band set — so an Edinburgh salary uses Scottish bands while a Cardiff salary uses the standard UK framework. This regional routing is what makes each city page a genuinely localized financial asset rather than a generic template.",
  },
  {
    id: "engine-methodology",
    title: "Our calculation methodology & data integrity",
    content:
      "Every city page pulls a naturalized regional average salary — adjusted with a deterministic micro-variance per city name to prevent artificial data bucketing — then runs it through the full HMRC-aligned tax engine. Deductions for student loans (Plan 1, 2, 4, and Postgraduate), workplace pension contributions, and tax-year selection are all supported in the interactive tool above. The static summary table on each city page shows the baseline scenario at the regional average salary, while the live calculator lets you model your exact gross pay. All figures are estimates synchronized to published HMRC thresholds for the selected tax year and should be verified against your payslip or HMRC Personal Tax Account before making binding financial decisions.",
  },
] as const;

export function HomeCalculationGuide() {
  const [openId, setOpenId] = useState<string>(SECTIONS[0].id);

  return (
    <section
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
      aria-labelledby="calculation-guide-heading"
    >
      <h2
        id="calculation-guide-heading"
        className="text-xl font-semibold text-slate-900 sm:text-2xl"
      >
        How Global Calculator Engine computes your take-home pay
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
        A transparent breakdown of the {UK_TAX_YEAR} tax framework, National
        Insurance rules, and regional band distribution powering every UK city
        calculator on this platform.
      </p>

      <div className="mt-6 divide-y divide-slate-100 border-t border-slate-100">
        {SECTIONS.map((section) => {
          const isOpen = openId === section.id;

          return (
            <div key={section.id}>
              <button
                type="button"
                id={`guide-trigger-${section.id}`}
                aria-expanded={isOpen}
                aria-controls={`guide-panel-${section.id}`}
                onClick={() =>
                  setOpenId(isOpen ? "" : section.id)
                }
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-slate-800 transition hover:text-emerald-700 sm:text-base"
              >
                {section.title}
                <span
                  className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div
                  id={`guide-panel-${section.id}`}
                  role="region"
                  aria-labelledby={`guide-trigger-${section.id}`}
                  className="pb-5 text-sm leading-relaxed text-slate-600 sm:text-base"
                >
                  {section.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
