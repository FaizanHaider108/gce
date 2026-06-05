import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <article className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-600">
          {children}
        </div>
      </article>
    </main>
  );
}
