import Link from "next/link";

import { ShieldCheckIcon } from "@/components/icons/FinanceIcons";

import { getCitySalaryPath } from "@/lib/data/city-routes";

import { getFooterNationCities } from "@/lib/data/footer-directory";

import { UK_NATIONS } from "@/lib/data/uk-nation";

import { UK_TAX_YEAR } from "@/lib/calculators/uk";

import { CORPORATE_EMAIL } from "@/lib/site/config";

import { Logo } from "./Logo";



const TRUST_LINKS = [

  { href: "/about", label: "About Us" },

  { href: "/privacy", label: "Privacy Policy" },

  { href: "/terms", label: "Terms of Service" },

  { href: "/contact", label: "Contact Us" },

  { href: "/uk-calculator-directory", label: "UK Calculator Directory" },

] as const;



const TRUST_BADGES = [

  {

    title: "UK Tax Professionals",

    description:

      "Services delivered by qualified UK Tax Professionals & Corporate Specialists.",

  },

  {

    title: "HMRC-Aligned Engine",

    description: `Mapped to absolute HMRC ${UK_TAX_YEAR} standards.`,

  },

  {

    title: "YMYL Compliant",

    description:

      "Transparent disclaimers on every calculator. Not a substitute for formal accounting advice.",

  },

] as const;



export function SiteFooter() {

  const nationCities = getFooterNationCities();



  return (

    <footer className="no-print mt-auto border-t border-slate-200 bg-white">

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        <div className="flex flex-col gap-10">

          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

            <Logo />



            <div className="grid w-full gap-4 sm:grid-cols-3">

              {TRUST_BADGES.map((badge) => (

                <div

                  key={badge.title}

                  className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3"

                >

                  <div className="flex items-center gap-2">

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">

                      <ShieldCheckIcon className="h-3.5 w-3.5" />

                    </span>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">

                      {badge.title}

                    </p>

                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500">

                    {badge.description}

                  </p>

                </div>

              ))}

            </div>

          </div>



          <nav

            aria-label="Trust and legal navigation"

            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-y border-slate-100 py-5 sm:justify-start"

          >

            {TRUST_LINKS.map((link) => (

              <Link

                key={link.href}

                href={link.href}

                className="text-sm font-semibold text-slate-600 transition hover:text-emerald-600"

              >

                {link.label}

              </Link>

            ))}

          </nav>



          <div>

            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">

              UK Calculators by Nation

            </h2>

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">

              {UK_NATIONS.map((nation) => (

                <div key={nation}>

                  <h3 className="text-sm font-semibold text-slate-800">

                    {nation}

                  </h3>

                  <ul className="mt-2 space-y-1">

                    {nationCities[nation].map((city) => (

                      <li key={city.slug}>

                        <Link

                          href={getCitySalaryPath(city)}

                          className="text-sm text-slate-500 transition hover:text-emerald-600 hover:underline"

                        >

                          {city.cityName}

                        </Link>

                      </li>

                    ))}

                    <li>

                      <Link

                        href={`/uk-calculator-directory#${nation.toLowerCase().replace(/\s+/g, "-")}`}

                        className="text-xs font-medium text-emerald-600 hover:underline"

                      >

                        View all →

                      </Link>

                    </li>

                  </ul>

                </div>

              ))}

            </div>

          </div>



          <div className="border-t border-slate-100 pt-6 text-center sm:text-left">

            <p className="text-xs leading-relaxed text-slate-400">

              © {new Date().getFullYear()} Global Calculator Engine ·{" "}

              <a

                href={`mailto:${CORPORATE_EMAIL}`}

                className="hover:text-emerald-600 hover:underline"

              >

                {CORPORATE_EMAIL}

              </a>

              . Estimates only — verify with HMRC or a qualified UK Chartered

              Accountant.

            </p>

          </div>

        </div>

      </div>

    </footer>

  );

}

