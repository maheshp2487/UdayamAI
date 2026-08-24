import { Scheme, SchemeRule, AssessmentInput, SchemeMatchResult, UserProfile, ScoreBreakdown } from '../types/schema';
import { Repository } from '../data/repository';

export class SchemeMatchingEngine {
  
  static async evaluate(userProfile: UserProfile, assessment: AssessmentInput): Promise<SchemeMatchResult[]> {
    const schemes = await Repository.getSchemes();
    const results: SchemeMatchResult[] = [];

    for (const scheme of schemes) {
      if (!scheme.is_active) continue;

      const rules = await Repository.getSchemeRules(scheme.id);
      if (!rules) continue;

      const eligibilityBreakdown = this.checkEligibility(scheme, rules, userProfile, assessment);
      const isEligible = Object.values(eligibilityBreakdown).every(status => status === 'PASS' || status === 'N/A');
      
      const scoreBreakdown = this.calculateScores(scheme, rules, userProfile, assessment, isEligible);
      const totalScore = (scoreBreakdown.eligibility * 0.35) + 
                         (scoreBreakdown.requirement_fit * 0.25) + 
                         (scoreBreakdown.affordability * 0.20) + 
                         (scoreBreakdown.loan_limit_fit * 0.20);
                         
      // Generate reasons
      const rejectionReasons: string[] = [];
      if (eligibilityBreakdown.income_requirement === 'FAIL') rejectionReasons.push('Family income exceeds the scheme limits.');
      if (eligibilityBreakdown.loan_requirement === 'FAIL') rejectionReasons.push('Required loan amount exceeds scheme limits.');
      if (eligibilityBreakdown.project_cost === 'FAIL') rejectionReasons.push('Project cost does not meet scheme contribution requirements.');
      if (eligibilityBreakdown.profile_conditions === 'FAIL') rejectionReasons.push('Profile conditions (age, category) do not match.');

      let recommendationReason = '';
      if (isEligible) {
        if (totalScore >= 80) recommendationReason = 'Excellent match for your financial profile and project requirements.';
        else if (totalScore >= 60) recommendationReason = 'Good match, fits your basic requirements and eligibility criteria.';
        else recommendationReason = 'Moderate match, meets baseline eligibility but might require adjustments to your financial plan.';
      } else {
        recommendationReason = 'Does not meet eligibility criteria.';
      }

      results.push({
        scheme,
        match_percentage: Math.round(totalScore),
        is_eligible: isEligible,
        score_breakdown: scoreBreakdown,
        eligibility_breakdown: eligibilityBreakdown,
        rejection_reasons: rejectionReasons.length > 0 ? rejectionReasons : undefined,
        recommendation_reason: recommendationReason
      });
    }

    // Sort by match percentage descending
    return results.sort((a, b) => b.match_percentage - a.match_percentage);
  }

  private static checkEligibility(scheme: Scheme, rules: SchemeRule, profile: UserProfile, assessment: AssessmentInput) {
    return {
      income_requirement: rules.max_family_income ? (profile.annual_family_income <= rules.max_family_income ? 'PASS' : 'FAIL') : 'N/A',
      loan_requirement: scheme.max_loan_amount ? (assessment.required_loan_amount <= scheme.max_loan_amount ? 'PASS' : 'FAIL') : 'N/A',
      project_cost: rules.min_own_contribution_pct ? ((assessment.available_own_contribution / assessment.estimated_project_cost) * 100 >= rules.min_own_contribution_pct ? 'PASS' : 'FAIL') : 'N/A',
      location: rules.target_locations ? (rules.target_locations.includes('rural') || rules.target_locations.includes('urban') ? 'PASS' : 'FAIL') : 'N/A', // Simplified for demo
      profile_conditions: this.checkProfileConditions(rules, profile)
    } as const;
  }

  private static checkProfileConditions(rules: SchemeRule, profile: UserProfile): 'PASS' | 'FAIL' | 'N/A' {
    if (rules.min_age && profile.age < rules.min_age) return 'FAIL';
    if (rules.max_age && profile.age > rules.max_age) return 'FAIL';
    if (rules.target_categories && !rules.target_categories.includes(profile.category)) return 'FAIL';
    return 'PASS';
  }

  private static calculateScores(scheme: Scheme, rules: SchemeRule, profile: UserProfile, assessment: AssessmentInput, isEligible: boolean): ScoreBreakdown {
    if (!isEligible) {
      return { eligibility: 0, requirement_fit: 0, affordability: 0, loan_limit_fit: 0 };
    }

    // Requirement fit (Category match)
    const requirementFit = scheme.category === assessment.project_type ? 100 : 50;

    // Loan limit fit (How close the requirement is to max limit without exceeding)
    let loanLimitFit = 100;
    if (scheme.max_loan_amount) {
      const ratio = assessment.required_loan_amount / scheme.max_loan_amount;
      if (ratio > 1) loanLimitFit = 0;
      else if (ratio < 0.2) loanLimitFit = 60; // Requesting very little from a high limit scheme
      else loanLimitFit = 100;
    }

    // Affordability calculation (Basic heuristic: monthly income vs est EMI)
    // Roughly estimate EMI: P * r * (1+r)^n / ((1+r)^n - 1)
    const principal = assessment.required_loan_amount;
    const monthlyRate = (scheme.indicative_interest_rate / 100) / 12;
    const tenure = scheme.max_tenure_months || 60;
    
    let emi = 0;
    if (monthlyRate > 0) {
      emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
    } else {
      emi = principal / tenure;
    }

    // Safe EMI should be < 50% of (estimated_monthly_income - existing_obligations)
    const disposableIncome = assessment.estimated_monthly_income - assessment.existing_monthly_obligations;
    let affordability = 100;
    if (disposableIncome <= 0 || emi > disposableIncome) {
      affordability = 0;
    } else {
      const burden = emi / disposableIncome;
      affordability = burden < 0.3 ? 100 : burden < 0.5 ? 80 : 40;
    }

    return {
      eligibility: 100, // already passed
      requirement_fit: requirementFit,
      affordability: affordability,
      loan_limit_fit: loanLimitFit
    };
  }
}
