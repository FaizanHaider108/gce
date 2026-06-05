export interface SalaryBreakdown {
  yearly: number;
  monthly: number;
}

export interface IncomeTaxBreakdown {
  basicRate: number;
  higherRate: number;
  total: number;
}

export interface UKSalaryCalculation {
  grossSalary: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: IncomeTaxBreakdown;
  nationalInsurance: number;
  totalDeductions: number;
  netSalary: SalaryBreakdown;
}

export interface CalculatorConfig {
  defaultGrossSalary: number;
  currency: string;
  locale: string;
}
