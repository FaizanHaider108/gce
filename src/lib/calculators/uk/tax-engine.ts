import type {
  IncomeTaxBand,
  IncomeTaxBreakdown,
  StudentLoanPlan,
  UKCalculatorOptions,
  UKSalaryCalculation,
} from "@/types/calculator";
import {
  DEFAULT_TAX_YEAR,
  getTaxYearConfig,
  type TaxYearConfig,
} from "./tax-year-config";

const DEFAULT_OPTIONS: Required<UKCalculatorOptions> = {
  taxYear: DEFAULT_TAX_YEAR,
  pensionPercent: 0,
  studentLoan: "none",
};

const STUDENT_LOAN_LABELS: Record<StudentLoanPlan, string> = {
  none: "None",
  plan1: "Plan 1",
  plan2: "Plan 2",
  plan5: "Plan 5",
  postgraduate: "Postgraduate Loan",
};

function roundToPence(value: number): number {
  return Math.round(value * 100) / 100;
}

function toMonthly(yearly: number): number {
  return roundToPence(yearly / 12);
}

function toWeekly(yearly: number): number {
  return roundToPence(yearly / 52);
}

function toSalaryBreakdown(yearly: number) {
  return {
    yearly,
    monthly: toMonthly(yearly),
    weekly: toWeekly(yearly),
  };
}

export function isScottishRegion(region?: string): boolean {
  return region === "Scotland";
}

function resolveOptions(options?: UKCalculatorOptions): Required<UKCalculatorOptions> {
  return {
    taxYear: options?.taxYear ?? DEFAULT_OPTIONS.taxYear,
    pensionPercent: Math.min(
      100,
      Math.max(0, options?.pensionPercent ?? DEFAULT_OPTIONS.pensionPercent),
    ),
    studentLoan: options?.studentLoan ?? DEFAULT_OPTIONS.studentLoan,
  };
}

function calculatePersonalAllowance(
  grossSalary: number,
  config: TaxYearConfig,
): number {
  if (grossSalary <= 0) return 0;
  if (grossSalary <= config.paTaperThreshold) return config.personalAllowance;
  if (grossSalary >= config.paZeroThreshold) return 0;

  const reduction = (grossSalary - config.paTaperThreshold) / 2;
  return roundToPence(Math.max(0, config.personalAllowance - reduction));
}

function bandIncome(gross: number, lower: number, upper: number): number {
  return Math.max(0, Math.min(gross, upper) - lower);
}

function calculateRUKIncomeTax(
  grossSalary: number,
  personalAllowance: number,
  config: TaxYearConfig,
): IncomeTaxBreakdown {
  const taxableIncome = Math.max(0, grossSalary - personalAllowance);

  const basicBandIncome = Math.min(taxableIncome, config.basicRateBandWidth);
  const higherBandIncome = Math.max(
    0,
    Math.min(taxableIncome, config.higherRateTaxableUpper) -
      config.basicRateBandWidth,
  );
  const additionalBandIncome = Math.max(
    0,
    taxableIncome - config.higherRateTaxableUpper,
  );

  const bands: IncomeTaxBand[] = [
    {
      id: "basic",
      label: "Income Tax — Basic Rate (20%)",
      amount: roundToPence(basicBandIncome * config.basicRate),
    },
    {
      id: "higher",
      label: "Income Tax — Higher Rate (40%)",
      amount: roundToPence(higherBandIncome * config.higherRate),
    },
    {
      id: "additional",
      label: "Income Tax — Additional Rate (45%)",
      amount: roundToPence(additionalBandIncome * config.additionalRate),
    },
  ];

  const total = roundToPence(bands.reduce((sum, b) => sum + b.amount, 0));

  return { jurisdiction: "ruk", bands, total };
}

function calculateScottishIncomeTax(
  grossSalary: number,
  config: TaxYearConfig,
): IncomeTaxBreakdown {
  const { scottish: s, personalAllowance: pa } = config;

  const bands: IncomeTaxBand[] = [
    {
      id: "starter",
      label: "Income Tax — Starter Rate (19%)",
      amount: roundToPence(
        bandIncome(grossSalary, pa, s.starterUpper) * s.starterRate,
      ),
    },
    {
      id: "basic",
      label: "Income Tax — Basic Rate (20%)",
      amount: roundToPence(
        bandIncome(grossSalary, s.starterUpper, s.basicUpper) * s.basicRate,
      ),
    },
    {
      id: "intermediate",
      label: "Income Tax — Intermediate Rate (21%)",
      amount: roundToPence(
        bandIncome(grossSalary, s.basicUpper, s.intermediateUpper) *
          s.intermediateRate,
      ),
    },
    {
      id: "higher",
      label: "Income Tax — Higher Rate (42%)",
      amount: roundToPence(
        bandIncome(grossSalary, s.intermediateUpper, s.higherUpper) *
          s.higherRate,
      ),
    },
    {
      id: "advanced",
      label: "Income Tax — Advanced Rate (45%)",
      amount: roundToPence(
        bandIncome(grossSalary, s.higherUpper, s.advancedUpper) *
          s.advancedRate,
      ),
    },
    {
      id: "top",
      label: "Income Tax — Top Rate (48%)",
      amount: roundToPence(
        Math.max(0, grossSalary - s.advancedUpper) * s.topRate,
      ),
    },
  ];

  const total = roundToPence(bands.reduce((sum, b) => sum + b.amount, 0));

  return { jurisdiction: "scotland", bands, total };
}

