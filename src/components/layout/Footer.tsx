import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="h-7 w-7 rounded-md bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-xs">
                U
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900">
                Udayam<span className="text-blue-600">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Techno-Economic Project Appraisal & Concessional Credit Architecture for Indian MSMEs. Formulating institutional-grade Detailed Project Reports (DPRs) aligned with KVIC, SIDBI, and commercial bank guidelines.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-slate-200 text-slate-700 shadow-2xs">
                <ShieldCheck className="h-3 w-3 mr-1 text-emerald-600" />
                DSCR Bank Norms
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-slate-200 text-slate-700 shadow-2xs">
                <CheckCircle2 className="h-3 w-3 mr-1 text-blue-600" />
                PMEGP & Mudra Conforming
              </span>
            </div>
          </div>

          {/* Col 3: Platform Tools */}
          <div>
            <h4 className="font-semibold text-xs text-slate-900 mb-3 tracking-wider uppercase">Appraisal Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/agent" className="hover:text-blue-600 transition-colors flex items-center">
                  Feasibility Studio
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-70" />
                </Link>
              </li>
              <li>
                <Link href="/business-ideas" className="hover:text-blue-600 transition-colors">
                  SME Sector Catalog
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-blue-600 transition-colors">
                  Appraisal Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Schemes Covered */}
          <div>
            <h4 className="font-semibold text-xs text-slate-900 mb-3 tracking-wider uppercase">Credit Schemes</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>PMEGP (15% - 35% Capital Subsidy)</li>
              <li>Pradhan Mantri Mudra Yojana (PMMY)</li>
              <li>CGTMSE (Collateral-Free Guarantee)</li>
              <li>Stand-Up India (SC/ST & Women MSMEs)</li>
            </ul>
          </div>

          {/* Col 5: Disclosures */}
          <div>
            <h4 className="font-semibold text-xs text-slate-900 mb-3 tracking-wider uppercase">Organization</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About the Platform
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-blue-600 transition-colors">
                  User Feedback
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-blue-600 transition-colors">
                  Institutional Disclosures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} UdayamAI. Supporting India&apos;s 63 Million Micro & Small Enterprises.</p>
          <p className="max-w-md text-center sm:text-right">
            UdayamAI generates decision-support models for project formulation. Sanction of credit facilities is subject to underwriting by financing banks.
          </p>
        </div>
      </div>
    </footer>
  );
}
