"use client";

import { useState, useEffect } from "react";
import { FinancialCalculator, FinancialCalculationResult } from "@/lib/engine/financialCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";

export default function FinancialPlanner() {
  const [projectCost, setProjectCost] = useState(500000);
  const [ownContribution, setOwnContribution] = useState(50000);
  const [loanAmount, setLoanAmount] = useState(450000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenureMonths, setTenureMonths] = useState(60);
  const [moratoriumMonths, setMoratoriumMonths] = useState(0);
  
  const [monthlyIncome, setMonthlyIncome] = useState(40000);
  const [existingObligations, setExistingObligations] = useState(0);

  const [result, setResult] = useState<FinancialCalculationResult | null>(null);

  useEffect(() => {
    // Keep loan amount in sync if project cost or contribution changes in a basic way
    // For manual what-if, we just recalculate based on current state
    const res = FinancialCalculator.calculate(
      { projectCost, ownContribution, loanAmount, interestRate, tenureMonths, moratoriumMonths },
      monthlyIncome,
      existingObligations,
      10000000 // Fake scheme max limit for demo
    );
    setResult(res);
  }, [projectCost, ownContribution, loanAmount, interestRate, tenureMonths, moratoriumMonths, monthlyIncome, existingObligations]);

  const pieData = result ? [
    { name: 'Principal', value: result.recommendedFinancing },
    { name: 'Interest', value: result.totalInterest }
  ] : [];
  const COLORS = ['#2563eb', '#f59e0b']; // primary blue and amber

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Financial Planner & What-If Simulator</h1>
        <p className="text-lg text-slate-600">Simulate different scenarios to understand your EMIs, interest burden, and overall financial readiness before applying.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Project Cost (₹)</Label>
                  <span className="text-sm font-medium">₹{(projectCost / 100000).toFixed(2)} L</span>
                </div>
                <Slider min={50000} max={10000000} step={50000} value={[projectCost]} onValueChange={(v: any) => setProjectCost(Array.isArray(v) ? v[0] : v)} />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Own Contribution (₹)</Label>
                  <span className="text-sm font-medium">₹{(ownContribution / 100000).toFixed(2)} L</span>
                </div>
                <Slider min={0} max={projectCost} step={10000} value={[ownContribution]} onValueChange={(v: any) => setOwnContribution(Array.isArray(v) ? v[0] : v)} />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Required Loan (₹)</Label>
                  <span className="text-sm font-medium text-primary">₹{(loanAmount / 100000).toFixed(2)} L</span>
                </div>
                <Slider min={10000} max={projectCost} step={10000} value={[loanAmount]} onValueChange={(v: any) => setLoanAmount(Array.isArray(v) ? v[0] : v)} />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Interest Rate (% p.a.)</Label>
                  <span className="text-sm font-medium">{interestRate}%</span>
                </div>
                <Slider min={0} max={24} step={0.1} value={[interestRate]} onValueChange={(v: any) => setInterestRate(Array.isArray(v) ? v[0] : v)} />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Tenure (Months)</Label>
                  <span className="text-sm font-medium">{tenureMonths} mo</span>
                </div>
                <Slider min={12} max={120} step={6} value={[tenureMonths]} onValueChange={(v: any) => setTenureMonths(Array.isArray(v) ? v[0] : v)} />
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <Label>Estimated Monthly Income (₹)</Label>
                <Input type="number" value={monthlyIncome} onChange={e => setMonthlyIncome(Number(e.target.value))} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {result && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-slate-50 border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-slate-700">Estimated EMI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-slate-900">₹{Math.round(result.emi).toLocaleString()}</p>
                    <p className="text-sm text-slate-500 mt-1">per month for {tenureMonths - moratoriumMonths} months</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-slate-50 border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-slate-700 flex justify-between">
                      Financial Readiness
                      <Badge variant={result.readinessLabel === 'Excellent' || result.readinessLabel === 'Good' ? 'outline' : 'destructive'} 
                             className={result.readinessLabel === 'Excellent' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}>
                        {result.readinessLabel}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700">{result.readinessReason}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Repayment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => `₹${Math.round(value as number).toLocaleString()}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-full mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Principal Amount:</span>
                        <span className="font-medium">₹{Math.round(result.recommendedFinancing).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total Interest:</span>
                        <span className="font-medium text-amber-600">₹{Math.round(result.totalInterest).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-semibold">
                        <span>Total Repayment:</span>
                        <span>₹{Math.round(result.totalRepayment).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Max Eligible vs Recommended</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Max Eligible (Scheme Limit)</span>
                        <span className="text-sm font-bold">₹{(result.maxEligibleAmount / 100000).toFixed(2)} L</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 w-full"></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Theoretical limit based on scheme rules.</p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-primary">Recommended Financing</span>
                        <span className="text-sm font-bold text-primary">₹{(result.recommendedFinancing / 100000).toFixed(2)} L</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(result.recommendedFinancing / result.maxEligibleAmount) * 100}%` }}></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Safest borrowing limit considering your project cost and repayment capacity.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