function calculateNationalInsurance(
  grossSalary: number,
  config: TaxYearConfig,
): UKSalaryCalculation["nationalInsurance"] {
  const mainBandEarnings = Math.max(
    0,
    Math.min(grossSalary, config.niUpperEarningsLimit) -
      config.niPrimaryThreshold,
  );
  const additionalBandEarnings = Math.max(
    0,
    grossSalary - config.niUpperEarningsLimit,
  );

  const mainRate = roundToPence(mainBandEarnings * config.niMainRate);
  const additionalRate = roundToPence(
    additionalBandEarnings * config.niAdditionalRate,
  );

  return {
    mainRate,
    additionalRate,
    total: roundToPence(mainRate + additionalRate),
  };
}

function calculateStudentLoan(
  repaymentIncome: number,
  plan: StudentLoanPlan,
  config: TaxYearConfig,
): number {
  if (plan === "none" || repaymentIncome <= 0) return 0;

  const { studentLoan: sl } = config;
  let threshold = 0;
  let rate = sl.undergraduateRate;

  switch (plan) {
    case "plan1":
      threshold = sl.plan1Threshold;
      break;
    case "plan2":
      threshold = sl.plan2Threshold;
      break;
    case "plan5":
      threshold = sl.plan5Threshold;
      break;
    case "postgraduate":
      threshold = sl.postgraduateThreshold;
      rate = sl.postgraduateRate;
      break;
    default:
      return 0;
  }

  return roundToPence(Math.max(0, repaymentIncome - threshold) * rate);
}

/**
 * Core UK salary calculator. Pass `region` from city metadata — use "Scotland"
 * for Scottish Income Tax bands; all other regions use England/Wales rules.
 *
 * Pension uses pre-tax salary sacrifice (deducted before Income Tax and NI).
 * Student loan repayments apply to post-sacrifice earnings.
 */
export function calculateUKSalary(
  grossSalary: number,
  region?: string,
  options?: UKCalculatorOptions,
): UKSalaryCalculation {
  const resolved = resolveOptions(options);
  const config = getTaxYearConfig(resolved.taxYear);
  const normalizedGross = Math.max(0, grossSalary);
  const scotland = isScottishRegion(region);

  const pensionYearly = roundToPence(
    normalizedGross * (resolved.pensionPercent / 100),
  );
  const adjustedGross = roundToPence(
    Math.max(0, normalizedGross - pensionYearly),
  );

  const personalAllowance = calculatePersonalAllowance(adjustedGross, config);
  const taxableIncome = roundToPence(
    Math.max(0, adjustedGross - personalAllowance),
  );

  const incomeTax = scotland
    ? calculateScottishIncomeTax(adjustedGross, config)
    : calculateRUKIncomeTax(adjustedGross, personalAllowance, config);

  const nationalInsurance = calculateNationalInsurance(adjustedGross, config);
  const studentLoanYearly = calculateStudentLoan(
    adjustedGross,
    resolved.studentLoan,
    config,
  );

  const totalDeductions = roundToPence(
    pensionYearly +
      incomeTax.total +
      nationalInsurance.total +
      studentLoanYearly,
  );
  const netYearly = roundToPence(normalizedGross - totalDeductions);

  return {
    grossSalary: normalizedGross,
    adjustedGross,
    taxYear: resolved.taxYear,
    pension: {
      percent: resolved.pensionPercent,
      ...toSalaryBreakdown(pensionYearly),
    },
    studentLoan: {
      plan: resolved.studentLoan,
      label: STUDENT_LOAN_LABELS[resolved.studentLoan],
      ...toSalaryBreakdown(studentLoanYearly),
    },
    personalAllowance,
    taxableIncome,
    taxJurisdiction: scotland ? "scotland" : "ruk",
    incomeTax,
    nationalInsurance,
    niPrimaryThreshold: config.niPrimaryThreshold,
    niUpperEarningsLimit: config.niUpperEarningsLimit,
    totalDeductions,
    netSalary: toSalaryBreakdown(netYearly),
  };
}

/** @deprecated Use getTaxYearConfig() for year-specific thresholds. */
export function calculatePersonalAllowanceLegacy(grossSalary: number): number {
  return calculatePersonalAllowance(grossSalary, getTaxYearConfig());
}
