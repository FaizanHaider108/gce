const GBP_FORMATTER = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formats a GBP amount with exactly two decimal places (e.g. £2,916.67).
 * Uses penny-precision rounding via Number.toFixed(2) before formatting.
 */
export function formatGBP(amount: number): string {
  const rounded = Number.parseFloat(amount.toFixed(2));
  return GBP_FORMATTER.format(rounded);
}
