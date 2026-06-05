import Link from "next/link";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Logo />
        <nav className="text-sm font-medium text-slate-500">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 transition hover:bg-slate-50 hover:text-slate-900"
          >
            UK Calculators
          </Link>
        </nav>
      </div>
    </header>
  );
}
