import Link from "next/link";
import { CalculatorLogoIcon } from "@/components/icons/FinanceIcons";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <CalculatorLogoIcon className="h-9 w-9 transition-transform group-hover:scale-105" />
      <span className="text-lg font-bold tracking-tight text-slate-900">
        GlobalCalculator
        <span className="text-emerald-500">Engine</span>
      </span>
    </Link>
  );
}
