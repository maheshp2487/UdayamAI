import { ViabilityScore } from "../../types/advisory";
import { AssessmentFormData } from "../../types/business";

export class ViabilityEngine {
  static calculate(data: AssessmentFormData): ViabilityScore {
    // Deterministic fallback based on category and margin
    const isDairy = data.businessCategory.includes("Dairy");
    const isRetail = data.businessCategory.includes("Retail");
    const isTextile = data.businessCategory.includes("Textile");
    const isHighRisk = data.businessDetails?.toLowerCase().includes("high saturation") || data.marginCapital > 300000 && data.businessCategory === "Services";

    let md = isDairy ? 90 : isRetail ? 85 : 75;
    let comp = isDairy ? 80 : isRetail ? 60 : 70;
    let fin = data.marginCapital > 15000 ? 85 : 60;
    let ops = isDairy ? 70 : isTextile ? 80 : 75;
    let fit = isDairy ? 95 : isRetail ? 90 : 80;

    if (isHighRisk) {
      md = 40; comp = 30; fin = 50; ops = 40; fit = 45;
    }

    // Weights:
    // Market Demand: 25%
    // Competition & Saturation: 20%
    // Financial Feasibility: 25%
    // Operational Risk: 15%
    // Local Fit: 15%

    const total = Math.round(
      (md * 0.25) + 
      (comp * 0.20) + 
      (fin * 0.25) + 
      (ops * 0.15) + 
      (fit * 0.15)
    );

    let label: ViabilityScore['label'] = 'High Risk';
    if (total >= 80) label = 'Excellent';
    else if (total >= 65) label = 'Promising';
    else if (total >= 50) label = 'Moderate';

    return {
      total,
      label,
      breakdown: {
        marketDemand: md,
        competition: comp,
        financialFeasibility: fin,
        operationalRisk: ops,
        localFit: fit
      }
    };
  }
}
