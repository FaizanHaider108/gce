export type TaxJurisdiction = "scotland" | "ruk";

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

export interface UKSalaryCalculation {
  grossSalary: number;
  personalAllowance: number;
  taxableIncome: number;
  taxJurisdiction: TaxJurisdiction;
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
