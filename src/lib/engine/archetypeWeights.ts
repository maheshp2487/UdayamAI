// ============================================================
// AHP Derived Archetype Weights
// ============================================================
// IMPORTANT:
// These are literature-informed starting weights, not India-specific
// empirically calibrated outcome weights.
// Derived using Saaty’s Analytic Hierarchy Process (AHP),
// principal eigenvector method.
// All pairwise comparison matrices satisfy CR < 0.10.
// See docs/READINESS_MODEL_METHODOLOGY.md for methodology.
//
// The model should remain deterministic, explainable and inspectable.
// Every final score must be traceable to named factors.
// Do NOT convert this into an ML model or failure/success probability.
// ============================================================

export const ARCHETYPE_CATEGORY_WEIGHTS = {
  experience: 0.1699,
  preparedness: 0.4729,
  psychological: 0.2844,
  background: 0.0729,
} as const;

export const ARCHETYPE_GLOBAL_WEIGHTS = {
  // Category A — Experience & Human Capital
  industryExperience: 0.0505, // A1
  managementExperience: 0.0917, // A2
  educationLevel: 0.0278, // A3

  // Category B — Preparedness & Process
  recordKeeping: 0.1362, // B1
  strategicPlanning: 0.2257, // B2
  professionalAdvice: 0.0728, // B3
  staffingPlanAdequacy: 0.0382, // B4

  // Category C — Psychological/Entrepreneurial Traits
  needForAchievement: 0.1422, // C1
  riskTolerance: 0.0711, // C2
  selfConfidence: 0.0711, // C3

  // Category D — Background/Support Factors
  familyBusinessBackground: 0.0182, // D1
  socioculturalSupport: 0.0546, // D2
} as const;
