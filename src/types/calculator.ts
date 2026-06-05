export type TaxJurisdiction = "scotland" | "ruk";
export type TaxYearId = "2025/26" | "2026/27";
export type StudentLoanPlan =
  | "none"
  | "plan1"
  | "plan2"
  | "plan5"
  | "postgraduate";

export interface UKCalculatorOptions {
  taxYear?: TaxYearId;
  pensionPercent?: number;
  studentLoan?: StudentLoanPlan;
}

export interface SalaryBreakdown {
  yearly: number;
  monthly: number;
  weekly: number;
}

export interface IncomeTaxBand {
  id: string;
  label: string;
  amount: number;
}

export interface IncomeTaxBreakdown {
  jurisdiction: TaxJurisdiction;
  bands: IncomeTaxBand[];
  total: number;
}

export interface NationalInsuranceBreakdown {
  mainRate: number;
  additionalRate: number;
  total: number;
}

export interface PensionBreakdown extends SalaryBreakdown {
  percent: number;
}

export interface StudentLoanBreakdown extends SalaryBreakdown {
  plan: StudentLoanPlan;
  label: string;
}

export interface UKSalaryCalculation {
  grossSalary: number;
  adjustedGross: number;
  taxYear: TaxYearId;
  pension: PensionBreakdown;
  studentLoan: StudentLoanBreakdown;
  personalAllowance: number;
  taxableIncome: number;
  taxJurisdiction: TaxJurisdiction;
  incomeTax: IncomeTaxBreakdown;
  nationalInsurance: NationalInsuranceBreakdown;
  niPrimaryThreshold: number;
  niUpperEarningsLimit: number;
  totalDeductions: number;
  netSalary: SalaryBreakdown;
}

export interface CalculatorConfig {
  defaultGrossSalary: number;
  currency: string;
  locale: string;
}
