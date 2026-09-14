'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Store, 
  MapPin, 
  IndianRupee, 
  TrendingUp, 
  ArrowRight, 
  Coins, 
  ShieldCheck, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/i18n/translations';

interface BusinessIdea {
  title: string;
  category: 'Food & Eateries' | 'Agri & Allied' | 'Textiles & Crafts' | 'Retail & Services' | 'Green Manufacturing';
  location: string;
  areaType: 'Rural' | 'Urban';
  description: string;
  margin: number;
  capexEst: string;
  subsidy: string;
  dscr: string;
  scale: 'Micro / Mobile Kiosk' | 'Standard Small Commercial Unit' | 'Expanded Facility / Production Plant';
}

const BUSINESS_IDEAS: BusinessIdea[] = [
  {
    title: 'Dosa & Fast Food Tiffin Stall',
    category: 'Food & Eateries',
    location: 'Madurai, Tamil Nadu',
    areaType: 'Urban',
    description: 'Commercial 3-burner gas bhatti, wet grinder, and mobile stainless steel food cart serving fresh morning breakfast and evening snacks.',
    margin: 50000,
    capexEst: '₹2.80 - ₹3.50 Lakhs',
    subsidy: '25% PMEGP / Mudra Kishor',
    dscr: '2.85x (High)',
    scale: 'Micro / Mobile Kiosk',
  },
  {
    title: 'Solar Micro-Cold Storage Unit (5 MT)',
    category: 'Agri & Allied',
    location: 'Nashik, Maharashtra',
    areaType: 'Rural',
    description: 'Decentralized farm-gate solar-powered cold storage room protecting perishable grapes, onions, and vegetables from distress sales.',
    margin: 80000,
    capexEst: '₹5.00 - ₹6.50 Lakhs',
    subsidy: '35% Rural PMEGP Subsidy',
    dscr: '3.40x (Prime)',
    scale: 'Standard Small Commercial Unit',
  },
  {
    title: 'Organic Dairy & A2 Milk Production (5 Cows)',
    category: 'Agri & Allied',
    location: 'Bastar, Chhattisgarh',
    areaType: 'Rural',
    description: 'Procurement of 5 high-yield indigenous Gir cows, stainless steel chilling containers, and localized village-to-town milk delivery.',
    margin: 60000,
    capexEst: '₹4.20 - ₹5.00 Lakhs',
    subsidy: '35% Rural Subsidy / NABARD',
    dscr: '2.65x (Bankable)',
    scale: 'Standard Small Commercial Unit',
  },
  {
    title: 'Automated Jacquard Handloom Weaving Unit',
    category: 'Textiles & Crafts',
    location: 'Varanasi, Uttar Pradesh',
    areaType: 'Rural',
    description: 'Modern pneumatic jacquard handloom setup producing traditional Banarasi silk sarees with 3x higher weaving throughput.',
    margin: 90000,
    capexEst: '₹6.00 - ₹7.50 Lakhs',
    subsidy: '35% Special Category Subsidy',
    dscr: '2.95x (Bankable)',
    scale: 'Standard Small Commercial Unit',
  },
  {
    title: 'Daily Needs Kirana & FMCG Retail Store',
    category: 'Retail & Services',
    location: 'Palghar District, Maharashtra',
    areaType: 'Rural',
    description: 'Well-stocked village retail shop with digital POS billing, cold beverage refrigeration, and direct wholesale grain supply.',
    margin: 60000,
    capexEst: '₹3.50 - ₹4.50 Lakhs',
    subsidy: '25% - 35% PMEGP Service',
    dscr: '2.40x (Bankable)',
    scale: 'Standard Small Commercial Unit',
  },
  {
    title: 'Biodegradable Areca Palm Tableware Unit',
    category: 'Green Manufacturing',
    location: 'Shimoga, Karnataka',
    areaType: 'Rural',
    description: 'Hydraulic heated press machines converting naturally fallen areca palm sheaths into chemical-free disposable plates and bowls.',
    margin: 75000,
    capexEst: '₹4.50 - ₹5.50 Lakhs',
    subsidy: '35% Rural PMEGP Subsidy',
    dscr: '3.10x (High)',
    scale: 'Standard Small Commercial Unit',
  },
  {
    title: 'Spice & Grain Mini Milling Processing Unit',
    category: 'Agri & Allied',
    location: 'Jaipur Rural, Rajasthan',
    areaType: 'Rural',
    description: 'Compact pulverizer, destoner, and nitrogen packaging machine for localized chili, turmeric, coriander, and wheat flour milling.',
    margin: 85000,
    capexEst: '₹5.50 - ₹6.80 Lakhs',
    subsidy: '35% Rural Grant + PMFME',
    dscr: '3.25x (Prime)',
    scale: 'Standard Small Commercial Unit',
  },
  {
    title: 'Mobile Phone Hardware Repair & Digital CSC',
    category: 'Retail & Services',
    location: 'Patna, Bihar',
    areaType: 'Urban',
    description: 'SMD rework station, screen separator, diagnostic multimeter, and Common Service Center (CSC) digital citizen documentation kiosk.',
    margin: 35000,
    capexEst: '₹2.00 - ₹2.50 Lakhs',
    subsidy: 'Mudra Shishu / 25% PMEGP',
    dscr: '2.70x (Bankable)',
    scale: 'Micro / Mobile Kiosk',
  },
];

