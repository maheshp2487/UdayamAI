"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SchemeMatchResult } from "@/lib/types/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, AlertCircle, TrendingUp, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function AssessmentResults() {
  const router = useRouter();
  const [results, setResults] = useState<SchemeMatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dataStr = localStorage.getItem('assessmentData');
    if (!dataStr) {
      router.push('/assessment');
      return;
    }

    try {
      const data = JSON.parse(dataStr);
      fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setResults(resData.results);
        } else {
          setError(resData.error || 'Failed to get results');
        }
      })
      .catch(err => {
        setError('Network error occurred.');
      })
      .finally(() => {
        setLoading(false);
      });
    } catch (e) {
      router.push('/assessment');
    }
  }, [router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing your profile...</h2>
        <p className="text-slate-600">Our deterministic engine is matching your requirements against official scheme rules.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <Button onClick={() => router.push('/assessment')}>Return to Assessment</Button>
      </div>
    );
  }

  const eligibleResults = results.filter(r => r.is_eligible);
  const ineligibleResults = results.filter(r => !r.is_eligible);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Your Personalized Matches</h1>
        <p className="text-lg text-slate-600">Based on your profile, we have ranked the most suitable schemes for your requirement.</p>

        {eligibleResults.length > 1 && (
          <div className="mt-6 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/compare">Compare Recommended Schemes Side-by-Side</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-12">
        {eligibleResults.length > 0 ? (
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mr-2" /> Recommended Schemes
            </h2>
            <div className="grid gap-8">
              {eligibleResults.map((result, index) => (
                <Card key={result.scheme.id} className={index === 0 ? "border-primary/50 shadow-md relative overflow-hidden" : ""}>
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      BEST MATCH
                    </div>
                  )}
                  <CardHeader className="md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{result.scheme.name}</CardTitle>
                      <CardDescription className="text-base">{result.scheme.purpose}</CardDescription>
                    </div>
                    <div className="flex flex-col items-center md:items-end shrink-0">
                      <div className="text-4xl font-bold text-emerald-600">{result.match_percentage}%</div>
                      <div className="text-sm text-slate-500 font-medium">Match Score</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-medium flex items-center mb-2"><TrendingUp className="w-4 h-4 mr-2" /> Why was this recommended?</h4>
                      <p className="text-sm text-slate-700">{result.recommendation_reason}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Eligibility Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          {Object.entries(result.eligibility_breakdown).map(([key, value]) => {
                            if (value === 'N/A') return null;
                            const label = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                            return (
                              <div key={key} className="flex justify-between items-center">
                                <span className="text-slate-600">{label}</span>
                                <Badge variant={value === 'PASS' ? 'outline' : 'destructive'} className={value === 'PASS' ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : ''}>
                                  {value}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Financial Overview</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">Max Loan Limit</p>
                            <p className="font-medium text-slate-900">₹{(result.scheme.max_loan_amount / 100000).toFixed(1)} Lakhs</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Interest Rate</p>
                            <p className="font-medium text-slate-900">{result.scheme.indicative_interest_rate}% p.a.</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Max Tenure</p>
                            <p className="font-medium text-slate-900">{result.scheme.max_tenure_months} Months</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50/50 border-t pt-4 flex flex-wrap gap-4 justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/schemes/${result.scheme.id}`}>View Scheme Details</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="secondary" asChild>
                        <Link href={`/planner?scheme=${result.scheme.id}`}>Financial Planner</Link>
                      </Button>
                      <Button asChild>
                        <Link href={`/partners?scheme=${result.scheme.id}`}>Find Channel Partner</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No Eligible Schemes Found</h3>
            <p className="text-slate-600 mb-6">Based on your profile, you do not currently meet the eligibility criteria for the active schemes on this platform.</p>
            <Button variant="outline" onClick={() => router.push('/assessment')}>Adjust Assessment Inputs</Button>
          </div>
        )}

        {ineligibleResults.length > 0 && (
          <section>
            <Separator className="my-8" />
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <XCircle className="w-6 h-6 text-slate-400 mr-2" /> Other Schemes (Not Eligible)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {ineligibleResults.map((result) => (
                <Card key={result.scheme.id} className="opacity-75 hover:opacity-100 transition-opacity">
                  <CardHeader>
                    <CardTitle className="text-lg">{result.scheme.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-red-50 p-3 rounded text-sm text-red-800 border border-red-100 mb-4">
                      <p className="font-semibold mb-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" /> Not Recommended Because:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {result.rejection_reasons?.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="link" className="px-0 text-slate-500" asChild>
                      <Link href={`/schemes/${result.scheme.id}`}>View Criteria Anyway</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
