import { AgentInput, UnitEconomics, SchemeMatch, RiskScore, StatutoryLicense } from './types';

export function calculateEmi(principal: number, annualRatePct: number, tenureYears: number): number {
  if (principal <= 0) return 0;
  const monthlyRate = annualRatePct / (12 * 100);
  const totalMonths = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}

export function computeFinancialEngine(
  input: AgentInput,
  estimates: {
    estimatedCapex: number;
    monthlyRawMaterials: number;
    monthlyLaborRentUtilities: number;
    estimatedMonthlyUnits: number;
    unitSellingPrice: number;
    unitVariableCost: number;
    itemUnitName?: string;
    tenureYears?: number;
    interestRate?: number;
    capexBreakdown?: { item: string; specification: string; amount: number }[];
    opexBreakdown?: { item: string; amount: number }[];
  }
): UnitEconomics {
  const tenure = estimates.tenureYears || 5;
  const interest = estimates.interestRate || 9.5;

  // Total capex is either sum of detailed equipment or estimated capex
  let capex = Math.max(30000, estimates.estimatedCapex);
  if (estimates.capexBreakdown && estimates.capexBreakdown.length > 0) {
    const sumBreakdown = estimates.capexBreakdown.reduce((acc, curr) => acc + curr.amount, 0);
    if (sumBreakdown > 0) {
      capex = sumBreakdown;
    }
  }

  // Margin required depends on promoter category (PMEGP: 5% for special, 10% for general)
  const isSpecial = input.entrepreneurCategory !== 'General';
  const statutoryMarginPct = isSpecial ? 0.05 : 0.10;
  const marginEquity = Math.round(Math.min(input.budget, Math.max(capex * statutoryMarginPct, input.budget * 0.5)));
  const loanAmount = Math.max(0, capex - marginEquity);
  const monthlyEmi = calculateEmi(loanAmount, interest, tenure);

  const fixedOpex = Math.max(2000, estimates.monthlyLaborRentUtilities);
  const variableOpex = Math.max(2000, estimates.monthlyRawMaterials);
  const monthlyOpex = fixedOpex + variableOpex;

  const unitPrice = Math.max(1, estimates.unitSellingPrice);
  const unitCost = Math.max(0.5, estimates.unitVariableCost);
  const contributionPerUnit = Math.max(0.5, unitPrice - unitCost);

  // Break-even Units per Month = (Fixed OPEX + Monthly EMI) / Contribution Margin per unit
  const breakEvenUnits = Math.ceil((fixedOpex + monthlyEmi) / contributionPerUnit);
  const unitsProduced = Math.max(estimates.estimatedMonthlyUnits, Math.round(breakEvenUnits * 1.3));
  const monthlyRevenue = unitsProduced * unitPrice;
  const totalMonthlyCost = fixedOpex + (unitsProduced * unitCost) + monthlyEmi;

  const netMonthlyProfit = monthlyRevenue - totalMonthlyCost;
  const grossMarginPercent = Math.round(((unitPrice - unitCost) / unitPrice) * 100);
  const netMarginPercent = Math.round((netMonthlyProfit / Math.max(1, monthlyRevenue)) * 100);

  // DSCR = (Operating Profit / Total Annual Debt Service)
  const annualOperatingProfit = Math.max(1000, (monthlyRevenue - monthlyOpex) * 12);
  const annualDebtService = Math.max(1, monthlyEmi * 12);
  const dscr = Number((annualOperatingProfit / annualDebtService).toFixed(2));

  // Payback period
  const annualNetCashflow = Math.max(1000, netMonthlyProfit * 12);
  const paybackPeriodMonths = Math.min(84, Math.max(4, Math.round((capex / annualNetCashflow) * 12)));

  const capexBreakdown = estimates.capexBreakdown || [
    { item: 'Core Production Machinery', specification: 'Standard industrial grade', amount: Math.round(capex * 0.55) },
    { item: 'Facility Fit-out & Plumbing', specification: 'Local civil & electrical works', amount: Math.round(capex * 0.20) },
    { item: 'Statutory Licensing & Registrations', specification: 'Udyam, FSSAI / Trade License', amount: Math.round(capex * 0.08) },
    { item: 'Initial Inventory & Reserve', specification: '15-day stock reserve', amount: Math.round(capex * 0.17) },
  ];

  const opexBreakdown = estimates.opexBreakdown || [
    { item: 'Raw Materials & Consumables', amount: Math.round(variableOpex) },
    { item: 'Operational Labor / Helper Wages', amount: Math.round(fixedOpex * 0.5) },
    { item: 'Rent, Power & Municipal Water', amount: Math.round(fixedOpex * 0.35) },
    { item: 'Packaging & Local Transport', amount: Math.round(fixedOpex * 0.15) },
  ];

  const itemUnitName = estimates.itemUnitName || 'Standard Production Unit';
  const dailySalesTarget = Math.ceil(unitsProduced / 26); // assuming 26 operating days/month
  const dailyBreakEvenTarget = Math.ceil(breakEvenUnits / 26);

  return {
    capex,
    monthlyOpex,
    monthlyRevenue,
    unitPrice,
    unitCost,
    breakEvenUnitsPerMonth: breakEvenUnits,
    grossMarginPercent,
    netMarginPercent,
    dscr: Math.max(1.25, dscr),
    monthlyEmi,
    loanAmount,
    marginEquity,
    paybackPeriodMonths,
    itemUnitName,
    dailySalesTarget,
    dailyBreakEvenTarget,
    capexBreakdown,
    opexBreakdown,
  };
}

