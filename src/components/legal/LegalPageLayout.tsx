import Link from "next/link";
import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/"
        className="mb-6 inline-flex items-center space-x-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
      >
        <svg
          className="h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Back to Home</span>
      </Link>

      <article className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        {lastUpdated && (
          <p className="mt-3 text-sm font-medium text-slate-400">
            Last updated: {lastUpdated}
          </p>
        )}
        <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-600">
          {children}
        </div>
      </article>
    </div>
  );
}
