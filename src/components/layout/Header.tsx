'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-sm shadow-sm">
            U
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-slate-900 flex items-center space-x-1.5">
              <span>Udayam</span>
              <span className="text-blue-700 font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200">
                AI
              </span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase -mt-0.5">
              Venture Intelligence & Credit Appraisal
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            href="/agent"
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              pathname === '/agent'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Feasibility Engine
          </Link>

          <Link
            href="/business-ideas"
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              pathname === '/business-ideas'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            SME Opportunities
          </Link>

          <Link
            href="/methodology"
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              pathname === '/methodology'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Appraisal Methodology
          </Link>

          <Link
            href="/dashboard"
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              pathname === '/dashboard'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Saved Reports
          </Link>

          <Link
            href="/about"
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              pathname === '/about'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            About Platform
          </Link>
        </nav>

        {/* Right Action */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 text-[11px] text-slate-500 font-mono pr-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>SIDBI & PMEGP Standards</span>
          </div>

          <Link href="/agent">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1.5 text-xs rounded-lg shadow-sm transition-all"
            >
              <span>Appraise Venture</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
