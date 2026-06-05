import Link from "next/link";
import { Logo } from "./Logo";

const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact Us" },
] as const;

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Logo />
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-500 transition hover:text-emerald-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="max-w-lg text-sm leading-relaxed text-slate-500">
            Estimates only. Not financial or tax advice. Tax rules change —
            verify with HMRC for your situation.
          </p>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Global Calculator Engine. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
