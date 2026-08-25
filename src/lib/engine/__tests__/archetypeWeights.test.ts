import { ARCHETYPE_GLOBAL_WEIGHTS, ARCHETYPE_CATEGORY_WEIGHTS } from "../archetypeWeights";

/**
 * We are not using a heavy test framework like Jest for this simple check.
 * We just run it through tsx/node directly to verify invariants.
 */

export function runWeightTests() {
  let passed = true;
  console.log("=========================================");
  console.log("Running AHP Weight Validation Tests...");
  console.log("=========================================");

  // 1. Verify Category Weights sum to ~1.0
  const catSum = Object.values(ARCHETYPE_CATEGORY_WEIGHTS).reduce((acc, val) => acc + val, 0);
  console.log(`Category weights sum: ${catSum.toFixed(4)}`);
  if (Math.abs(catSum - 1.0) > 0.001) {
    console.error("❌ Category weights do not sum to 1.0!");
    passed = false;
  } else {
    console.log("✅ Category weights sum to 1.0 (approx)");
  }

  // 2. Verify Global Weights sum to ~1.0
  const globalSum = Object.values(ARCHETYPE_GLOBAL_WEIGHTS).reduce((acc, val) => acc + val, 0);
  console.log(`Global weights sum: ${globalSum.toFixed(4)}`);
  if (Math.abs(globalSum - 1.0) > 0.001) {
    console.error("❌ Global weights do not sum to 1.0!");
    passed = false;
  } else {
    console.log("✅ Global weights sum to 1.0 (approx)");
  }

  // 3. Verify Subtotals
  const A_sum = ARCHETYPE_GLOBAL_WEIGHTS.industryExperience + ARCHETYPE_GLOBAL_WEIGHTS.managementExperience + ARCHETYPE_GLOBAL_WEIGHTS.educationLevel;
  const B_sum = ARCHETYPE_GLOBAL_WEIGHTS.recordKeeping + ARCHETYPE_GLOBAL_WEIGHTS.strategicPlanning + ARCHETYPE_GLOBAL_WEIGHTS.professionalAdvice + ARCHETYPE_GLOBAL_WEIGHTS.staffingPlanAdequacy;
  const C_sum = ARCHETYPE_GLOBAL_WEIGHTS.needForAchievement + ARCHETYPE_GLOBAL_WEIGHTS.riskTolerance + ARCHETYPE_GLOBAL_WEIGHTS.selfConfidence;
  const D_sum = ARCHETYPE_GLOBAL_WEIGHTS.familyBusinessBackground + ARCHETYPE_GLOBAL_WEIGHTS.socioculturalSupport;

  console.log(`\nSubtotals vs Categories:`);
  console.log(`Category A (Experience): ${A_sum.toFixed(4)} (Expected: ${ARCHETYPE_CATEGORY_WEIGHTS.experience})`);
  console.log(`Category B (Preparedness): ${B_sum.toFixed(4)} (Expected: ${ARCHETYPE_CATEGORY_WEIGHTS.preparedness})`);
  console.log(`Category C (Psychological): ${C_sum.toFixed(4)} (Expected: ${ARCHETYPE_CATEGORY_WEIGHTS.psychological})`);
  console.log(`Category D (Background): ${D_sum.toFixed(4)} (Expected: ${ARCHETYPE_CATEGORY_WEIGHTS.background})`);

  if (Math.abs(A_sum - ARCHETYPE_CATEGORY_WEIGHTS.experience) > 0.001 ||
      Math.abs(B_sum - ARCHETYPE_CATEGORY_WEIGHTS.preparedness) > 0.001 ||
      Math.abs(C_sum - ARCHETYPE_CATEGORY_WEIGHTS.psychological) > 0.001 ||
      Math.abs(D_sum - ARCHETYPE_CATEGORY_WEIGHTS.background) > 0.001) {
    console.error("❌ Category subtotals do not match hierarchy!");
    passed = false;
  } else {
    console.log("✅ Category subtotals match hierarchy");
  }

  console.log("=========================================");
  if (passed) {
    console.log("✅ ALL AHP WEIGHT TESTS PASSED");
  } else {
    console.error("❌ AHP WEIGHT TESTS FAILED");
    process.exit(1);
  }
}

// If run directly
if (require.main === module) {
  runWeightTests();
}
