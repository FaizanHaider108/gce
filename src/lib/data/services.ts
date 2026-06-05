import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  ClipboardList,
  FileText,
  HardHat,
  Landmark,
  Lightbulb,
  Receipt,
  Users,
} from "lucide-react";

export interface AccountingService {
  slug: string;
  title: string;
  shortDescription: string;
  icon: LucideIcon;
}

export const ACCOUNTING_SERVICES: AccountingService[] = [
  {
    slug: "bookkeeping-bank-reconciliations",
    title: "Bookkeeping & Bank Reconciliations",
    shortDescription:
      "Accurate day-to-day records and reconciled bank statements so your books stay audit-ready.",
    icon: Landmark,
  },
  {
    slug: "year-end-accounts",
    title: "Year-End Accounts",
    shortDescription:
      "Statutory year-end accounts prepared to UK GAAP and filed on time with Companies House.",
    icon: FileText,
  },
  {
    slug: "vat-returns",
    title: "VAT Returns",
    shortDescription:
      "MTD-compliant VAT submissions with proactive advice to avoid penalties and overpayments.",
    icon: Receipt,
  },
  {
    slug: "ct600-corporation-tax",
    title: "CT600 Corporation Tax Return",
    shortDescription:
      "Full CT600 preparation, iXBRL tagging, and HMRC filing for limited companies.",
    icon: Building2,
  },
  {
    slug: "cis-returns",
    title: "CIS Returns",
    shortDescription:
      "Construction Industry Scheme returns, subcontractor verification, and deduction management.",
    icon: HardHat,
  },
  {
    slug: "payroll-services",
    title: "Payroll Services",
    shortDescription:
      "RTI payroll runs, payslips, pension auto-enrolment, and HMRC submissions handled for you.",
    icon: Users,
  },
  {
    slug: "self-assessment-tax-returns",
    title: "Self-Assessment Tax Returns",
    shortDescription:
      "Personal tax returns filed accurately — sole traders, directors, and landlords covered.",
    icon: ClipboardList,
  },
  {
    slug: "management-accounts",
    title: "Management Accounts",
    shortDescription:
      "Monthly or quarterly management reports to track profit, cash flow, and KPIs in real time.",
    icon: BarChart3,
  },
  {
    slug: "tax-planning",
    title: "Tax Planning",
    shortDescription:
      "Strategic advice to legally reduce tax, optimise dividends, and maximise take-home pay.",
    icon: Lightbulb,
  },
];

export function getServiceBySlug(slug: string): AccountingService | undefined {
  return ACCOUNTING_SERVICES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return ACCOUNTING_SERVICES.map((service) => service.slug);
}
