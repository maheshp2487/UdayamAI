import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  return (
    <footer className="border-t border-amber-200/80 bg-slate-50 text-slate-600">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <Logo size="sm" contained={true} showTagline={false} />
            </Link>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Helping rural and small-town entrepreneurs turn raw business ideas and savings into profitable, bank-approved businesses with up to 35% government subsidies.
            </p>
            <div className="flex items-center space-x-3 pt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-slate-200 text-slate-700 shadow-2xs">
                <ShieldCheck className="h-3 w-3 mr-1 text-emerald-600" />
                Bank-Approved Standards
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-slate-200 text-slate-700 shadow-2xs">
                <CheckCircle2 className="h-3 w-3 mr-1 text-amber-700" />
                PMEGP & Mudra Subsidies
              </span>
            </div>
          </div>

          {/* Col 3: Platform Tools */}
          <div>
            <h4 className="font-semibold text-xs text-slate-900 mb-3 tracking-wider uppercase">Business Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/agent" className="hover:text-amber-700 transition-colors flex items-center">
                  Business Plan Maker
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-70" />
                </Link>
              </li>
              <li>
                <Link href="/business-ideas" className="hover:text-amber-700 transition-colors">
                  Explore Business Ideas
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-700 transition-colors">
                  My Saved Plans
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-amber-700 transition-colors">
                  How Banking Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Schemes Covered */}
          <div>
            <h4 className="font-semibold text-xs text-slate-900 mb-3 tracking-wider uppercase">Govt Schemes & Subsidies</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>PMEGP (Up to 35% Free Govt Grant)</li>
              <li>Mudra Loans (No Collateral Needed)</li>
              <li>PM SVANidhi (Street & Micro Credit)</li>
              <li>CGTMSE (No Property Mortgage Needed)</li>
            </ul>
          </div>

          {/* Col 5: Compliance Disclosures */}
          <div>
            <h4 className="font-semibold text-xs text-slate-900 mb-3 tracking-wider uppercase">Our Commitment</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
              Built as a free digital helper for grassroots, rural, and first-generation entrepreneurs to easily understand bank loans, machines, and government grants.
            </p>
            <div className="text-[10px] text-slate-400 font-mono">
              Aligned with Reserve Bank of India (RBI) MSME guidelines
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} UdayamAI. Open Digital MSME Infrastructure.</span>
          <div className="flex space-x-4">
            <Link href="/methodology" className="hover:text-slate-600">Methodology</Link>
            <Link href="/about" className="hover:text-slate-600">About Platform</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
