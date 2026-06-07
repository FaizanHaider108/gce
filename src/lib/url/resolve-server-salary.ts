import { DEFAULT_GROSS_SALARY } from "@/lib/calculators/uk";
import { parseSalaryParam } from "@/lib/url/parse-salary-param";

export interface ServerSalaryState {
  grossSalary: number;
  isExplicitSalary: boolean;
  urlSalary: number | undefined;
}

/** Resolve salary state from server searchParams for SSR hero, metadata, and tables. */
export function resolveServerSalaryState(
  searchParams: { salary?: string | string[] | undefined } = {},
): ServerSalaryState {
  const raw = searchParams.salary;
  const salaryStr = Array.isArray(raw) ? raw[0] : raw;
  const urlSalary = parseSalaryParam(salaryStr ?? null);
  const isExplicitSalary = urlSalary !== undefined && urlSalary > 0;
  const grossSalary = isExplicitSalary ? urlSalary : DEFAULT_GROSS_SALARY;

  return { grossSalary, isExplicitSalary, urlSalary };
}
