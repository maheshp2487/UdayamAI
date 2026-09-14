'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  MapPin, 
  Calendar, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Coins, 
  PlusCircle, 
  ExternalLink,
  Edit3
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SavedAppraisal {
  id: string;
  timestamp: string;
  ventureName: string;
  location: string;
  capex: number;
  margin: number;
  subsidy: number;
  subsidyPercent: number;
  dscr: number;
  loan: number;
  inputs: {
    idea: string;
    location: string;
    budget: number;
    businessScale: string;
    premisesType: string;
    experienceLevel: string;
    entrepreneurCategory: string;
    areaType: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [savedAppraisals, setSavedAppraisals] = useState<SavedAppraisal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('udayam_saved_appraisals');
        if (stored) {
          setSavedAppraisals(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Could not parse saved appraisals', e);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = savedAppraisals.filter((item) => item.id !== id);
    setSavedAppraisals(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('udayam_saved_appraisals', JSON.stringify(updated));
    }
  };

  const handleReAppraise = (appraisal: SavedAppraisal) => {
    const params = new URLSearchParams({
      idea: appraisal.inputs.idea || appraisal.ventureName,
      location: appraisal.inputs.location || appraisal.location,
      budget: String(appraisal.inputs.budget || appraisal.margin),
      scale: appraisal.inputs.businessScale || 'Micro / Mobile Kiosk',
      area: appraisal.inputs.areaType || 'Rural',
      category: appraisal.inputs.entrepreneurCategory || 'Women',
    });
    router.push(`/agent?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pb-20">
      
      {/* Dashboard Top Header */}
      <section className="bg-white border-b border-slate-200 py-10">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
              <span>Saved Credit Reports</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              My Venture Appraisals & DPR Archive
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review, update, and re-appraise your saved Detailed Project Reports.
            </p>
          </div>

          <Link href="/agent">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-2xs flex items-center space-x-1.5">
              <PlusCircle className="h-4 w-4" />
              <span>Appraise New Venture</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Main List */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl pt-8">
        {!isLoaded ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading saved appraisals...</div>
        ) : savedAppraisals.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center max-w-lg mx-auto space-y-4">
            <div className="h-14 w-14 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">No Project Reports Generated Yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                Appraise your first business idea in 4 simple steps to calculate bank-standard equipment costs, government subsidies, and debt coverage.
              </p>
            </div>
            <Link href="/agent">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-2xs">
                Start Step-by-Step Appraisal
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Archived Project Reports ({savedAppraisals.length})
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedAppraisals.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-base font-bold text-slate-900 leading-snug">
                        {item.ventureName}
                      </h2>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Delete from archive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {item.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {new Date(item.timestamp).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Financial Summary */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-slate-500 font-sans">Outlay</div>
                        <div className="font-bold text-slate-900 mt-0.5">
                          ₹{(item.capex / 100000).toFixed(2)}L
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-sans">Margin</div>
                        <div className="font-bold text-blue-700 mt-0.5">
                          ₹{(item.margin / 100000).toFixed(2)}L
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-sans">Grant</div>
                        <div className="font-bold text-emerald-700 mt-0.5">
                          {item.subsidyPercent}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <div className="flex items-center space-x-1.5 text-xs text-emerald-800 font-medium">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>DSCR: {item.dscr}x</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReAppraise(item)}
                        className="bg-white border-slate-300 text-slate-700 hover:bg-slate-100 text-xs h-8 px-2.5"
                      >
                        <Edit3 className="h-3.5 w-3.5 mr-1 text-blue-600" />
                        Modify
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => handleReAppraise(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 px-3"
                      >
                        <span>Open DPR</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
