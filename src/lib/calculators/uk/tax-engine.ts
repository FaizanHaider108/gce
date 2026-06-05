import type { UKSalaryCalculation } from "@/types/calculator";
import {
  ADDITIONAL_RATE,
  BASIC_RATE,
  BASIC_RATE_BAND_WIDTH,
  HIGHER_RATE,
  HIGHER_RATE_TAXABLE_UPPER,
  NI_ADDITIONAL_RATE,
  NI_MAIN_RATE,
  NI_PRIMARY_THRESHOLD,
  NI_UPPER_EARNINGS_LIMIT,
  PA_TAPER_THRESHOLD,
  PA_ZERO_THRESHOLD,
  PERSONAL_ALLOWANCE,
} from "./constants";

function roundToPence(value: number): number {
  return Math.round(value * 100) / 100;
}

function toMonthly(yearly: number): number {
  return roundToPence(yearly / 12);
}

function toWeekly(yearly: number): number {
  return roundToPence(yearly / 52);
}

/**
 * Personal Allowance with taper for high earners.
 * £0 reduction below £100,000; reduces £1 per £2 above £100,000; £0 at £125,140+.
 */
export function calculatePersonalAllowance(grossSalary: number): number {
  if (grossSalary <= 0) return 0;
  if (grossSalary <= PA_TAPER_THRESHOLD) return PERSONAL_ALLOWANCE;
  if (grossSalary >= PA_ZERO_THRESHOLD) return 0;

  const reduction = (grossSalary - PA_TAPER_THRESHOLD) / 2;
  return roundToPence(Math.max(0, PERSONAL_ALLOWANCE - reduction));
}

/**
 * Income Tax on taxable income (gross minus personal allowance).
 * Bands: 20% up to £37,700 | 40% £37,701–£112,570 | 45% above £112,570.
 */
function calculateIncomeTax(
  grossSalary: number,
  personalAllowance: number,
): UKSalaryCalculation["incomeTax"] {
  const taxableIncome = Math.max(0, grossSalary - personalAllowance);

  const basicBandIncome = Math.min(taxableIncome, BASIC_RATE_BAND_WIDTH);
  const higherBandIncome = Math.max(
    0,
    Math.min(taxableIncome, HIGHER_RATE_TAXABLE_UPPER) - BASIC_RATE_BAND_WIDTH,
  );
  const additionalBandIncome = Math.max(
    0,
    taxableIncome - HIGHER_RATE_TAXABLE_UPPER,
  );

  const basicRate = roundToPence(basicBandIncome * BASIC_RATE);
  const higherRate = roundToPence(higherBandIncome * HIGHER_RATE);
  const additionalRate = roundToPence(additionalBandIncome * ADDITIONAL_RATE);

  return {
    basicRate,
    higherRate,
    additionalRate,
    total: roundToPence(basicRate + higherRate + additionalRate),
  };
}

/**
 * Class 1 Employee National Insurance.
 * 0% ≤ £12,570 | 8% on £12,571–£50,270 | 2% above £50,270.
 */
function calculateNationalInsurance(
  grossSalary: number,
): UKSalaryCalculation["nationalInsurance"] {
  const mainBandEarnings = Math.max(
    0,
    Math.min(grossSalary, NI_UPPER_EARNINGS_LIMIT) - NI_PRIMARY_THRESHOLD,
  );
  const additionalBandEarnings = Math.max(
    0,
    grossSalary - NI_UPPER_EARNINGS_LIMIT,
  );

  const mainRate = roundToPence(mainBandEarnings * NI_MAIN_RATE);
  const additionalRate = roundToPence(
    additionalBandEarnings * NI_ADDITIONAL_RATE,
  );

  return {
    mainRate,
    additionalRate,
    total: roundToPence(mainRate + additionalRate),
  };
}

/**
 * Core UK salary calculator. Accepts annual gross salary in GBP.
 * All figures rounded to the nearest penny.
 */
export function calculateUKSalary(grossSalary: number): UKSalaryCalculation {
  const normalizedGross = Math.max(0, grossSalary);
  const personalAllowance = calculatePersonalAllowance(normalizedGross);
  const taxableIncome = roundToPence(
    Math.max(0, normalizedGross - personalAllowance),
  );
  const incomeTax = calculateIncomeTax(normalizedGross, personalAllowance);
  const nationalInsurance = calculateNationalInsurance(normalizedGross);
  const totalDeductions = roundToPence(
    incomeTax.total + nationalInsurance.total,
  );
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
      monthly: toMonthly(netYearly),
      weekly: toWeekly(netYearly),
    },
  };
}
