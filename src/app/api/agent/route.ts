import { NextResponse } from 'next/server';
import { runVentureAgent } from '@/lib/agent/orchestrator';
import { AgentInput } from '@/lib/agent/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      idea, 
      location, 
      budget, 
      businessScale, 
      premisesType, 
      experienceLevel, 
      entrepreneurCategory, 
      areaType 
    } = body;

    if (!idea || !location) {
      return NextResponse.json(
        { error: 'Please provide both your enterprise idea and location.' },
        { status: 400 }
      );
    }

    const input: AgentInput = {
      idea: String(idea).trim(),
      location: String(location).trim(),
      budget: Math.max(10000, Number(budget) || 50000),
      businessScale: businessScale || 'Standard Small Commercial Unit',
      premisesType: premisesType || 'Rented Commercial Space',
      experienceLevel: experienceLevel || 'Beginner / First-Time',
      entrepreneurCategory: entrepreneurCategory || 'General',
      areaType: areaType || 'Rural',
    };

    const result = await runVentureAgent(input);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error('Agent Orchestration API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to execute project appraisal agent.' },
      { status: 500 }
    );
  }
}
