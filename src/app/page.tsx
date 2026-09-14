'use client';

import { useState, useEffect } from 'react';
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
  Check,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/i18n/translations';

export default function Home() {
  const router = useRouter();
  const [quickIdea, setQuickIdea] = useState('');
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('udayam_language') as Language;
      if (stored && (stored === 'en' || stored === 'hi' || stored === 'ta')) {
        setLang(stored);
      }

      const handleLangChange = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail && (detail === 'en' || detail === 'hi' || detail === 'ta')) {
          setLang(detail);
        }
      };

      window.addEventListener('udayam_language_changed', handleLangChange);
      return () => window.removeEventListener('udayam_language_changed', handleLangChange);
    }
  }, []);

  const t = translations[lang] || translations.en;

  const sampleSectors = [
    { title: 'Solar Micro-Cold Storage Unit', location: 'Nashik, Maharashtra', capex: '₹5.00 Lakhs', subsidy: '35% (PMEGP)', dscr: '3.98x (Prime)' },
    { title: 'Hydroponic Saffron & Exotic Greens', location: 'Pulwama, Kashmir', capex: '₹8.50 Lakhs', subsidy: '35% (Special)', dscr: '2.45x (Bankable)' },
    { title: 'Areca Palm Leaf Biodegradable Tableware', location: 'Shimoga, Karnataka', capex: '₹4.50 Lakhs', subsidy: '35% (Rural)', dscr: '3.12x (Bankable)' },
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
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-24 md:pb-28 border-b border-slate-200 bg-gradient-to-b from-amber-50/40 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 mb-6">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>
              {lang === 'hi' 
                ? 'कच्चे विचार से बैंक लोन और सफल व्यापार तक' 
                : lang === 'ta'
                ? 'புதிய யோசனை முதல் வங்கி கடன் வரை'
                : 'From Raw Idea to Bank Loan & Profitable Business'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
            {lang === 'hi' ? (
              <>आपके छोटे विचार को बनाएं <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">बैंक-स्वीकृत व सफल व्यापार</span></>
            ) : lang === 'ta' ? (
              <>உங்கள் சிறு தொழில் யோசனையை <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">வங்கி கடன் & லாபகரமான தொழிலாக</span> மாற்றுங்கள்</>
            ) : (
              <>Turn Your Raw Business Idea Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">Profitable, Bank-Approved Business</span></>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
            {lang === 'hi'
              ? 'अपना कच्चा व्यापार विचार और उपलब्ध बचत बताएं। उद्यम एआई आपको मशीन के दाम, दैनिक मुनाफा, ROI %, SWOT विश्लेषण और 35% तक सरकारी सब्सिडी के साथ बैंक-स्वीकृत प्रोजेक्ट रिपोर्ट तैयार करके देता है।'
              : lang === 'ta'
              ? 'உங்கள் தொழில் யோசனை மற்றும் சேமிப்பை உள்ளிடுங்கள். இயந்திர செலவுகள், தினசரி லாபம், ROI %, SWOT பகுப்பாய்வு மற்றும் 35% அரசு மானியத்துடன் கூடிய வங்கி திட்ட அறிக்கையை உடனே பெறுங்கள்.'
              : 'Come with a raw business idea and your available savings. UdayamAI calculates your machine prices, daily profit, ROI %, launch timeline, SWOT analysis, and up to 35% government subsidies — ready for SBI, PMEGP, and Mudra bank loans.'}
          </p>

          {/* Main Search Input Form */}
          <div className="max-w-2xl mx-auto mb-6">
            <form onSubmit={handleLaunch} className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-white border-2 border-amber-200/80 shadow-lg focus-within:border-amber-600 focus-within:ring-4 focus-within:ring-amber-100 transition-all">
              <input
                type="text"
                value={quickIdea}
                onChange={(e) => setQuickIdea(e.target.value)}
                placeholder={lang === 'hi' ? 'अपना व्यापार विचार लिखें (जैसे डोसा स्टॉल, सोलर कोल्ड स्टोरेज, डेयरी फार्म, टेलरिंग दुकान)...' : lang === 'ta' ? 'உங்கள் தொழில் யோசனையை எழுதுங்கள் (எ.கா. தோசை கடை, சோலார் சேமிப்பு, தையல் கடை)...' : 'Type your business idea (e.g. Dosa Stall, Solar Cold Storage, Dairy Farm, Tailoring shop)...'}
                className="w-full bg-transparent px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              <Button
                type="submit"
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl shadow-md shrink-0 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>{lang === 'hi' ? 'योजना बनाएं →' : lang === 'ta' ? 'திட்டம் தொடங்குக →' : 'Create Business Plan →'}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 mt-3 font-medium">
              <span className="flex items-center gap-1 text-emerald-700">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                {lang === 'hi' ? '100% निःशुल्क' : lang === 'ta' ? '100% இலவசம்' : '100% Free & Instant'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700">
                <Check className="h-3.5 w-3.5 text-amber-600" />
                {lang === 'hi' ? 'बैंक स्वीकृत सुरक्षा मानक' : lang === 'ta' ? 'வங்கி கடன் அங்கீகாரம்' : 'Bank Approved Loan Standards'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-800">
                <Check className="h-3.5 w-3.5 text-amber-600" />
                {lang === 'hi' ? '35% तक PMEGP सरकारी सब्सिडी' : lang === 'ta' ? '35% வரை அரசு மானியம்' : 'Up to 35% Free Govt Subsidy'}
              </span>
            </div>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto pt-2">
            <span className="text-xs text-slate-500 font-medium">{lang === 'hi' ? 'लोकप्रिय उद्योग:' : lang === 'ta' ? 'முக்கிய துறைகள்:' : 'Common Sectors:'}</span>
            {sampleSectors.map((s) => (
              <button
                key={s.title}
                type="button"
                onClick={() => router.push(`/agent?idea=${encodeURIComponent(s.title)}&location=${encodeURIComponent(s.location)}`)}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-50/70 hover:bg-amber-100 text-amber-950 border border-amber-200 transition-colors font-medium"
              >
                {s.title.split(' ')[0]} {s.title.split(' ')[1]} ({s.location.split(',')[0]})
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Institutional Table Section */}
      <section className="py-14 sm:py-16 bg-slate-50/60 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          
          <div className="rounded-2xl bg-white border border-amber-200/70 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lang === 'hi' ? 'नमूना बैंक-स्वीकृत प्रोजेक्ट रिपोर्ट' : lang === 'ta' ? 'மாதிரி வங்கி தொழில் திட்ட அறிக்கைகள்' : 'Sample Bank-Ready Business Plans'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'hi' ? 'SBI, PMEGP और मुद्रा बैंक लोन के लिए तैयार' : 'Prepared for SBI, PMEGP, and Mudra bank loan approvals'}
                  </p>
                </div>
              </div>

              <Link href="/agent">
                <span className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center">
                  {lang === 'hi' ? 'अपनी योजना अभी बनाएं' : 'Create Your Business Plan Now'} <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </span>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-50/40 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3">Business Idea</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Total Setup Cost</th>
                    <th className="px-6 py-3">Govt Subsidy Grant</th>
                    <th className="px-6 py-3">Bank Safety Score</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {sampleSectors.map((sector) => (
                    <tr key={sector.title} className="hover:bg-amber-50/20 transition-colors">
                      <td className="px-6 py-3.5 font-medium text-slate-900">{sector.title}</td>
                      <td className="px-6 py-3.5 text-slate-500">{sector.location}</td>
                      <td className="px-6 py-3.5 font-mono font-medium">{sector.capex}</td>
                      <td className="px-6 py-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {sector.subsidy}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-mono text-amber-800 font-semibold">{sector.dscr}</td>
                      <td className="px-6 py-3.5 text-right">
                        <Link
                          href={`/agent?idea=${encodeURIComponent(sector.title)}&location=${encodeURIComponent(sector.location)}`}
                          className="text-xs font-semibold text-amber-700 hover:text-amber-800 inline-flex items-center"
                        >
                          View Plan →
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
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              How We Turn Your Raw Idea Into a Bank-Approved Business
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every number is calculated according to real bank rules and government MSME subsidy schemes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-white border border-amber-200/60 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Full Machinery & Setup Costs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates exact machine quotes, shop carpentry, and initial stock prices tailored specifically to your trade and local district.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-white border border-emerald-200/60 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Bank Loan Safety & Monthly Profits</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates your exact daily sales break-even and ensures your monthly profit easily covers the bank EMI with plenty of cash for your family.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-white border border-amber-200/60 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Coins className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Government Free Subsidies (PMEGP)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies up to 35% free government capital grants and collateral-free loan rules so you never risk your home or land.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* MSME Credit Architecture Breakdown */}
      <section className="py-16 sm:py-20 bg-slate-50/60">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
                Government Loans & Grants
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Get Bank Loans & Free Grants For Your Dream Business
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                India provides over ₹3 Lakh Crore in subsidized business loans, but many small entrepreneurs are turned away because they lack a clear project plan. UdayamAI creates an official, bank-ready plan so the branch manager approves your loan with confidence.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">PMEGP Subsidy:</strong> Up to 35% free cash grant from the government — you only need 5% from your own pocket!
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">Mudra Loans:</strong> Collateral-free bank loans from ₹50,000 to ₹10 Lakhs with low interest and no land mortgage needed.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">Government Guarantee:</strong> Government backs your loan so banks cannot ask for third-party guarantors.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/agent">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-md">
                    <span>Create Your Business Plan Now</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Comparison Callout Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-amber-200/70 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
                Why UdayamAI is Better Than Ordinary Calculators
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-200 space-y-1">
                  <div className="font-semibold text-red-800">Static Online Forms & Templates</div>
                  <p className="text-slate-600">
                    Use one rigid formula for everything. They ignore local prices, machine quotes, and real village market demand.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div className="font-semibold text-emerald-800">UdayamAI Intelligent Business Engine</div>
                  <p className="text-slate-700">
                    Analyzes your specific business, itemizes real machines, calculates daily sales needed, and gets you the highest government subsidy.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80 text-slate-700 text-xs font-mono">
                <div className="text-slate-900 font-semibold mb-1">Simple Bank Loan Rules You Should Know:</div>
                <div>• Bank Safety Score: 1.25x or higher means your loan gets easily approved</div>
                <div>• Your Starting Savings: Only 5% to 10% from your own pocket</div>
                <div>• Repayment Relief: First 6 months you focus on setting up before EMI starts</div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
