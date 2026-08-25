// ============================================================
// Regional Ecosystem Index (Layer 3 of Journey Readiness Score)
// ============================================================
// REPRESENTATIVE DEMO VALUES
// Derived from:
// - Udyam district-level MSME density
// - DPIIT State Startup Ranking
// - NITI Aayog India Innovation Index
// 
// Note: These are not live-fetched. Replace with a live data 
// pipeline from data.gov.in and API Setu post-hackathon.

export interface RegionalEcosystem {
  state: string;
  // All dimensions scored 0 to 10
  entrepreneurialCulture: number;
  financeAccess: number;
  humanCapital: number;
  innovationCapacity: number;
  institutionalSupport: number;
}

export const REGIONAL_ECOSYSTEM_DATA: Record<string, RegionalEcosystem> = {
  "Uttar Pradesh": {
    state: "Uttar Pradesh",
    entrepreneurialCulture: 7.5,
    financeAccess: 6.0,
    humanCapital: 6.5,
    innovationCapacity: 5.5,
    institutionalSupport: 7.0,
  },
  "Maharashtra": {
    state: "Maharashtra",
    entrepreneurialCulture: 9.0,
    financeAccess: 8.5,
    humanCapital: 8.0,
    innovationCapacity: 8.5,
    institutionalSupport: 8.0,
  },
  "Tamil Nadu": {
    state: "Tamil Nadu",
    entrepreneurialCulture: 8.5,
    financeAccess: 8.0,
    humanCapital: 9.0,
    innovationCapacity: 8.0,
    institutionalSupport: 8.5,
  },
  "Bihar": {
    state: "Bihar",
    entrepreneurialCulture: 6.0,
    financeAccess: 5.0,
    humanCapital: 5.5,
    innovationCapacity: 4.5,
    institutionalSupport: 5.0,
  },
  "Gujarat": {
    state: "Gujarat",
    entrepreneurialCulture: 9.5,
    financeAccess: 8.5,
    humanCapital: 7.5,
    innovationCapacity: 8.0,
    institutionalSupport: 8.5,
  },
  "Karnataka": {
    state: "Karnataka",
    entrepreneurialCulture: 8.5,
    financeAccess: 8.0,
    humanCapital: 9.0,
    innovationCapacity: 9.5,
    institutionalSupport: 8.0,
  }
};

/**
 * Calculates a regional ecosystem multiplier (bounded ±15%) based on the state.
 * @param stateName The state of the applicant.
 * @returns A number between 0.85 and 1.15. Returns 1.0 if state is not found.
 */
export function getRegionalAdjustment(stateName: string): { multiplier: number; explanation: string } {
  const data = REGIONAL_ECOSYSTEM_DATA[stateName];
  if (!data) {
    return { multiplier: 1.0, explanation: "Neutral regional ecosystem baseline applied (data not available for state)." };
  }

  // Calculate average out of 10
  const avg = (data.entrepreneurialCulture + data.financeAccess + data.humanCapital + data.innovationCapacity + data.institutionalSupport) / 5;
  
  // Normalize avg (0 to 10) to a ±15% bound. 
  // Let 5.0 be neutral (1.0). 10.0 is max (+15% -> 1.15). 0.0 is min (-15% -> 0.85).
  // Formula: 1.0 + ((avg - 5) / 5) * 0.15
  
  const adjustment = ((avg - 5) / 5) * 0.15;
  const multiplier = 1.0 + adjustment;
  
  let explanation = "";
  if (multiplier > 1.05) {
    explanation = `Strong regional support system in ${stateName} provides a favorable environment for MSME growth.`;
  } else if (multiplier < 0.95) {
    explanation = `Regional ecosystem in ${stateName} presents some structural challenges; extra resilience and planning recommended.`;
  } else {
    explanation = `Moderate regional ecosystem in ${stateName}; standard operating environment.`;
  }

  return { multiplier, explanation };
}
