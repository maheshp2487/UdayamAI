"use client";

import { useEffect, useSyncExternalStore, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FinancialCalculator } from "@/lib/financial/financial-plan";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { Target, TrendingUp, AlertTriangle, Users, MapPin, IndianRupee, Download, Info, Globe, LayoutDashboard, LineChart, PieChart as PieIcon, CalendarDays } from "lucide-react";

const translations = {
  en: {
    title: "Hyper-Local Business Feasibility Report",
    module1: "Business Feasibility Analysis",
    module2: "10/90 Financial Structuring",
    marketReach: "Market Reach",
    opportunity: "Opportunity Analysis",
    competitors: "Competitor Mapping",
    pricing: "Product Market Value & Pricing",
    threats: "Risk & Threat Identification",
    swot: "Local SWOT Analysis",
    scheme: "Auto-Routed Scheme",
    schedule: "Complete Quarterly Repayment Schedule",
    tab1: "Market Analysis",
    tab2: "SWOT Matrix",
    tab3: "Financial Plan",
    tab4: "Repayment Schedule"
  },
  hi: {
    title: "हाइपर-लोकल व्यापार व्यवहार्यता रिपोर्ट",
    module1: "व्यापार व्यवहार्यता विश्लेषण",
    module2: "10/90 वित्तीय संरचना",
    marketReach: "बाजार पहुंच",
    opportunity: "अवसर विश्लेषण",
    competitors: "प्रतिस्पर्धी मैपिंग",
    pricing: "उत्पाद बाजार मूल्य और मूल्य निर्धारण",
    threats: "जोखिम और खतरे की पहचान",
    swot: "स्थानीय SWOT विश्लेषण",
    scheme: "ऑटो-रूटेड योजना",
    schedule: "त्रैमासिक चुकौती अनुसूची",
    tab1: "बाजार विश्लेषण",
    tab2: "SWOT मैट्रिक्स",
    tab3: "वित्तीय योजना",
    tab4: "चुकौती अनुसूची"
  },
  ta: {
    title: "அதி-உள்ளூர் வணிக சாத்தியக்கூறு அறிக்கை",
    module1: "வணிக சாத்தியக்கூறு பகுப்பாய்வு",
    module2: "10/90 நிதி கட்டமைப்பு",
    marketReach: "சந்தை சென்றடைதல்",
    opportunity: "வாய்ப்பு பகுப்பாய்வு",
    competitors: "போட்டியாளர் வரைபடம்",
    pricing: "தயாரிப்பு சந்தை மதிப்பு மற்றும் விலை",
    threats: "ஆபத்து மற்றும் அச்சுறுத்தல் அடையாளம்",
    swot: "உள்ளூர் SWOT பகுப்பாய்வு",
    scheme: "தானியங்கி திட்டம்",
    schedule: "காலாண்டு திருப்பிச் செலுத்தும் அட்டவணை",
    tab1: "சந்தை பகுப்பாய்வு",
    tab2: "SWOT அணி",
    tab3: "நிதி திட்டம்",
    tab4: "திருப்பிச் செலுத்தும் அட்டவணை"
  }
};

