export const READINESS_WEIGHTS = {
  schemeMatch: 35,
  financialReadiness: 30,
  partnerAccess: 20,
  applicationReadiness: 15
};

export function calculateOverallReadiness(
  schemeMatchScore: number,
  financialReadinessScore: number,
  partnerAccessScore: number,
  applicationReadinessScore: number
) {
  const schemeComponent = schemeMatchScore * (READINESS_WEIGHTS.schemeMatch / 100);
  const financialComponent = financialReadinessScore * (READINESS_WEIGHTS.financialReadiness / 100);
  const partnerComponent = partnerAccessScore * (READINESS_WEIGHTS.partnerAccess / 100);
  const applicationComponent = applicationReadinessScore * (READINESS_WEIGHTS.applicationReadiness / 100);

  const totalScore = Math.round(schemeComponent + financialComponent + partnerComponent + applicationComponent);

  return {
    totalScore,
    breakdown: {
      schemeComponent: Math.round(schemeComponent),
      financialComponent: Math.round(financialComponent),
      partnerComponent: Math.round(partnerComponent),
      applicationComponent: Math.round(applicationComponent)
    }
  };
}
