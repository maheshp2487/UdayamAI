'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  Coins, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  Building, 
  FileText,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pb-20">
      
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Bank Lending & DIC Feasibility Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Autonomous MSME Underwriting Methodology
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transparent, deterministic financial formulas aligned with commercial bank credit policy, Reserve Bank of India (RBI) MSME guidelines, and KVIC/SIDBI subsidy circulars.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 max-w-4xl pt-10 space-y-10">
        
        {/* Core Principles */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Why Traditional Credit Scoring Fails Rural Entrepreneurs
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Over 70% of grassroots Indian MSME loan applications are rejected not because the proposed venture is unviable, but because first-generation borrowers lack formal accounting records, audited balance sheets, or CIBIL histories. Commercial bank loan officers cannot sanction micro-loans on handwritten notes or vague estimates.
          </p>
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 leading-relaxed font-medium">
            <strong>The UdayamAI Solution:</strong> We bridge this information asymmetry by transforming a simple enterprise concept (e.g. &ldquo;Dosa stall in Madurai&rdquo;) into an institutional, bank-ready Detailed Project Report (DPR) with itemized machinery costs, unit contribution economics, and verified Debt Service Coverage.
          </div>
        </div>

        {/* The 5 Underwriting Stages */}
        <div className="space-y-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Underwriting Architecture
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            The 5 Verification Pillars
          </h2>

          <div className="grid grid-cols-1 gap-4 pt-2">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-mono font-bold text-xs">
                  01
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Catchment & Demographic Sizing</h3>
                  <span className="text-xs text-slate-500">Local consumer footfall & market saturation analysis</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluates district consumer density, competitor concentration, and product-market viability. Ensures the proposed enterprise is appropriately scaled for its target village or municipality.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold text-xs">
                  02
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Trade-Specific Equipment & CAPEX Sourcing</h3>
                  <span className="text-xs text-slate-500">Dynamic machinery quotations via Google Gemini 3.6 Flash</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero hardcoded formulas or generic equipment percentages. The AI engine extracts authentic commercial machinery models, capacities, and localized vendor quotations tailored specifically to the venture.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-mono font-bold text-xs">
                  03
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Statutory Subsidy & Concession Routing</h3>
                  <span className="text-xs text-slate-500">PMEGP 2024-25, Mudra, PM SVANidhi, and CGTMSE rules</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies exact government reservation guidelines:
                <br />• <strong>Special Categories</strong> (Women, SC, ST, OBC, Minorities): <strong>35% Rural Subsidy / 25% Urban Subsidy</strong> with only <strong>5% promoter margin</strong>.
                <br />• <strong>General Category</strong>: <strong>25% Rural Subsidy / 15% Urban Subsidy</strong> with <strong>10% promoter margin</strong>.
                <br />• <strong>Micro Street Stalls</strong> (&le; ₹1.5L): Auto-routes to <strong>PM SVANidhi</strong> 0% collateral working capital facility.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-mono font-bold text-xs">
                  04
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Debt Service Coverage Ratio (DSCR) Modeling</h3>
                  <span className="text-xs text-slate-500">Bank solvency & daily break-even threshold verification</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates the exact break-even production units per day and ensures the enterprise maintains a DSCR $\ge 1.25\times$ under conservative operating assumptions.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-mono font-bold text-xs">
                  05
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Sanction-Grade Detailed Project Report (DPR)</h3>
                  <span className="text-xs text-slate-500">Directly printable and submissible to bank branch managers</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates complete 7-tab DPR including Means of Finance, 5-year loan amortization schedule, FSSAI/Udyam statutory licensing checklists, and 90-day execution milestones.
              </p>
            </div>

          </div>
        </div>

        {/* Mathematical Formulas */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Deterministic Mathematical Formulas</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">Debt Service Coverage Ratio (DSCR)</div>
              <div className="p-2.5 rounded bg-white border border-slate-200 font-mono text-xs text-blue-800">
                DSCR = Annual Operating Profit / Annual Debt EMI
              </div>
              <p className="text-[11px] text-slate-500">
                Commercial banks mandate DSCR &ge; 1.25x. Any venture with DSCR &ge; 1.50x is classified as prime investment grade.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">Daily Break-Even Unit Volume</div>
              <div className="p-2.5 rounded bg-white border border-slate-200 font-mono text-xs text-blue-800">
                BEP = (Fixed OPEX + EMI) / (Unit Price - Unit Cost)
              </div>
              <p className="text-[11px] text-slate-500">
                Determines the exact daily units required to cover commercial rent, electricity, labor, and bank loan installments.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center space-y-4 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold">Experience the Appraisal Studio</h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Test any grassroots enterprise idea and view real-time machinery quotes, subsidy allocations, and bankable project reports.
          </p>
          <div className="pt-2">
            <Link href="/agent">
              <Button className="bg-white hover:bg-slate-100 text-blue-700 font-bold px-6 py-2.5 rounded-lg shadow-sm text-xs">
                <span>Launch Feasibility Studio</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}