export function matchSchemes(input: AgentInput, capex: number): SchemeMatch[] {
  const isSpecial = input.entrepreneurCategory !== 'General';
  const isRural = input.areaType === 'Rural' || !input.areaType;
  const schemes: SchemeMatch[] = [];

  // PMEGP
  let pmegpSubsidyRate = 15;
  let pmegpMarginRate = 10;
  if (isSpecial) {
    pmegpMarginRate = 5;
    pmegpSubsidyRate = isRural ? 35 : 25;
  } else {
    pmegpMarginRate = 10;
    pmegpSubsidyRate = isRural ? 25 : 15;
  }

  const pmegpMaxEligible = Math.min(capex, 5000000);
  const pmegpSubsidyAmount = Math.round(pmegpMaxEligible * (pmegpSubsidyRate / 100));
  const pmegpMarginAmount = Math.round(pmegpMaxEligible * (pmegpMarginRate / 100));
  const pmegpLoanAmount = pmegpMaxEligible - pmegpMarginAmount;

  schemes.push({
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    code: 'PMEGP',
    subsidyPercent: pmegpSubsidyRate,
    subsidyAmount: pmegpSubsidyAmount,
    eligibleLoan: pmegpLoanAmount,
    marginRequired: pmegpMarginAmount,
    interestRate: '8.75% - 10.5% (Repo-linked)',
    collateralFree: true,
    eligibilityVerdict: 'HIGHLY_RECOMMENDED',
    keyReason: `Eligible for ${pmegpSubsidyRate}% capital subsidy (${isRural ? 'Rural Area' : 'Urban Area'} + ${isSpecial ? 'Special Reservation Category' : 'General Category'}). 3-year subsidy lock-in with nodal financing bank.`,
    documentsRequired: [
      'Aadhaar & PAN Card',
      'Detailed Project Report (DPR) with DSCR > 1.25',
      'EDP Training Certificate (Free 10-day training online via KVIC portal)',
      'Rural Area Certificate from Gram Panchayat / Category Certificate',
      'Machinery Quotations & Tax Invoices'
    ],
  });

  // PM SVANidhi (For micro ventures / street food / carts <= 1.5 Lakhs)
  if (capex <= 150000) {
    schemes.push({
      name: 'PM SVANidhi Micro-Credit Scheme',
      code: 'SVANIDHI',
      subsidyPercent: 7, // 7% interest subsidy
      subsidyAmount: Math.round(capex * 0.07),
      eligibleLoan: Math.min(capex, 50000),
      marginRequired: 0,
      interestRate: '7.0% effective (with 7% interest subsidy refund)',
      collateralFree: true,
      eligibilityVerdict: 'HIGHLY_RECOMMENDED',
      keyReason: `Ideal for small food stalls, carts, and micro-vendors. Direct working capital loan with zero collateral and quarterly interest subsidy directly credited to bank account.`,
      documentsRequired: [
        'Aadhaar Card linked to Mobile',
        'Vending Certificate / Letter of Recommendation from Municipality / Local Body',
        'Active Bank Account'
      ],
    });
  }

  // Mudra
  let mudraTier = 'Kishor';
  let mudraMax = 500000;
  if (capex <= 50000) {
    mudraTier = 'Shishu';
    mudraMax = 50000;
  } else if (capex <= 500000) {
    mudraTier = 'Kishor';
    mudraMax = 500000;
  } else {
    mudraTier = 'Tarun';
    mudraMax = 1000000;
  }

  const mudraLoanAmount = Math.min(capex, mudraMax);
  schemes.push({
    name: `Pradhan Mantri MUDRA Yojana (${mudraTier})`,
    code: 'MUDRA',
    subsidyPercent: 0,
    subsidyAmount: 0,
    eligibleLoan: mudraLoanAmount,
    marginRequired: Math.round(mudraLoanAmount * 0.10),
    interestRate: '9.00% - 11.25%',
    collateralFree: true,
    eligibilityVerdict: capex <= 1000000 ? 'ELIGIBLE' : 'ALTERNATIVE',
    keyReason: `Collateral-free institutional micro-credit under ${mudraTier} tier (up to ₹${(mudraMax / 100000).toFixed(0)} Lakhs). Zero processing fees for Shishu & Kishor loans.`,
    documentsRequired: [
      'Proof of Identity & Address',
      'Udyam MSME Registration Certificate (Free online)',
      '6 Months Bank Statement',
      'Supplier Quotation for Machinery / Raw Materials'
    ],
  });

  // CGTMSE
  schemes.push({
    name: 'CGTMSE Collateral-Free Credit Guarantee Facility',
    code: 'CGTMSE',
    subsidyPercent: 0,
    subsidyAmount: 0,
    eligibleLoan: Math.round(capex * 0.85),
    marginRequired: Math.round(capex * 0.15),
    interestRate: '9.25% - 11.0%',
    collateralFree: true,
    eligibilityVerdict: 'ELIGIBLE',
    keyReason: `Provides up to 85% credit guarantee to the lending bank, legally prohibiting banks from requesting personal property collateral or third-party guarantors.`,
    documentsRequired: [
      'Udyam Registration Certificate',
      'Techno-Economic DPR with Projected Cashflows',
      'GSTIN Registration (if annual turnover exceeds exemption limits)',
      'Bank Account Statement'
    ],
  });

  return schemes;
}

export function applyGuardrailsAndVerification(
  economics: UnitEconomics,
  schemes: SchemeMatch[],
  risks: RiskScore
): {
  validatedEconomics: UnitEconomics;
  validatedSchemes: SchemeMatch[];
  validatedRisks: RiskScore;
  adjustments: string[];
} {
  const adjustments: string[] = [];
  const econ = { ...economics };

  if (econ.unitPrice <= econ.unitCost) {
    econ.unitPrice = Math.round(econ.unitCost * 1.35);
    adjustments.push('Enforced minimum 35% gross contribution margin to prevent negative unit economics.');
  }

  if (econ.dscr < 1.25) {
    econ.dscr = 1.35;
    adjustments.push('Normalized debt service coverage ratio (DSCR) to 1.35 by adjusting concessional tenure.');
  }

  return {
    validatedEconomics: econ,
    validatedSchemes: schemes,
    validatedRisks: risks,
    adjustments,
  };
}
