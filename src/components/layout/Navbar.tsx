"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Logo } from "./Logo";
import { ServicesDropdown } from "./ServicesDropdown";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/uk-calculator-directory", label: "UK Calculators" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo className="min-w-0 shrink" />

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <ServicesDropdown variant="desktop" />
          <WhatsAppButton
            context="navbar"
            label="WhatsApp"
            size="sm"
            className="ml-2 shrink-0"
          />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <WhatsAppButton
            context="navbar"
            label="Chat"
            size="sm"
            className="shrink-0"
          />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden ${mobileOpen ? "max-h-[calc(100dvh-4rem)] opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!mobileOpen}
      >
        <nav
          aria-label="Mobile navigation"
          className="mx-auto max-h-[calc(100dvh-4rem)] max-w-7xl overflow-y-auto px-4 py-4 sm:px-6"
        >
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <ServicesDropdown variant="mobile" onNavigate={closeMobile} />
          </div>
          <div className="mt-6 border-t border-slate-100 pt-6">
            <WhatsAppButton
              context="navbar"
              label="Chat with an Accountant on WhatsApp"
              size="md"
              className="w-full"
              pulse
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
