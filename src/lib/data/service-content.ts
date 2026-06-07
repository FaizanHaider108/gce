export interface ServiceContentBlock {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  whoNeedsHeading: string;
  whoNeeds: string;
  methodologyHeading: string;
  methodology: string;
  deadlinesHeading: string;
  deadlines: string;
}

export const SERVICE_CONTENT: Record<string, ServiceContentBlock> = {
  "self-assessment-tax-returns": {
    slug: "self-assessment-tax-returns",
    metaTitle:
      "HMRC Self-Assessment Tax Return Filing Services | uktaxcalculation",
    metaDescription:
      "Expert HMRC Self-Assessment filing for sole traders, directors, landlords, and high earners. ACCA-aligned UK accountants handling deductions, deadlines, and penalty mitigation.",
    intro:
      "Navigating the complexities of self-employed filing parameters can be resource-draining. Our qualified chartered accounting team structures your personal tax submissions safely, maximizing statutory allowances and guaranteeing complete compliance with HMRC deadlines.",
    whoNeedsHeading: "Who Needs to File a Self-Assessment?",
    whoNeeds:
      "Under standard UK regulations, you must submit an annual tax filing if you operate as a sole trader earning over £1,000, serve as a corporate director, receive untaxed rental income, earn high-net dividend revenues, or need to pay the High Income Child Benefit Charge because your personal income scales past standard thresholds. Freelancers, consultants, CIS subcontractors, and portfolio landlords across England, Scotland, Wales, and Northern Ireland routinely fall within this scope.",
    methodologyHeading: "Our Dedicated Processing Methodology",
    methodology:
      "We employ a thorough, secure onboarding cycle to complete your submission. First, we ingest your digital transactional summaries, bank statements, and expense receipts through encrypted channels. Our practitioners reconcile figures against Xero or QuickBooks ledgers where applicable, then compute all eligible operating deductions—including home-office variables, mileage claims, and capital allowances—minimizing your net tax footprint before running a final audit sweep and digital SA100 submission.",
    deadlinesHeading: "Typical Filing Timelines & Statutory Deadlines",
    deadlines:
      "The UK fiscal cycle runs strictly from April 6th to April 5th of the following year. Paper submissions must hit HMRC by October 31st, whereas electronic registrations and final online balance settlements must be completely finalized by January 31st. Missing these dates triggers immediate automatic fines starting at £100, escalating daily thereafter — our team tracks your timeline proactively to eliminate penalty exposure entirely.",
  },
  "vat-returns": {
    slug: "vat-returns",
    metaTitle:
      "Making Tax Digital (MTD) VAT Return Services UK | uktaxcalculation",
    metaDescription:
      "MTD-compliant VAT return preparation, quarterly HMRC filing, and Xero/QuickBooks reconciliation for UK businesses above the £90,000 threshold.",
    intro:
      "Value Added Tax accounting requires continuous oversight to shield your corporate margins from structural audits. We provide specialized dynamic bookkeeping and compliant electronic tracking configurations built to streamline your periodic filings seamlessly.",
    whoNeedsHeading: "Who Needs to Register for UK VAT?",
    whoNeeds:
      "Your business entity is legally required to register for VAT if its rolling 12-month taxable turnover outpaces the current legal threshold boundary of £90,000. Voluntary registration is also highly viable for earlier-phase businesses looking to claim back substantial transactional inputs on capital setup expenses. E-commerce operators, hospitality groups, construction firms, and professional services partnerships commonly require quarterly MTD submissions.",
    methodologyHeading: "Our Comprehensive Processing Methodology",
    methodology:
      "We bridge your operational sales infrastructure with Making Tax Digital (MTD) compliant workflows. Our data specialists review your output transactions, itemize zero-rated items against standard 20% consumer lines, clean your internal purchases ledger, and reconcile every claim through Xero, QuickBooks, or Sage integrations to construct error-free quarterly reports ready for secure HMRC submission via compatible bridging software.",
    deadlinesHeading: "Typical Filing Timelines & Payment Rules",
    deadlines:
      "VAT returns are standardly prepared on a rolling quarterly layout cycle aligned to your stagger group. Both the secure electronic filing parameter and the corresponding electronic funding transfer must clear with HMRC exactly 1 calendar month and 7 days after the close of the designated accounting period. Late submissions attract penalty points under the MTD penalty regime — we maintain rolling compliance calendars for every client entity.",
  },
  "bookkeeping-bank-reconciliations": {
    slug: "bookkeeping-bank-reconciliations",
    metaTitle:
      "Professional Bookkeeping & Bank Reconciliation Services UK | uktaxcalculation",
    metaDescription:
      "Cloud bookkeeping, bank reconciliations, and cashflow reporting for UK SMEs, freelancers, and limited companies. Xero and QuickBooks integration with Companies House-ready records.",
    intro:
      "Maintaining structured, accessible financial ledgers is the foundational element of any commercial enterprise. Our cloud-based bookkeeping optimization services allow small businesses and freelancers to maintain crystal-clear transaction maps effortlessly.",
    whoNeedsHeading: "Who Needs Professional Bookkeeping?",
    whoNeeds:
      "Every scaling business entity, individual contractor, and corporate partnership requires a continuous bookkeeping process. Limited company directors, VAT-registered traders, and growing SMEs must preserve organized records under Companies House and HMRC rules. Failing to maintain six years of reconciled ledgers can prompt severe operational review parameters, HMRC enquiry risk, and significant financial fines during compliance audits.",
    methodologyHeading: "Our Dedicated Processing Methodology",
    methodology:
      "We integrate automated transaction collection layers directly across your commercial banking gateways and internal point-of-sale profiles. Our systems instantly reconcile invoices, map supplier overheads, categorize standard corporate expenses, and match bank statement lines to nominal codes within Xero or QuickBooks. Monthly management packs include creditor/debtor summaries and transparent cashflow balance statements so you always possess accurate insight into running margins.",
    deadlinesHeading: "Typical Filing Timelines & Financial Reporting",
    deadlines:
      "While ledger reconciliations happen on a continuous weekly or monthly sequence to keep your cashflow tracking metrics fresh, these clean entries compile directly into your broader quarterly VAT computations and annual year-end financial sheets. Timely month-end closes reduce year-end rush fees and ensure CT600 and Companies House deadlines are met without last-minute reconciliation gaps.",
  },
  "year-end-accounts": {
    slug: "year-end-accounts",
    metaTitle:
      "Year-End Accounts & Companies House Filing Services UK | uktaxcalculation",
    metaDescription:
      "Statutory year-end accounts, directors' reports, and CT600 Corporation Tax preparation for UK limited companies. Chartered accountants ensuring Companies House and HMRC compliance.",
    intro:
      "Closing your annual corporate ledger requires deep familiarity with the structural documentation standards enforced across UK institutions. We construct, balance, and submit your statutory corporate account summaries with extreme precision.",
    whoNeedsHeading: "Who Needs to File Statutory Year-End Accounts?",
    whoNeeds:
      "All active or dormant UK Limited Companies (Ltd) must prepare and submit formal balance statements, directors' reports, and profit-and-loss filings annually. This remains a strict legal requirement regardless of whether the business generated operational net profits or recorded trading losses. Shareholder-managed consultancies, property SPVs, and trading subsidiaries all fall within identical filing obligations.",
    methodologyHeading: "Our Comprehensive Processing Methodology",
    methodology:
      "Our qualified chartered professionals translate your historical yearly records into formalized statutory structures under UK GAAP. We map all fixed capital resources, reconcile inter-company liabilities, run balance validation matrices, and calculate your exact Corporation Tax burden for the CT600 layout. iXBRL tagging is applied before submission, and we coordinate aligned dividend documentation for director shareholders.",
    deadlinesHeading: "Typical Filing Timelines & Corporate Deadlines",
    deadlines:
      "Statutory Accounts must hit Companies House exactly 9 months after your corporate financial year-end date. Separately, your calculated Corporation Tax liability balance must be paid to HMRC within 9 months and 1 day, while the actual CT600 return filing deadline sits exactly 12 months after the period close. We issue proactive deadline alerts 90, 60, and 30 days ahead of each statutory cut-off.",
  },
  "ct600-corporation-tax": {
    slug: "ct600-corporation-tax",
    metaTitle:
      "CT600 Corporation Tax Return Filing Services UK | uktaxcalculation",
    metaDescription:
      "Expert CT600 Corporation Tax preparation, iXBRL tagging, and HMRC electronic filing for UK limited companies. Chartered accountants managing payment deadlines and penalty mitigation.",
    intro:
      "Corporation Tax compliance sits at the centre of every UK limited company obligation. Our chartered team prepares, validates, and submits your CT600 return with full iXBRL tagging — ensuring your tax liability is calculated accurately and filed before HMRC statutory cut-offs.",
    whoNeedsHeading: "Who Must File a CT600 Corporation Tax Return?",
    whoNeeds:
      "Every active UK private limited company (Ltd), including dormant entities with no trading activity, must file a CT600 return with HMRC for each accounting period. Company directors, finance controllers, and group subsidiaries with UK incorporation all carry this obligation regardless of profit levels. Trading companies, property investment SPVs, and consultancy firms with retained earnings routinely require annual CT600 submissions alongside their Companies House accounts.",
    methodologyHeading: "Our CT600 Processing Methodology",
    methodology:
      "We begin by reconciling your year-end trial balance against Xero, QuickBooks, or Sage ledgers, then apply capital allowance schedules, disallowable expense adjustments, and group relief claims where applicable. Our practitioners compute the chargeable profits figure, apply the prevailing Corporation Tax rate, generate the iXBRL-tagged CT600 XML package, and submit electronically via HMRC-compatible software with a full audit trail retained for your records.",
    deadlinesHeading: "Corporation Tax Deadlines & Payment Timelines",
    deadlines:
      "Corporation Tax must be paid to HMRC within 9 months and 1 day of your accounting period end. The CT600 return itself must be filed within 12 months of the same date. Late filing triggers automatic penalties starting at £100, escalating to £500 for returns over 12 months late. We maintain rolling compliance calendars and issue payment reminders 90, 60, and 30 days ahead of each statutory deadline.",
  },
  "cis-returns": {
    slug: "cis-returns",
    metaTitle:
      "CIS Returns & Construction Industry Scheme Services UK | uktaxcalculation",
    metaDescription:
      "Monthly CIS returns, subcontractor verification, and deduction management for UK contractors and construction firms. HMRC-compliant CIS filing with penalty avoidance.",
    intro:
      "The Construction Industry Scheme imposes strict monthly reporting obligations on contractors who engage subcontractors. Our CIS specialists handle verification, deduction calculations, and HMRC monthly returns so your construction business stays fully compliant without administrative burden.",
    whoNeedsHeading: "Who Must Operate Under the CIS Framework?",
    whoNeeds:
      "Any UK business that makes payments to subcontractors for construction operations must register as a CIS contractor with HMRC. This includes general builders, property developers, refurbishment specialists, and facilities management firms paying for labour-only or supply-and-fix contracts. Subcontractors registered under CIS also benefit from gross payment status verification managed through our onboarding process.",
    methodologyHeading: "Our CIS Return Processing Methodology",
    methodology:
      "We verify every subcontractor against HMRC's verification service before first payment, confirming UTR numbers and CIS registration status. Monthly, we aggregate gross payments, calculate the correct 20% or 30% deduction rate per subcontractor, reconcile against your payroll or accounting software, and submit the CIS300 monthly return electronically. Year-end CIS statements (CIS340) are issued to each subcontractor automatically.",
    deadlinesHeading: "CIS Filing Deadlines & Penalty Parameters",
    deadlines:
      "CIS monthly returns must be filed with HMRC by the 19th of the month following the tax month in which payments were made. Electronic payment of CIS deductions is also due by the 22nd (or 19th for non-electronic). Late filing incurs penalties starting at £100 per month. We submit returns by the 10th of each month to provide a compliance buffer and issue subcontractor payment summaries within 48 hours of each submission.",
  },
  "payroll-services": {
    slug: "payroll-services",
    metaTitle:
      "UK Payroll Services & RTI HMRC Submissions | uktaxcalculation",
    metaDescription:
      "Full-service UK payroll: RTI submissions, payslips, pension auto-enrolment, and HMRC compliance for SMEs, agencies, and growing teams. Chartered payroll specialists.",
    intro:
      "Accurate payroll processing protects your workforce relationships and shields your business from HMRC penalties. Our payroll team manages end-to-end RTI submissions, pension auto-enrolment, and statutory payment calculations for UK employers of every size.",
    whoNeedsHeading: "Who Needs Professional UK Payroll Services?",
    whoNeeds:
      "Any UK employer paying staff through PAYE — including limited companies with director salaries, recruitment agencies, hospitality groups, and growing SMEs — must operate Real Time Information (RTI) payroll and submit Full Payment Submissions to HMRC on or before each pay date. Businesses with one or more employees, including part-time and zero-hours contracts, fall within mandatory auto-enrolment pension obligations.",
    methodologyHeading: "Our Payroll Processing Methodology",
    methodology:
      "We onboard your workforce through encrypted employee data collection, configure tax codes and NI categories, and integrate with your existing Xero Payroll, QuickBooks, or BrightPay environment. Each pay run calculates gross-to-net figures including student loan deductions, statutory sick pay, maternity pay, and pension contributions. FPS and EPS submissions are filed to HMRC in real time, with itemised payslips distributed to employees on the same day.",
    deadlinesHeading: "Payroll RTI Deadlines & Statutory Payment Rules",
    deadlines:
      "Full Payment Submissions must reach HMRC on or before the employee pay date. Employer PAYE and NI liabilities are due by the 22nd of the following month (or 19th if paying by post). Auto-enrolment pension contributions must be remitted by the 22nd of the month after deduction. Late RTI submissions attract escalating penalties from £100 per month. We process all pay runs with a minimum 48-hour lead time to guarantee on-time HMRC compliance.",
  },
  "management-accounts": {
    slug: "management-accounts",
    metaTitle:
      "Management Accounts & Financial Reporting Services UK | uktaxcalculation",
    metaDescription:
      "Monthly and quarterly management accounts, KPI dashboards, and cashflow forecasting for UK business owners and finance directors. Xero and QuickBooks integrated reporting.",
    intro:
      "Timely management accounts transform raw bookkeeping data into actionable business intelligence. Our chartered accountants produce monthly or quarterly financial packs that give directors, investors, and finance teams the visibility needed to make confident operational decisions.",
    whoNeedsHeading: "Who Benefits from Management Accounts?",
    whoNeeds:
      "Growing SMEs, venture-backed startups, multi-site operators, and company directors seeking investor-ready financials all require structured management reporting beyond statutory year-end accounts. Businesses with external funding covenants, board reporting obligations, or seasonal cashflow volatility gain the most from regular management account cycles. Franchise operators and professional services firms commonly commission quarterly packs.",
    methodologyHeading: "Our Management Accounts Methodology",
    methodology:
      "We extract reconciled ledger data from Xero, QuickBooks, or Sage at month-end, then produce a structured pack including profit-and-loss variance analysis, balance sheet snapshots, aged debtor and creditor schedules, and cashflow forecasts. KPI dashboards track gross margin, overhead ratios, and working capital metrics against your budget. Reports are delivered in PDF and spreadsheet formats with a partner review call available on request.",
    deadlinesHeading: "Reporting Cycles & Delivery Timelines",
    deadlines:
      "Monthly management accounts are typically delivered within 10 working days of month-end close. Quarterly packs follow the same 10-day turnaround from period end. While management accounts carry no statutory filing deadline, timely delivery is critical for VAT payment planning, dividend declarations, and corporation tax provisioning. We align reporting cycles to your board meeting calendar and flag material variances within 48 hours of close.",
  },
  "tax-planning": {
    slug: "tax-planning",
    metaTitle:
      "Strategic UK Tax Planning & HMRC Optimisation Services | uktaxcalculation",
    metaDescription:
      "Legitimate UK tax planning for directors, sole traders, and high earners. Dividend optimisation, pension contributions, R&D credits, and capital gains strategies from chartered advisers.",
    intro:
      "Proactive tax planning legally reduces your overall liability while keeping every strategy within HMRC boundaries. Our chartered tax advisers design personalised structures for directors, business owners, and high-net-worth individuals — maximising take-home pay without crossing into aggressive avoidance territory.",
    whoNeedsHeading: "Who Should Engage in Strategic Tax Planning?",
    whoNeeds:
      "Company directors drawing salary and dividends, sole traders approaching higher-rate tax bands, landlords with multiple property portfolios, and business owners planning exit or succession events all benefit from structured tax planning. High earners facing Personal Allowance taper, the High Income Child Benefit Charge, or additional-rate liability should review their position annually. Family investment companies and EIS/SEIS investors also require specialist planning input.",
    methodologyHeading: "Our Tax Planning Methodology",
    methodology:
      "We begin with a full income and asset review across all your UK entities, mapping current salary, dividend, rental, and investment income against prevailing tax bands. Our advisers model scenarios including pension contribution timing, spouse allowance transfers, R&D tax credit claims, capital gains holdover relief, and incorporation versus sole trader structures. Recommendations are documented in a written planning memorandum with implementation steps and projected savings quantified.",
    deadlinesHeading: "Planning Cycles & Key UK Tax Year Deadlines",
    deadlines:
      "Effective tax planning aligns to the UK tax year running April 6th to April 5th. Pension contributions must be made before April 5th to count against the current year's allowance. ISA subscriptions close on the same date. Dividend declarations should be minuted before year-end to fix the distribution tax year. Capital gains annual exempt amount resets each April 6th. We conduct annual planning reviews in January and implement year-end strategies by March 31st to capture all available reliefs.",
  },
};

export function getServiceContent(slug: string): ServiceContentBlock | undefined {
  return SERVICE_CONTENT[slug];
}
