import type { UKCity } from "@/types/location";
import { SalaryCalculator } from "./SalaryCalculator";

interface SalaryCalculatorLoaderProps {
  city: UKCity;
  initialSalary?: number;
}

/** Pass-through wrapper — salary resolved server-side in page.tsx. */
export function SalaryCalculatorLoader({
  city,
  initialSalary,
}: SalaryCalculatorLoaderProps) {
  return <SalaryCalculator city={city} initialSalary={initialSalary} />;
}
