export interface FinancialCalculationParams {
  projectCost: number;
  ownContribution: number;
  loanAmount: number;
  interestRate: number; // annual percentage, e.g., 9.5
  tenureMonths: number;
  moratoriumMonths: number;
}

export interface FinancialCalculationResult {
  maxEligibleAmount: number;
  recommendedFinancing: number;
  emi: number;
  totalInterest: number;
  totalRepayment: number;
  moratoriumInterest: number;
  amortizationSchedule: AmortizationRow[];
  readinessScore: number; // 0 - 100
  readinessLabel: 'Excellent' | 'Good' | 'Moderate' | 'High Risk';
  readinessReason: string;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export class FinancialCalculator {
  static calculate(params: FinancialCalculationParams, applicantMonthlyIncome: number, existingObligations: number, maxSchemeLimit?: number): FinancialCalculationResult {
    const { projectCost, ownContribution, loanAmount, interestRate, tenureMonths, moratoriumMonths } = params;

    // Maximum Eligible vs Recommended
    // Max Eligible is theoretically the max scheme limit or project cost - min contribution
    let maxEligibleAmount = projectCost;
    if (maxSchemeLimit && maxSchemeLimit < maxEligibleAmount) {
      maxEligibleAmount = maxSchemeLimit;
    }
    
    // Recommended is based on their requested loan, but capped by what they can afford
    const recommendedFinancing = Math.min(loanAmount, maxEligibleAmount);

    const monthlyRate = (interestRate / 100) / 12;
    let currentBalance = recommendedFinancing;
    let moratoriumInterest = 0;

    // Handle moratorium (simple interest accumulation for this prototype)
    if (moratoriumMonths > 0) {
      moratoriumInterest = currentBalance * monthlyRate * moratoriumMonths;
      currentBalance += moratoriumInterest; // Capitalize interest after moratorium
    }

    const repaymentTenure = tenureMonths - moratoriumMonths;
    let emi = 0;
    if (repaymentTenure > 0) {
      if (monthlyRate > 0) {
        emi = currentBalance * monthlyRate * Math.pow(1 + monthlyRate, repaymentTenure) / (Math.pow(1 + monthlyRate, repaymentTenure) - 1);
      } else {
        emi = currentBalance / repaymentTenure;
      }
    }

    // Amortization Schedule
    const schedule: AmortizationRow[] = [];
    let balance = currentBalance;
    let totalInterest = moratoriumInterest;

    for (let i = 1; i <= repaymentTenure; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;
      
      if (balance < 0) balance = 0;

      totalInterest += interestPayment;

      // Add points every 12 months for chart (or all if short)
      if (repaymentTenure <= 60 || i % 12 === 0 || i === repaymentTenure) {
        schedule.push({
          month: i + moratoriumMonths,
          payment: emi,
          principal: principalPayment,
          interest: interestPayment,
          balance: balance
        });
      }
    }

    const totalRepayment = recommendedFinancing + totalInterest;

    // Financial Readiness Score
    const disposableIncome = applicantMonthlyIncome - existingObligations;
    let readinessScore = 0;
    let readinessLabel: 'Excellent' | 'Good' | 'Moderate' | 'High Risk' = 'High Risk';
    let readinessReason = '';

    if (disposableIncome <= 0 || emi > disposableIncome) {
      readinessScore = 10;
      readinessLabel = 'High Risk';
      readinessReason = 'The calculated EMI exceeds your available monthly disposable income.';
    } else {
      const emiBurden = emi / disposableIncome;
      if (emiBurden <= 0.3) {
        readinessScore = 90;
        readinessLabel = 'Excellent';
        readinessReason = 'EMI is well within safe limits of your disposable income.';
      } else if (emiBurden <= 0.5) {
        readinessScore = 75;
        readinessLabel = 'Good';
        readinessReason = 'EMI is manageable, but consumes a significant portion of income.';
      } else if (emiBurden <= 0.7) {
        readinessScore = 50;
        readinessLabel = 'Moderate';
        readinessReason = 'High EMI burden. Consider increasing tenure or reducing loan amount.';
      } else {
        readinessScore = 30;
        readinessLabel = 'High Risk';
        readinessReason = 'Very high EMI burden. High risk of default.';
      }
    }

    // Adjust score based on own contribution (more skin in the game = better)
    const contributionPct = ownContribution / projectCost;
    if (contributionPct >= 0.2) readinessScore += 10;
    else if (contributionPct < 0.05) readinessScore -= 10;

    readinessScore = Math.min(Math.max(readinessScore, 0), 100);

    return {
      maxEligibleAmount,
      recommendedFinancing,
      emi,
      totalInterest,
      totalRepayment,
      moratoriumInterest,
      amortizationSchedule: schedule,
      readinessScore,
      readinessLabel,
      readinessReason
    };
  }
}
