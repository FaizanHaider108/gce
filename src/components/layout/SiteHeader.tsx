import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="no-print border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-900">
          GCE
          <span className="ml-1 font-normal text-slate-500">
            Global Calculator Engine
          </span>
        </Link>
        <nav className="text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            UK Calculators
          </Link>
        </nav>
      </div>
    </header>
  );
}
