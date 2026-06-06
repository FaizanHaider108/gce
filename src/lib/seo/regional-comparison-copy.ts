import { isLondonCity } from "@/lib/data/city-routes";
import {
  UK_NATIONAL_BASELINE_SALARY,
} from "@/lib/data/regional-salary";
import { formatGBP } from "@/lib/format/currency";
import type { UKCity } from "@/types/location";

/**
 * Builds regional salary comparison prose — never compares a city to itself.
 * London pages benchmark against the UK national average; all other cities
 * benchmark against metropolitan London.
 */
export function buildRegionalSalaryComparisonCopy(
  city: UKCity,
  cityAvgSalary: number,
  londonAvgSalary: number,
  grossSalary: number,
): string {
  const grossFormatted = formatGBP(grossSalary);
  const cityAvgFormatted = formatGBP(cityAvgSalary);
  const londonAvgFormatted = formatGBP(londonAvgSalary);
  const nationalAvgFormatted = formatGBP(UK_NATIONAL_BASELINE_SALARY);

  const intro = `Earning ${grossFormatted} in ${city.cityName} leaves you with the same baseline statutory deductions as other UK locations, but your purchasing power depends on the regional baseline.`;

  if (isLondonCity(city)) {
    return `${intro} The average gross earnings in London stand at ${cityAvgFormatted}, maintaining a position well above the overall UK national average baseline of ${nationalAvgFormatted}.`;
  }

  return `${intro} The average income benchmark in ${city.cityName} is around ${cityAvgFormatted}, compared to the higher baseline threshold of ${londonAvgFormatted} in metropolitan London.`;
}
