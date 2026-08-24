export type SchemeCategory = 'business' | 'education' | 'housing' | 'agriculture' | 'other';
export type PartnerType = 'State Channelizing Agency' | 'Public Sector Bank' | 'Regional Rural Bank' | 'NBFC-MFI';
export type PartnerStatus = 'Available' | 'Limited Capacity' | 'Temporarily Unavailable' | 'High Overdue Flag' | 'Under Review';
export type DocumentType = 'Identity' | 'Income' | 'Category' | 'Bank' | 'Project' | 'Education' | 'Other';

export interface Scheme {
  id: string;
  name: string;
  category: SchemeCategory;
  purpose: string;
  description: string;
  max_loan_amount: number;
  indicative_interest_rate: number; // e.g., 5.0 for 5%
  max_tenure_months: number;
  moratorium_months: number;
  is_active: boolean;
  official_reference: string;
  disclaimer: string;
}

export interface SchemeRule {
  id: string;
  scheme_id: string;
  min_age?: number;
  max_age?: number;
  max_family_income?: number;
  min_own_contribution_pct?: number; // percentage of project cost
  target_categories?: string[];
  target_locations?: string[];
  business_categories?: string[];
}

export interface DocumentRequirement {
  id: string;
  scheme_id: string;
  document_type: DocumentType;
  name: string;
  description: string;
  is_mandatory: boolean;
}

export interface ChannelPartner {
  id: string;
  name: string;
  type: PartnerType;
  address: string;
  district: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
  status: PartnerStatus;
  processing_capacity_pct: number; // 0 to 100
  fund_availability_pct: number; // 0 to 100
}

export interface PartnerSchemeMapping {
  id: string;
  partner_id: string;
  scheme_id: string;
  is_active: boolean;
}

export interface UserProfile {
  id: string;
  user_id: string; // auth uuid
  full_name: string;
  age: number;
  gender: string;
  category: string;
  annual_family_income: number;
  state: string;
  district: string;
  pincode: string;
  education_status: string;
  created_at: string;
}

export interface AssessmentInput {
  id: string;
  user_id?: string;
  project_type: 'business' | 'education';
  business_category?: string;
  estimated_project_cost: number;
  required_loan_amount: number;
  available_own_contribution: number;
  estimated_monthly_income: number;
  existing_monthly_obligations: number;
  preferred_repayment_period_months: number;
  course_details?: string;
  institution_details?: string;
  created_at: string;
}

export interface ScoreBreakdown {
  eligibility: number;
  requirement_fit: number;
  affordability: number;
  loan_limit_fit: number;
}

export interface SchemeMatchResult {
  scheme: Scheme;
  match_percentage: number;
  is_eligible: boolean;
  score_breakdown: ScoreBreakdown;
  eligibility_breakdown: {
    income_requirement: 'PASS' | 'FAIL' | 'N/A';
    loan_requirement: 'PASS' | 'FAIL' | 'N/A';
    project_cost: 'PASS' | 'FAIL' | 'N/A';
    location: 'PASS' | 'FAIL' | 'N/A';
    profile_conditions: 'PASS' | 'FAIL' | 'N/A';
  };
  rejection_reasons?: string[];
  recommendation_reason: string;
}

export interface PartnerSuitabilityScore {
  scheme_support: number;
  fund_availability: number;
  distance: number;
  operational_status: number;
  processing_capacity: number;
}

export interface PartnerMatchResult {
  partner: ChannelPartner;
  distance_km: number;
  total_score: number;
  score_breakdown: PartnerSuitabilityScore;
  recommendation_reason: string;
}
