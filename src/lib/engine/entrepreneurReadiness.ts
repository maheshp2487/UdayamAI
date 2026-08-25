import { z } from "zod";
import { FinancialCalculator } from "../financial/financial-plan";
import { getRegionalAdjustment } from "../data/regionalEcosystemIndex";
import { ARCHETYPE_GLOBAL_WEIGHTS } from "./archetypeWeights";

// ============================================================
// Journey Readiness Score Engine
// Explainable AHP-style Multi-Criteria Deterministic Model
// ============================================================
// IMPORTANT:
// These are literature-informed starting weights, not India-specific
// empirically calibrated outcome weights.
// Derived using Saaty’s Analytic Hierarchy Process (AHP),
// principal eigenvector method.
// All pairwise comparison matrices satisfy CR < 0.10.
// See docs/READINESS_MODEL_METHODOLOGY.md for methodology.
// ============================================================

export const EntrepreneurArchetypeSchema = z.object({
  // Category A — Experience & Human Capital
  industryExperienceYears: z.number().min(0).max(50), // A1
  managementExperience: z.number().min(0).max(10),    // A2
  educationLevel: z.number().min(0).max(10),          // A3

  // Category B — Preparedness & Process
  recordKeepingHabits: z.number().min(0).max(10),     // B1
  businessPlanning: z.number().min(0).max(10),        // B2
  professionalAdviceAccess: z.number().min(0).max(10),// B3
  staffingPlanAdequacy: z.number().min(0).max(10),    // B4

  // Category C — Psychological/Entrepreneurial Traits
  needForAchievement: z.number().min(0).max(10),      // C1
  riskTolerance: z.number().min(0).max(10),           // C2
  selfConfidence: z.number().min(0).max(10),          // C3

  // Category D — Background/Support Factors
  familyBusinessBackground: z.number().min(0).max(10),// D1
  socioculturalSupport: z.number().min(0).max(10),    // D2

  // Inputs for Layer 2 & 3
  availableMarginCapital: z.number().min(0),
  stateName: z.string(),
});

export type EntrepreneurArchetypeInput = z.infer<typeof EntrepreneurArchetypeSchema>;

export interface ReadinessFactor {
  id: keyof typeof ARCHETYPE_GLOBAL_WEIGHTS;
  name: string;
  score: number;       // 0-100 normalized score
  weight: number;      // global weight from AHP
  contribution: number;// score * weight
  weightedImpactOfWeakness: number; // (100 - score) * weight
}

export interface JourneyReadinessResult {
  overallScore: number; // 0-100
  readinessBand: "Strong readiness" | "Building readiness" | "Early stage — here's what would help most";
  layer1ArchetypeScore: number;
  layer2FinancialScore: number;
  layer3RegionalMultiplier: number;
  regionalExplanation: string;
  topPositiveFactors: string[];
  areasToStrengthen: string[];
  recommendedNextActions: string[];
  debug?: {
    factors: ReadinessFactor[];
  };
}

