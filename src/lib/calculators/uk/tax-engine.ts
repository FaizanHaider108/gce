import type { UKSalaryCalculation } from "@/types/calculator";
import {
  BASIC_RATE,
  BASIC_RATE_UPPER,
  HIGHER_RATE,
  HIGHER_RATE_UPPER,
  NI_RATE,
  NI_THRESHOLD,
  PERSONAL_ALLOWANCE,
} from "./constants";

function roundToPence(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculates UK income tax using standard band thresholds.
 * Bands apply to total gross salary (personal allowance is tax-free).
 */
function calculateIncomeTax(grossSalary: number): {
  basicRate: number;
  higherRate: number;
  total: number;
} {
  const basicBandIncome = Math.max(
    0,
    Math.min(grossSalary, BASIC_RATE_UPPER) - PERSONAL_ALLOWANCE,
  );

  const higherBandIncome = Math.max(
    0,
    Math.min(grossSalary, HIGHER_RATE_UPPER) - BASIC_RATE_UPPER,
  );

  const basicRate = roundToPence(basicBandIncome * BASIC_RATE);
  const higherRate = roundToPence(higherBandIncome * HIGHER_RATE);

  return {
    basicRate,
    higherRate,
    total: roundToPence(basicRate + higherRate),
  };
}

/**
 * Rough NI estimate: 8% on annual earnings above £12,570.
 */
function calculateNationalInsurance(grossSalary: number): number {
  const niableEarnings = Math.max(0, grossSalary - NI_THRESHOLD);
  return roundToPence(niableEarnings * NI_RATE);
}

/**
 * Core UK salary calculator. Accepts annual gross salary in GBP.
 */
export function calculateUKSalary(grossSalary: number): UKSalaryCalculation {
  const normalizedGross = Math.max(0, grossSalary);
  const personalAllowance =
    normalizedGross > 0 ? PERSONAL_ALLOWANCE : 0;
  const taxableIncome = Math.max(0, normalizedGross - personalAllowance);
  const incomeTax = calculateIncomeTax(normalizedGross);
  const nationalInsurance = calculateNationalInsurance(normalizedGross);
  const totalDeductions = roundToPence(incomeTax.total + nationalInsurance);
  const netYearly = roundToPence(normalizedGross - totalDeductions);

  return {
    grossSalary: normalizedGross,
    personalAllowance,
    taxableIncome,
    incomeTax,
    nationalInsurance,
    totalDeductions,
    netSalary: {
      yearly: netYearly,
      monthly: roundToPence(netYearly / 12),
    },
  };
}
