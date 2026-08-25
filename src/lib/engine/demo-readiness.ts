import { EntrepreneurReadinessEngine, EntrepreneurArchetypeInput } from "./entrepreneurReadiness";

// ============================================================
// Demo Persona: Handloom Weaver in Varanasi, Uttar Pradesh
// ============================================================

const demoPersona: EntrepreneurArchetypeInput = {
  // A. Experience & Human Capital
  industryExperienceYears: 15,
  managementExperience: 2,
  educationLevel: 3,

  // B. Preparedness & Process
  recordKeepingHabits: 4,
  businessPlanning: 2,
  professionalAdviceAccess: 3,
  staffingPlanAdequacy: 6,

  // C. Psychological/Entrepreneurial Traits
  needForAchievement: 9,
  riskTolerance: 8,
  selfConfidence: 9,

  // D. Background/Support Factors
  familyBusinessBackground: 10,
  socioculturalSupport: 8,
  
  // Layer 2/3 Inputs
  availableMarginCapital: 25000, 
  stateName: "Uttar Pradesh"
};

try {
  console.log("=========================================");
  console.log("UDAYAM AI - JOURNEY READINESS DEMO SCORE");
  console.log("=========================================");
  
  const result = EntrepreneurReadinessEngine.calculateScore(demoPersona, true); // true = include debug
  
  console.log(`\nOVERALL READINESS SCORE: ${result.overallScore} / 100`);
  console.log(`READINESS BAND:          ${result.readinessBand}`);
  
  console.log(`\n--- LAYER 1: ARCHETYPE BREAKDOWN ---`);
  if (result.debug && result.debug.factors) {
    result.debug.factors.forEach(f => {
      console.log(`- ${f.name.padEnd(28)} | Score: ${f.score.toString().padEnd(3)} | AHP Wt: ${f.weight.toFixed(4)} | Contrib: ${f.contribution.toFixed(2)}`);
    });
  }
  
  console.log(`\n--- LAYER BREAKDOWN ---`);
  console.log(`Layer 1 (Archetype Score):  ${result.layer1ArchetypeScore} / 100`);
  console.log(`Layer 2 (Financial Score):  ${result.layer2FinancialScore} / 100`);
  console.log(`Layer 3 (Regional Adj):     x${result.layer3RegionalMultiplier.toFixed(2)}`);
  console.log(`Regional Insight:           ${result.regionalExplanation}`);
  
  console.log(`\n--- STRENGTHS ---`);
  result.topPositiveFactors.forEach(f => console.log(`  ✓ ${f}`));
  
  console.log(`\n--- AREAS TO STRENGTHEN ---`);
  result.areasToStrengthen.forEach(f => console.log(`  ! ${f}`));
  
  console.log(`\n--- RECOMMENDED NEXT ACTIONS ---`);
  result.recommendedNextActions.forEach(f => console.log(`  -> ${f}`));
  
  console.log("\n=========================================");
  console.log("Notice: This is an explainable AHP-style model score,");
  console.log("NOT a probability of business success or failure.");
  console.log("=========================================\n");

} catch (error) {
  console.error("Error running demo:", error);
}