export class EntrepreneurReadinessEngine {
  /**
   * Calculates the overall Journey Readiness Score using a 3-layer deterministic model.
   * NEVER presented as a probability of success/failure.
   */
  static calculateScore(input: EntrepreneurArchetypeInput, includeDebug = false): JourneyReadinessResult {
    // Validate input
    const validData = EntrepreneurArchetypeSchema.parse(input);

    // ─────────────────────────────────────────────────────────
    // LAYER 1: Archetype Score (0-100)
    // ─────────────────────────────────────────────────────────
    // Build the 12 factors with their normalized scores and weights
    const l1Factors: ReadinessFactor[] = [
      { id: "industryExperience", name: "Prior Industry Experience", score: Math.min(validData.industryExperienceYears * 10, 100), weight: ARCHETYPE_GLOBAL_WEIGHTS.industryExperience, contribution: 0, weightedImpactOfWeakness: 0 },
      { id: "managementExperience", name: "Management Experience", score: validData.managementExperience * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.managementExperience, contribution: 0, weightedImpactOfWeakness: 0 },
      { id: "educationLevel", name: "Education Level", score: validData.educationLevel * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.educationLevel, contribution: 0, weightedImpactOfWeakness: 0 },
      
      { id: "recordKeeping", name: "Record-Keeping Habits", score: validData.recordKeepingHabits * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.recordKeeping, contribution: 0, weightedImpactOfWeakness: 0 },
      { id: "strategicPlanning", name: "Strategic Planning", score: validData.businessPlanning * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.strategicPlanning, contribution: 0, weightedImpactOfWeakness: 0 },
      { id: "professionalAdvice", name: "Professional Advice Access", score: validData.professionalAdviceAccess * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.professionalAdvice, contribution: 0, weightedImpactOfWeakness: 0 },
      { id: "staffingPlanAdequacy", name: "Staffing Plan Adequacy", score: validData.staffingPlanAdequacy * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.staffingPlanAdequacy, contribution: 0, weightedImpactOfWeakness: 0 },
      
      { id: "needForAchievement", name: "Need for Achievement", score: validData.needForAchievement * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.needForAchievement, contribution: 0, weightedImpactOfWeakness: 0 },
      { id: "riskTolerance", name: "Risk Tolerance", score: validData.riskTolerance * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.riskTolerance, contribution: 0, weightedImpactOfWeakness: 0 },
      { id: "selfConfidence", name: "Self Confidence", score: validData.selfConfidence * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.selfConfidence, contribution: 0, weightedImpactOfWeakness: 0 },
      
      { id: "familyBusinessBackground", name: "Family Business Background", score: validData.familyBusinessBackground * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.familyBusinessBackground, contribution: 0, weightedImpactOfWeakness: 0 },
      { id: "socioculturalSupport", name: "Socio-cultural Support", score: validData.socioculturalSupport * 10, weight: ARCHETYPE_GLOBAL_WEIGHTS.socioculturalSupport, contribution: 0, weightedImpactOfWeakness: 0 },
    ];

    let layer1Score = 0;
    l1Factors.forEach(f => {
      f.contribution = f.score * f.weight;
      f.weightedImpactOfWeakness = (100 - f.score) * f.weight;
      layer1Score += f.contribution;
    });

    // ─────────────────────────────────────────────────────────
    // LAYER 2: Financial Readiness Score (0-100)
    // ─────────────────────────────────────────────────────────
    // Reuse existing financial calculator. Do not duplicate logic.
    const finPlan = FinancialCalculator.calculatePS26091(validData.availableMarginCapital);
    
    let layer2Score = 0;
    if (finPlan.outOfRange) {
      layer2Score = 10; // Severely out of range
    } else {
      const loanFulfillmentRatio = finPlan.requestedLoan > 0 ? (finPlan.effectiveLoan / finPlan.requestedLoan) : 1;
      const emiBurdenProxy = 1 - Math.min((finPlan.quarterlyPayment * 4) / finPlan.projectCost, 1);
      layer2Score = (loanFulfillmentRatio * 70) + (emiBurdenProxy * 30);
    }
    layer2Score = Math.max(0, Math.min(layer2Score, 100));

    // ─────────────────────────────────────────────────────────
    // LAYER 3: Regional Ecosystem Adjustment
    // ─────────────────────────────────────────────────────────
    const region = getRegionalAdjustment(validData.stateName);

    // ─────────────────────────────────────────────────────────
    // COMBINATION LOGIC
    // ─────────────────────────────────────────────────────────
    // Weighted combination of Layer 1 (60%) and Layer 2 (40%)
    const baseCombinedScore = (layer1Score * 0.60) + (layer2Score * 0.40);
    
    // Apply Layer 3 Adjustment
    let finalScore = baseCombinedScore * region.multiplier;
    finalScore = Math.max(0, Math.min(Math.round(finalScore), 100));

    // ─────────────────────────────────────────────────────────
    // EXPLAINABILITY GENERATION
    // ─────────────────────────────────────────────────────────
    let readinessBand: JourneyReadinessResult["readinessBand"];
    if (finalScore >= 75) {
      readinessBand = "Strong readiness";
    } else if (finalScore >= 50) {
      readinessBand = "Building readiness";
    } else {
      readinessBand = "Early stage — here's what would help most";
    }

    // Rank strengths by highest positive contribution (score * weight)
    const sortedStrengths = [...l1Factors].sort((a, b) => b.contribution - a.contribution);
    const topPositiveFactors = sortedStrengths.slice(0, 3).map(f => f.name);
    
    // Rank weaknesses by highest weighted impact of weakness ((100 - score) * weight)
    const sortedWeaknesses = [...l1Factors].sort((a, b) => b.weightedImpactOfWeakness - a.weightedImpactOfWeakness);
    const areasToStrengthen = sortedWeaknesses.slice(0, 3).map(f => f.name);

    if (layer2Score < 50) {
      areasToStrengthen.unshift("Project Cost Realism vs Available Margin");
    } else if (layer2Score > 85) {
      topPositiveFactors.unshift("Financial Margin Adequacy");
    }

    const recommendedNextActions: string[] = [];
    if (sortedWeaknesses.find(f => f.id === "strategicPlanning")!.score < 60) {
      recommendedNextActions.push("Draft a formal written business plan with detailed cost estimates.");
    }
    if (sortedWeaknesses.find(f => f.id === "recordKeeping")!.score < 60) {
      recommendedNextActions.push("Adopt a basic digital or ledger-based daily expense tracking system.");
    }
    if (layer2Score < 50) {
      recommendedNextActions.push("Review project scope to ensure it aligns with scheme caps and your available 10% margin.");
    }
    if (recommendedNextActions.length === 0) {
      recommendedNextActions.push("Proceed with scheme application and consult a local nodal officer.");
    }

    const result: JourneyReadinessResult = {
      overallScore: finalScore,
      readinessBand,
      layer1ArchetypeScore: Math.round(layer1Score),
      layer2FinancialScore: Math.round(layer2Score),
      layer3RegionalMultiplier: region.multiplier,
      regionalExplanation: region.explanation,
      topPositiveFactors,
      areasToStrengthen,
      recommendedNextActions
    };

    if (includeDebug) {
      result.debug = { factors: l1Factors };
    }

    return result;
  }
}
