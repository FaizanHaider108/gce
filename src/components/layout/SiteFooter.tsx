import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="no-print mt-auto border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />
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