export default function BusinessIdeasPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
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

  const categories = ['All', 'Food & Eateries', 'Agri & Allied', 'Textiles & Crafts', 'Retail & Services', 'Green Manufacturing'];

  const filteredIdeas = BUSINESS_IDEAS.filter((idea) => {
    const matchesCat = selectedCategory === 'All' || idea.category === selectedCategory;
    const matchesQuery = searchQuery.trim() === '' || 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      idea.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const launchAppraisal = (idea: BusinessIdea) => {
    const url = `/agent?idea=${encodeURIComponent(idea.title)}&location=${encodeURIComponent(idea.location)}&budget=${idea.margin}&scale=${encodeURIComponent(idea.scale)}&area=${encodeURIComponent(idea.areaType)}`;
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pb-20">
      
      {/* Page Hero */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>
              {lang === 'hi' ? 'पूर्व-सत्यापित एमएसएमई उद्यम मॉडल' : lang === 'ta' ? 'சரிபார்க்கப்பட்ட சிறுதொழில் திட்டங்கள்' : 'Pre-Validated MSME Enterprise Profiles'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {lang === 'hi' ? 'ग्रामीण एवं छोटे व्यवसायों के लोकप्रिय विचार' : lang === 'ta' ? 'கிராமப்புற & சிறு வணிக யோசனைகள்' : 'Explore Grassroots Business Opportunities'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'भारतीय ग्रामीण और अर्ध-शहरी जिलों के लिए तैयार किए गए उच्च-मांग वाले उद्यम। किसी भी मॉडल पर क्लिक करके तुरंत 5-वर्षीय वित्तीय रिपोर्ट देखें।'
              : lang === 'ta'
              ? 'இந்திய கிராமப்புற மற்றும் சிறு நகரங்களுக்கான அதிக தேவை கொண்ட வணிக மாதிரிகள். எந்தவொரு மாதிரியையும் தேர்வு செய்து வங்கி அறிக்கையை உடனே பெறவும்.'
              : 'Curated, high-demand micro and small enterprise models designed for Indian rural and semi-urban districts. Tap any model to launch a step-by-step loan underwriting appraisal.'}
          </p>

          {/* Search & Filter Controls */}
          <div className="pt-4 max-w-xl mx-auto space-y-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'hi' ? 'व्यवसाय, क्षेत्र या जिले से खोजें (उदा. डोसा, डेयरी, नासिक)...' : lang === 'ta' ? 'தொழில், துறை அல்லது மாவட்டம் மூலம் தேடவும்...' : 'Search by trade, sector, or district (e.g. Dosa, Dairy, Nashik)...'}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-100 shadow-2xs transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={'filter-cat-' + cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-600 text-white shadow-xs font-semibold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Ideas */}
      <section className="container mx-auto px-4 sm:px-6 max-w-5xl pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Showing {filteredIdeas.length} Enterprise Models
          </div>
          <span className="text-xs text-amber-900 font-medium bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-block w-fit">
            ✓ 100% Aligned with PMEGP & Mudra Banking Guidelines
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredIdeas.map((idea) => (
            <div
              key={'idea-card-' + idea.title}
              className="p-6 rounded-2xl bg-white border border-amber-200/70 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
                      {idea.category}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                      {idea.title}
                    </h2>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                    idea.areaType === 'Rural'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {idea.areaType} Sector
                  </span>
                </div>

                <div className="flex items-center text-xs text-slate-500 space-x-1 mb-3">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{idea.location}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {idea.description}
                </p>
              </div>

              {/* Financial Metrics Grid */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-100">
                    <div className="text-[11px] text-amber-900 font-medium">Your Margin Money</div>
                    <div className="font-mono font-bold text-amber-800 text-sm mt-0.5">
                      ₹{idea.margin.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[11px] text-slate-500 font-medium">Total Project Outlay</div>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                      {idea.capexEst}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 font-medium">
                  <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                    <Coins className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    {idea.subsidy}
                  </span>
                  <span className="font-mono text-emerald-900 font-bold">
                    DSCR: {idea.dscr}
                  </span>
                </div>

                <Button
                  onClick={() => launchAppraisal(idea)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-3 rounded-xl shadow-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
                >
                  <span>{lang === 'hi' ? 'परियोजना रिपोर्ट तैयार करें' : lang === 'ta' ? 'திட்ட அறிக்கை பெறவும்' : 'Appraise Feasibility (Step-by-Step)'}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
