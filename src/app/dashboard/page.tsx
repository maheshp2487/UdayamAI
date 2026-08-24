"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { calculateOverallReadiness, READINESS_WEIGHTS } from "@/lib/engine/overallReadiness";

export default function UserDashboard() {
  const [mounted, setMounted] = useState(false);
  const [appReadinessScore, setAppReadinessScore] = useState(80); // document readiness mock

  // Mock scores for demo
  const schemeMatchScore = 92;
  const financialReadinessScore = 90;
  const partnerAccessScore = 85;
  
  const overallReadiness = calculateOverallReadiness(
    schemeMatchScore,
    financialReadinessScore,
    partnerAccessScore,
    appReadinessScore
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Dashboard</h1>
          <p className="text-slate-600 mt-1">Track your progress and manage your application readiness.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border shadow-sm">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
            JD
          </div>
          <span className="font-medium text-sm">John Doe</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Progress Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-primary/5 pb-4 border-b">
              <CardTitle className="text-lg">Overall Journey Readiness</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-emerald-100">
                  <div className="absolute inset-0 rounded-full border-8 border-emerald-500" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${overallReadiness.totalScore}%, 0 ${overallReadiness.totalScore}%)` }}></div>
                  <span className="text-3xl font-bold text-slate-900 z-10">{overallReadiness.totalScore}%</span>
                </div>
              </div>
              <p className="text-sm text-center text-slate-600 mb-6">You are almost ready to apply.</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheme Match ({READINESS_WEIGHTS.schemeMatch}%)</span>
                  <span className="font-medium">+{overallReadiness.breakdown.schemeComponent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Financial ({READINESS_WEIGHTS.financialReadiness}%)</span>
                  <span className="font-medium">+{overallReadiness.breakdown.financialComponent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Partner Access ({READINESS_WEIGHTS.partnerAccess}%)</span>
                  <span className="font-medium">+{overallReadiness.breakdown.partnerComponent}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>App Readiness ({READINESS_WEIGHTS.applicationReadiness}%)</span>
                  <span>+{overallReadiness.breakdown.applicationComponent}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Actionable Roadmap */}
          <Card>
            <CardHeader className="pb-4 border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Personalized Roadmap</CardTitle>
                <Badge>Next Steps</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Prepare Required Documents</h3>
                  <p className="text-slate-600 text-sm mb-4">You have selected the NSFDC Term Loan scheme. To proceed, gather the mandatory documents listed in your checklist.</p>
                  
                  <div className="flex items-center gap-4 mb-2 text-sm font-medium">
                    <span>Application Document Readiness</span>
                    <span className="text-primary">{appReadinessScore}%</span>
                  </div>
                  <Progress value={appReadinessScore} className="h-2 mb-4" />
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="lg" asChild>
                    <Link href="#checklist">Review Checklist</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/report">Download Full Report</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Selected Scheme */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex justify-between">
                  Selected Scheme
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" asChild>
                    <Link href="/assessment/results">Change</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-slate-900 mb-1">NSFDC Term Loan Scheme</div>
                <div className="text-sm text-slate-500 mb-4">Recommended Loan: ₹4.5 Lakhs at 6.0% p.a.</div>
                
                <div className="bg-slate-50 rounded p-3 text-sm flex justify-between items-center border">
                  <span className="text-slate-600">Financial Readiness Score</span>
                  <span className="font-bold text-emerald-700">{financialReadinessScore}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Selected Partner */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex justify-between">
                  Selected Partner
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" asChild>
                    <Link href="/partners">Change</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-slate-900 mb-1">State Bank of India (Main Branch)</div>
                <div className="text-sm text-slate-500 mb-4">123 Parliament Street, New Delhi (3.2 km away)</div>
                
                <div className="bg-slate-50 rounded p-3 text-sm flex justify-between items-center border">
                  <span className="text-slate-600">Partner Access Score</span>
                  <span className="font-bold text-emerald-700">{partnerAccessScore}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checklist */}
          <Card id="checklist">
            <CardHeader>
              <CardTitle>Document Checklist</CardTitle>
              <CardDescription>Mark documents as ready once you have them prepared.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 'd1', name: 'Caste Certificate', desc: 'SC Certificate issued by competent authority', req: true, checked: true },
                  { id: 'd2', name: 'Income Certificate', desc: 'Annual Family Income Proof', req: true, checked: true },
                  { id: 'd3', name: 'Aadhaar Card', desc: 'Original and self-attested copy', req: true, checked: true },
                  { id: 'd4', name: 'Project Report (DPR)', desc: 'Detailed business plan and cost estimates', req: true, checked: false }
                ].map((doc) => (
                  <div key={doc.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors">
                    <div className="mt-0.5">
                      <input type="checkbox" id={doc.id} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary" defaultChecked={doc.checked} />
                    </div>
                    <div className="flex-1">
                      <label htmlFor={doc.id} className="text-sm font-medium text-slate-900 block cursor-pointer">
                        {doc.name}
                        {doc.req && <span className="ml-2 text-[10px] uppercase text-red-600 font-bold">Required</span>}
                      </label>
                      <p className="text-xs text-slate-500">{doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
