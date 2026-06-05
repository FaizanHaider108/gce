import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function CityNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">City not found</h1>
        <p className="mt-2 text-slate-600">
          This calculator page does not exist in our UK dataset.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Browse UK calculators
        </Link>
      </main>
    </>
  );
}
