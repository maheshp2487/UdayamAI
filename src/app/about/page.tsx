'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Award, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Globe2, 
  FileSpreadsheet 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/i18n/translations';

export default function AboutPage() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('udayam_language') as Language;
      if (storedLang && (storedLang === 'en' || storedLang === 'hi' || storedLang === 'ta')) {
        setLang(storedLang);
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

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pb-20">
      
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
            <Building2 className="h-3.5 w-3.5 text-amber-600" />
            <span>
              {lang === 'hi' ? 'भारतीय सूक्ष्म एवं लघु उद्यमों के लिए डिजिटल मंच' : lang === 'ta' ? 'இந்திய சிறுதொழில்களுக்கான பொது டிஜிட்டல் தளம்' : 'Public Digital Infrastructure for Indian MSMEs'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {lang === 'hi' ? 'भारत के 6.3 करोड़ सूक्ष्म उद्यमियों के लिए ऋण लोकतंत्रीकरण' : lang === 'ta' ? 'இந்தியாவின் 6.3 கோடி சிறு வணிகர்களுக்கான எளிய வங்கி கடன்' : "Democratizing Formal Credit for India's 63 Million Micro-Enterprises"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'उदयमएआई ग्रामीण व कस्बाई उद्यमियों के लिए तकनीकी-आर्थिक व्यवहार्यता, सरकारी सब्सिडी संरचना और बैंक-ग्रेड क्रेडिट अंडरराइटिंग को स्वचालित करता है।'
              : lang === 'ta'
              ? 'உதயம் ஏஐ கிராமப்புற தொழில்முனைவோருக்கான திட்ட சாத்தியக்கூறு, அரசு மானிய கட்டமைப்பு மற்றும் வங்கி கடன் அறிக்கைகளை உடனே வழங்குகிறது.'
              : 'UdayamAI automates techno-economic feasibility appraisal, statutory subsidy structuring, and bank-grade credit underwriting for grassroots entrepreneurs.'}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 max-w-4xl pt-10 space-y-10">
        
        {/* The Problem */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-amber-200/70 shadow-xs space-y-4">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">The Credit Dilemma</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            The Missing Bridge in Indian MSME Banking
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            India is home to over 63 million micro, small, and medium enterprises (MSMEs). The Government of India, through landmark schemes like the Prime Minister&apos;s Employment Generation Programme (PMEGP), Pradhan Mantri Mudra Yojana (PMMY), and PM SVANidhi, has earmarked hundreds of thousands of crores for concessional credit.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            However, loan sanction rates remain bottlenecked. First-generation entrepreneurs, women self-help groups, and rural artisans cannot afford ₹15,000 to ₹30,000 consultant fees to formulate bankable Detailed Project Reports (DPRs). Consequently, they rely on handwritten estimates that loan officers routinely reject for lack of techno-economic rigor.
          </p>
        </div>

        {/* What UdayamAI Does */}
        <div className="space-y-4">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Our Solution</span>
          <h2 className="text-2xl font-bold text-slate-900">
            Institutional Underwriting in Seconds
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-white border border-amber-200/70 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Dynamic DPR Formulation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Powered by Google Gemini 3.6 Flash, the platform extracts specific commercial machinery quotations, raw ingredient unit costs, and statutory license requirements tailored to the exact business trade.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-emerald-200/70 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Deterministic Banking Norms</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Financial models enforce commercial bank Debt Service Coverage Ratio (DSCR &ge; 1.25x), 5-year loan amortization schedules, and realistic break-even day targets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200/70 shadow-xs space-y-2.5">
              <div className="h-9 w-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Globe2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Statutory Subsidy Maximization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically identifies and allocates PMEGP 15%-35% non-dilutive capital subsidies and 5%-10% promoter equity requirements based on official gazette rules.
              </p>
            </div>
          </div>
        </div>

        {/* Institutional Integrity & Data Privacy */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-amber-200/70 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">Institutional Commitments & Open Access</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start space-x-2.5">
              <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700">
                <strong className="text-slate-900">100% Free & Open Access:</strong> Zero consultancy fees or lock-ins for grassroots borrowers.
              </p>
            </div>
            <div className="flex items-start space-x-2.5">
              <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700">
                <strong className="text-slate-900">Privacy First:</strong> No Aadhaar, PAN, or sensitive PII stored on remote database servers.
              </p>
            </div>
            <div className="flex items-start space-x-2.5">
              <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700">
                <strong className="text-slate-900">Printable Bank Dossiers:</strong> DPR reports can be directly printed and submitted to any public or private bank branch.
              </p>
            </div>
            <div className="flex items-start space-x-2.5">
              <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700">
                <strong className="text-slate-900">Transparent Assumptions:</strong> Every unit cost, margin, and debt payment is fully auditable.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-white border border-amber-200/80 shadow-xs text-center space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            {lang === 'hi' ? 'क्या आप अपने उद्यम की रिपोर्ट तैयार करने के लिए तैयार हैं?' : lang === 'ta' ? 'உங்கள் திட்ட அறிக்கையை பெற தயாரா?' : 'Ready to appraise your enterprise?'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Take 2 minutes to answer 5 simple questions to formulate your bank-standard Detailed Project Report with zero consultancy fees.
          </p>
          <div className="pt-2">
            <Link href="/agent">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-xs">
                <span>{lang === 'hi' ? 'परियोजना रिपोर्ट शुरू करें' : lang === 'ta' ? 'திட்ட அறிக்கை தொடங்கவும்' : 'Start Step-by-Step Appraisal'}</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

      </section>

    </div>
  );
}
