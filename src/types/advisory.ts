export interface AdvisoryReport {
  id: string;
  timestamp: string;
  location: string;
  businessCategory: string;
  marginCapital: number;
  viabilityScore: ViabilityScore;
  marketReach: MarketReachAnalysis;
  opportunity: OpportunityAnalysis;
  swot: SWOTAnalysis;
  threats: ThreatAnalysis[];
  competitors: CompetitorMapping;
  pricing: PricingStrategy;
  financialPlan?: unknown; // Linked to PS26091CalculationResult at runtime
}

export interface ViabilityScore {
  total: number;
  label: 'Excellent' | 'Promising' | 'Moderate' | 'High Risk';
  breakdown: {
    marketDemand: number;
    competition: number;
    financialFeasibility: number;
    operationalRisk: number;
    localFit: number;
  };
}

export interface MarketReachAnalysis {
  immediateRadiusKm: number;
  extendedRadiusKm: number;
  estimatedConsumers: string;
  targetSegments: string[];
  distributionChannels: string[];
}

export interface OpportunityAnalysis {
  summary: string;
  unservedNeeds: string[];
  growthPotential: string;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface ThreatAnalysis {
  risk: string;
  impact: 'High' | 'Medium' | 'Low';
  probability: 'High' | 'Medium' | 'Low';
  mitigation: string;
}

export interface CompetitorMapping {
  saturationLevel: 'Low' | 'Moderate' | 'High';
  estimatedDensity: string;
  analysis: string;
}

export interface PricingStrategy {
  purchasingPower: string;
  suggestedRange: string;
  entryPrice: string;
  premiumPrice: string;
  reasoning: string;
}
