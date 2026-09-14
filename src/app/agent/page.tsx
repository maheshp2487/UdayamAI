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
  Sliders, 
  FileText, 
  Coins, 
  Calculator, 
  CheckSquare, 
  MapPin, 
  IndianRupee,
  Check,
  Edit3,
  Bookmark,
  Info,
  Globe,
  PieChart as PieIcon,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Printer
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip, 
  Legend as RechartsLegend,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { AgentResult } from '@/lib/agent/types';
import { Language, translations } from '@/lib/i18n/translations';
import { FloatingCopilot } from '@/components/ui/FloatingCopilot';

// Preset trades for Question 1
const PRESET_TRADES = [
  { 
    title: 'Dosa & Fast Food Tiffin Stall', 
    sub: 'Commercial bhatti, wet grinder, and mobile food cart',
    subHi: 'कमर्शियल डोसा भट्टी, ग्राइंडर और स्टेनलेस स्टील फूड कार्ट',
    subTa: 'வணிக தோசை பட்டி, கிரைண்டர் மற்றும் நடமாடும் உணவு வண்டி',
  },
  { 
    title: 'Solar Powered Cold Storage (5 MT)', 
    sub: 'Farm-gate solar refrigerated room for perishables',
    subHi: 'खेत पर सौर ऊर्जा चालित कोल्ड स्टोरेज कमरा',
    subTa: 'பண்ணைக்கான சோலார் குளிர்பதன சேமிப்பு கிடங்கு',
  },
  { 
    title: 'Organic Dairy & A2 Milk Unit', 
    sub: '5 Gir cows, milk chilling containers, and local delivery',
    subHi: '5 गिर गाय, दूध चिलिंग कंटेनर और स्थानीय वितरण',
    subTa: '5 கிர் பசுக்கள், பால் குளிர்விப்பான் மற்றும் உள்ளூர் விநியோகம்',
  },
  { 
    title: 'Automated Handloom Silk Weaving', 
    sub: 'Pneumatic jacquard loom for high-throughput traditional sarees',
    subHi: 'पारंपरिक साड़ियों के लिए स्वचालित जैकार्ड हथकरघा',
    subTa: 'பாரம்பரிய பட்டு சேலைகளுக்கான நவீன தானியங்கி தறி',
  },
  { 
    title: 'Daily Needs Kirana & FMCG Retail', 
    sub: 'Village retail store with digital billing & refrigeration',
    subHi: 'डिजिटल बिलिंग और फ्रिज युक्त किराना स्टोर',
    subTa: 'டிஜிட்டல் பில்லிங் வசதியுடன் கூடிய கிராமப்புற மளிகை கடை',
  },
  { 
    title: 'Areca Palm Biodegradable Tableware', 
    sub: 'Hydraulic heated presses converting palm leaves to plates',
    subHi: 'सुपारी पत्तों से प्लेट और दोना बनाने की हाइड्रोलिक मशीन',
    subTa: 'பாக்கு மட்டை தட்டு தயாரிக்கும் ஹைட்ராலிக் இயந்திரம்',
  },
  { 
    title: 'Spice & Grain Mini Milling Unit', 
    sub: 'Pulverizer, destoner & nitrogen pouch packaging',
    subHi: 'मसाला चक्की, पल्वराइजर और पाउच पैकिंग मशीन',
    subTa: 'மசாலா மற்றும் தானிய அரைக்கும் இயந்திர அலகு',
  },
  { 
    title: 'Mobile Phone Hardware Repair & CSC', 
    sub: 'SMD rework station, screen separator & digital kiosk',
    subHi: 'मोबाइल रिपेयरिंग और ग्राहक सेवा केंद्र (CSC)',
    subTa: 'செல்போன் பழுதுநீக்கம் மற்றும் டிஜிட்டல் சேவை மையம்',
  },
];

function AgentStudioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Language state (persists in localStorage)
  const [language, setLanguage] = useState<Language>('en');

  // Wizard Step State: 1 to 5 = Questions, 6 = Underwriting Execution, 7 = Output DPR
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [activeReportTab, setActiveReportTab] = useState<'summary' | 'equipment' | 'economics' | 'schemes' | 'swot' | 'timeline' | 'simulator'>('summary');
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

  // Load language from localStorage & listen for changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('udayam_language') as Language;
      if (stored === 'en' || stored === 'hi' || stored === 'ta') {
        setLanguage(stored);
      }

      const handleLangChange = (e: any) => {
        if (e.detail && (e.detail === 'en' || e.detail === 'hi' || e.detail === 'ta')) {
          setLanguage(e.detail);
        }
      };

      window.addEventListener('udayam_language_changed', handleLangChange);
      return () => window.removeEventListener('udayam_language_changed', handleLangChange);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('udayam_language', newLang);
      window.dispatchEvent(new CustomEvent('udayam_language_changed', { detail: newLang }));
    }
  };

  const t = translations[language] || translations.en;

  // Pre-populate if query params provided
  useEffect(() => {
    const qIdea = searchParams.get('idea');
    if (qIdea) {
      setIdea(qIdea);
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
          language,
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
      setError(language === 'hi' ? 'कृपया प्रश्न 1 में अपने व्यवसाय का विचार चुनें या लिखें।' : 'Please specify your enterprise idea in Question 1.');
      setWizardStep(1);
      return;
    }
    if (!location.trim()) {
      setError(language === 'hi' ? 'कृपया प्रश्न 2 में अपना जिला और राज्य दर्ज करें।' : 'Please provide your target district and state in Question 2.');
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
          language,
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
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error(err);
      setError(err.message || 'Failed to complete project appraisal');
      setWizardStep(5);
    } finally {
      setIsLoading(false);
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

  // Visual Chart Data Preparation
  const capitalChartData = result ? [
    { name: t.legendMargin, value: result.economics.marginEquity, color: '#d97706' }, // Amber Gold
    { name: t.legendGrant, value: result.schemes[0]?.subsidyAmount || 0, color: '#059669' }, // Emerald
    { name: t.legendLoan, value: result.economics.loanAmount, color: '#1e293b' }, // Slate Dark
  ] : [];

  const monthlyCashflowData = result ? [
    {
      name: language === 'hi' ? 'मासिक आमदनी' : language === 'ta' ? 'மாதாந்திர வரவு' : 'Sales Revenue',
      amount: result.economics.monthlyRevenue,
      fill: '#2563eb', // Blue
    },
    {
      name: language === 'hi' ? 'कच्चा माल' : language === 'ta' ? 'மூலப்பொருள்' : 'Raw Materials',
      amount: Math.round(result.economics.unitCost * result.economics.dailySalesTarget * 26),
      fill: '#f59e0b', // Amber
    },
    {
      name: language === 'hi' ? 'दुकान खर्च' : language === 'ta' ? 'கடை செலவு' : 'Fixed OPEX',
      amount: Math.round(result.economics.monthlyOpex * 0.4),
      fill: '#64748b', // Slate
    },
    {
      name: language === 'hi' ? 'बैंक किश्त (EMI)' : language === 'ta' ? 'வங்கி தவணை' : 'Bank EMI',
      amount: result.economics.monthlyEmi,
      fill: '#7c3aed', // Purple
    },
    {
      name: language === 'hi' ? 'शुद्ध बचत (मुनाफा)' : language === 'ta' ? 'நிகர லாபம்' : 'Take-Home Profit',
      amount: Math.round(result.economics.monthlyRevenue - result.economics.monthlyOpex - result.economics.monthlyEmi),
      fill: '#059669', // Emerald
    },
  ] : [];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/70 text-slate-900 pb-28">
      
      {/* Studio Top Navigation Bar in Warm Amber */}
      <div className="border-b border-amber-200/80 bg-white/95 backdrop-blur-md sticky top-16 z-30 py-3.5 shadow-2xs">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-xs ring-2 ring-amber-100">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
                <span>{t.navFeasibility}</span>
              </h1>
              <p className="text-xs text-amber-900/70 hidden sm:block">
                {language === 'hi' ? 'SBI, PMEGP एवं मुद्रा बैंक लोन स्वीकृति के अनुरूप' : language === 'ta' ? 'SBI, PMEGP மற்றும் முத்ரா வங்கி கடன் அங்கீகாரத்திற்கு ஏற்றது' : 'Approved for SBI, PMEGP, and Mudra Bank Loans'}
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
                className="bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 text-xs h-8 font-semibold shadow-2xs"
              >
                <Edit3 className="h-3.5 w-3.5 mr-1 text-amber-700" />
                <span className="hidden sm:inline">{showQuickRefiner ? 'Close Refiner' : t.btnModifyInputs}</span>
                <span className="sm:hidden">{showQuickRefiner ? 'Close' : 'Edit'}</span>
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
                <span>{savedSuccess ? 'Saved!' : t.btnSaveDPR}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="bg-white border-slate-300 text-slate-700 hover:bg-slate-100 text-xs h-8"
              >
                <FileText className="h-3.5 w-3.5 mr-1" />
                <span className="hidden sm:inline">{t.btnPrintDPR}</span>
                <span className="sm:hidden">Print</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl pt-6">

        {/* ============================================================ */}
        {/* 5-QUESTION ONBOARDING QUESTIONNAIRE (STEPS 1 - 5) */}
        {/* Matches the user's reference design layout */}
        {/* ============================================================ */}
        {wizardStep <= 5 && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Top Language Switcher Card on Question 1 */}
            {wizardStep === 1 && (
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center space-x-2 text-amber-900 text-xs font-bold">
                  <Globe className="h-4 w-4 text-amber-700" />
                  <span>{t.selectLanguage}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  {[
                    { code: 'en' as const, label: 'English' },
                    { code: 'hi' as const, label: 'हिन्दी (Hindi)' },
                    { code: 'ta' as const, label: 'தமிழ் (Tamil)' },
                  ].map((l) => (
                    <button
                      key={'lang-btn-' + l.code}
                      type="button"
                      onClick={() => changeLanguage(l.code)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        language === l.code
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white border border-amber-200 text-amber-900 hover:bg-amber-100/60'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Bar & Question Indicator in Amber/Emerald */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-amber-700 font-mono tracking-widest uppercase font-bold">
                  {t.questionTag(wizardStep, 5)}
                </span>
                <span className="text-slate-400 font-mono">
                  {t.completedPct(wizardStep * 20)}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 rounded-full"
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
                    {t.q1Title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {t.q1Subtitle}
                  </p>
                </div>

                {/* 2-Column Options Grid with Checkbox on Right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {PRESET_TRADES.map((trade) => {
                    const isSelected = !customTradeMode && idea === trade.title;
                    const subText = language === 'hi' ? trade.subHi : language === 'ta' ? trade.subTa : trade.sub;
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
                            ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                            : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 shadow-2xs'
                        }`}
                      >
                        <div className="pr-3">
                          <div className="font-semibold text-sm text-slate-900">{trade.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5 leading-snug">{subText}</div>
                        </div>
                        <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-amber-600 bg-amber-600 text-white'
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
                        ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                        : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-900">{t.q1CustomOption}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{t.q1CustomOptionSub}</div>
                    </div>
                    <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                      customTradeMode
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}>
                      {customTradeMode && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                    </div>
                  </button>
                </div>

                {/* Custom input box */}
                {(customTradeMode || idea) && (
                  <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-2">
                    <label className="block text-xs font-semibold text-amber-950">
                      {language === 'hi' ? 'आपके व्यवसाय का नाम:' : language === 'ta' ? 'உங்கள் தொழில் பெயர்:' : 'Your Specified Enterprise Concept:'}
                    </label>
                    <input
                      type="text"
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder={t.q1Placeholder}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 font-medium"
                      autoFocus={customTradeMode}
                    />
                  </div>
                )}

                {/* Navigation */}
                <div className="pt-4 flex justify-end">
                  <Button
                    onClick={() => {
                      if (!idea.trim()) {
                        setError(language === 'hi' ? 'कृपया अपना व्यवसाय चुनें या लिखें।' : 'Please select or specify your enterprise concept.');
                        return;
                      }
                      setError(null);
                      setWizardStep(2);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <span>{t.btnContinue}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* QUESTION 2 OF 5: Location & Area */}
            {/* ======================================================== */}
            {wizardStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {t.q2Title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {t.q2Subtitle}
                  </p>
                </div>

                {/* District & State Input */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <label className="block text-xs font-semibold text-slate-700 flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-amber-600" />
                    {t.q2DistrictLabel}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.q2DistrictPlaceholder}
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 font-medium"
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
                            ? 'bg-amber-50 border-amber-600 text-amber-900 font-semibold'
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
                    {t.q2AreaLabel}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <button
                      type="button"
                      onClick={() => setAreaType('Rural')}
                      className={`p-4 sm:p-5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        areaType === 'Rural'
                          ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                          : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 shadow-2xs'
                      }`}
                    >
                      <div className="pr-3">
                        <div className="font-semibold text-sm text-slate-900">{t.q2RuralTitle}</div>
                        <div className="text-xs text-emerald-700 font-medium mt-1">{t.q2RuralBadge}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{t.q2RuralSub}</div>
                      </div>
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        areaType === 'Rural'
                          ? 'border-amber-600 bg-amber-600 text-white'
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
                          ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                          : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 shadow-2xs'
                      }`}
                    >
                      <div className="pr-3">
                        <div className="font-semibold text-sm text-slate-900">{t.q2UrbanTitle}</div>
                        <div className="text-xs text-blue-700 font-medium mt-1">{t.q2UrbanBadge}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{t.q2UrbanSub}</div>
                      </div>
                      <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        areaType === 'Urban'
                          ? 'border-amber-600 bg-amber-600 text-white'
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
                    {t.btnBack}
                  </Button>
                  <Button
                    onClick={() => {
                      if (!location.trim()) {
                        setError(language === 'hi' ? 'कृपया अपना जिला और राज्य दर्ज करें।' : 'Please enter your target district and state.');
                        return;
                      }
                      setError(null);
                      setWizardStep(3);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <span>{t.btnContinue}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* QUESTION 3 OF 5: Premises & Shop Setup */}
            {/* ======================================================== */}
            {wizardStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {t.q3Title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {t.q3Subtitle}
                  </p>
                </div>

                {/* 2-Column Cards for Premises */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {[
                    {
                      id: 'Roadside Kiosk / Cart' as const,
                      title: t.q3KioskTitle,
                      sub: t.q3KioskSub,
                    },
                    {
                      id: 'Rented Commercial Space' as const,
                      title: t.q3ShopTitle,
                      sub: t.q3ShopSub,
                    },
                    {
                      id: 'Owned Land / House Front' as const,
                      title: t.q3HomeTitle,
                      sub: t.q3HomeSub,
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
                            ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                            : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 shadow-2xs'
                        }`}
                      >
                        <div className="pr-3">
                          <div className="font-semibold text-sm text-slate-900">{premise.title}</div>
                          <div className="text-xs text-slate-500 mt-1 leading-snug">{premise.sub}</div>
                        </div>
                        <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-amber-600 bg-amber-600 text-white'
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
                    {t.btnBack}
                  </Button>
                  <Button
                    onClick={() => {
                      setError(null);
                      setWizardStep(4);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <span>{t.btnContinue}</span>
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
                    {t.q4Title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {t.q4Subtitle}
                  </p>
                </div>

                {/* Capital input box */}
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      {t.q4BudgetLabel}
                    </span>
                    <span className="text-xl font-bold font-mono text-amber-700">
                      ₹{budget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <input
                    type="number"
                    step="5000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 font-mono font-semibold focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
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
                            ? 'bg-amber-600 text-white font-bold border-amber-700 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                    <Info className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>{t.q4BudgetTip}</span>
                  </div>
                </div>

                {/* Scale of operation: 2-Column Cards */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    {t.q4ScaleLabel}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {[
                      {
                        id: 'Micro / Mobile Kiosk' as const,
                        title: t.q4ScaleMicroTitle,
                        sub: t.q4ScaleMicroSub,
                      },
                      {
                        id: 'Standard Small Commercial Unit' as const,
                        title: t.q4ScaleStandardTitle,
                        sub: t.q4ScaleStandardSub,
                      },
                      {
                        id: 'Expanded Facility / Production Plant' as const,
                        title: t.q4ScaleFacilityTitle,
                        sub: t.q4ScaleFacilitySub,
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
                              ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                              : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 shadow-2xs'
                          }`}
                        >
                          <div className="pr-3">
                            <div className="font-semibold text-sm text-slate-900">{s.title}</div>
                            <div className="text-xs text-slate-500 mt-1 leading-snug">{s.sub}</div>
                          </div>
                          <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'border-amber-600 bg-amber-600 text-white'
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
                    {t.btnBack}
                  </Button>
                  <Button
                    onClick={() => {
                      if (budget < 10000) {
                        setError(language === 'hi' ? 'शुरुआती मार्जिन पूंजी कम से कम ₹10,000 होनी चाहिए।' : 'Starting margin capital must be at least ₹10,000.');
                        return;
                      }
                      setError(null);
                      setWizardStep(5);
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <span>{t.btnContinue}</span>
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
                    {t.q5Title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {t.q5Subtitle}
                  </p>
                </div>

                {/* 2-Column Cards for Social Reservation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {[
                    {
                      id: 'Women' as const,
                      title: t.q5WomenTitle,
                      sub: t.q5WomenSub,
                    },
                    {
                      id: 'SC / ST' as const,
                      title: t.q5ScStTitle,
                      sub: t.q5ScStSub,
                    },
                    {
                      id: 'OBC / Minorities' as const,
                      title: t.q5ObcTitle,
                      sub: t.q5ObcSub,
                    },
                    {
                      id: 'General' as const,
                      title: t.q5GenTitle,
                      sub: t.q5GenSub,
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
                            ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                            : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/30 shadow-2xs'
                        }`}
                      >
                        <div className="pr-3">
                          <div className="font-semibold text-sm text-slate-900">{cat.title}</div>
                          <div className="text-xs text-slate-500 mt-1 leading-snug">{cat.sub}</div>
                        </div>
                        <div className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'border-amber-600 bg-amber-600 text-white'
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
                    {t.q5ExpLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'Beginner / First-Time' as const, label: t.q5ExpBeginner },
                      { id: 'Experienced (1-3 Years)' as const, label: t.q5ExpExperienced },
                      { id: 'Skilled / Artisan' as const, label: t.q5ExpArtisan },
                    ].map((exp) => {
                      const isSelected = experienceLevel === exp.id;
                      return (
                        <button
                          key={'exp-' + exp.id}
                          type="button"
                          onClick={() => setExperienceLevel(exp.id)}
                          className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-600'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 shadow-2xs'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-xs text-slate-900">{exp.label}</div>
                          </div>
                          <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                            isSelected
                              ? 'border-amber-600 bg-amber-600 text-white'
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
                    {t.btnBack}
                  </Button>
                  <Button
                    onClick={handleExecuteAppraisal}
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-7 py-3 rounded-lg shadow-sm flex items-center space-x-2"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    <span>{t.btnGenerateDPR}</span>
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
            <div className="h-16 w-16 mx-auto rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-600">
              <RefreshCw className="h-8 w-8 animate-spin" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {t.underwritingTitle(idea)}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {t.underwritingSub(location)}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-amber-200 shadow-xs text-left space-y-3">
              {[
                { label: t.stage1, stage: 0 },
                { label: t.stage2, stage: 1 },
                { label: t.stage3, stage: 2 },
                { label: t.stage4, stage: 3 },
                { label: t.stage5, stage: 4 },
              ].map((s) => {
                const isPassed = progressStage > s.stage;
                const isCurrent = progressStage === s.stage;
                return (
                  <div key={'stage-progress-' + s.stage} className="flex items-center space-x-3 text-xs">
                    {isPassed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <RefreshCw className="h-4 w-4 text-amber-600 animate-spin shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className={isPassed ? 'text-slate-900 font-medium' : isCurrent ? 'text-amber-900 font-bold' : 'text-slate-400'}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 7: OUTPUT REPORT PAGE (STRUCTURED TABBED VIEW + CHARTS) */}
        {/* ============================================================ */}
        {wizardStep === 7 && result && (
          <div className="space-y-6">
            
            {/* INLINE QUICK PARAMETER REFINER (Allows updating details anytime!) */}
            {showQuickRefiner && (
              <div className="p-5 rounded-xl bg-amber-50/90 border border-amber-300 shadow-md space-y-4 animate-in slide-in-from-top-3 duration-150">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <div className="flex items-center space-x-2">
                    <Edit3 className="h-4 w-4 text-amber-700" />
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      {t.refinerTitle}
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
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      {t.metricMarginTitle} (₹)
                    </label>
                    <input
                      type="number"
                      step="5000"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-mono text-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      {t.q2DistrictLabel}
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      {t.q2AreaLabel}
                    </label>
                    <select
                      value={areaType}
                      onChange={(e) => setAreaType(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900"
                    >
                      <option value="Rural">Rural ({t.q2RuralBadge})</option>
                      <option value="Urban">Urban ({t.q2UrbanBadge})</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      {t.q4ScaleLabel}
                    </label>
                    <select
                      value={businessScale}
                      onChange={(e) => setBusinessScale(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900"
                    >
                      <option value="Micro / Mobile Kiosk">{t.q4ScaleMicroTitle}</option>
                      <option value="Standard Small Commercial Unit">{t.q4ScaleStandardTitle}</option>
                      <option value="Expanded Facility / Production Plant">{t.q4ScaleFacilityTitle}</option>
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
                    className="text-xs text-amber-800 hover:underline flex items-center font-semibold"
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Open 5-Question Questionnaire
                  </button>

                  <Button
                    size="sm"
                    onClick={handleExecuteAppraisal}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-1.5"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    {t.btnRecalculate}
                  </Button>
                </div>
              </div>
            )}

            {/* Project Executive Headline Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-200/80 shadow-sm space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-[11px] font-mono text-amber-800 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{t.dprBadge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{result.ventureName}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-2.5">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 font-medium">📍 {location}</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 font-medium">🏡 {areaType} Sector</span>
                    <span className="px-3 py-1 rounded-lg bg-amber-50 text-amber-900 font-semibold border border-amber-200">
                      👤 {entrepreneurCategory} Category
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 font-medium">🏪 {premisesType}</span>
                    <button
                      type="button"
                      onClick={() => setShowQuickRefiner(!showQuickRefiner)}
                      className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold flex items-center gap-1 transition-colors text-xs"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-amber-800" />
                      <span>{t.btnModifyInputs}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
                  <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center space-x-1.5 shadow-2xs">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Safety Score: {result.economics.dscr}x (Bank Approved)</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-bold flex items-center space-x-1.5 shadow-2xs">
                    <Coins className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>{result.schemes[0]?.subsidyPercent}% Grant (₹{(result.schemes[0]?.subsidyAmount / 100000).toFixed(2)}L)</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.print()}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-2xs flex items-center space-x-1.5"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print Dossier</span>
                  </Button>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-normal">
                {result.executiveSummary}
              </p>
            </div>

            {/* INTERACTIVE 7-BUTTON OUTPUT COMMAND CENTER (Zero horizontal scrollbars!) */}
            {(() => {
              const outputSections = [
                {
                  id: 'summary' as const,
                  num: '01',
                  label: t.tabSummary,
                  shortDesc: `₹${(result.economics.capex / 100000).toFixed(2)}L Outlay`,
                  icon: IndianRupee,
                  badge: 'Capital & Loan',
                },
                {
                  id: 'equipment' as const,
                  num: '02',
                  label: t.tabEquipment,
                  shortDesc: `${result.economics.capexBreakdown.length} Machine Quotes`,
                  icon: Calculator,
                  badge: 'Machinery & Tools',
                },
                {
                  id: 'economics' as const,
                  num: '03',
                  label: t.tabEconomics,
                  shortDesc: `₹${Math.round(result.economics.monthlyRevenue - result.economics.monthlyOpex - result.economics.monthlyEmi).toLocaleString('en-IN')}/mo Profit`,
                  icon: TrendingUp,
                  badge: 'Daily Profit',
                },
                {
                  id: 'schemes' as const,
                  num: '04',
                  label: t.tabSchemes,
                  shortDesc: `${result.schemes[0]?.subsidyPercent}% Free Subsidy`,
                  icon: Coins,
                  badge: 'PMEGP & Mudra',
                },
                {
                  id: 'swot' as const,
                  num: '05',
                  label: t.tabSwot,
                  shortDesc: 'Strengths & Risks',
                  icon: ShieldCheck,
                  badge: 'SWOT Analysis',
                },
                {
                  id: 'timeline' as const,
                  num: '06',
                  label: t.tabTimeline,
                  shortDesc: `${result.timelineRoi?.annualRoiPercent || 48}% ROI • ${result.timelineRoi?.setupTimeDays || 30} Days`,
                  icon: CheckSquare,
                  badge: 'Launch Time & ROI',
                },
                {
                  id: 'simulator' as const,
                  num: '07',
                  label: t.tabSimulator,
                  shortDesc: 'Stress-Test What-If',
                  icon: Sliders,
                  badge: 'Live Simulator',
                },
              ];

              const sectionOrder = ['summary', 'equipment', 'economics', 'schemes', 'swot', 'timeline', 'simulator'] as const;
              const currentSectionIndex = sectionOrder.indexOf(activeReportTab);
              const handlePrevSection = () => {
                if (currentSectionIndex > 0) {
                  setActiveReportTab(sectionOrder[currentSectionIndex - 1]);
                }
              };
              const handleNextSection = () => {
                if (currentSectionIndex < sectionOrder.length - 1) {
                  setActiveReportTab(sectionOrder[currentSectionIndex + 1]);
                }
              };

              return (
                <div className="space-y-6">
                  {/* Button Hub Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
                    <div className="flex items-center space-x-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
                      </span>
                      <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800">
                        Official Business Plan (DPR) Output Explorer
                      </h3>
                    </div>
                    <span className="text-xs text-amber-900 font-semibold bg-amber-50 px-3 py-1 rounded-full border border-amber-200 w-fit">
                      Tap any button below to view details
                    </span>
                  </div>

                  {/* 7 Responsive Interactive Action Buttons (Zero horizontal scrollbars!) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
                    {outputSections.map((sec) => {
                      const Icon = sec.icon;
                      const isActive = activeReportTab === sec.id;
                      return (
                        <button
                          key={'output-btn-' + sec.id}
                          type="button"
                          onClick={() => setActiveReportTab(sec.id)}
                          className={`group relative p-3 sm:p-3.5 rounded-2xl text-left flex flex-col justify-between transition-all duration-200 cursor-pointer min-h-[110px] ${
                            isActive
                              ? 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white shadow-lg ring-4 ring-amber-200/90 transform scale-[1.02] border-transparent'
                              : 'bg-white border-2 border-slate-200/90 text-slate-700 hover:border-amber-400 hover:bg-amber-50/50 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                              isActive ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-900 border border-amber-200'
                            }`}>
                              {sec.num}
                            </span>
                            <div className={`h-6 w-6 rounded-lg flex items-center justify-center transition-all ${
                              isActive ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-700 border border-amber-200 group-hover:scale-110'
                            }`}>
                              <Icon className="h-3 w-3" />
                            </div>
                          </div>

                          <div>
                            <div className={`font-extrabold text-xs leading-tight line-clamp-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                              {sec.label}
                            </div>
                            <div className={`text-[10px] font-medium mt-0.5 leading-snug line-clamp-1 ${isActive ? 'text-amber-100' : 'text-slate-500'}`}>
                              {sec.shortDesc}
                            </div>
                          </div>

                          <div className="mt-1.5 pt-1 border-t border-slate-100 dark:border-white/20 flex items-center justify-between text-[9px]">
                            <span className={`font-semibold ${isActive ? 'text-amber-200' : 'text-amber-800'}`}>
                              {sec.badge}
                            </span>
                            {isActive && (
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Section Header Bar with Step Navigation */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-2xs">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                        0{currentSectionIndex + 1}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                          Viewing Section {currentSectionIndex + 1} of 7
                        </div>
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                          {outputSections[currentSectionIndex]?.label}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={currentSectionIndex === 0}
                        onClick={handlePrevSection}
                        className="h-8 px-2.5 bg-white border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                      >
                        <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                        Prev
                      </Button>

                      <Button
                        size="sm"
                        disabled={currentSectionIndex === sectionOrder.length - 1}
                        onClick={handleNextSection}
                        className="h-8 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-2xs"
                      >
                        <span>Next Output</span>
                        <ChevronRight className="h-3.5 w-3.5 ml-1" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.print()}
                        className="h-8 px-2.5 bg-white border-amber-200 text-amber-900 hover:bg-amber-50 text-xs font-semibold"
                        title="Print or Save as PDF"
                      >
                        <Printer className="h-3.5 w-3.5 mr-1 text-amber-700" />
                        Print
                      </Button>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* OUTPUT 01: CAPITAL STRUCTURE & MEANS OF FINANCE (PIE)     */}
                  {/* ======================================================== */}
                  {activeReportTab === 'summary' && (
                    <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs space-y-8 sm:space-y-10 animate-in fade-in-50 duration-200">
                      
                      {/* Plain-Language Metric Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
                        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/60 border border-slate-200 shadow-xs">
                          <div className="text-xs text-slate-500 mb-1 font-semibold">{t.metricTotalOutlayTitle}</div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                            ₹{(result.economics.capex / 100000).toFixed(2)} Lakhs
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1.5">{t.metricTotalOutlaySub}</div>
                        </div>

                        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-amber-50/40 border border-amber-200 shadow-xs">
                          <div className="text-xs text-amber-900 font-bold mb-1">{t.metricMarginTitle}</div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono">
                            ₹{(result.economics.marginEquity / 100000).toFixed(2)} Lakhs
                          </div>
                          <div className="text-[11px] text-amber-900/80 mt-1.5 font-medium">
                            {Math.round((result.economics.marginEquity / result.economics.capex) * 100)}% ({t.metricMarginSub})
                          </div>
                        </div>

                        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-200 shadow-xs">
                          <div className="text-xs text-emerald-900 font-bold mb-1">{t.metricGrantTitle}</div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
                            ₹{(result.schemes[0]?.subsidyAmount / 100000).toFixed(2)} Lakhs
                          </div>
                          <div className="text-[11px] text-emerald-700 mt-1.5 font-semibold">
                            {result.schemes[0]?.subsidyPercent}% ({t.metricGrantSub})
                          </div>
                        </div>

                        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/60 border border-slate-200 shadow-xs">
                          <div className="text-xs text-slate-500 mb-1 font-semibold">{t.metricEmiTitle}</div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                            ₹{result.economics.monthlyEmi.toLocaleString('en-IN')}/mo
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1.5">{t.metricEmiSub}</div>
                        </div>
                      </div>

                      {/* Visual Representation: Recharts Pie Chart for Capital Structure */}
                      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/50 border border-slate-200 shadow-2xs space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-3">
                          <div>
                            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                              <PieIcon className="h-4 w-4 text-amber-600" />
                              <span>{t.chartCapitalTitle}</span>
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">{t.chartCapitalSub}</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                            Total: ₹{(result.economics.capex / 100000).toFixed(2)} Lakhs
                          </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          {/* The Responsive Pie Chart */}
                          <div className="lg:col-span-7 h-72 sm:h-80 md:h-96 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={capitalChartData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={65}
                                  outerRadius={105}
                                  paddingAngle={4}
                                  dataKey="value"
                                >
                                  {capitalChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <RechartsTooltip 
                                  formatter={(value: any) => [`₹${(Number(value) / 100000).toFixed(2)} Lakhs (₹${Number(value).toLocaleString('en-IN')})`, 'Amount']}
                                />
                                <RechartsLegend verticalAlign="bottom" height={36} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Explanatory Cards */}
                          <div className="lg:col-span-5 space-y-3.5">
                            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs shadow-2xs">
                              <div className="font-bold text-amber-950 flex items-center justify-between">
                                <span>{t.legendMargin}</span>
                                <span className="font-mono text-sm">₹{result.economics.marginEquity.toLocaleString('en-IN')}</span>
                              </div>
                              <p className="text-amber-800/90 text-[11px] mt-1 leading-relaxed">
                                Paid by you from personal savings. Guaranteed 5% or 10% under PMEGP.
                              </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs shadow-2xs">
                              <div className="font-bold text-emerald-950 flex items-center justify-between">
                                <span>{t.legendGrant}</span>
                                <span className="font-mono text-sm">₹{(result.schemes[0]?.subsidyAmount || 0).toLocaleString('en-IN')}</span>
                              </div>
                              <p className="text-emerald-800/90 text-[11px] mt-1 leading-relaxed">
                                100% free non-refundable grant under {result.schemes[0]?.code}.
                              </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs shadow-2xs">
                              <div className="font-bold text-slate-900 flex items-center justify-between">
                                <span>{t.legendLoan}</span>
                                <span className="font-mono text-sm">₹{result.economics.loanAmount.toLocaleString('en-IN')}</span>
                              </div>
                              <p className="text-slate-500 text-[11px] mt-1 leading-relaxed">
                                5-Year commercial bank credit protected by CGTMSE / Mudra.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Means of Finance Table */}
                      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                        <h3 className="text-sm font-bold text-slate-900">Means of Finance Summary</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                              <tr>
                                <th className="px-5 py-3">Capital Source</th>
                                <th className="px-5 py-3">Share (%)</th>
                                <th className="px-5 py-3">Amount (INR)</th>
                                <th className="px-5 py-3">Institutional Terms</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                              <tr className="hover:bg-amber-50/20">
                                <td className="px-5 py-3.5 font-semibold text-slate-900">{t.legendMargin}</td>
                                <td className="px-5 py-3.5 font-mono">{Math.round((result.economics.marginEquity / result.economics.capex) * 100)}%</td>
                                <td className="px-5 py-3.5 font-mono font-bold text-amber-700">₹{result.economics.marginEquity.toLocaleString('en-IN')}</td>
                                <td className="px-5 py-3.5 text-slate-500">Promoter Savings Equity</td>
                              </tr>
                              <tr className="hover:bg-amber-50/20">
                                <td className="px-5 py-3.5 font-semibold text-slate-900">{t.legendGrant}</td>
                                <td className="px-5 py-3.5 font-mono">{result.schemes[0]?.subsidyPercent}%</td>
                                <td className="px-5 py-3.5 font-mono font-bold text-emerald-700">₹{result.schemes[0]?.subsidyAmount.toLocaleString('en-IN')}</td>
                                <td className="px-5 py-3.5 text-slate-500">Non-dilutive Free Grant ({result.schemes[0]?.code})</td>
                              </tr>
                              <tr className="hover:bg-amber-50/20">
                                <td className="px-5 py-3.5 font-semibold text-slate-900">{t.legendLoan}</td>
                                <td className="px-5 py-3.5 font-mono">{100 - Math.round((result.economics.marginEquity / result.economics.capex) * 100)}%</td>
                                <td className="px-5 py-3.5 font-mono font-bold text-slate-900">₹{result.economics.loanAmount.toLocaleString('en-IN')}</td>
                                <td className="px-5 py-3.5 text-slate-500">5-Year Term Loan Facility</td>
                              </tr>
                              <tr className="bg-amber-50/60 font-bold">
                                <td className="px-5 py-3.5 text-slate-900">Total Project Outlay (100%)</td>
                                <td className="px-5 py-3.5 font-mono">100%</td>
                                <td className="px-5 py-3.5 font-mono text-slate-900">₹{result.economics.capex.toLocaleString('en-IN')}</td>
                                <td className="px-5 py-3.5 text-slate-600">Bank Sanction Target</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Bottom Guided Step Tour */}
                      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-slate-500 font-medium">
                          Output 1 of 6: Capital Breakdown Verified
                        </div>
                        <Button
                          onClick={handleNextSection}
                          className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
                        >
                          <span>Next: View Machinery & Quotations (02/06)</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>

                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* OUTPUT 02: DYNAMIC MACHINERY & EQUIPMENT LIST            */}
                  {/* ======================================================== */}
                  {activeReportTab === 'equipment' && (
                    <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs space-y-8 animate-in fade-in-50 duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{t.tabEquipment}</h3>
                          <p className="text-xs text-slate-500 mt-1">Authentic commercial machinery quotes customized for &ldquo;{result.ventureName}&rdquo;</p>
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 self-start sm:self-auto">
                          Total Budget: ₹{(result.economics.capex / 100000).toFixed(2)} Lakhs
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                            <tr>
                              <th className="px-5 py-3">S.No</th>
                              <th className="px-5 py-3">Equipment / Machine Item</th>
                              <th className="px-5 py-3">Specification / Capacity</th>
                              <th className="px-5 py-3 text-right">Estimated Cost (INR)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700">
                            {result.economics.capexBreakdown.map((item, idx) => (
                              <tr key={'capex-item-' + item.item + '-' + idx} className="hover:bg-amber-50/20">
                                <td className="px-5 py-3.5 font-mono text-slate-400">{idx + 1}</td>
                                <td className="px-5 py-3.5 font-bold text-slate-900">{item.item}</td>
                                <td className="px-5 py-3.5 text-slate-600">{item.specification}</td>
                                <td className="px-5 py-3.5 font-mono font-bold text-slate-900 text-right">
                                  ₹{item.amount.toLocaleString('en-IN')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex items-start space-x-2.5">
                        <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong>Bank Sanction Checklist:</strong> Proforma tax invoices and quotations for these specific machinery items must be collected from local dealers and submitted alongside this Detailed Project Report.
                        </p>
                      </div>

                      {/* Bottom Guided Step Tour */}
                      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-slate-500 font-medium">
                          Output 2 of 6: Machinery Sourcing Checked
                        </div>
                        <Button
                          onClick={handleNextSection}
                          className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
                        >
                          <span>Next: View Daily Profit & Cashflow (03/06)</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>

                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* OUTPUT 03: DAILY PROFIT & VISUAL CASHFLOW BAR GRAPH       */}
                  {/* ======================================================== */}
                  {activeReportTab === 'economics' && (
                    <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs space-y-8 sm:space-y-10 animate-in fade-in-50 duration-200">
                      
                      {/* Unit Economics Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/60 border border-slate-200 shadow-xs">
                          <div className="text-xs text-slate-500 mb-1 font-semibold">{t.unitPriceLabel}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
                            ₹{result.economics.unitPrice} <span className="text-xs font-normal text-slate-500">/ {result.economics.itemUnitName}</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1.5 font-medium">
                            {t.rawMaterialCostLabel}: ₹{result.economics.unitCost}
                          </div>
                        </div>

                        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-amber-50/40 border border-amber-200 shadow-xs">
                          <div className="text-xs text-amber-900 font-bold mb-1">{t.dailyTargetLabel}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-amber-700 font-mono">
                            {result.economics.dailySalesTarget} <span className="text-xs font-normal text-slate-500">{result.economics.itemUnitName}s/day</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1.5 font-medium">
                            Monthly revenue: ₹{result.economics.monthlyRevenue.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-200 shadow-xs">
                          <div className="text-xs text-emerald-900 font-bold mb-1">{t.dailyBreakEvenLabel}</div>
                          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-mono">
                            {result.economics.dailyBreakEvenTarget} <span className="text-xs font-normal text-slate-500">{result.economics.itemUnitName}s/day</span>
                          </div>
                          <div className="text-xs text-emerald-700 mt-1.5 font-medium">
                            {t.breakEvenExplanation(result.economics.dailyBreakEvenTarget)}
                          </div>
                        </div>
                      </div>

                      {/* Visual Bar Graph: Monthly Revenue vs Costs vs Take-Home Profit */}
                      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/50 border border-slate-200 shadow-2xs space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                          <div>
                            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                              <BarChart3 className="h-4 w-4 text-amber-600" />
                              <span>{t.chartCashflowTitle}</span>
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">{t.chartCashflowSub}</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                            Net Take-Home: +₹{Math.round(result.economics.monthlyRevenue - result.economics.monthlyOpex - result.economics.monthlyEmi).toLocaleString('en-IN')}/month
                          </span>
                        </div>

                        <div className="h-72 sm:h-80 md:h-96 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyCashflowData} margin={{ top: 15, right: 15, left: 10, bottom: 25 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} interval={0} />
                              <YAxis tick={{ fontSize: 11, fill: '#475569' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                              <RechartsTooltip 
                                formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Monthly Value']}
                              />
                              <Bar dataKey="amount" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Monthly OPEX breakdown */}
                      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4">
                        <h3 className="text-sm font-bold text-slate-900">Monthly Operating Expenses (OPEX Breakdown)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {result.economics.opexBreakdown.map((opex, idx) => (
                            <div key={'opex-item-' + opex.item + '-' + idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                              <span className="text-slate-700 font-medium">{opex.item}</span>
                              <span className="font-mono font-bold text-slate-900">₹{opex.amount.toLocaleString('en-IN')}/mo</span>
                            </div>
                          ))}
                          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex justify-between items-center text-xs sm:col-span-2">
                            <span className="text-amber-950 font-bold">Monthly Debt Servicing (Commercial Bank EMI)</span>
                            <span className="font-mono font-bold text-amber-950">₹{result.economics.monthlyEmi.toLocaleString('en-IN')}/mo</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Guided Step Tour */}
                      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-slate-500 font-medium">
                          Output 3 of 6: Solvency & Margins Checked
                        </div>
                        <Button
                          onClick={handleNextSection}
                          className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
                        >
                          <span>Next: View Government Subsidies (04/06)</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>

                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* OUTPUT 04: GOVERNMENT SCHEMES & SUBSIDIES                */}
                  {/* ======================================================== */}
                  {activeReportTab === 'schemes' && (
                    <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs space-y-6 animate-in fade-in-50 duration-200">
                      <div className="border-b border-slate-200 pb-3">
                        <h3 className="text-lg font-bold text-slate-900">Recommended Concessional Credit Schemes</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Matched strictly according to promoter social category and district rules</p>
                      </div>

                      <div className="space-y-4">
                        {result.schemes.map((scheme) => (
                          <div
                            key={'scheme-card-' + scheme.code}
                            className={`p-6 rounded-2xl border-2 transition-all ${
                              scheme.eligibilityVerdict === 'HIGHLY_RECOMMENDED'
                                ? 'bg-emerald-50/40 border-emerald-300 shadow-sm'
                                : 'bg-white border-slate-200 shadow-2xs'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-200/80">
                              <div>
                                <span className="font-extrabold text-base text-slate-900">{scheme.name}</span>
                                <span className="ml-2 text-xs font-mono px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold">
                                  {scheme.interestRate}
                                </span>
                              </div>
                              {scheme.subsidyPercent > 0 && (
                                <span className="text-xs font-bold font-mono px-3.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0 self-start sm:self-auto shadow-2xs">
                                  {scheme.subsidyPercent}% Free Govt Subsidy
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-700 mb-4 leading-relaxed">{scheme.keyReason}</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono bg-white p-4 rounded-xl border border-slate-200 mb-4">
                              <div>Bank Term Loan: <strong className="text-slate-900 text-sm">₹{(scheme.eligibleLoan / 100000).toFixed(2)}L</strong></div>
                              <div>Promoter Margin: <strong className="text-amber-700 text-sm">₹{(scheme.marginRequired / 100000).toFixed(2)}L</strong></div>
                              {scheme.subsidyAmount > 0 && (
                                <div className="text-emerald-800 font-bold">
                                  Govt Grant: ₹{(scheme.subsidyAmount / 100000).toFixed(2)}L
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="text-xs font-bold text-slate-900 mb-2">Required Bank Submission Documents:</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                                {scheme.documentsRequired.map((doc, i) => (
                                  <div key={'scheme-doc-' + scheme.code + '-' + i} className="flex items-center space-x-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                                    <span>{doc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Guided Step Tour */}
                      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-slate-500 font-medium">
                          Output 4 of 7: Government Subsidies & Grants
                        </div>
                        <Button
                          onClick={handleNextSection}
                          className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
                        >
                          <span>Next: View SWOT Analysis (05/07)</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>

                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* OUTPUT 05: SWOT ANALYSIS (Strengths, Weaknesses, Ops, Threats) */}
                  {/* ======================================================== */}
                  {activeReportTab === 'swot' && (
                    <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs space-y-8 animate-in fade-in-50 duration-200">
                      <div className="border-b border-slate-200 pb-4">
                        <div className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
                          <span>Strategic Reality Check for Grassroots Success</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                          SWOT Analysis: Strengths, Weaknesses, Opportunities & Threats
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          Clear and honest evaluation of your business advantages, risks, and growth potential in simple words.
                        </p>
                      </div>

                      {/* 4 Cards Grid: Strengths, Weaknesses, Opportunities, Threats */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* 1. Strengths (Emerald) */}
                        <div className="p-6 rounded-2xl bg-emerald-50/60 border-2 border-emerald-200/90 space-y-4 shadow-2xs">
                          <div className="flex items-center space-x-2.5 pb-2.5 border-b border-emerald-200">
                            <div className="h-8 w-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-sm text-emerald-950">{t.swotStrengths}</h4>
                              <span className="text-[11px] text-emerald-800 font-medium">Why your business will win locally</span>
                            </div>
                          </div>
                          <ul className="space-y-2.5 text-xs text-slate-800">
                            {(result.swot?.strengths || [
                              `Direct daily customer sales with immediate cash inflow in ${location}.`,
                              `Low personal margin needed (only 5% to 10%), with high subsidy support.`,
                              `Locally sourced ingredients/raw materials with low transit overhead.`
                            ]).map((item, idx) => (
                              <li key={'str-' + idx} className="flex items-start space-x-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                                <span className="leading-relaxed font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 2. Weaknesses (Amber) */}
                        <div className="p-6 rounded-2xl bg-amber-50/60 border-2 border-amber-200/90 space-y-4 shadow-2xs">
                          <div className="flex items-center space-x-2.5 pb-2.5 border-b border-amber-200">
                            <div className="h-8 w-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                              <AlertCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-sm text-amber-950">{t.swotWeaknesses}</h4>
                              <span className="text-[11px] text-amber-800 font-medium">Operational areas requiring discipline</span>
                            </div>
                          </div>
                          <ul className="space-y-2.5 text-xs text-slate-800">
                            {(result.swot?.weaknesses || [
                              `Initial 30-45 day setup and licensing period before reaching steady sales.`,
                              `Need for disciplined daily bookkeeping to track stock and maintain loan repayment.`,
                              `Local brand awareness needs to be built through neighborhood word-of-mouth.`
                            ]).map((item, idx) => (
                              <li key={'wk-' + idx} className="flex items-start space-x-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                                <span className="leading-relaxed font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 3. Opportunities (Sky Blue) */}
                        <div className="p-6 rounded-2xl bg-sky-50/60 border-2 border-sky-200/90 space-y-4 shadow-2xs">
                          <div className="flex items-center space-x-2.5 pb-2.5 border-b border-sky-200">
                            <div className="h-8 w-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
                              <TrendingUp className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-sm text-sky-950">{t.swotOpportunities}</h4>
                              <span className="text-[11px] text-sky-800 font-medium">Ways to expand profit & customer reach</span>
                            </div>
                          </div>
                          <ul className="space-y-2.5 text-xs text-slate-800">
                            {(result.swot?.opportunities || [
                              `Bulk orders for local weddings, canteens, festivals, and weekly village haats.`,
                              `Value-added packing or home delivery to attract higher-spending local customers.`,
                              `Eligible for collateral-free expansion loans under Mudra Kishor/Tarun once established.`
                            ]).map((item, idx) => (
                              <li key={'opp-' + idx} className="flex items-start space-x-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0"></span>
                                <span className="leading-relaxed font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 4. Threats (Rose) */}
                        <div className="p-6 rounded-2xl bg-rose-50/60 border-2 border-rose-200/90 space-y-4 shadow-2xs">
                          <div className="flex items-center space-x-2.5 pb-2.5 border-b border-rose-200">
                            <div className="h-8 w-8 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                              <ShieldCheck className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-sm text-rose-950">{t.swotThreats}</h4>
                              <span className="text-[11px] text-rose-800 font-medium">External risks and how to stay protected</span>
                            </div>
                          </div>
                          <ul className="space-y-2.5 text-xs text-slate-800">
                            {(result.swot?.threats || [
                              `Seasonal weather changes (monsoon or extreme summer footfall dip).`,
                              `Sudden spikes in raw ingredient or electricity/fuel costs.`,
                              `New competing stalls opening nearby without quality standards.`
                            ]).map((item, idx) => (
                              <li key={'thr-' + idx} className="flex items-start space-x-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0"></span>
                                <span className="leading-relaxed font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Bottom Guided Step Tour */}
                      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-slate-500 font-medium">
                          Output 5 of 7: SWOT Analysis Completed
                        </div>
                        <Button
                          onClick={handleNextSection}
                          className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
                        >
                          <span>Next: Launch Time & ROI (06/07)</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* OUTPUT 06: LAUNCH TIME, ROI & 90-DAY CHECKLIST            */}
                  {/* ======================================================== */}
                  {activeReportTab === 'timeline' && (
                    <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs space-y-8 animate-in fade-in-50 duration-200">
                      
                      <div className="border-b border-slate-200 pb-4">
                        <div className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <CheckSquare className="h-3.5 w-3.5 text-amber-700" />
                          <span>Timeline & Return on Investment</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                          Launch Time, ROI & 90-Day Execution Checklist
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          Clear estimates of setup days, first customer sale, and annual return on your savings.
                        </p>
                      </div>

                      {/* 4 KPI Metric Cards */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
                        <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-amber-50/40 border border-amber-200 shadow-xs">
                          <div className="text-xs text-amber-900 font-bold mb-1">{t.setupTimeTitle}</div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono">
                            {result.timelineRoi?.setupTimeDays || 30} Days
                          </div>
                          <div className="text-[11px] text-amber-800/80 mt-1.5 font-medium">{t.setupTimeSub}</div>
                        </div>

                        <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/60 border border-slate-200 shadow-xs">
                          <div className="text-xs text-slate-700 font-bold mb-1">{t.firstSaleTitle}</div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                            {result.timelineRoi?.timeToFirstSaleDays || 42} Days
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1.5">{t.firstSaleSub}</div>
                        </div>

                        <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-200 shadow-xs">
                          <div className="text-xs text-emerald-900 font-bold mb-1">{t.roiAnnualTitle}</div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
                            {result.timelineRoi?.annualRoiPercent || 48}% / yr
                          </div>
                          <div className="text-[11px] text-emerald-700 mt-1.5 font-semibold">{t.roiAnnualSub}</div>
                        </div>

                        <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/60 border border-slate-200 shadow-xs">
                          <div className="text-xs text-slate-700 font-bold mb-1">{t.roiPaybackTitle}</div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                            {result.timelineRoi?.paybackMonths || 14} Months
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1.5">{t.roiPaybackSub}</div>
                        </div>
                      </div>

                      {/* 4 Phase Execution Roadmap */}
                      <div className="space-y-4 pt-4 border-t border-slate-200">
                        <div className="border-b border-slate-200 pb-3">
                          <h4 className="text-base font-extrabold text-slate-900">4-Phase 90-Day Execution Roadmap</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Step-by-step milestones from bank application to regular profit</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {result.suggestedMilestones.map((m, idx) => (
                            <div key={'milestone-' + m.phase + '-' + idx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2 hover:border-amber-300 transition-colors">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{m.phase}</span>
                                <span className="text-[11px] text-slate-500 font-semibold">Stage {idx + 1} of 4</span>
                              </div>
                              <div className="text-sm font-bold text-slate-900">{m.title}</div>
                              <p className="text-xs text-slate-600 pt-1 leading-relaxed">{m.target}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Statutory Licenses & Registrations */}
                      <div className="space-y-4 pt-4 border-t border-slate-200">
                        <div className="border-b border-slate-200 pb-3">
                          <h4 className="text-base font-extrabold text-slate-900">Required Licenses & Registrations</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Government permits needed before and after opening</p>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                              <tr>
                                <th className="px-5 py-3">License Name</th>
                                <th className="px-5 py-3">Issuing Authority</th>
                                <th className="px-5 py-3">Time Needed</th>
                                <th className="px-5 py-3">When Needed</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                              {result.licenses.map((lic, idx) => (
                                <tr key={'lic-row-' + lic.name + '-' + idx} className="hover:bg-amber-50/20">
                                  <td className="px-5 py-3.5 font-bold text-slate-900">{lic.name}</td>
                                  <td className="px-5 py-3.5 text-slate-500">{lic.authority}</td>
                                  <td className="px-5 py-3.5 font-mono font-semibold">{lic.timelineDays} Days</td>
                                  <td className="px-5 py-3.5">
                                    <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                      lic.criticality.includes('Mandatory')
                                        ? 'bg-red-50 text-red-800 border border-red-200'
                                        : 'bg-amber-50 text-amber-900 border border-amber-200'
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

                      {/* Bottom Guided Step Tour */}
                      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-slate-500 font-medium">
                          Output 6 of 7: Timeline & ROI Prepared
                        </div>
                        <Button
                          onClick={handleNextSection}
                          className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
                        >
                          <span>Next: Sensitivity & Stress Simulator (07/07)</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>

                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* OUTPUT 07: INTERACTIVE SENSITIVITY STRESS SIMULATOR       */}
                  {/* ======================================================== */}
                  {activeReportTab === 'simulator' && (
                    <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs space-y-8 animate-in fade-in-50 duration-200">
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            Multi-Variable Sensitivity & Solvency Simulator
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Drag sliders to test what happens if sales increase, prices shift, or raw material costs rise.
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSimVolumeMultiplier(100);
                              setSimPriceChangePct(0);
                              setSimCostInflationPct(0);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
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
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors"
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
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors"
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
                              <span className="font-mono text-amber-700 font-bold">{simVolumeMultiplier}% ({Math.round(result.economics.dailySalesTarget * (simVolumeMultiplier / 100))} {result.economics.itemUnitName}s/day)</span>
                            </div>
                            <input
                              type="range"
                              min="40"
                              max="180"
                              step="5"
                              value={simVolumeMultiplier}
                              onChange={(e) => setSimVolumeMultiplier(Number(e.target.value))}
                              className="w-full accent-amber-600 cursor-pointer"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                              <span>Selling Price per {result.economics.itemUnitName}</span>
                              <span className="font-mono text-amber-700 font-bold">
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
                              className="w-full accent-amber-600 cursor-pointer"
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
                        <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3">
                              Simulated Monthly State
                            </div>
                            <div className="space-y-3.5">
                              <div>
                                <div className="text-xs text-slate-500">Net Monthly Profit</div>
                                <div className={`text-2xl font-extrabold font-mono ${simNetProfit >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                                  {simNetProfit >= 0 ? `+₹${Math.round(simNetProfit).toLocaleString('en-IN')}` : `-₹${Math.abs(Math.round(simNetProfit)).toLocaleString('en-IN')}`}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs text-slate-500">Break-Even Units / Day</div>
                                <div className="text-lg font-bold font-mono text-slate-900">
                                  {Math.ceil(simBreakEvenUnits / 26)} {result.economics.itemUnitName}s/day
                                </div>
                              </div>

                              <div>
                                <div className="text-xs text-slate-500">Stress Debt Service (DSCR)</div>
                                <div className="flex items-center space-x-2 mt-0.5">
                                  <span className={`text-xl font-bold font-mono ${simDscr >= 1.4 ? 'text-emerald-700' : simDscr >= 1.1 ? 'text-amber-700' : 'text-red-700'}`}>
                                    {simDscr}x
                                  </span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                    simDscr >= 1.4 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                  }`}>
                                    {simDscr >= 1.4 ? 'Bank Approved' : 'Tight Margin'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-[11px] bg-white p-3 rounded-xl border border-slate-200 text-slate-600 leading-relaxed">
                            {simDscr >= 1.25 ? (
                              <span className="text-emerald-800 font-medium">✓ Enterprise remains solvent and easily pays monthly bank EMI.</span>
                            ) : (
                              <span className="text-amber-800 font-medium">⚠ Debt servicing will require tighter cost management.</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Final Tour Complete Banner */}
                      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Button
                          variant="outline"
                          onClick={() => setActiveReportTab('summary')}
                          className="w-full sm:w-auto bg-white border-slate-300 text-slate-700 text-xs font-semibold py-2.5"
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          <span>Back to Capital Summary (01/07)</span>
                        </Button>
                        <Button
                          onClick={() => window.print()}
                          className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
                        >
                          <Printer className="h-4 w-4 mr-1" />
                          <span>Print Full Bank-Ready Business Plan (DPR)</span>
                        </Button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })()}

          </div>
        )}

      </div>

      {/* Floating Attention-Catching Advisory Copilot */}
      <FloatingCopilot 
        language={language} 
        ventureContext={result ? {
          ventureName: result.ventureName,
          location,
          capex: result.economics.capex,
          margin: result.economics.marginEquity,
          subsidy: result.schemes[0]?.subsidyAmount,
          dscr: result.economics.dscr,
        } : undefined}
      />

    </div>
  );
}

export default function AgentStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-slate-600">
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-5 w-5 animate-spin text-amber-600" />
            <span>Loading Project Feasibility Studio...</span>
          </div>
        </div>
      }
    >
      <AgentStudioContent />
    </Suspense>
  );
}
