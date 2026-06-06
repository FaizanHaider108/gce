"use client";

import { useSearchParams } from "next/navigation";
import type { UKCity } from "@/types/location";
import { SalaryCalculator } from "./SalaryCalculator";

interface SalaryCalculatorLoaderProps {
  city: UKCity;
}

function parseSalaryParam(raw: string | null): number | undefined {
  if (!raw) return undefined;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 0) return undefined;
  return parsed;
}

/** Reads `?salary=` from the URL client-side so city pages stay statically generated. */
export function SalaryCalculatorLoader({ city }: SalaryCalculatorLoaderProps) {
  const searchParams = useSearchParams();
  const initialSalary = parseSalaryParam(searchParams.get("salary"));

  return <SalaryCalculator city={city} initialSalary={initialSalary} />;
}
