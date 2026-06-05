export function formatGBP(
  amount: number,
  options: { fractionDigits?: number } = {},
): string {
  const { fractionDigits = 0 } = options;

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}
