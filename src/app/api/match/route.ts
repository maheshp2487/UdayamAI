import { NextResponse } from 'next/server';
import { SchemeMatchingEngine } from '@/lib/engine/schemeMatcher';
import { UserProfile, AssessmentInput } from '@/lib/types/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app, map the form data to UserProfile and AssessmentInput properly
    const userProfile: UserProfile = {
      id: 'temp-profile',
      user_id: 'temp-user',
      full_name: body.full_name || 'Applicant',
      age: parseInt(body.age) || 25,
      gender: 'Not Specified',
      category: body.category || 'General',
      annual_family_income: parseFloat(body.annual_family_income) || 0,
      state: body.state || 'Unknown',
      district: 'Unknown',
      pincode: '000000',
      education_status: 'Unknown',
      created_at: new Date().toISOString()
    };

    const assessmentInput: AssessmentInput = {
      id: 'temp-assessment',
      project_type: body.project_type || 'business',
      estimated_project_cost: parseFloat(body.estimated_project_cost) || 0,
      required_loan_amount: parseFloat(body.required_loan_amount) || 0,
      available_own_contribution: parseFloat(body.available_own_contribution) || 0,
      estimated_monthly_income: parseFloat(body.estimated_monthly_income) || 0,
      existing_monthly_obligations: parseFloat(body.existing_monthly_obligations) || 0,
      preferred_repayment_period_months: parseInt(body.preferred_repayment_period_months) || 60,
      created_at: new Date().toISOString()
    };

    const results = await SchemeMatchingEngine.evaluate(userProfile, assessmentInput);
    
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Matching Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to evaluate schemes' }, { status: 500 });
  }
}
