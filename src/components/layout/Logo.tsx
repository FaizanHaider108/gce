import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex min-h-0 items-center gap-2.5 ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center">
        <Image
          src="/favicon-96x96.png"
          alt="Global Calculator Engine"
          width={36}
          height={36}
          className="block h-9 w-9 rounded-full object-contain transition-transform group-hover:scale-105"
          priority
        />
      </span>
      <span className="text-base font-bold leading-none tracking-tight text-slate-900 sm:text-lg">
        Global Calculator{" "}
        <span className="text-emerald-500">Engine</span>
      </span>
    </Link>
  );
}
