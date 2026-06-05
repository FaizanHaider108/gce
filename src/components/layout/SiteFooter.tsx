export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
        <p>
          Estimates only. Not financial or tax advice. Tax rules change — verify
          with HMRC for your situation.
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Global Calculator Engine</p>
      </div>
    </footer>
  );
}
