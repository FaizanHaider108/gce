export interface SalaryBreakdown {
  yearly: number;
  monthly: number;
  weekly: number;
}

export interface IncomeTaxBreakdown {
  basicRate: number;
  higherRate: number;
  additionalRate: number;
  total: number;
}

export interface NationalInsuranceBreakdown {
  mainRate: number;
  additionalRate: number;
  total: number;
}

export interface UKSalaryCalculation {
  grossSalary: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: IncomeTaxBreakdown;
  nationalInsurance: NationalInsuranceBreakdown;
  totalDeductions: number;
  netSalary: SalaryBreakdown;
}

export interface CalculatorConfig {
  defaultGrossSalary: number;
  currency: string;
  locale: string;
}
