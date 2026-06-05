/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CANONICAL PRODUCTION URL
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the default base URL used in sitemaps, Open Graph tags, and any
 * absolute links when NEXT_PUBLIC_SITE_URL is not set.
 *
 * CURRENT (Vercel production):  https://gce-4ozu.vercel.app
 * FUTURE (custom domain):        https://globalcalculatorengine.com
 *
 * When the custom domain goes live (in ~3 days):
 *   1. Set NEXT_PUBLIC_SITE_URL=https://globalcalculatorengine.com
 *      in Vercel → Project Settings → Environment Variables (Production)
 *   2. Update CANONICAL_SITE_URL below to match
 *   3. Redeploy
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const CANONICAL_SITE_URL = "https://gce-4ozu.vercel.app";

/**
 * Returns the canonical site URL for SEO-critical output (sitemap, metadata).
 * Never falls back to VERCEL_URL — preview/branch deploy URLs must not leak
 * into sitemaps or canonical tags.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  return CANONICAL_SITE_URL;
}
