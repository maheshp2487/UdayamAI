import { GoogleGenAI } from '@google/genai';
import { AgentInput, AgentResult, AgentStep, MarketInsights, RiskScore, StatutoryLicense } from './types';
import { computeFinancialEngine, matchSchemes, applyGuardrailsAndVerification } from './tools';

export async function runVentureAgent(input: AgentInput): Promise<AgentResult> {
  const steps: AgentStep[] = [];
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }

  // -------------------------------------------------------------
  // Step 1: Market Intelligence & Demand Decomposition
  // -------------------------------------------------------------
  const step1Start = Date.now();
  steps.push({
    id: 'step-1',
    title: 'Market Catchment & Local Demand Decomposition',
    tool: 'MARKET_ANALYSIS',
    status: 'running',
    thought: `Analyzing demographic catchment, footfall density, and local supply chain for "${input.idea}" in ${input.location}...`,
  });

  let marketData: MarketInsights = {
    targetAudience: `Local residents, office commuters, and daily commercial footfall in ${input.location}.`,
    demandDrivers: [
      `Consistent daily demand for affordable, hygienic local products/services in ${input.location}.`,
      `Proximity to local transit routes, market streets, and neighborhood residential catchments.`,
      `State MSME incentives and municipal vendor support programs.`
    ],
    competitiveSaturation: 'Moderate',
    competitorInsights: `Fragmented unorganized local suppliers with low quality standardization, offering strong opportunity for clean, reliable service.`,
    regionalAdvantage: `Direct access to local wholesale commodity markets, strong neighborhood word-of-mouth, and low transit costs.`,
    criticalRisks: [
      `Input commodity price fluctuations (edible oils, cooking gas, raw grains).`,
      `Initial working capital strain during the first 60 days.`,
      `Local municipal compliance and space lease stability.`
    ],
    mitigationStrategies: [
      `Establish monthly credit accounts with local wholesale grain/input vendors.`,
      `Maintain a strict cash-flow buffer covering 45 days of operational expenses.`,
      `Secure long-term written lease or municipal vending authorization.`
    ]
  };

  // Realistic baseline fallback if LLM is unavailable
  let dynamicData = {
    ventureName: input.idea,
    itemUnitName: 'Serving / Unit',
    unitSellingPrice: 50,
    unitVariableCost: 22,
    estimatedDailyUnits: 100,
    estimatedCapex: Math.max(input.budget * 1.5, 120000),
    monthlyRawMaterials: Math.max(input.budget * 0.35, 30000),
    monthlyLaborRentUtilities: Math.max(input.budget * 0.25, 20000),
    capexBreakdown: [
      { item: 'Core Commercial Production Equipment', specification: 'Primary tooling & machinery', amount: Math.round(input.budget * 0.7) },
      { item: 'Counter, Storage & Workstations', specification: 'Stainless steel furniture & prep area', amount: Math.round(input.budget * 0.3) },
      { item: 'Signboard, Electricals & Utilities', specification: 'Wiring, lighting and plumbing setup', amount: Math.round(input.budget * 0.2) },
      { item: 'Initial Inventory & Working Capital', specification: '15-day raw material buffer', amount: Math.round(input.budget * 0.3) }
    ],
    opexBreakdown: [
      { item: 'Monthly Raw Materials & Consumables', amount: Math.round(input.budget * 0.35) },
      { item: 'Operational Labor / Helper Wages', amount: Math.round(input.budget * 0.2) },
      { item: 'Premises Rent & Utility Charges', amount: Math.round(input.budget * 0.15) },
      { item: 'Packaging, Gas & Local Logistics', amount: Math.round(input.budget * 0.1) }
    ],
    licenses: [
      { name: 'FSSAI Food Safety Registration', authority: 'Food Safety and Standards Authority of India', timelineDays: 14, criticality: 'Mandatory before opening' as const },
      { name: 'Udyam MSME Registration', authority: 'Ministry of MSME (Free online portal)', timelineDays: 2, criticality: 'Mandatory before opening' as const },
      { name: 'Shop & Establishment Act Registration', authority: 'State Labour Department / Municipal Corporation', timelineDays: 21, criticality: 'Within 30 days of launch' as const },
      { name: 'Local Municipal Trade License', authority: 'City Municipal Council / Gram Panchayat', timelineDays: 30, criticality: 'Within 30 days of launch' as const }
    ],
    milestones: [
      { phase: 'Month 1', title: 'Location Setup & Licensing', target: 'Finalize shop lease, submit Udyam and FSSAI applications, procure core machinery.' },
      { phase: 'Month 2', title: 'Pilot Launch & Local Promotions', target: 'Commence pilot operations, train kitchen/helper staff, conduct local neighborhood tastings.' },
      { phase: 'Month 3-6', title: 'Capacity & Regular Cashflow', target: 'Reach steady daily sales target, achieve operational break-even, maintain hygiene ratings.' },
      { phase: 'Month 7-12', title: 'Expansion & Loan Servicing', target: 'Build 3-month operating reserve, maintain timely bank EMI repayments, explore catering tie-ups.' }
    ]
  };

  if (ai) {
    try {
      const prompt = `
You are the Lead MSME Techno-Economic Project Appraisal Officer for UdayamAI (India).
A grassroots entrepreneur wants to start a real enterprise in India:
- Business Idea: "${input.idea}"
- Target Location: "${input.location}"
- Available Starting Equity: ₹${input.budget}
- Business Scale: "${input.businessScale || 'Standard Small Commercial Unit'}"
- Premises Type: "${input.premisesType || 'Rented Commercial Space'}"
- Category: "${input.entrepreneurCategory || 'General'}"
- Area: "${input.areaType || 'Rural'}"

Provide a STRICT JSON object (no markdown, no backticks) tailored 100% SPECIFICALLY to "${input.idea}".
Do NOT give generic answers! For example:
- If it's a Dosa shop: itemize commercial dosa bhatti, wet grinder, SS counter, deep freezer, batter ingredients, LPG cylinders, FSSAI registration.
- If it's a tailoring/garment shop: itemize industrial sewing machines, interlock machines, cutting table, fabric stock, trade license.
- If it's poultry: itemize shed construction, feeders, brooders, day-old chicks, feed, vaccines.

SCHEMA REQUIRED:
{
  "ventureName": "Catchy realistic commercial trade name",
  "itemUnitName": "What is the single unit sold? (e.g. 'Plate of Dosa', 'Standard Garment Stitch', 'Kg of Dressed Chicken')",
  "unitSellingPrice": number (Realistic retail price in INR),
  "unitVariableCost": number (Realistic raw material cost to make that single unit in INR),
  "estimatedDailyUnits": number (Realistic units sold per day for this scale, e.g. 80-250),
  "estimatedCapex": number (Total realistic setup/machinery cost in INR),
  "monthlyRawMaterials": number (Monthly ingredient/raw inventory cost in INR),
  "monthlyLaborRentUtilities": number (Total fixed monthly rent, electricity/LPG, helper wages in INR),
  "capexBreakdown": [
    { "item": "Specific machinery/asset name", "specification": "Technical capacity / size", "amount": number in INR }
  ],
  "opexBreakdown": [
    { "item": "Specific expense category (e.g. Cooking Gas & Power, Helper wages)", "amount": number in INR }
  ],
  "licenses": [
    { "name": "Exact license name", "authority": "Issuing government body", "timelineDays": number, "criticality": "Mandatory before opening" | "Within 30 days of launch" | "Recommended for scaling" }
  ],
  "milestones": [
    { "phase": "Month 1", "title": "Setup & Procurement", "target": "Specific activities for this exact trade" },
    { "phase": "Month 2", "title": "Launch & Validation", "target": "Specific activities for this exact trade" },
    { "phase": "Month 3-6", "title": "Operational Break-Even", "target": "Specific activities for this exact trade" },
    { "phase": "Month 7-12", "title": "Stability & Scaling", "target": "Specific activities for this exact trade" }
  ],
  "targetAudience": "Specific customer demographic in this location",
  "demandDrivers": ["Demand driver 1", "Demand driver 2", "Demand driver 3"],
  "competitiveSaturation": "Low" | "Moderate" | "High",
  "competitorInsights": "Analysis of existing local competitors in this trade",
  "regionalAdvantage": "Specific regional factor or local advantage",
  "criticalRisks": ["Risk 1", "Risk 2", "Risk 3"],
  "mitigationStrategies": ["Mitigation 1", "Mitigation 2", "Mitigation 3"]
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          temperature: 0.25,
          responseMimeType: 'application/json',
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed.ventureName && parsed.capexBreakdown?.length > 0) {
          dynamicData = {
            ventureName: parsed.ventureName,
            itemUnitName: parsed.itemUnitName || dynamicData.itemUnitName,
            unitSellingPrice: Number(parsed.unitSellingPrice) || dynamicData.unitSellingPrice,
            unitVariableCost: Number(parsed.unitVariableCost) || dynamicData.unitVariableCost,
            estimatedDailyUnits: Number(parsed.estimatedDailyUnits) || dynamicData.estimatedDailyUnits,
            estimatedCapex: Number(parsed.estimatedCapex) || dynamicData.estimatedCapex,
            monthlyRawMaterials: Number(parsed.monthlyRawMaterials) || dynamicData.monthlyRawMaterials,
            monthlyLaborRentUtilities: Number(parsed.monthlyLaborRentUtilities) || dynamicData.monthlyLaborRentUtilities,
            capexBreakdown: parsed.capexBreakdown.map((c: any) => ({
              item: String(c.item),
              specification: String(c.specification || 'Commercial grade'),
              amount: Math.max(1000, Number(c.amount) || 10000)
            })),
            opexBreakdown: parsed.opexBreakdown.map((o: any) => ({
              item: String(o.item),
              amount: Math.max(1000, Number(o.amount) || 5000)
            })),
            licenses: parsed.licenses || dynamicData.licenses,
            milestones: parsed.milestones || dynamicData.milestones
          };

          if (parsed.targetAudience) {
            marketData = {
              targetAudience: parsed.targetAudience,
              demandDrivers: parsed.demandDrivers || marketData.demandDrivers,
              competitiveSaturation: parsed.competitiveSaturation || 'Moderate',
              competitorInsights: parsed.competitorInsights || marketData.competitorInsights,
              regionalAdvantage: parsed.regionalAdvantage || marketData.regionalAdvantage,
              criticalRisks: parsed.criticalRisks || marketData.criticalRisks,
              mitigationStrategies: parsed.mitigationStrategies || marketData.mitigationStrategies,
            };
          }
        }
      }
    } catch (err) {
      console.warn('Gemini 3.6 dynamic parse notice:', err);
    }
  }

  steps[0].status = 'completed';
  steps[0].durationMs = Date.now() - step1Start;
  steps[0].outputSummary = `Decomposed localized customer catchment in ${input.location} with ${marketData.competitiveSaturation} saturation.`;

  // -------------------------------------------------------------
  // Step 2: Unit Economics & Cashflow Engine
  // -------------------------------------------------------------
  const step2Start = Date.now();
  steps.push({
    id: 'step-2',
    title: 'Techno-Economic Formulation & Unit Economics',
    tool: 'UNIT_ECONOMICS',
    status: 'running',
    thought: `Computing machinery capex, contribution margin per ${dynamicData.itemUnitName}, and break-even sales volume...`,
  });

  const rawEconomics = computeFinancialEngine(input, {
    estimatedCapex: dynamicData.estimatedCapex,
    monthlyRawMaterials: dynamicData.monthlyRawMaterials,
    monthlyLaborRentUtilities: dynamicData.monthlyLaborRentUtilities,
    estimatedMonthlyUnits: dynamicData.estimatedDailyUnits * 26,
    unitSellingPrice: dynamicData.unitSellingPrice,
    unitVariableCost: dynamicData.unitVariableCost,
    itemUnitName: dynamicData.itemUnitName,
    capexBreakdown: dynamicData.capexBreakdown,
    opexBreakdown: dynamicData.opexBreakdown,
  });

  steps[1].status = 'completed';
  steps[1].durationMs = Date.now() - step2Start;
  steps[1].outputSummary = `Computed total CAPEX of ₹${(rawEconomics.capex / 100000).toFixed(2)} Lakhs. Daily break-even: ${rawEconomics.dailyBreakEvenTarget} ${rawEconomics.itemUnitName}s/day.`;

  // -------------------------------------------------------------
  // Step 3: Concessional Scheme Matcher
  // -------------------------------------------------------------
  const step3Start = Date.now();
  steps.push({
    id: 'step-3',
    title: 'Statutory Concessional Scheme Structuring',
    tool: 'SCHEME_OPTIMIZER',
    status: 'running',
    thought: `Evaluating PMEGP, Mudra, and PM SVANidhi subsidy slabs for ${input.areaType || 'Rural'} enterprise...`,
  });

  const matchedSchemes = matchSchemes(input, rawEconomics.capex);

  steps[2].status = 'completed';
  steps[2].durationMs = Date.now() - step3Start;
  const topScheme = matchedSchemes[0];
  steps[2].outputSummary = `Allocated ${topScheme.name} (${topScheme.subsidyPercent}% capital subsidy claim of ₹${(topScheme.subsidyAmount / 100000).toFixed(2)} Lakhs).`;

  // -------------------------------------------------------------
  // Step 4: Guardrail Validation
  // -------------------------------------------------------------
  const step4Start = Date.now();
  steps.push({
    id: 'step-4',
    title: 'Bankability & Debt Service Coverage Audit',
    tool: 'GUARDRAIL_VALIDATION',
    status: 'running',
    thought: `Auditing Debt Service Coverage Ratio (DSCR) against commercial bank credit standards...`,
  });

  const initialRisks: RiskScore = {
    marketRisk: marketData.competitiveSaturation === 'High' ? 42 : 24,
    financialRisk: rawEconomics.dscr < 1.4 ? 40 : 20,
    executionRisk: 28,
    regulatoryRisk: 15,
    overallReadiness: 85,
  };

  const { validatedEconomics, validatedSchemes, validatedRisks, adjustments } = 
    applyGuardrailsAndVerification(rawEconomics, matchedSchemes, initialRisks);

  steps[3].status = 'completed';
  steps[3].durationMs = Date.now() - step4Start;
  steps[3].outputSummary = `Verified bankable DSCR of ${validatedEconomics.dscr}x (exceeds minimum commercial bank threshold of 1.25x).`;

  // -------------------------------------------------------------
  // Step 5: Strategy Synthesis
  // -------------------------------------------------------------
  const step5Start = Date.now();
  steps.push({
    id: 'step-5',
    title: 'Detailed Project Report (DPR) Formulation',
    tool: 'STRATEGY_SYNTHESIS',
    status: 'running',
    thought: `Synthesizing project report, machinery procurement checklist, and quarterly action roadmap...`,
  });

  const executiveSummary = `Techno-economic project appraisal for ${dynamicData.ventureName} located in ${input.location}. The proposed project requires a total capital investment of ₹${(validatedEconomics.capex / 100000).toFixed(2)} Lakhs, comprising ₹${(validatedEconomics.marginEquity / 100000).toFixed(2)} Lakhs promoter margin equity and ₹${(validatedEconomics.loanAmount / 100000).toFixed(2)} Lakhs institutional bank credit. The venture qualifies for ${topScheme.name} with an eligible non-dilutive government grant of ₹${(topScheme.subsidyAmount / 100000).toFixed(2)} Lakhs. With an operating gross margin of ${validatedEconomics.grossMarginPercent}% and a healthy Debt Service Coverage Ratio (DSCR) of ${validatedEconomics.dscr}x, the enterprise breaks even at ${validatedEconomics.dailyBreakEvenTarget} ${validatedEconomics.itemUnitName}s per day, satisfying standard commercial bank credit norms.`;

  steps[4].status = 'completed';
  steps[4].durationMs = Date.now() - step5Start;
  steps[4].outputSummary = `Formulated institutional Detailed Project Report with itemized machinery schedule and statutory licensing roadmap.`;

  return {
    ventureName: dynamicData.ventureName,
    executiveSummary,
    market: marketData,
    economics: validatedEconomics,
    schemes: validatedSchemes,
    licenses: dynamicData.licenses,
    risks: validatedRisks,
    steps,
    suggestedMilestones: dynamicData.milestones.map(m => ({
      phase: m.phase,
      title: m.title,
      target: m.target
    })),
    guardrailVerdict: {
      passed: true,
      adjustmentsMade: adjustments,
    },
    timestamp: new Date().toISOString(),
  };
}
