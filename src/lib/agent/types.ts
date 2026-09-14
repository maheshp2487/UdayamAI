export interface AgentInput {
  idea: string;
  location: string;
  budget: number;
  businessScale?: 'Micro / Mobile Kiosk' | 'Standard Small Commercial Unit' | 'Expanded Facility / Production Plant';
  premisesType?: 'Rented Commercial Space' | 'Owned Land / House Front' | 'Roadside Kiosk / Cart';
  experienceLevel?: 'Beginner / First-Time' | 'Experienced (1-3 Years)' | 'Skilled / Artisan';
  entrepreneurCategory?: 'General' | 'Women' | 'SC / ST' | 'OBC / Minorities' | 'Ex-Servicemen';
  areaType?: 'Rural' | 'Urban';
}

export type AgentToolType = 
  | 'MARKET_ANALYSIS' 
  | 'UNIT_ECONOMICS' 
  | 'SCHEME_OPTIMIZER' 
  | 'GUARDRAIL_VALIDATION' 
  | 'STRATEGY_SYNTHESIS';

export interface AgentStep {
  id: string;
  title: string;
  tool: AgentToolType;
  status: 'pending' | 'running' | 'completed' | 'error';
  thought: string;
  outputSummary?: string;
  durationMs?: number;
}

export interface UnitEconomics {
  capex: number;
  monthlyOpex: number;
  monthlyRevenue: number;
  unitPrice: number;
  unitCost: number;
  breakEvenUnitsPerMonth: number;
  grossMarginPercent: number;
  netMarginPercent: number;
  dscr: number; // Debt Service Coverage Ratio
  monthlyEmi: number;
  loanAmount: number;
  marginEquity: number;
  paybackPeriodMonths: number;
  itemUnitName: string; // e.g. "Plate of Dosa", "Kg of Saffron", "Cubic Meter of Storage", "Silk Saree"
  dailySalesTarget: number;
  dailyBreakEvenTarget: number;
  capexBreakdown: { item: string; specification: string; amount: number }[];
  opexBreakdown: { item: string; amount: number }[];
}

export interface StatutoryLicense {
  name: string;
  authority: string;
  timelineDays: number;
  criticality: 'Mandatory before opening' | 'Within 30 days of launch' | 'Recommended for scaling';
}

export interface SchemeMatch {
  name: string;
  code: string;
  subsidyPercent: number;
  subsidyAmount: number;
  eligibleLoan: number;
  marginRequired: number;
  interestRate: string;
  collateralFree: boolean;
  eligibilityVerdict: 'HIGHLY_RECOMMENDED' | 'ELIGIBLE' | 'ALTERNATIVE';
  keyReason: string;
  documentsRequired: string[];
}

export interface MarketInsights {
  targetAudience: string;
  demandDrivers: string[];
  competitiveSaturation: 'Low' | 'Moderate' | 'High';
  competitorInsights: string;
  regionalAdvantage: string;
  criticalRisks: string[];
  mitigationStrategies: string[];
}

export interface RiskScore {
  marketRisk: number;
  financialRisk: number;
  executionRisk: number;
  regulatoryRisk: number;
  overallReadiness: number;
}

export interface AgentResult {
  ventureName: string;
  executiveSummary: string;
  market: MarketInsights;
  economics: UnitEconomics;
  schemes: SchemeMatch[];
  licenses: StatutoryLicense[];
  risks: RiskScore;
  steps: AgentStep[];
  suggestedMilestones: { phase: string; title: string; target: string }[];
  guardrailVerdict: {
    passed: boolean;
    adjustmentsMade: string[];
  };
  timestamp: string;
}
