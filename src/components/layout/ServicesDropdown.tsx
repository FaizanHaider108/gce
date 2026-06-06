"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ACCOUNTING_SERVICES } from "@/lib/data/services";

interface ServicesDropdownProps {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}

export function ServicesDropdown({
  variant,
  onNavigate,
}: ServicesDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (variant !== "desktop" || !open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, variant]);

  if (variant === "mobile") {
    return (
      <div className="border-b border-slate-100">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-slate-700"
          aria-expanded={open}
          aria-controls={panelId}
        >
          Services
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
        <div
          id={panelId}
          className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[520px] pb-3 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <ul className="space-y-0.5 border-l-2 border-emerald-100 pl-4">
            {ACCOUNTING_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    onClick={onNavigate}
                    className="flex items-center gap-2.5 rounded-md py-2 pr-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
      >
        Services
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        className={`absolute right-0 top-full z-50 mt-2 w-[90vw] max-w-4xl origin-top-right rounded-xl border border-slate-100 bg-white p-4 shadow-xl transition-all duration-300 ${open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"}`}
        role="menu"
        aria-hidden={!open}
      >
        <div className="mb-3 border-b border-slate-100 pb-3">
          <p className="text-sm font-semibold text-slate-900">
            UK Accounting Services
          </p>
          <p className="text-xs text-slate-500">
            HMRC-compliant support from chartered accountants
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {ACCOUNTING_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.slug} role="none">
                <Link
                  href={`/services/${service.slug}`}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition hover:bg-slate-50"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-slate-800 group-hover:text-slate-900">
                      {service.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                      {service.shortDescription}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
