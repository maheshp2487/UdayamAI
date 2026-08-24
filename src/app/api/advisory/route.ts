import { NextResponse } from 'next/server';
import { ViabilityEngine } from '@/lib/advisory/viability-engine';
import { FinancialCalculator } from '@/lib/financial/financial-plan';
import { AssessmentFormData } from '@/types/business';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const assessmentInput: AssessmentFormData = {
      location: body.location || 'Unknown',
      businessCategory: body.businessCategory || 'Retail & Trading',
      marginCapital: parseFloat(body.marginCapital) || 0,
      businessDetails: body.businessDetails || ''
    };

    const viabilityResult = ViabilityEngine.calculate(assessmentInput);
    const financialPlan = FinancialCalculator.calculatePS26091(assessmentInput.marginCapital);
    
    return NextResponse.json({ 
      success: true, 
      viability: viabilityResult,
      financial: financialPlan 
    });
  } catch (error) {
    console.error('Advisory API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate advisory report' }, { status: 500 });
  }
}