export default function AdvisoryDashboard() {
  const router = useRouter();
  const [lang, setLang] = useState<keyof typeof translations>('en');

  const rawData = useSyncExternalStore(
    () => () => {},
    () => typeof window !== 'undefined' ? localStorage.getItem('advisoryData') : null,
    () => null
  );

  const assessmentData = useMemo(() => {
    if (!rawData) return null;
    try {
      const data = JSON.parse(rawData) as Record<string, string | number>;
      return { data, financials: FinancialCalculator.calculatePS26091(Number(data.available_margin)) };
    } catch {
      return null;
    }
  }, [rawData]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !rawData) {
      router.push('/advisor');
    }
  }, [rawData, router]);

  if (!assessmentData) return <div className="p-12 text-center">Loading Report...</div>;
  const { data, financials } = assessmentData;

  const getAIContent = () => {
    const isDairy = String(data.business_category ?? "").includes("Dairy");
    const isRetail = String(data.business_category ?? "").includes("Retail");
    const isTextile = String(data.business_category ?? "").includes("Textile");

    const category = isDairy ? 'dairy' : isRetail ? 'retail' : 'default';

    const textBank = {
      en: {
        reach: `Estimated 5,000 to 12,000 primary consumers within a 10 km radius of ${data.location}. Main distribution via local weekly markets and direct-to-home delivery models.`,
        opportunity: {
          dairy: "High demand for A2 milk and organic ghee. Current supply chain is highly fragmented with limited organized players.",
          retail: "Lack of organized FMCG retail in the immediate vicinity. High dependency on distant wholesale markets creates a clear local gap.",
          default: "Moderate local demand with room for a well-positioned micro-enterprise to capture an underserved segment."
        },
        swotS: { dairy: "Strong demand for fresh milk, low transport costs, established cooperative network.", default: "Low operational overhead and deep local customer trust." },
        swotW: { dairy: "Dependency on fodder prices and veterinary access.", default: "Dependency on local supply chains with limited alternatives." },
        swotO: { dairy: "Government dairy development subsidies, nearby cooperative tie-ups.", default: "Rising rural disposable income and preference for local produce." },
        swotT: { dairy: "FMD outbreaks, seasonal fodder price volatility.", retail: "Incursion of large e-commerce platforms on discretionary spending.", default: "Cheap synthetic alternatives entering the local market." },
        threats: {
          dairy: "Key risks include FMD disease outbreaks and volatile fodder prices. Mitigate by joining milk producer cooperatives for price floor protection.",
          retail: "Incursion of large e-commerce logistics into tier-3 areas poses medium-term threat.",
          default: "Cheap machine-made alternatives can undercut handloom pricing. Target quality-conscious segments."
        },
        competitors: `Approximately ${isDairy ? '4-6' : isRetail ? '12-15' : '2-3'} existing unorganized competitors estimated in the ${data.location} area. Market saturation is ${isDairy ? 'low-to-moderate' : isRetail ? 'moderate' : 'low'}. Primary differentiation opportunity exists.`,
        pricing: {
          dairy: "Local fresh milk: ₹55–65/litre. A2 premium commands ₹10–15 above market rate. Price elasticity is low — customers prioritize freshness.",
          retail: "Standard MRP adherence with 10–15% gross margin on FMCG. Focus on volume and availability.",
          default: "Entry ₹250/unit, Recommended ₹400–600/unit. Gross margin guidance: 35–50%."
        }
      },
      hi: {
        reach: `${data.location} के 10 किमी के दायरे में अनुमानित 5,000 से 12,000 प्राथमिक उपभोक्ता। स्थानीय साप्ताहिक बाजारों और डायरेक्ट-टू-होम डिलीवरी मॉडल के माध्यम से मुख्य वितरण।`,
        opportunity: {
          dairy: "A2 दूध और जैविक घी की उच्च मांग। वर्तमान आपूर्ति श्रृंखला सीमित संगठित खिलाड़ियों के साथ अत्यधिक खंडित है।",
          retail: "आसपास के क्षेत्र में संगठित FMCG खुदरा की कमी। दूर के थोक बाजारों पर उच्च निर्भरता एक स्पष्ट स्थानीय अंतर पैदा करती है।",
          default: "एक कम सेवा वाले खंड को पकड़ने के लिए एक अच्छी तरह से स्थित सूक्ष्म उद्यम के लिए गुंजाइश के साथ मध्यम स्थानीय मांग।"
        },
        swotS: { dairy: "ताजे दूध की मजबूत मांग, कम परिवहन लागत, स्थापित सहकारी नेटवर्क।", default: "कम परिचालन ओवरहेड और गहरा स्थानीय ग्राहक विश्वास।" },
        swotW: { dairy: "चारे की कीमतों और पशु चिकित्सा पहुंच पर निर्भरता।", default: "सीमित विकल्पों के साथ स्थानीय आपूर्ति श्रृंखलाओं पर निर्भरता।" },
        swotO: { dairy: "सरकारी डेयरी विकास सब्सिडी, पास के सहकारी गठजोड़।", default: "बढ़ती ग्रामीण खर्च करने योग्य आय और स्थानीय उपज के लिए प्राथमिकता।" },
        swotT: { dairy: "FMD प्रकोप, मौसमी चारा मूल्य अस्थिरता।", retail: "विवेकाधीन खर्च पर बड़े ई-कॉमर्स प्लेटफॉर्म की घुसपैठ।", default: "स्थानीय बाजार में सस्ते सिंथेटिक विकल्प प्रवेश कर रहे हैं।" },
        threats: {
          dairy: "प्रमुख जोखिमों में FMD रोग का प्रकोप और चारे की अस्थिर कीमतें शामिल हैं। मूल्य संरक्षण के लिए दुग्ध उत्पादक सहकारी समितियों में शामिल होकर कम करें।",
          retail: "टियर-3 क्षेत्रों में बड़े ई-कॉमर्स लॉजिस्टिक्स की घुसपैठ मध्यम अवधि का खतरा पैदा करती है।",
          default: "सस्ते मशीन-निर्मित विकल्प उत्पाद मूल्य निर्धारण को कम कर सकते हैं। गुणवत्ता के प्रति जागरूक खंडों को लक्षित करें।"
        },
        competitors: `${data.location} क्षेत्र में लगभग ${isDairy ? '4-6' : isRetail ? '12-15' : '2-3'} मौजूदा असंगठित प्रतिस्पर्धी अनुमानित हैं। बाजार संतृप्ति ${isDairy ? 'निम्न-से-मध्यम' : isRetail ? 'मध्यम' : 'निम्न'} है। प्राथमिक विभेदीकरण का अवसर मौजूद है।`,
        pricing: {
          dairy: "स्थानीय ताजा दूध: ₹55-65/लीटर। A2 प्रीमियम बाजार दर से ₹10-15 अधिक है। मूल्य लोच कम है - ग्राहक ताजगी को प्राथमिकता देते हैं।",
          retail: "FMCG पर 10-15% सकल मार्जिन के साथ मानक MRP का पालन। मात्रा और उपलब्धता पर ध्यान दें।",
          default: "प्रवेश ₹250/इकाई, अनुशंसित ₹400-600/इकाई। सकल मार्जिन मार्गदर्शन: 35-50%।"
        }
      },
      ta: {
        reach: `${data.location} இன் 10 கி.மீ சுற்றளவில் சுமார் 5,000 முதல் 12,000 முதன்மை நுகர்வோர்கள். உள்ளூர் வார சந்தைகள் மற்றும் நேரடி விநியோக மாதிரிகள் மூலம் முக்கிய விநியோகம்.`,
        opportunity: {
          dairy: "A2 பால் மற்றும் ஆர்கானிக் நெய்க்கு அதிக தேவை. தற்போதைய விநியோக சங்கிலி வரையறுக்கப்பட்ட அமைப்புள்ள வீரர்களுடன் மிகவும் துண்டு துண்டாக உள்ளது.",
          retail: "அருகாமையில் அமைப்புள்ள FMCG சில்லறை விற்பனை இல்லை. தொலைதூர மொத்த சந்தைகளை அதிகம் சார்ந்திருப்பது தெளிவான உள்ளூர் இடைவெளியை உருவாக்குகிறது.",
          default: "குறைவாக சேவை செய்யப்படும் பிரிவை பிடிக்க நன்கு நிலைநிறுத்தப்பட்ட குறு நிறுவனத்திற்கான இடத்துடன் மிதமான உள்ளூர் தேவை."
        },
        swotS: { dairy: "புதிய பாலுக்கான வலுவான தேவை, குறைந்த போக்குவரத்து செலவு, நிறுவப்பட்ட கூட்டுறவு வலைப்பின்னல்.", default: "குறைந்த செயல்பாட்டு மேல்நிலை மற்றும் ஆழமான உள்ளூர் வாடிக்கையாளர் நம்பிக்கை." },
        swotW: { dairy: "தீவன விலைகள் மற்றும் கால்நடை மருத்துவ அணுகல் மீதான சார்பு.", default: "வரையறுக்கப்பட்ட மாற்று வழிகளுடன் உள்ளூர் விநியோக சங்கிலிகளை சார்ந்திருப்பது." },
        swotO: { dairy: "அரசு பால் பண்ணை மேம்பாட்டு மானியங்கள், அருகிலுள்ள கூட்டுறவு தொடர்புகள்.", default: "வளர்ந்து வரும் கிராமப்புற செலவழிக்கக்கூடிய வருமானம் மற்றும் உள்ளூர் தயாரிப்புகளுக்கான முன்னுரிமை." },
        swotT: { dairy: "FMD நோய் தாக்குதல்கள், பருவகால தீவன விலை ஏற்ற இறக்கம்.", retail: "விருப்பப்படி செலவு செய்வதில் பெரிய இ-காமர்ஸ் தளங்களின் ஊடுருவல்.", default: "உள்ளூர் சந்தைக்குள் நுழையும் மலிவான செயற்கை மாற்று பொருட்கள்." },
        threats: {
          dairy: "முக்கிய அபாயங்களில் FMD நோய் மற்றும் ஏற்ற இறக்கமான தீவன விலைகள் அடங்கும். விலை பாதுகாப்பிற்காக பால் உற்பத்தியாளர் கூட்டுறவு சங்கங்களில் சேர்வதன் மூலம் குறைக்கவும்.",
          retail: "அடுக்கு-3 பகுதிகளில் பெரிய இ-காமர்ஸ் லாஜிஸ்டிக்ஸ் ஊடுருவல் நடுத்தர கால அச்சுறுத்தலை ஏற்படுத்துகிறது.",
          default: "மலிவான இயந்திரத்தால் செய்யப்பட்ட மாற்று பொருட்கள் தயாரிப்பு விலையை குறைக்கலாம். தரத்தில் விழிப்புணர்வுள்ள பிரிவுகளை குறிவைக்கவும்."
        },
        competitors: `${data.location} பகுதியில் சுமார் ${isDairy ? '4-6' : isRetail ? '12-15' : '2-3'} அமைப்பு சாரா போட்டியாளர்கள் இருப்பதாக மதிப்பிடப்பட்டுள்ளது. சந்தை செறிவூட்டல் ${isDairy ? 'குறைவு-முதல்-மிதமானது' : isRetail ? 'மிதமானது' : 'குறைவானது'}. முதன்மை வேறுபாடு வாய்ப்பு உள்ளது.`,
        pricing: {
          dairy: "உள்ளூர் புதிய பால்: ₹55-65/லிட்டர். A2 பிரீமியம் சந்தை விகிதத்திற்கு மேல் ₹10-15 பெறுகிறது. விலை நெகிழ்ச்சி குறைவு - வாடிக்கையாளர்கள் புத்துணர்ச்சிக்கு முன்னுரிமை அளிக்கின்றனர்.",
          retail: "FMCG இல் 10-15% மொத்த விளிம்புடன் நிலையான MRP கடைபிடித்தல். அளவு மற்றும் கிடைக்கும் தன்மை மீது கவனம் செலுத்துங்கள்.",
          default: "நுழைவு ₹250/அலகு, பரிந்துரைக்கப்படுவது ₹400-600/அலகு. மொத்த விளிம்பு வழிகாட்டுதல்: 35-50%."
        }
      }
    };

    const b = textBank[lang];
    
    return {
      reach: b.reach,
      opportunity: b.opportunity[category] || b.opportunity.default,
      swot: {
        s: b.swotS[category as keyof typeof b.swotS] || b.swotS.default,
        w: b.swotW[category as keyof typeof b.swotW] || b.swotW.default,
        o: b.swotO[category as keyof typeof b.swotO] || b.swotO.default,
        t: b.swotT[category as keyof typeof b.swotT] || b.swotT.default
      },
      threats: b.threats[category as keyof typeof b.threats] || b.threats.default,
      competitors: b.competitors,
      pricing: b.pricing[category as keyof typeof b.pricing] || b.pricing.default
    };
  };

  const ai = getAIContent();
  const t = translations[lang];

  if (financials.outOfRange) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center space-y-6">
        <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-900">Project Scale Out of Range</h1>
        <p className="text-slate-600 leading-relaxed">{financials.warningMessage}</p>
        <Button onClick={() => router.push('/advisor')}>Revise Your Inputs</Button>
      </div>
    );
  }

  const pieData = [
    { name: 'Your Capital Margin', value: financials.availableMargin },
    { name: 'Term Loan (Fixed Assets)', value: Math.round(financials.effectiveLoan * 0.75) },
    { name: 'Working Capital Loan', value: Math.round(financials.effectiveLoan * 0.25) }
  ];
  
  // Clean, professional palette matching UdayamAI brand (Emerald, Slate-900, Blue-500)
  const PIE_COLORS = ['#10b981', '#0f172a', '#3b82f6'];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t.title}</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {String(data.location)} | {String(data.business_category)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 mr-2">
            <Globe className="h-4 w-4 text-slate-500" />
            <Select value={lang} onValueChange={(v: string | null) => { if (v) setLang(v as keyof typeof translations); }}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => window.print()} className="print:hidden bg-slate-900"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        <span><strong>Prototype Data:</strong> Market reach, competitor density, and pricing estimates are generated from deterministic templates. Future integration with live local datasets will replace these.</span>
      </div>

      {financials.warningMessage && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-sm text-amber-800">
          <strong>Note:</strong> {financials.warningMessage}
        </div>
      )}

      {/* Tabs Dashboard */}
      <Tabs defaultValue="market" className="w-full">
        <TabsList className="w-full h-14 bg-slate-100 flex p-1 mb-8">
          <TabsTrigger value="market" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"><LayoutDashboard className="mr-2 h-4 w-4"/> {t.tab1}</TabsTrigger>
          <TabsTrigger value="swot" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"><LineChart className="mr-2 h-4 w-4"/> {t.tab2}</TabsTrigger>
          <TabsTrigger value="financial" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"><PieIcon className="mr-2 h-4 w-4"/> {t.tab3}</TabsTrigger>
          <TabsTrigger value="schedule" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"><CalendarDays className="mr-2 h-4 w-4"/> {t.tab4}</TabsTrigger>
        </TabsList>

        {/* 1. MARKET ANALYSIS TAB */}
        <TabsContent value="market" className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{t.module1}</h2>
          </div>
          
          {data.business_vision && (
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 italic text-slate-700 text-lg shadow-sm">
              "{String(data.business_vision)}"
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Target className="h-5 w-5 text-blue-500" /> {t.marketReach}</CardTitle></CardHeader>
              <CardContent className="text-slate-600 leading-relaxed">{ai.reach}</CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-500" /> {t.opportunity}</CardTitle></CardHeader>
              <CardContent className="text-slate-600 leading-relaxed">{ai.opportunity}</CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Users className="h-5 w-5 text-purple-500" /> {t.competitors}</CardTitle></CardHeader>
              <CardContent className="text-slate-600 leading-relaxed">{ai.competitors}</CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><IndianRupee className="h-5 w-5 text-amber-500" /> {t.pricing}</CardTitle></CardHeader>
              <CardContent className="text-slate-600 leading-relaxed">{ai.pricing}</CardContent>
            </Card>
          </div>
          <Card className="border-red-100 bg-red-50/30">
            <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" /> {t.threats}</CardTitle></CardHeader>
            <CardContent className="text-slate-700 leading-relaxed">{ai.threats}</CardContent>
          </Card>
        </TabsContent>

        {/* 2. SWOT MATRIX TAB */}
        <TabsContent value="swot" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">{t.swot}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50/50 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-green-800 text-lg">Strengths (S)</CardTitle></CardHeader>
              <CardContent className="text-green-900 leading-relaxed">{ai.swot.s}</CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50/50 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-red-800 text-lg">Weaknesses (W)</CardTitle></CardHeader>
              <CardContent className="text-red-900 leading-relaxed">{ai.swot.w}</CardContent>
            </Card>
            <Card className="border-blue-200 bg-blue-50/50 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-blue-800 text-lg">Opportunities (O)</CardTitle></CardHeader>
              <CardContent className="text-blue-900 leading-relaxed">{ai.swot.o}</CardContent>
            </Card>
            <Card className="border-amber-200 bg-amber-50/50 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2"><CardTitle className="text-amber-800 text-lg">Threats (T)</CardTitle></CardHeader>
              <CardContent className="text-amber-900 leading-relaxed">{ai.swot.t}</CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 3. FINANCIAL STRUCTURING TAB */}
        <TabsContent value="financial" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">{t.module2}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-primary/20 shadow-md">
                <CardHeader className="bg-slate-50 pb-4 border-b">
                  <CardTitle className="text-xl">{t.scheme}</CardTitle>
                  <CardDescription>Determined by Total Project Cost Requirements</CardDescription>
                  <Badge className="w-fit text-sm mt-3 px-3 py-1" variant={financials.schemeId === "micro_finance" ? "secondary" : "default"}>
                    {financials.schemeName}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-6 space-y-5 text-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Your Capital Margin (10%)</span>
                    <span className="font-semibold text-emerald-600">₹{financials.availableMargin.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Approved Loan (90%)</span>
                    <span className="font-semibold text-slate-900">₹{financials.effectiveLoan.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-4 mt-2 flex justify-between items-center font-bold text-xl">
                    <span>Total Project Cost</span>
                    <span>₹{financials.projectCost.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Scheme Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-base">
                  <div className="flex justify-between"><span className="text-slate-600">Interest Rate (p.a.)</span><span className="font-medium text-slate-900">{financials.interestRate}%</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Tenure</span><span className="font-medium text-slate-900">{financials.tenureMonths} Months</span></div>
                  <div className="flex justify-between"><span className="text-slate-600">Moratorium Period</span><span className="font-medium text-slate-900">{financials.moratoriumMonths} Months</span></div>
                  <div className="flex justify-between border-t pt-3 mt-1"><span className="text-slate-600">Estimated Quarterly EMI</span><span className="font-bold text-lg text-slate-900">₹{Math.round(financials.quarterlyPayment).toLocaleString()}</span></div>
                </CardContent>
              </Card>
            </div>

            {/* Pie Chart */}
            <Card className="flex flex-col items-center justify-center min-h-[400px] shadow-sm border-slate-200">
              <CardHeader className="text-center w-full pb-0">
                <CardTitle className="text-lg text-slate-700">Capital Leverage Visualization</CardTitle>
                <CardDescription>Visualizing your 10/90 funding split and loan allocation</CardDescription>
              </CardHeader>
              <CardContent className="w-full flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={4}
                      stroke="none"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => `₹${Number(value || 0).toLocaleString()}`} 
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }}/>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 4. REPAYMENT SCHEDULE TAB */}
        <TabsContent value="schedule" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.schedule}</h2>
            <p className="text-slate-500">Visualizing the 7-year amortization and moratorium impact.</p>
          </div>

          {/* Bar Chart Visualization */}
          <Card className="p-6 shadow-sm border-slate-200">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financials.amortizationSchedule} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="quarter" tickFormatter={(q) => `Q${q}`} tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} dy={10} />
                  <YAxis tickFormatter={(val) => `₹${val/1000}k`} tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} dx={-10} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => `₹${Math.round(Number(value || 0)).toLocaleString()}`} 
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} />
                  <Bar dataKey="principal" stackId="a" fill="#0f172a" name="Principal Repayment" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="interest" stackId="a" fill="#94a3b8" name="Interest Accrual" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <div className="border rounded-xl overflow-hidden bg-white shadow-sm border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Quarter</TableHead>
                  <TableHead className="font-semibold text-slate-700">Type</TableHead>
                  <TableHead className="font-semibold text-slate-700">Total Payment</TableHead>
                  <TableHead className="font-semibold text-slate-700">Principal</TableHead>
                  <TableHead className="font-semibold text-slate-700">Interest</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Remaining Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financials.amortizationSchedule.map((row) => (
                  <TableRow key={row.quarter} className={row.isMoratorium ? "bg-amber-50/50 text-amber-900 border-b-amber-100" : ""}>
                    <TableCell className="font-medium">Q{row.quarter}</TableCell>
                    <TableCell>{row.isMoratorium ? <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">Moratorium</Badge> : "Repayment"}</TableCell>
                    <TableCell>{row.isMoratorium ? "–" : `₹${Math.round(row.payment).toLocaleString()}`}</TableCell>
                    <TableCell className={row.isMoratorium ? "text-amber-700" : "text-blue-600"}>{row.isMoratorium ? "–" : `₹${Math.round(row.principal).toLocaleString()}`}</TableCell>
                    <TableCell className={row.isMoratorium ? "text-amber-700" : "text-amber-600"}>₹{Math.round(row.interest).toLocaleString()}</TableCell>
                    <TableCell className="font-semibold text-right text-slate-700">₹{Math.round(row.balance).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating AI Chatbot */}
      <ChatWidget reportContext={{ 
        userInputs: data, 
        financialMath: financials, 
        marketAnalysis: ai,
        language: lang
      }} />

    </div>
  );
}
