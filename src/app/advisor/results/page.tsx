"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FinancialCalculator } from "@/lib/financial/financial-plan";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Target, TrendingUp, AlertTriangle, Users, MapPin, IndianRupee, Download, Info } from "lucide-react";

export default function AdvisoryDashboard() {
  const router = useRouter();
  // Lazy useState initializer — runs only once on mount, never re-runs.
  // Satisfies react-hooks/set-state-in-effect (no setState in effect body)
  // and react-hooks/refs (no ref.current read in render).
  const [assessmentData] = useState(() => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('advisoryData');
    if (!raw) return null;
    const data = JSON.parse(raw) as Record<string, string | number>;
    return { data, financials: FinancialCalculator.calculatePS26091(Number(data.available_margin)) };
  });

  // Redirect-only effect — no setState here
  useEffect(() => {
    if (!assessmentData) router.push('/advisor');
  }, [assessmentData, router]);

  if (!assessmentData) return <div className="p-12 text-center">Loading Report...</div>;
  const { data, financials } = assessmentData;

  // Deterministic representative advisory content based on Business Category
  const getAIContent = () => {
    const isDairy = String(data.business_category ?? "").includes("Dairy");
    const isRetail = String(data.business_category ?? "").includes("Retail");
    const isTextile = String(data.business_category ?? "").includes("Textile");

    return {
      reach: `Estimated 5,000 to 12,000 primary consumers within a 10 km radius of ${data.location}. Main distribution via local weekly markets and direct-to-home delivery models.`,
      opportunity: isDairy
        ? "High demand for A2 milk and organic ghee. Current supply chain is highly fragmented with limited organized players."
        : isRetail
        ? "Lack of organized FMCG retail in the immediate vicinity. High dependency on distant wholesale markets creates a clear local gap."
        : isTextile
        ? "Growing demand for authentic regional handlooms. Huge untapped potential in B2B wholesale to urban boutiques."
        : "Moderate local demand with room for a well-positioned micro-enterprise to capture an underserved segment.",
      swot: {
        s: isDairy ? "Strong demand for fresh milk, low transport costs, established cooperative network." : "Low operational overhead and deep local customer trust.",
        w: isDairy ? "Dependency on fodder prices and veterinary access." : "Dependency on local supply chains with limited alternatives.",
        o: isDairy ? "Government dairy development subsidies, nearby cooperative tie-ups." : "Rising rural disposable income and preference for local produce.",
        t: isDairy ? "FMD outbreaks, seasonal fodder price volatility." : isRetail ? "Incursion of large e-commerce platforms on discretionary spending." : "Cheap synthetic alternatives entering the local market."
      },
      threats: isDairy ? "Key risks include FMD disease outbreaks and volatile fodder prices. Mitigate by joining milk producer cooperatives for price floor protection." : isRetail ? "Incursion of large e-commerce logistics into tier-3 areas poses medium-term threat." : "Cheap machine-made alternatives can undercut handloom pricing. Target quality-conscious segments.",
      competitors: `Approximately ${isDairy ? '4-6' : isRetail ? '12-15' : '2-3'} existing unorganized competitors estimated in the ${data.location} area. Market saturation is ${isDairy ? 'low-to-moderate' : isRetail ? 'moderate' : 'low'}. Primary differentiation opportunity exists.`,
      pricing: isDairy ? "Local fresh milk: ₹55–65/litre. A2 premium commands ₹10–15 above market rate. Price elasticity is low — customers prioritize freshness." : isRetail ? "Standard MRP adherence with 10–15% gross margin on FMCG. Focus on volume and availability." : "Handloom: Entry ₹250/metre, Recommended ₹400–600/metre, Premium ₹1,000+/metre. Gross margin guidance: 35–50%."
    };
  };

  const ai = getAIContent();

  // Out-of-range display
  if (financials.outOfRange) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center space-y-6">
        <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-900">Project Scale Out of Range</h1>
        <p className="text-slate-600 leading-relaxed">{financials.warningMessage}</p>
        <Button onClick={() => router.push('/advisor')}>Revise Your Inputs</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Hyper-Local Business Feasibility Report</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {String(data.location)} | {String(data.business_category)}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push('/report')}>Print Report</Button>
          <Button onClick={() => window.print()} className="bg-slate-900"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
        </div>
      </div>

      {/* Prototype Data Disclaimer */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        <span><strong>Representative Prototype Data:</strong> Market reach, competitor density, and pricing estimates below are generated from deterministic business-category templates and do not represent live or real-time local intelligence. Future integration with Google Places API or government business registry data will replace these with live data.</span>
      </div>

      {financials.warningMessage && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-sm text-amber-800">
          <strong>Note:</strong> {financials.warningMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Advisory (Module 1) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Module 1: Business Feasibility Analysis</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Target className="h-4 w-4 text-blue-500" /> Market Reach</CardTitle></CardHeader>
              <CardContent className="text-sm text-slate-600">{ai.reach}</CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-green-500" /> Opportunity Analysis</CardTitle></CardHeader>
              <CardContent className="text-sm text-slate-600">{ai.opportunity}</CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4 text-purple-500" /> Competitor Mapping</CardTitle></CardHeader>
              <CardContent className="text-sm text-slate-600">{ai.competitors}</CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><IndianRupee className="h-4 w-4 text-amber-500" /> Product Market Value & Pricing</CardTitle></CardHeader>
              <CardContent className="text-sm text-slate-600">{ai.pricing}</CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-500" /> Risk & Threat Identification</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">{ai.threats}</CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Local SWOT Analysis</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 p-3 rounded-md border border-green-100"><strong>Strengths:</strong> {ai.swot.s}</div>
              <div className="bg-red-50 p-3 rounded-md border border-red-100"><strong>Weaknesses:</strong> {ai.swot.w}</div>
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100"><strong>Opportunities:</strong> {ai.swot.o}</div>
              <div className="bg-amber-50 p-3 rounded-md border border-amber-100"><strong>Threats:</strong> {ai.swot.t}</div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Financial Structuring (Module 2) */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Module 2: 10/90 Financial Structuring</h2>

          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-slate-50 pb-4 border-b">
              <CardTitle className="text-lg">Auto-Routed Scheme</CardTitle>
              <CardDescription>Determined by Project Cost</CardDescription>
              <Badge className="w-fit text-sm mt-2" variant={financials.schemeId === "micro_finance" ? "secondary" : "default"}>
                {financials.schemeName}
              </Badge>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Your Margin (10%)</span>
                <span className="font-semibold text-green-600">₹{financials.availableMargin.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Effective Loan (90%, capped)</span>
                <span className="font-semibold text-blue-600">₹{financials.effectiveLoan.toLocaleString()}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between items-center font-bold">
                <span>Total Project Cost</span>
                <span>₹{financials.projectCost.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Scheme Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Interest Rate (p.a.)</span><span className="font-medium">{financials.interestRate}%</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tenure</span><span className="font-medium">{financials.tenureMonths} Months</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Moratorium Period</span><span className="font-medium">{financials.moratoriumMonths} Months</span></div>
              <div className="flex justify-between border-t pt-2"><span className="text-slate-500">Quarterly EMI</span><span className="font-bold">₹{Math.round(financials.quarterlyPayment).toLocaleString()}</span></div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Quarterly Repayment Schedule — All quarters including moratorium */}
      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold border-b pb-2">Complete Quarterly Repayment Schedule</h2>
        <p className="text-sm text-slate-500">Rows marked <em>Moratorium</em> show interest accrued (capitalised). No principal repayment is due during this period.</p>
        <div className="border rounded-lg overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Quarter</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Remaining Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financials.amortizationSchedule.map((row) => (
                <TableRow key={row.quarter} className={row.isMoratorium ? "bg-amber-50/40 text-amber-900" : ""}>
                  <TableCell className="font-medium">Q{row.quarter}</TableCell>
                  <TableCell>{row.isMoratorium ? "Moratorium" : "Repayment"}</TableCell>
                  <TableCell>{row.isMoratorium ? "–" : `₹${Math.round(row.payment).toLocaleString()}`}</TableCell>
                  <TableCell>{row.isMoratorium ? "–" : `₹${Math.round(row.principal).toLocaleString()}`}</TableCell>
                  <TableCell>₹{Math.round(row.interest).toLocaleString()}</TableCell>
                  <TableCell>₹{Math.round(row.balance).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  );
}
