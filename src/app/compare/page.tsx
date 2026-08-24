"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SchemeMatchResult } from "@/lib/types/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CompareSchemes() {
  const router = useRouter();
  const [results, setResults] = useState<SchemeMatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Re-run the match to get the data for comparison
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
          // Take top 3 eligible schemes for comparison
          const topSchemes = resData.results.filter((r: SchemeMatchResult) => r.is_eligible).slice(0, 3);
          setResults(topSchemes);
        }
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
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (results.length < 2) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Not enough schemes to compare</h2>
        <p className="text-slate-600 mb-6">We found less than 2 eligible schemes based on your profile.</p>
        <Button asChild>
          <Link href="/assessment/results">Return to Results</Link>
        </Button>
      </div>
    );
  }

  const bestSchemeId = results[0].scheme.id;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8 flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/assessment/results"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Results</Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Compare Schemes</h1>
          <p className="text-slate-600 mt-1">Side-by-side comparison of your top recommended schemes.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 border-b border-r bg-slate-50 text-left w-1/4">Feature</th>
              {results.map((result) => (
                <th key={result.scheme.id} className="p-4 border-b text-left w-1/4 align-top">
                  <div className="font-bold text-lg mb-1">{result.scheme.name}</div>
                  {result.scheme.id === bestSchemeId && (
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      BEST MATCH
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border-b border-r bg-slate-50 font-medium">Match Score</td>
              {results.map((result) => (
                <td key={result.scheme.id} className="p-4 border-b">
                  <span className={`text-2xl font-bold ${result.scheme.id === bestSchemeId ? 'text-emerald-600' : 'text-slate-700'}`}>
                    {result.match_percentage}%
                  </span>
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="p-4 border-b border-r bg-slate-50 font-medium">Maximum Loan Amount</td>
              {results.map((result) => (
                <td key={result.scheme.id} className="p-4 border-b">
                  ₹{(result.scheme.max_loan_amount / 100000).toFixed(1)} Lakhs
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 border-b border-r bg-slate-50 font-medium">Indicative Interest Rate</td>
              {results.map((result) => (
                <td key={result.scheme.id} className="p-4 border-b">
                  {result.scheme.indicative_interest_rate}% p.a.
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 border-b border-r bg-slate-50 font-medium">Maximum Tenure</td>
              {results.map((result) => (
                <td key={result.scheme.id} className="p-4 border-b">
                  {result.scheme.max_tenure_months} Months
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 border-b border-r bg-slate-50 font-medium">Moratorium Period</td>
              {results.map((result) => (
                <td key={result.scheme.id} className="p-4 border-b">
                  {result.scheme.moratorium_months} Months
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 border-b border-r bg-slate-50 font-medium">Why recommended?</td>
              {results.map((result) => (
                <td key={result.scheme.id} className="p-4 border-b text-sm text-slate-600">
                  {result.recommendation_reason}
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="p-4 border-r bg-slate-50 font-medium">Action</td>
              {results.map((result) => (
                <td key={result.scheme.id} className="p-4">
                  <Button className="w-full" variant={result.scheme.id === bestSchemeId ? 'default' : 'outline'} asChild>
                    <Link href={`/planner?scheme=${result.scheme.id}`}>Plan with this Scheme</Link>
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
