import { calculateUKSalary } from "@/lib/calculators/uk";
import type { UKCity } from "@/types/location";
import { getCityLocalMetrics } from "./city-local-metrics";
import { UK_NATIONAL_BASELINE_SALARY } from "./regional-salary";

/** RUK reference region for UK-wide net pay comparison (non-Scottish bands). */
const NATIONAL_REFERENCE_REGION = "Kent";

export interface CityNationalBenchmark {
  cityAvgSalary: number;
  nationalAvgSalary: number;
  salaryDelta: number;
  salaryDeltaPercent: number;
  cityNetMonthly: number;
  nationalNetMonthly: number;
  netDeltaMonthly: number;
  netDeltaPercent: number;
  councilTaxBand: string;
  avgCouncilTax: number;
  costOfLivingIndex: number;
  rentPercent: number;
}

export function getCityNationalBenchmark(city: UKCity): CityNationalBenchmark {
  const metrics = getCityLocalMetrics(city);
  const nationalAvgSalary = UK_NATIONAL_BASELINE_SALARY;
  const nationalCalc = calculateUKSalary(
    nationalAvgSalary,
    NATIONAL_REFERENCE_REGION,
  );

  const salaryDelta = metrics.avgSalary - nationalAvgSalary;
  const salaryDeltaPercent = Math.round(
    (salaryDelta / nationalAvgSalary) * 100,
  );

  const netDeltaMonthly =
    metrics.netMonthly - nationalCalc.netSalary.monthly;
  const netDeltaPercent = Math.round(
    (netDeltaMonthly / nationalCalc.netSalary.monthly) * 100,
  );

  return {
    cityAvgSalary: metrics.avgSalary,
    nationalAvgSalary,
    salaryDelta,
    salaryDeltaPercent,
    cityNetMonthly: metrics.netMonthly,
    nationalNetMonthly: nationalCalc.netSalary.monthly,
    netDeltaMonthly,
    netDeltaPercent,
    councilTaxBand: metrics.councilTaxBand,
    avgCouncilTax: metrics.avgCouncilTax,
    costOfLivingIndex: metrics.costOfLivingIndex,
    rentPercent: metrics.rentPercent,
  };
}
