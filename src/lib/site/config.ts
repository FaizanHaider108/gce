/**

 * ─────────────────────────────────────────────────────────────────────────────

 * CANONICAL PRODUCTION URL

 * ─────────────────────────────────────────────────────────────────────────────

 * Default base URL for sitemaps, Open Graph tags, and absolute links.

 *

 * CURRENT (Vercel production):  https://globalcalculatorengine.vercel.app

 * FUTURE (custom domain):        https://globalcalculatorengine.com

 *

 * Override via NEXT_PUBLIC_SITE_URL in Vercel → Environment Variables.

 * ─────────────────────────────────────────────────────────────────────────────

 */

export const CANONICAL_SITE_URL = "https://globalcalculatorengine.vercel.app";



/** Primary corporate contact for Global Calculator Engine */

export const CORPORATE_EMAIL = "hello@globalcalculatorengine.com";



/** Compliance & privacy enquiries */

export const COMPLIANCE_EMAIL = "compliance@globalcalculatorengine.com";



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



/**

 * WhatsApp business number in international format without + or spaces.

 * Override via NEXT_PUBLIC_WHATSAPP_NUMBER in environment variables.

 */

const DEFAULT_WHATSAPP_NUMBER = "447700900000";



export function getWhatsAppNumber(): string {

  const raw =

    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER;

  return raw.replace(/\D/g, "");

}

