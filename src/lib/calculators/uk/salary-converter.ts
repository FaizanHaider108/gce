export const HOURS_PER_WEEK_OPTIONS = [35, 37.5, 40] as const;
export type HoursPerWeek = (typeof HOURS_PER_WEEK_OPTIONS)[number];

export const DEFAULT_HOURS_PER_WEEK: HoursPerWeek = 40;
export const WEEKS_PER_YEAR = 52;

export type SalaryInputMode = "annual" | "hourly";

function roundToPence(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Projected annual gross from hourly rate and weekly hours. */
export function hourlyToAnnual(
  hourlyRate: number,
  hoursPerWeek: number,
): number {
  return roundToPence(
    Math.max(0, hourlyRate) * Math.max(0, hoursPerWeek) * WEEKS_PER_YEAR,
  );
}

/** Reverse equivalent hourly rate from annual gross. */
export function annualToHourly(
  annualSalary: number,
  hoursPerWeek: number,
): number {
  const divisor = hoursPerWeek * WEEKS_PER_YEAR;
  if (divisor <= 0 || annualSalary <= 0) return 0;
  return roundToPence(annualSalary / divisor);
}

export function formatHourlyRate(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundToPence(amount));
}

export function formatHourlyConversionLabel(
  hourlyRate: number,
  hoursPerWeek: number,
): string {
  const formattedHours =
    hoursPerWeek % 1 === 0 ? String(hoursPerWeek) : hoursPerWeek.toFixed(1);
  return `${formatHourlyRate(hourlyRate)} / hr @ ${formattedHours} hrs`;
}
