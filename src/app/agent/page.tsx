'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  RefreshCw, 
  Send, 
  Sliders, 
  FileText, 
  Coins, 
  Calculator, 
  CheckSquare, 
  MessageSquare, 
  MapPin, 
  IndianRupee,
  Check,
  Edit3,
  Bookmark,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgentResult } from '@/lib/agent/types';

// Preset trades for Question 1
const PRESET_TRADES = [
  { title: 'Dosa & Fast Food Tiffin Stall', sub: 'Commercial bhatti, wet grinder, and mobile food cart' },
  { title: 'Solar Powered Cold Storage (5 MT)', sub: 'Farm-gate solar refrigerated room for perishables' },
  { title: 'Organic Dairy & A2 Milk Unit', sub: '5 Gir cows, milk chilling containers, and local delivery' },
  { title: 'Automated Handloom Silk Weaving', sub: 'Pneumatic jacquard loom for high-throughput traditional sarees' },
  { title: 'Daily Needs Kirana & FMCG Retail', sub: 'Village retail store with digital billing & refrigeration' },
  { title: 'Areca Palm Biodegradable Tableware', sub: 'Hydraulic heated presses converting palm leaves to plates' },
  { title: 'Spice & Grain Mini Milling Unit', sub: 'Pulverizer, destoner & nitrogen pouch packaging' },
  { title: 'Mobile Phone Hardware Repair & CSC', sub: 'SMD rework station, screen separator & digital kiosk' },
];

function AgentStudioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Wizard Step State: 1 to 5 = Questions, 6 = Underwriting Execution, 7 = Output DPR
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [activeReportTab, setActiveReportTab] = useState<'summary' | 'equipment' | 'economics' | 'schemes' | 'compliance' | 'simulator' | 'copilot'>('summary');
  const [showQuickRefiner, setShowQuickRefiner] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [customTradeMode, setCustomTradeMode] = useState(false);

  // Question 1: Enterprise Concept
  const [idea, setIdea] = useState(searchParams.get('idea') || 'Dosa & Fast Food Tiffin Stall');

  // Question 2: Location (District, State & Rural/Urban)
  const [location, setLocation] = useState(searchParams.get('location') || 'Madurai, Tamil Nadu');
  const [areaType, setAreaType] = useState<'Rural' | 'Urban'>((searchParams.get('area') as any) || 'Rural');

  // Question 3: Premises Setup
  const [premisesType, setPremisesType] = useState<'Roadside Kiosk / Cart' | 'Rented Commercial Space' | 'Owned Land / House Front'>(
    (searchParams.get('premises') as any) || 'Roadside Kiosk / Cart'
  );

  // Question 4: Capital & Scale
  const [budget, setBudget] = useState<number>(Number(searchParams.get('budget')) || 50000);
  const [businessScale, setBusinessScale] = useState<'Micro / Mobile Kiosk' | 'Standard Small Commercial Unit' | 'Expanded Facility / Production Plant'>(
    (searchParams.get('scale') as any) || 'Micro / Mobile Kiosk'
  );

  // Question 5: Promoter Profile & Subsidy
  const [entrepreneurCategory, setEntrepreneurCategory] = useState<'General' | 'Women' | 'SC / ST' | 'OBC / Minorities' | 'Ex-Servicemen'>(
    (searchParams.get('category') as any) || 'Women'
  );
  const [experienceLevel, setExperienceLevel] = useState<'Beginner / First-Time' | 'Experienced (1-3 Years)' | 'Skilled / Artisan'>(
    'Beginner / First-Time'
  );

  // Execution states
  const [isLoading, setIsLoading] = useState(false);
  const [progressStage, setProgressStage] = useState(0);
  const [result, setResult] = useState<AgentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sensitivity Simulator states
  const [simVolumeMultiplier, setSimVolumeMultiplier] = useState(100);
  const [simPriceChangePct, setSimPriceChangePct] = useState(0);
  const [simCostInflationPct, setSimCostInflationPct] = useState(0);

  // Copilot Chat states
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Pre-populate if query params provided
  useEffect(() => {
    const qIdea = searchParams.get('idea');
    if (qIdea) {
      setIdea(qIdea);
      // Check if it's in preset or custom
      const isPreset = PRESET_TRADES.some((t) => t.title.toLowerCase() === qIdea.toLowerCase());
      if (!isPreset && qIdea.trim()) {
        setCustomTradeMode(true);
      }
    }
    const qLoc = searchParams.get('location');
    if (qLoc) setLocation(qLoc);
    const qBudget = searchParams.get('budget');
    if (qBudget) setBudget(Number(qBudget));
    const qScale = searchParams.get('scale');
    if (qScale && (qScale === 'Micro / Mobile Kiosk' || qScale === 'Standard Small Commercial Unit' || qScale === 'Expanded Facility / Production Plant')) {
      setBusinessScale(qScale);
    }
    const qArea = searchParams.get('area');
    if (qArea && (qArea === 'Rural' || qArea === 'Urban')) setAreaType(qArea);
    const qCat = searchParams.get('category');
    if (qCat && (qCat === 'General' || qCat === 'Women' || qCat === 'SC / ST' || qCat === 'OBC / Minorities' || qCat === 'Ex-Servicemen')) {
      setEntrepreneurCategory(qCat);
    }
  }, [searchParams]);

  // Save appraisal to localStorage
  const saveAppraisalToStorage = (appraisalResult: AgentResult) => {
    if (typeof window === 'undefined') return;
    try {
      const savedItem = {
        id: 'dpr_' + Date.now(),
        timestamp: new Date().toISOString(),
        ventureName: appraisalResult.ventureName,
        location,
        capex: appraisalResult.economics.capex,
        margin: appraisalResult.economics.marginEquity,
        subsidy: appraisalResult.schemes[0]?.subsidyAmount || 0,
        subsidyPercent: appraisalResult.schemes[0]?.subsidyPercent || 0,
        dscr: appraisalResult.economics.dscr,
        loan: appraisalResult.economics.loanAmount,
        inputs: {
          idea,
          location,
          budget,
          businessScale,
          premisesType,
          experienceLevel,
          entrepreneurCategory,
          areaType,
        },
        result: appraisalResult,
      };

      const existing = JSON.parse(localStorage.getItem('udayam_saved_appraisals') || '[]');
      const updated = [savedItem, ...existing.filter((x: any) => x.ventureName !== appraisalResult.ventureName)].slice(0, 15);
      localStorage.setItem('udayam_saved_appraisals', JSON.stringify(updated));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const handleExecuteAppraisal = async () => {
    if (!idea.trim()) {
      setError('Please specify what enterprise you are building in Question 1.');
      setWizardStep(1);
      return;
    }
    if (!location.trim()) {
      setError('Please provide your target district and state in Question 2.');
      setWizardStep(2);
      return;
    }

    setError(null);
    setIsLoading(true);
    setWizardStep(6); // Step 6 = Underwriting Execution
    setProgressStage(0);

    const stepInterval = setInterval(() => {
      setProgressStage((prev) => (prev < 4 ? prev + 1 : prev));
    }, 1300);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea,
          location,
          budget,
          businessScale,
          premisesType,
          experienceLevel,
          entrepreneurCategory,
          areaType,
        }),
      });

      const data = await res.json();
      clearInterval(stepInterval);

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Project appraisal failed');
      }

      setResult(data.result);
      setProgressStage(5);
      setWizardStep(7); // Step 7 = Output Report
      setShowQuickRefiner(false);
      
      setSimVolumeMultiplier(100);
      setSimPriceChangePct(0);
      setSimCostInflationPct(0);

      // Save to localStorage automatically
      saveAppraisalToStorage(data.result);

      setChatMessages([
        {
          role: 'assistant',
          content: `Techno-economic project appraisal complete for **${data.result.ventureName}** in ${location}. Total estimated capital outlay is ₹${(data.result.economics.capex / 100000).toFixed(2)} Lakhs with a bankable DSCR of ${data.result.economics.dscr}x. Inquire below regarding bank loan documentation, margin subsidy claims, or vendor quotations.`,
        },
      ]);
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error(err);
      setError(err.message || 'Failed to complete project appraisal');
      setWizardStep(5);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading || !result) return;

    const userText = chatInput.trim();
    const newMessages = [...chatMessages, { role: 'user' as const, content: userText }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          context: {
            ventureName: result.ventureName,
            location,
            economics: result.economics,
            schemes: result.schemes,
            market: result.market,
          },
        }),
      });

      const data = await res.json();
      if (data.text) {
        setChatMessages([...newMessages, { role: 'assistant', content: data.text }]);
      } else {
        setChatMessages([
          ...newMessages,
          {
            role: 'assistant',
            content: "Available to review your financial structure, margin subsidy, and loan eligibility under official guidelines.",
          },
        ]);
      }
    } catch (err) {
      setChatMessages([
        ...newMessages,
        { role: 'assistant', content: 'Connection issue. Please verify your query or try again.' },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Dynamic Real-time Calculations for the "What-If" Simulator
  const baseEcon = result?.economics;
  const simUnitPrice = baseEcon ? Math.round(baseEcon.unitPrice * (1 + simPriceChangePct / 100)) : 0;
  const simUnitCost = baseEcon ? Math.round(baseEcon.unitCost * (1 + simCostInflationPct / 100)) : 0;
  const simMonthlyUnits = baseEcon ? Math.round(baseEcon.breakEvenUnitsPerMonth * 1.35 * (simVolumeMultiplier / 100)) : 0;
  
  const simContribution = Math.max(1, simUnitPrice - simUnitCost);
  const simFixedOpex = baseEcon ? baseEcon.monthlyOpex - (baseEcon.breakEvenUnitsPerMonth * 1.35 * baseEcon.unitCost) : 0;
  const simMonthlyRevenue = simMonthlyUnits * simUnitPrice;
  const simTotalMonthlyCost = Math.max(1, (simFixedOpex > 0 ? simFixedOpex : (baseEcon?.monthlyOpex || 0) * 0.4) + (simMonthlyUnits * simUnitCost) + (baseEcon?.monthlyEmi || 0));
  const simNetProfit = simMonthlyRevenue - simTotalMonthlyCost;
  const simBreakEvenUnits = Math.ceil(((simFixedOpex > 0 ? simFixedOpex : (baseEcon?.monthlyOpex || 0) * 0.4) + (baseEcon?.monthlyEmi || 0)) / simContribution);
  
  const simAnnualEmi = Math.max(1, (baseEcon?.monthlyEmi || 1) * 12);
  const simAnnualOperatingProfit = Math.max(0, (simMonthlyRevenue - (simMonthlyUnits * simUnitCost) - (simFixedOpex > 0 ? simFixedOpex : (baseEcon?.monthlyOpex || 0) * 0.4)) * 12);
  const simDscr = Number((simAnnualOperatingProfit / simAnnualEmi).toFixed(2));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/70 text-slate-900 pb-20">
      
      {/* Studio Top Navigation Bar */}
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-16 z-30 py-3.5 shadow-2xs">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-bold text-white text-xs shadow-xs">
              DPR
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span>Techno-Economic Feasibility & Underwriting</span>
              </h1>
              <p className="text-xs text-slate-500">
                Conforming to SIDBI, KVIC, and commercial bank guidelines
              </p>
            </div>
          </div>

          {/* Action buttons when viewing Step 7 Output Report */}
          {wizardStep === 7 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuickRefiner(!showQuickRefiner)}
                className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50 text-xs h-8 font-semibold shadow-2xs"
              >
                <Edit3 className="h-3.5 w-3.5 mr-1" />
                {showQuickRefiner ? 'Close Refiner' : 'Modify Parameters'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (result) saveAppraisalToStorage(result);
                }}
                className="bg-white border-slate-300 text-slate-700 hover:bg-slate-100 text-xs h-8"
              >
                <Bookmark className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                {savedSuccess ? 'Saved!' : 'Save'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="bg-white border-slate-300 text-slate-700 hover:bg-slate-100 text-xs h-8"
              >
                <FileText className="h-3.5 w-3.5 mr-1" />
                Print
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl pt-8">

        {/* ============================================================ */}
        {/* 5-QUESTION ONBOARDING QUESTIONNAIRE (STEPS 1 - 5) */}
        {/* Matches the user's reference design layout */}
        {/* ============================================================ */}
        {wizardStep <= 5 && (
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Progress Bar & Question Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-700 font-mono tracking-widest uppercase">
                  QUESTION {wizardStep} OF 5
                </span>
                <span className="text-slate-400 font-mono">
                  {wizardStep * 20}% Completed
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                  style={{ width: `${wizardStep * 20}%` }}
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* ======================================================== */}
            {/* QUESTION 1 OF 5: What are you building? */}
            {/* ======================================================== */}
            {wizardStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    What enterprise are you building?
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Tell us what you&apos;re creating to help us calculate authentic local machinery quotations, daily sales targets, and government grants.
                  </p>
                </div>

                {/* 2-Column Options Grid with Checkbox on Right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {PRESET_TRADES.map((trade) => {
                    const isSelected = !customTradeMode && idea === trade.title;
                    return (
                      <button
                        key={'preset-' + trade.title}
                        type="button"
                        onClick={() => {
                          setCustomTradeMode(false);
                          setIdea(trade.title);
                        }}
                        className={`p-4 sm:p-4.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                        }`}
                      >
                        <div className="pr-3">
                          <div className="font-semibold text-sm text-slate-900">{trade.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5 leading-snug">{trade.sub}</div>
                        </div>
                        <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}

                  {/* Option: Something else / Custom */}
                  <button
                    type="button"
                    onClick={() => {
                      setCustomTradeMode(true);
                      if (PRESET_TRADES.some((t) => t.title === idea)) {
                        setIdea('');
                      }
                    }}
                    className={`p-4 sm:p-4.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer md:col-span-2 ${
                      customTradeMode
                        ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-900">Something else / Custom enterprise trade</div>
                      <div className="text-xs text-slate-500 mt-0.5">Type any specific business, shop, food cart, or workshop concept</div>
                    </div>
                    <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                      customTradeMode
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}>
                      {customTradeMode && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </button>
                </div>

                {/* Custom input box (shows if custom mode is active or to refine chosen idea) */}
                {(customTradeMode || idea) && (
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Your Specified Enterprise Concept
                    </label>
                    <input
                      type="text"
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="e.g. I want to keep dosa shop, Poultry layer farm, Tailoring boutique..."
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium"
                      autoFocus={customTradeMode}
                    />
                  </div>
                )}

                {/* Navigation */}
                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={() => {
                      if (!idea.trim()) {
                        setError('Please select or specify your enterprise concept.');
                        return;
                      }
                      setError(null);
                      setWizardStep(2);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* QUESTION 2 OF 5: Where will your enterprise be located? */}
            {/* ======================================================== */}
            {wizardStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Where will your enterprise operate?
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Your geography dictates raw material supply, local footfall, and government subsidy quota percentages.
                  </p>
                </div>

                {/* District & State Input */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <label className="block text-xs font-semibold text-slate-700 flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-blue-600" />
                    Target District & State (जिला और राज्य)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Madurai, Tamil Nadu (or Nashik, Maharashtra / Varanasi, UP)"
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium"
                  />

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      'Madurai, Tamil Nadu',
                      'Nashik, Maharashtra',
                      'Varanasi, Uttar Pradesh',
                      'Bastar, Chhattisgarh',
                      'Jaipur, Rajasthan',
                      'Patna, Bihar',
                      'Ludhiana, Punjab',
                      'Shimoga, Karnataka',
                    ].map((loc) => (
                      <button
                        key={'loc-' + loc}
                        type="button"
                        onClick={() => setLocation(loc)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                          location === loc
                            ? 'bg-blue-50 border-blue-600 text-blue-700 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area Category: 2-Column Cards with Checkbox */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Area Classification (सब्सिडी श्रेणी)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <button
                      type="button"
                      onClick={() => setAreaType('Rural')}
                      className={`p-4 sm:p-5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        areaType === 'Rural'
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                      }`}
                    >
                      <div className="pr-3">
                        <div className="font-semibold text-sm text-slate-900">Rural Area (Gram Panchayat / Village)</div>
                        <div className="text-xs text-emerald-700 font-medium mt-1">Up to 35% Non-Refundable Subsidy</div>
                        <div className="text-xs text-slate-500 mt-0.5">Highest government capital grant allocation under PMEGP</div>
                      </div>
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        areaType === 'Rural'
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {areaType === 'Rural' && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAreaType('Urban')}
                      className={`p-4 sm:p-5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        areaType === 'Urban'
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                      }`}
                    >
                      <div className="pr-3">
                        <div className="font-semibold text-sm text-slate-900">Urban Area (Municipality / City Limit)</div>
                        <div className="text-xs text-blue-700 font-medium mt-1">Up to 25% PMEGP Subsidy</div>
                        <div className="text-xs text-slate-500 mt-0.5">Higher consumer footfall density and daily transaction speed</div>
                      </div>
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        areaType === 'Urban'
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {areaType === 'Urban' && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="pt-4 flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setWizardStep(1)}
                    className="border-slate-300 text-slate-700 text-xs"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      if (!location.trim()) {
                        setError('Please enter your target district and state.');
                        return;
                      }
                      setError(null);
                      setWizardStep(3);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* QUESTION 3 OF 5: What premises or shop will you operate? */}
            {/* ======================================================== */}
            {wizardStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    What type of premises or shop will you use?
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Select your operating footprint to calculate initial fitout costs and monthly commercial rental overhead.
                  </p>
                </div>

                {/* 2-Column Cards for Premises */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {[
                    {
                      id: 'Roadside Kiosk / Cart' as const,
                      title: 'Mobile Cart / Street Kiosk (ठेला / स्टॉल)',
                      sub: 'Low capital requirement & high location mobility across market junctions',
                    },
                    {
                      id: 'Rented Commercial Space' as const,
                      title: 'Rented Commercial Shop (किराये की दुकान)',
                      sub: 'Permanent storefront in commercial bazaar with shutter and electrical connection',
                    },
                    {
                      id: 'Owned Land / House Front' as const,
                      title: 'Own Property / House Frontage (अपना घर / जमीन)',
                      sub: 'Zero commercial rental expense; ideal for home workshops, agro units & mills',
                    },
                  ].map((premise) => {
                    const isSelected = premisesType === premise.id;
                    return (
                      <button
                        key={'premise-' + premise.id}
                        type="button"
                        onClick={() => setPremisesType(premise.id)}
                        className={`p-4 sm:p-5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                        }`}
                      >
                        <div className="pr-3">
                          <div className="font-semibold text-sm text-slate-900">{premise.title}</div>
                          <div className="text-xs text-slate-500 mt-1 leading-snug">{premise.sub}</div>
                        </div>
                        <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="pt-4 flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setWizardStep(2)}
                    className="border-slate-300 text-slate-700 text-xs"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      setError(null);
                      setWizardStep(4);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* QUESTION 4 OF 5: Margin Capital & Scale */}
            {/* ======================================================== */}
            {wizardStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    What is your available margin capital?
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Under PMEGP and Mudra banking rules, you only need <strong>5% to 10%</strong> from your pocket as promoter equity. Bank loan + government capital subsidy covers the rest!
                  </p>
                </div>

                {/* Capital input box */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      Your Available Starting Margin Money (अपनी पूंजी)
                    </span>
                    <span className="text-xl font-bold font-mono text-blue-700">
                      ₹{budget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <input
                    type="number"
                    step="5000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-mono font-semibold focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />

                  {/* 2-Column quick margin options */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {[
                      { label: '₹25,000 (Micro)', val: 25000 },
                      { label: '₹50,000 (Small)', val: 50000 },
                      { label: '₹80,000', val: 80000 },
                      { label: '₹1.5 Lakhs', val: 150000 },
                    ].map((b) => (
                      <button
                        key={'budget-btn-' + b.val}
                        type="button"
                        onClick={() => setBudget(b.val)}
                        className={`text-xs p-2 rounded-lg border text-center transition-all ${
                          budget === b.val
                            ? 'bg-blue-600 text-white font-bold border-blue-700 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                    <Info className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span>
                      With ₹{budget.toLocaleString('en-IN')} margin, you can unlock up to ₹{((budget * 10) / 100000).toFixed(1)} Lakhs total project outlay.
                    </span>
                  </div>
                </div>

                {/* Scale of operation: 2-Column Cards */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Planned Scale of Operation (व्यापार का पैमाना)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {[
                      {
                        id: 'Micro / Mobile Kiosk' as const,
                        title: 'Micro / Kiosk Unit (1–2 Persons)',
                        sub: 'Basic machinery, low initial capital, fast break-even point',
                      },
                      {
                        id: 'Standard Small Commercial Unit' as const,
                        title: 'Standard Commercial (2–4 Staff)',
                        sub: 'Semi-automated machinery, dedicated commercial storefront',
                      },
                      {
                        id: 'Expanded Facility / Production Plant' as const,
                        title: 'Production Facility (Processing Unit)',
                        sub: 'High throughput processing equipment with regional wholesale reach',
                      },
                    ].map((s) => {
                      const isSelected = businessScale === s.id;
                      return (
                        <button
                          key={'scale-' + s.id}
                          type="button"
                          onClick={() => setBusinessScale(s.id)}
                          className={`p-4 sm:p-5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                          }`}
                        >
                          <div className="pr-3">
                            <div className="font-semibold text-sm text-slate-900">{s.title}</div>
                            <div className="text-xs text-slate-500 mt-1 leading-snug">{s.sub}</div>
                          </div>
                          <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation */}
                <div className="pt-4 flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setWizardStep(3)}
                    className="border-slate-300 text-slate-700 text-xs"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      if (budget < 10000) {
                        setError('Starting margin capital must be at least ₹10,000.');
                        return;
                      }
                      setError(null);
                      setWizardStep(5);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* QUESTION 5 OF 5: Promoter Category & Subsidy */}
            {/* ======================================================== */}
            {wizardStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Which category are you applying under?
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Government MSME schemes provide targeted reservation incentives. Women, SC, ST, and OBC entrepreneurs qualify for up to <strong>35% non-refundable capital subsidy</strong>!
                  </p>
                </div>

                {/* 2-Column Cards for Social Reservation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {[
                    {
                      id: 'Women' as const,
                      title: 'Women Entrepreneur (महिला उद्यमी)',
                      sub: 'Special Category under PMEGP: 35% Rural Subsidy / 5% Margin Money',
                    },
                    {
                      id: 'SC / ST' as const,
                      title: 'SC / ST Community (अनुसूचित जाति/जनजाति)',
                      sub: 'Special Category under PMEGP: 35% Rural Subsidy / 5% Margin Money',
                    },
                    {
                      id: 'OBC / Minorities' as const,
                      title: 'OBC / Religious Minorities (अन्य पिछड़ा वर्ग)',
                      sub: 'Special Category under PMEGP: 35% Rural Subsidy / 5% Margin Money',
                    },
                    {
                      id: 'General' as const,
                      title: 'General Category (सामान्य वर्ग)',
                      sub: 'Standard MSME Category: 25% Rural Subsidy / 10% Margin Money',
                    },
                  ].map((cat) => {
                    const isSelected = entrepreneurCategory === cat.id;
                    return (
                      <button
                        key={'cat-' + cat.id}
                        type="button"
                        onClick={() => setEntrepreneurCategory(cat.id)}
                        className={`p-4 sm:p-5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                        }`}
                      >
                        <div className="pr-3">
                          <div className="font-semibold text-sm text-slate-900">{cat.title}</div>
                          <div className="text-xs text-slate-500 mt-1 leading-snug">{cat.sub}</div>
                        </div>
                        <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Experience Level: 3 Option Cards */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Your Trade Experience Level
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'Beginner / First-Time' as const, label: 'First-Time Starter', sub: 'New to this trade' },
                      { id: 'Experienced (1-3 Years)' as const, label: '1–3 Years Experience', sub: 'Prior worker or apprentice' },
                      { id: 'Skilled / Artisan' as const, label: 'Skilled Artisan / Master', sub: 'Deep trade proficiency' },
                    ].map((exp) => {
                      const isSelected = experienceLevel === exp.id;
                      return (
                        <button
                          key={'exp-' + exp.id}
                          type="button"
                          onClick={() => setExperienceLevel(exp.id)}
                          className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-xs text-slate-900">{exp.label}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{exp.sub}</div>
                          </div>
                          <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation: Submit Appraisal */}
                <div className="pt-4 flex items-center justify-between border-t border-slate-200">
                  <Button
                    variant="outline"
                    onClick={() => setWizardStep(4)}
                    className="border-slate-300 text-slate-700 text-xs"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    onClick={handleExecuteAppraisal}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-7 py-3 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    <span>Generate Project Report (DPR)</span>
                  </Button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 6: UNDERWRITING EXECUTION SCREEN (PROGRESS TRACKER) */}
        {/* ============================================================ */}
        {wizardStep === 6 && (
          <div className="max-w-xl mx-auto py-12 text-center space-y-6">
            <div className="h-16 w-16 mx-auto rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <RefreshCw className="h-8 w-8 animate-spin" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Appraising Your Project: {idea}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Analyzing factor costs in {location} and querying government scheme quotas...
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs text-left space-y-3">
              {[
                { label: 'Stage 1: Decomposing customer catchment & local competition', stage: 0 },
                { label: 'Stage 2: Sourcing domain machinery & equipment quotations', stage: 1 },
                { label: 'Stage 3: Structuring PMEGP, Mudra & PM SVANidhi subsidy', stage: 2 },
                { label: 'Stage 4: Verifying bankable Debt Service Coverage (DSCR)', stage: 3 },
                { label: 'Stage 5: Formulating bankable Detailed Project Report (DPR)', stage: 4 },
              ].map((s) => {
                const isPassed = progressStage > s.stage;
                const isCurrent = progressStage === s.stage;
                return (
                  <div key={'stage-progress-' + s.stage} className="flex items-center space-x-3 text-xs">
                    {isPassed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <RefreshCw className="h-4 w-4 text-blue-600 animate-spin shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className={isPassed ? 'text-slate-900 font-medium' : isCurrent ? 'text-blue-700 font-bold' : 'text-slate-400'}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 7: OUTPUT REPORT PAGE (STRUCTURED TABBED VIEW) */}
        {/* ============================================================ */}
        {wizardStep === 7 && result && (
          <div className="space-y-6">
            
            {/* INLINE QUICK PARAMETER REFINER (Allows updating details anytime!) */}
            {showQuickRefiner && (
              <div className="p-5 rounded-xl bg-blue-50/80 border border-blue-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                  <div className="flex items-center space-x-2">
                    <Edit3 className="h-4 w-4 text-blue-700" />
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Quick Parameter Refiner — Adjust & Re-Appraise
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQuickRefiner(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 font-semibold"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Your Margin (₹)</label>
                    <input
                      type="number"
                      step="5000"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-mono text-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Location (District, State)</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Area Sector</label>
                    <select
                      value={areaType}
                      onChange={(e) => setAreaType(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900"
                    >
                      <option value="Rural">Rural (Gram Panchayat - 35% Max Subsidy)</option>
                      <option value="Urban">Urban (Municipality - 25% Max Subsidy)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Scale of Venture</label>
                    <select
                      value={businessScale}
                      onChange={(e) => setBusinessScale(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900"
                    >
                      <option value="Micro / Mobile Kiosk">Micro / Mobile Kiosk</option>
                      <option value="Standard Small Commercial Unit">Standard Small Commercial</option>
                      <option value="Expanded Facility / Production Plant">Expanded Production Plant</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuickRefiner(false);
                      setWizardStep(1);
                    }}
                    className="text-xs text-blue-700 hover:underline flex items-center font-medium"
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Open 5-Question Guided Questionnaire
                  </button>

                  <Button
                    size="sm"
                    onClick={handleExecuteAppraisal}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Re-Calculate DPR Instantly
                  </Button>
                </div>
              </div>
            )}

            {/* Project Executive Headline Card */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                    Formal Detailed Project Report (DPR)
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{result.ventureName}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">📍 {location}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">🏡 {areaType} Sector</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      👤 {entrepreneurCategory} Category
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">🏪 {premisesType}</span>
                    <button
                      type="button"
                      onClick={() => setShowQuickRefiner(!showQuickRefiner)}
                      className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
                    >
                      <Edit3 className="h-3 w-3" /> Edit
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>DSCR: {result.economics.dscr}x (Bank Approved)</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center space-x-1.5">
                    <Coins className="h-4 w-4 text-blue-600" />
                    <span>{result.schemes[0]?.subsidyPercent}% Grant (₹{(result.schemes[0]?.subsidyAmount / 100000).toFixed(2)}L)</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed max-w-4xl">
                {result.executiveSummary}
              </p>
            </div>

            {/* Structured Tabbed Navigation Bar */}
            <div className="border-b border-slate-200 bg-white rounded-t-xl px-4 flex space-x-1 overflow-x-auto shadow-2xs">
              {[
                { id: 'summary' as const, label: 'Capital & Loan', icon: IndianRupee },
                { id: 'equipment' as const, label: 'Machinery & Setup', icon: Calculator },
                { id: 'economics' as const, label: 'Daily Profit & Sales', icon: TrendingUp },
                { id: 'schemes' as const, label: 'Govt Subsidies', icon: Coins },
                { id: 'compliance' as const, label: 'Licenses & Action Plan', icon: CheckSquare },
                { id: 'simulator' as const, label: 'What-If Simulator', icon: Sliders },
                { id: 'copilot' as const, label: 'Advisory Copilot', icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeReportTab === tab.id;
                return (
                  <button
                    key={'dpr-tab-' + tab.id}
                    onClick={() => setActiveReportTab(tab.id)}
                    className={`flex items-center space-x-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition-all shrink-0 ${
                      isActive
                        ? 'border-blue-600 text-blue-600 bg-blue-50/40'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT 1: CAPITAL & LOAN BREAKDOWN */}
            {activeReportTab === 'summary' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Total Project Cost (CAPEX)</div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">
                      ₹{(result.economics.capex / 100000).toFixed(2)} Lakhs
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Complete setup & equipment</div>
                  </div>

                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Your Margin Money</div>
                    <div className="text-2xl font-bold text-blue-700 font-mono">
                      ₹{(result.economics.marginEquity / 100000).toFixed(2)} Lakhs
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {Math.round((result.economics.marginEquity / result.economics.capex) * 100)}% Your Own Investment
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Govt Subsidy (Grant)</div>
                    <div className="text-2xl font-bold text-emerald-700 font-mono">
                      ₹{(result.schemes[0]?.subsidyAmount / 100000).toFixed(2)} Lakhs
                    </div>
                    <div className="text-[11px] text-emerald-700 mt-1 font-medium">
                      {result.schemes[0]?.subsidyPercent}% Non-Repayable
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Monthly Bank EMI</div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">
                      ₹{result.economics.monthlyEmi.toLocaleString('en-IN')}/mo
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      5-Year Concessional Tenure
                    </div>
                  </div>
                </div>

                {/* Means of Finance Table */}
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Means of Finance & Capital Structure</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-2.5">Capital Source</th>
                          <th className="px-4 py-2.5">Share (%)</th>
                          <th className="px-4 py-2.5">Amount (INR)</th>
                          <th className="px-4 py-2.5">Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="px-4 py-3 font-semibold text-slate-900">Promoter Margin Contribution</td>
                          <td className="px-4 py-3 font-mono">{Math.round((result.economics.marginEquity / result.economics.capex) * 100)}%</td>
                          <td className="px-4 py-3 font-mono font-bold text-blue-700">₹{result.economics.marginEquity.toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3 text-slate-500">From personal savings</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-semibold text-slate-900">Government Capital Subsidy Claim</td>
                          <td className="px-4 py-3 font-mono">{result.schemes[0]?.subsidyPercent}%</td>
                          <td className="px-4 py-3 font-mono font-bold text-emerald-700">₹{result.schemes[0]?.subsidyAmount.toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3 text-slate-500">Non-dilutive capital grant ({result.schemes[0]?.code})</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-semibold text-slate-900">Commercial Bank Term Loan</td>
                          <td className="px-4 py-3 font-mono">{100 - Math.round((result.economics.marginEquity / result.economics.capex) * 100)}%</td>
                          <td className="px-4 py-3 font-mono font-bold text-slate-900">₹{result.economics.loanAmount.toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3 text-slate-500">Collateral-free facility under CGTMSE / Mudra</td>
                        </tr>
                        <tr className="bg-slate-50/80 font-bold">
                          <td className="px-4 py-3 text-slate-900">Total Project Outlay (100%)</td>
                          <td className="px-4 py-3 font-mono">100%</td>
                          <td className="px-4 py-3 font-mono text-slate-900">₹{result.economics.capex.toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3 text-slate-500">Ready for Bank Sanction</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: DYNAMIC MACHINERY & EQUIPMENT LIST */}
            {activeReportTab === 'equipment' && (
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Itemized Machinery & Setup Quotations</h3>
                    <p className="text-xs text-slate-500">Specific commercial equipment required for &ldquo;{result.ventureName}&rdquo;</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    Total: ₹{(result.economics.capex / 100000).toFixed(2)} Lakhs
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2.5">S.No</th>
                        <th className="px-4 py-2.5">Equipment / Machine Item</th>
                        <th className="px-4 py-2.5">Specification / Capacity</th>
                        <th className="px-4 py-2.5 text-right">Estimated Cost (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {result.economics.capexBreakdown.map((item, idx) => (
                        <tr key={'capex-item-' + item.item + '-' + idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-mono text-slate-400">{idx + 1}</td>
                          <td className="px-4 py-3 font-semibold text-slate-900">{item.item}</td>
                          <td className="px-4 py-3 text-slate-500">{item.specification}</td>
                          <td className="px-4 py-3 font-mono font-bold text-slate-900 text-right">
                            ₹{item.amount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-lg bg-blue-50/60 border border-blue-200 text-xs text-blue-800">
                  <strong>Bank Note:</strong> Invoices and quotation receipts for these items must be submitted to your nodal financing branch for direct disbursement to equipment vendors.
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: DAILY PROFIT & UNIT ECONOMICS */}
            {activeReportTab === 'economics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Unit Production Pricing</div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">
                      ₹{result.economics.unitPrice} <span className="text-xs font-normal text-slate-500">/ {result.economics.itemUnitName}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Raw ingredient cost: ₹{result.economics.unitCost}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Daily Sales Target</div>
                    <div className="text-2xl font-bold text-blue-700 font-mono">
                      {result.economics.dailySalesTarget} <span className="text-xs font-normal text-slate-500">{result.economics.itemUnitName}s/day</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Monthly gross revenue: ₹{result.economics.monthlyRevenue.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-xs text-slate-500 mb-1 font-medium">Daily Break-Even Target</div>
                    <div className="text-2xl font-bold text-emerald-700 font-mono">
                      {result.economics.dailyBreakEvenTarget} <span className="text-xs font-normal text-slate-500">{result.economics.itemUnitName}s/day</span>
                    </div>
                    <div className="text-xs text-emerald-700 mt-1 font-medium">
                      All units sold above {result.economics.dailyBreakEvenTarget}/day are pure net profit!
                    </div>
                  </div>
                </div>

                {/* Monthly OPEX breakdown */}
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Monthly Operating Expenses (OPEX)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.economics.opexBreakdown.map((opex, idx) => (
                      <div key={'opex-item-' + opex.item + '-' + idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                        <span className="text-slate-700 font-medium">{opex.item}</span>
                        <span className="font-mono font-bold text-slate-900">₹{opex.amount.toLocaleString('en-IN')}/mo</span>
                      </div>
                    ))}
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex justify-between items-center text-xs sm:col-span-2">
                      <span className="text-blue-900 font-bold">Monthly Debt Servicing (Bank EMI)</span>
                      <span className="font-mono font-bold text-blue-900">₹{result.economics.monthlyEmi.toLocaleString('en-IN')}/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: GOVERNMENT SCHEMES & SUBSIDIES */}
            {activeReportTab === 'schemes' && (
              <div className="space-y-4">
                {result.schemes.map((scheme) => (
                  <div
                    key={'scheme-card-' + scheme.code}
                    className={`p-5 rounded-xl border transition-all ${
                      scheme.eligibilityVerdict === 'HIGHLY_RECOMMENDED'
                        ? 'bg-emerald-50/50 border-emerald-200 shadow-xs'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/80">
                      <div>
                        <span className="font-bold text-sm text-slate-900">{scheme.name}</span>
                        <span className="ml-2 text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-semibold">
                          {scheme.interestRate}
                        </span>
                      </div>
                      {scheme.subsidyPercent > 0 && (
                        <span className="text-xs font-bold font-mono px-3 py-1 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                          {scheme.subsidyPercent}% Non-Refundable Subsidy
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 mb-4">{scheme.keyReason}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono bg-white p-3 rounded-lg border border-slate-200 mb-4">
                      <div>Eligible Bank Loan: <strong className="text-slate-900">₹{(scheme.eligibleLoan / 100000).toFixed(2)}L</strong></div>
                      <div>Your Margin: <strong className="text-blue-700">₹{(scheme.marginRequired / 100000).toFixed(2)}L</strong></div>
                      {scheme.subsidyAmount > 0 && (
                        <div className="text-emerald-700 font-bold">
                          Govt Subsidy: ₹{(scheme.subsidyAmount / 100000).toFixed(2)}L
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-slate-800 mb-2">Required Application Documents:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                        {scheme.documentsRequired.map((doc, i) => (
                          <div key={'scheme-doc-' + scheme.code + '-' + i} className="flex items-center space-x-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 5: LICENSES & 4-PHASE MILESTONES */}
            {activeReportTab === 'compliance' && (
              <div className="space-y-6">
                {/* Statutory Licenses */}
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Statutory Government Licenses Required</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-2.5">License / Registration</th>
                          <th className="px-4 py-2.5">Issuing Authority</th>
                          <th className="px-4 py-2.5">Processing Time</th>
                          <th className="px-4 py-2.5">Timeline Requirement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {result.licenses.map((lic, idx) => (
                          <tr key={'lic-row-' + lic.name + '-' + idx} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-semibold text-slate-900">{lic.name}</td>
                            <td className="px-4 py-3 text-slate-500">{lic.authority}</td>
                            <td className="px-4 py-3 font-mono">{lic.timelineDays} Days</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                                lic.criticality.includes('Mandatory')
                                  ? 'bg-red-50 text-red-700 border border-red-200'
                                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                              }`}>
                                {lic.criticality}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4 Phase Execution Roadmap */}
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">Phased Execution Roadmap</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.suggestedMilestones.map((m, idx) => (
                      <div key={'milestone-' + m.phase + '-' + idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-blue-700">{m.phase}</span>
                          <span className="text-[11px] text-slate-500 font-medium">Stage {idx + 1}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900">{m.title}</div>
                        <p className="text-xs text-slate-600 pt-1 leading-relaxed">{m.target}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 6: INTERACTIVE WHAT-IF SENSITIVITY SIMULATOR */}
            {activeReportTab === 'simulator' && (
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Multi-Variable Sensitivity & Stress Simulator
                    </h3>
                    <p className="text-xs text-slate-500">
                      Drag sliders to test what happens if sales increase, prices shift, or raw material costs rise.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSimVolumeMultiplier(100);
                        setSimPriceChangePct(0);
                        setSimCostInflationPct(0);
                      }}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                    >
                      Base Case (100%)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSimVolumeMultiplier(75);
                        setSimPriceChangePct(-5);
                        setSimCostInflationPct(15);
                      }}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                    >
                      Downside Stress
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSimVolumeMultiplier(130);
                        setSimPriceChangePct(10);
                        setSimCostInflationPct(0);
                      }}
                      className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                    >
                      Expansion (+30%)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                        <span>Daily Sales Volume Multiplier</span>
                        <span className="font-mono text-blue-700 font-bold">{simVolumeMultiplier}% ({Math.round(result.economics.dailySalesTarget * (simVolumeMultiplier / 100))} {result.economics.itemUnitName}s/day)</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="180"
                        step="5"
                        value={simVolumeMultiplier}
                        onChange={(e) => setSimVolumeMultiplier(Number(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                        <span>Selling Price per {result.economics.itemUnitName}</span>
                        <span className="font-mono text-blue-700 font-bold">
                          {simPriceChangePct >= 0 ? `+${simPriceChangePct}%` : `${simPriceChangePct}%`} (₹{simUnitPrice})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="-30"
                        max="40"
                        step="5"
                        value={simPriceChangePct}
                        onChange={(e) => setSimPriceChangePct(Number(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                        <span>Raw Material / Ingredient Inflation</span>
                        <span className="font-mono text-amber-700 font-bold">+{simCostInflationPct}% (₹{simUnitCost}/unit cost)</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        step="5"
                        value={simCostInflationPct}
                        onChange={(e) => setSimCostInflationPct(Number(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Recalculated stress box */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3">
                        Simulated Monthly State
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-500">Net Monthly Profit</div>
                          <div className={`text-xl font-bold font-mono ${simNetProfit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                            {simNetProfit >= 0 ? `+₹${Math.round(simNetProfit).toLocaleString('en-IN')}` : `-₹${Math.abs(Math.round(simNetProfit)).toLocaleString('en-IN')}`}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-slate-500">Break-Even Units / Day</div>
                          <div className="text-base font-bold font-mono text-slate-900">
                            {Math.ceil(simBreakEvenUnits / 26)} {result.economics.itemUnitName}s/day
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-slate-500">Stress Debt Service (DSCR)</div>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className={`text-lg font-bold font-mono ${simDscr >= 1.4 ? 'text-emerald-700' : simDscr >= 1.1 ? 'text-amber-700' : 'text-red-700'}`}>
                              {simDscr}x
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                              simDscr >= 1.4 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {simDscr >= 1.4 ? 'Bank Approved' : 'Tight Margin'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] bg-white p-2.5 rounded border border-slate-200 text-slate-600">
                      {simDscr >= 1.25 ? (
                        <span className="text-emerald-800 font-medium">✓ Enterprise remains solvent and easily pays monthly bank EMI.</span>
                      ) : (
                        <span className="text-amber-800 font-medium">⚠ Debt servicing will require tighter cost management.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 7: ADVISORY COPILOT */}
            {activeReportTab === 'copilot' && (
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Credit Appraisal Advisory Copilot</h3>
                    <p className="text-xs text-slate-500">Ask any question grounded directly in your {result.ventureName} project report.</p>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Grounded in DPR
                  </span>
                </div>

                <div className="h-64 overflow-y-auto space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={'chat-msg-' + idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xl p-3.5 rounded-xl ${
                          msg.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center space-x-2">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-600" />
                        <span>Reviewing scheme rules & bank criteria...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    'How do I file the PMEGP application online?',
                    'Can I increase the loan tenure from 5 to 7 years?',
                    'What licenses are mandatory before opening?',
                    'How can I lower initial machinery CAPEX?',
                  ].map((chip) => (
                    <button
                      key={'chat-chip-' + chip}
                      type="button"
                      onClick={() => setChatInput(chip)}
                      className="text-[11px] px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about machinery vendors, subsidy disbursement, or bank paperwork..."
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                  <Button
                    type="submit"
                    disabled={isChatLoading || !chatInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-xs font-semibold"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default function AgentStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-slate-600">
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
            <span>Loading Project Feasibility Studio...</span>
          </div>
        </div>
      }
    >
      <AgentStudioContent />
    </Suspense>
  );
}
