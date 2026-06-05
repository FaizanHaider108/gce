# Global Calculator Engine (GCE)

Programmatic SEO (pSEO) platform for hyper-local salary and tax calculators. MVP targets the United Kingdom with a modular architecture designed to plug in USA, Canada, Australia, and EU datasets later.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and navigate to any city calculator, e.g.:

- `/salary/uk/salary-calculator-london`
- `/salary/uk/salary-calculator-manchester`

## Build & Deploy

```bash
npm run build
npm start
```

All city pages are statically generated at build time via `generateStaticParams()`. Deploy to Vercel or Netlify with zero server runtime cost.

## Project Structure

```
gce/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout, fonts, metadata
│   │   ├── page.tsx                   # UK city index (pSEO hub)
│   │   ├── globals.css
│   │   └── salary/
│   │       └── uk/
│   │           └── [slug]/
│   │               ├── page.tsx       # Dynamic static city pages
│   │               └── not-found.tsx
│   ├── components/
│   │   ├── calculator/
│   │   │   ├── SalaryCalculator.tsx   # Client-side interactive calculator
│   │   │   ├── SalaryInput.tsx
│   │   │   └── ResultsTable.tsx
│   │   └── layout/
│   │       ├── SiteHeader.tsx
│   │       └── SiteFooter.tsx
│   ├── data/
│   │   └── uk/
│   │       └── uk-cities.json         # City dataset (extend for more countries)
│   ├── lib/
│   │   ├── calculators/
│   │   │   └── uk/
│   │   │       ├── constants.ts       # Tax thresholds & rates
│   │   │       ├── tax-engine.ts      # Core UK calculation logic
│   │   │       └── index.ts
│   │   ├── data/
│   │   │   └── load-cities.ts         # Dataset loader (country-agnostic pattern)
│   │   └── format/
│   │       └── currency.ts
│   └── types/
│       ├── calculator.ts
│       └── location.ts
├── package.json
└── README.md
```

## Extending to New Countries

1. Add `src/data/us/us-cities.json` (or similar).
2. Add `src/lib/calculators/us/tax-engine.ts`.
3. Create `src/app/salary/us/[slug]/page.tsx` mirroring the UK route.
4. Register the dataset in `load-cities.ts`.

No changes to shared UI components are required.

## UK Tax Logic (MVP)

| Component | Rule |
|-----------|------|
| Personal Allowance | £12,570 (tapers above £100,000, £0 at £125,140) |
| Basic Rate | 20% on taxable income up to £37,700 |
| Higher Rate | 40% on taxable income £37,701 – £112,570 |
| Additional Rate | 45% on taxable income above £112,570 |
| National Insurance | 0% ≤ £12,570 · 8% £12,571–£50,270 · 2% above £50,270 |

Default calculator salary: **£35,000**.
# gce
