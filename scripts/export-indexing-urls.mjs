/**
 * Export all indexable URLs for Google Indexing API bulk submission.
 * Usage: node scripts/export-indexing-urls.mjs
 *
 * Outputs JSON manifest to stdout — pipe to file for Indexing API scripts.
 */
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Build must exist; run `npm run build` first in CI, or use tsx on the TS source.
console.error(
  "Run: npx tsx -e \"import { getIndexingManifest } from './src/lib/seo/indexing-urls'; console.log(JSON.stringify(getIndexingManifest(), null, 2))\"",
);
