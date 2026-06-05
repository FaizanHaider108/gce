interface IconProps {
  className?: string;
}

export function CalculatorLogoIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-slate-900" />
      <rect
        x="7"
        y="6"
        width="18"
        height="20"
        rx="3"
        className="stroke-emerald-400"
        strokeWidth="1.75"
      />
      <path
        d="M10 10h12M10 14h3M16 14h3M22 14h0M10 18h3M16 18h6M10 22h12"
        className="stroke-emerald-400"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M21 8l2 2-4 4"
        className="stroke-emerald-300"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BuildingIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      <path d="M6 12h12M6 8h12M6 16h12M10 6h4M10 10h4M10 14h4M10 18h4" />
    </svg>
  );
}

export function PoundSterlingIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 7c0-2.2-1.8-4-4.5-4S9 4.8 9 7s1.8 4 4.5 4" />
      <path d="M7 21h8.5c3 0 5.5-2.2 5.5-5s-2.5-5-5.5-5H7" />
      <path d="M7 11v10" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function TrendingUpIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}
