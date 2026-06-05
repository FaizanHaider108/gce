import type { IncomeTaxBand, IncomeTaxBreakdown, UKSalaryCalculation } from "@/types/calculator";
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
import {
  SCOTTISH_ADVANCED_RATE,
  SCOTTISH_ADVANCED_UPPER,
  SCOTTISH_BASIC_RATE,
  SCOTTISH_BASIC_UPPER,
  SCOTTISH_HIGHER_RATE,
  SCOTTISH_HIGHER_UPPER,
  SCOTTISH_INTERMEDIATE_RATE,
  SCOTTISH_INTERMEDIATE_UPPER,
  SCOTTISH_STARTER_RATE,
  SCOTTISH_STARTER_UPPER,
  SCOTTISH_TOP_RATE,
} from "./scottish-constants";

function roundToPence(value: number): number {
  return Math.round(value * 100) / 100;
}

function toMonthly(yearly: number): number {
  return roundToPence(yearly / 12);
}

function toWeekly(yearly: number): number {
  return roundToPence(yearly / 52);
}

export function isScottishRegion(region?: string): boolean {
  return region === "Scotland";
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

function bandIncome(
  gross: number,
  lower: number,
  upper: number,
): number {
  return Math.max(0, Math.min(gross, upper) - lower);
}

/** England, Wales & Northern Ireland income tax (2025/26). */
function calculateRUKIncomeTax(
  grossSalary: number,
  personalAllowance: number,
): IncomeTaxBreakdown {
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

  const bands: IncomeTaxBand[] = [
    {
      id: "basic",
      label: "Income Tax — Basic Rate (20%)",
      amount: roundToPence(basicBandIncome * BASIC_RATE),
    },
    {
      id: "higher",
      label: "Income Tax — Higher Rate (40%)",
      amount: roundToPence(higherBandIncome * HIGHER_RATE),
    },
    {
      id: "additional",
      label: "Income Tax — Additional Rate (45%)",
      amount: roundToPence(additionalBandIncome * ADDITIONAL_RATE),
    },
  ];

  const total = roundToPence(bands.reduce((sum, b) => sum + b.amount, 0));

  return { jurisdiction: "ruk", bands, total };
}

/**
 * Scottish Income Tax (2025/26) — official band thresholds on gross earnings.
 * NI remains UK-wide Class 1.
 */
function calculateScottishIncomeTax(grossSalary: number): IncomeTaxBreakdown {
  const bands: IncomeTaxBand[] = [
    {
      id: "starter",
      label: "Income Tax — Starter Rate (19%)",
      amount: roundToPence(
        bandIncome(grossSalary, PERSONAL_ALLOWANCE, SCOTTISH_STARTER_UPPER) *
          SCOTTISH_STARTER_RATE,
      ),
    },
    {
      id: "basic",
      label: "Income Tax — Basic Rate (20%)",
      amount: roundToPence(
        bandIncome(grossSalary, SCOTTISH_STARTER_UPPER, SCOTTISH_BASIC_UPPER) *
          SCOTTISH_BASIC_RATE,
      ),
    },
    {
      id: "intermediate",
      label: "Income Tax — Intermediate Rate (21%)",
      amount: roundToPence(
        bandIncome(
          grossSalary,
          SCOTTISH_BASIC_UPPER,
          SCOTTISH_INTERMEDIATE_UPPER,
        ) * SCOTTISH_INTERMEDIATE_RATE,
      ),
    },
    {
      id: "higher",
      label: "Income Tax — Higher Rate (42%)",
      amount: roundToPence(
        bandIncome(
          grossSalary,
          SCOTTISH_INTERMEDIATE_UPPER,
          SCOTTISH_HIGHER_UPPER,
        ) * SCOTTISH_HIGHER_RATE,
      ),
    },
    {
      id: "advanced",
      label: "Income Tax — Advanced Rate (45%)",
      amount: roundToPence(
        bandIncome(grossSalary, SCOTTISH_HIGHER_UPPER, SCOTTISH_ADVANCED_UPPER) *
          SCOTTISH_ADVANCED_RATE,
      ),
    },
    {
      id: "top",
      label: "Income Tax — Top Rate (48%)",
      amount: roundToPence(
        Math.max(0, grossSalary - SCOTTISH_ADVANCED_UPPER) * SCOTTISH_TOP_RATE,
      ),
    },
  ];

  const total = roundToPence(bands.reduce((sum, b) => sum + b.amount, 0));

  return { jurisdiction: "scotland", bands, total };
}

/**
 * Class 1 Employee National Insurance (UK-wide).
 * 8% on earnings above £12,570 up to £50,270; 2% above £50,270.
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
 * Core UK salary calculator. Pass `region` from city metadata — use "Scotland"
 * for Scottish Income Tax bands; all other regions use England/Wales rules.
 */
export function calculateUKSalary(
  grossSalary: number,
  region?: string,
): UKSalaryCalculation {
  const normalizedGross = Math.max(0, grossSalary);
  const scotland = isScottishRegion(region);
  const personalAllowance = calculatePersonalAllowance(normalizedGross);
  const taxableIncome = roundToPence(
    Math.max(0, normalizedGross - personalAllowance),
  );

  const incomeTax = scotland
    ? calculateScottishIncomeTax(normalizedGross)
    : calculateRUKIncomeTax(normalizedGross, personalAllowance);

  const nationalInsurance = calculateNationalInsurance(normalizedGross);
  const totalDeductions = roundToPence(
    incomeTax.total + nationalInsurance.total,
  );
  const netYearly = roundToPence(normalizedGross - totalDeductions);

  return {
    grossSalary: normalizedGross,
    personalAllowance,
    taxableIncome,
    taxJurisdiction: scotland ? "scotland" : "ruk",
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
