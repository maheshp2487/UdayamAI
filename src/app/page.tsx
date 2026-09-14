'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Layers, 
  TrendingUp, 
  Coins, 
  CheckCircle2, 
  FileText, 
  ArrowUpRight,
  ShieldCheck,
  Building,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();
  const [quickIdea, setQuickIdea] = useState('');

  const sampleSectors = [
    { title: 'Solar Micro-Cold Storage Unit', location: 'Nashik, Maharashtra', capex: '₹5.00 Lakhs', subsidy: '25% (PMEGP)', dscr: '3.98x (Prime)' },
    { title: 'Hydroponic Saffron & Exotic Greens', location: 'Pulwama, Kashmir', capex: '₹8.50 Lakhs', subsidy: '35% (Special)', dscr: '2.45x (Bankable)' },
    { title: 'Areca Palm Leaf Biodegradable Tableware', location: 'Shimoga, Karnataka', capex: '₹4.50 Lakhs', subsidy: '25% (Rural)', dscr: '3.12x (Bankable)' },
    { title: 'Automated Handloom Jacquard Silk Weaving', location: 'Kanchipuram, Tamil Nadu', capex: '₹7.00 Lakhs', subsidy: '35% (Special)', dscr: '2.80x (Bankable)' },
  ];

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickIdea.trim()) {
      router.push(`/agent?idea=${encodeURIComponent(quickIdea.trim())}`);
    } else {
      router.push('/agent');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200 bg-gradient-to-b from-slate-50/80 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>Techno-Economic Feasibility & Credit Underwriting Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
            Autonomous Project Appraisal & Capital Structuring for Indian MSMEs
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Formulate institutional-grade Detailed Project Reports (DPRs), localized unit economics, and concessional subsidy allocations aligned with PMEGP, Mudra, and CGTMSE guidelines.
          </p>

          {/* Main Search Input Form */}
          <div className="max-w-2xl mx-auto mb-6">
            <form onSubmit={handleLaunch} className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-300 shadow-md focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <input
                type="text"
                value={quickIdea}
                onChange={(e) => setQuickIdea(e.target.value)}
                placeholder="Enter enterprise concept (e.g. Solar Cold Storage in Nashik, Handloom Silk in Varanasi)..."
                className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <Button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-3 rounded-lg shadow-sm shrink-0 flex items-center justify-center space-x-2 transition-all"
              >
                <span>Appraise Feasibility</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-500 mt-3 font-medium">
              <span>✓ 100% Free & Open Access</span>
              <span>•</span>
              <span>✓ Bank-Standard DSCR Modeling</span>
              <span>•</span>
              <span>✓ Up to 35% PMEGP Capital Subsidy</span>
            </div>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto pt-2">
            <span className="text-xs text-slate-500 font-medium">Common Sectors:</span>
            {sampleSectors.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => router.push(`/agent?idea=${encodeURIComponent(s.title)}&location=${encodeURIComponent(s.location)}`)}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
              >
                {s.title.split(' ')[0]} {s.title.split(' ')[1]} ({s.location.split(',')[0]})
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Institutional Table Section */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          
          <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Sample Techno-Economic Project Appraisals
                  </h3>
                  <p className="text-xs text-slate-500">Conforming to District Industrial Center (DIC) and KVIC/SIDBI bank norms</p>
                </div>
              </div>

              <Link href="/agent">
                <span className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                  Open Interactive Appraisal Studio <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </span>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3">Enterprise Concept</th>
                    <th className="px-6 py-3">Target Geography</th>
                    <th className="px-6 py-3">Total Outlay (CAPEX)</th>
                    <th className="px-6 py-3">Govt Capital Subsidy</th>
                    <th className="px-6 py-3">DSCR Coverage</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {sampleSectors.map((sector) => (
                    <tr key={sector.title} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-3.5 font-medium text-slate-900">{sector.title}</td>
                      <td className="px-6 py-3.5 text-slate-500">{sector.location}</td>
                      <td className="px-6 py-3.5 font-mono font-medium">{sector.capex}</td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {sector.subsidy}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-mono text-blue-700 font-semibold">{sector.dscr}</td>
                      <td className="px-6 py-3.5 text-right">
                        <Link
                          href={`/agent?idea=${encodeURIComponent(sector.title)}&location=${encodeURIComponent(sector.location)}`}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center"
                        >
                          Appraise DPR
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Core Institutional Frameworks */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Standardized Underwriting for Credit Sanctions
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every financial calculation adheres to commercial bank credit policy and statutory Indian MSME guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Techno-Economic Feasibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Itemizes machinery, equipment, facility fit-outs, and initial working capital cycles with localized district factor pricing.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Debt Service Coverage (DSCR)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates true break-even unit volumes, contribution margins, and ensures the venture satisfies commercial bank DSCR thresholds (≥ 1.25).
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
                <Coins className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Statutory Subsidy Optimizer</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies exact PMEGP rural/urban and general/special reservation rules (15% to 35% capital subsidies) alongside Mudra and CGTMSE guarantee terms.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* MSME Credit Architecture Breakdown */}
      <section className="py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                Concessional Credit Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Democratizing Government Credit Schemes for Grassroots Ventures
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                India has allocated over ₹3 Lakh Crore in subsidized MSME credit, yet over 70% of grassroots loan applications are rejected due to unverified or generic Detailed Project Reports. UdayamAI structures your venture to satisfy loan appraisal officers.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">PMEGP Margin Relief:</strong> Up to 35% non-dilutive capital subsidy with only 5% promoter equity for special categories.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">Mudra Institutional Tiers:</strong> Collateral-free micro-credit from ₹50,000 to ₹10 Lakhs (Shishu, Kishor, Tarun).
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">CGTMSE Guarantee:</strong> 85% sovereign credit guarantee for micro-enterprises, prohibiting demands for third-party collateral.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/agent">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm">
                    <span>Launch Feasibility Studio</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Comparison Callout Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
                Why Generic Calculators Fail Indian Entrepreneurs
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-lg bg-red-50/70 border border-red-200 space-y-1">
                  <div className="font-semibold text-red-800">Traditional Static Templates</div>
                  <p className="text-slate-600">
                    Apply rigid 10% equity / 90% loan across all sectors. Ignore district saturation, power costs, raw material cycles, and real break-even math.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div className="font-semibold text-emerald-800">UdayamAI Autonomous Engine</div>
                  <p className="text-slate-700">
                    Decomposes domain-specific unit economics, dynamic DSCR, and exact statutory subsidy rates based on rural/urban classification and promoter category.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-mono">
                <div className="text-slate-900 font-semibold mb-1">Standard Bank Sanction Benchmarks:</div>
                <div>• Minimum DSCR: 1.25x (Safe range: 1.5x – 2.5x)</div>
                <div>• Promoter Contribution: 5% – 10% (PMEGP)</div>
                <div>• Moratorium Period: 6 – 12 months for machinery ramp-up</div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
