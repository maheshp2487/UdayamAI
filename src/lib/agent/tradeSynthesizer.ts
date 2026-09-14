import { AgentInput, StatutoryLicense } from './types';

export interface SynthesizedTradeData {
  ventureName: string;
  itemUnitName: string;
  unitSellingPrice: number;
  unitVariableCost: number;
  estimatedDailyUnits: number;
  estimatedCapex: number;
  monthlyRawMaterials: number;
  monthlyLaborRentUtilities: number;
  setupTimeDays: number;
  timeToFirstSaleDays: number;
  operationalBreakEvenDays: number;
  capexBreakdown: Array<{ item: string; specification: string; amount: number }>;
  opexBreakdown: Array<{ item: string; amount: number }>;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  licenses: StatutoryLicense[];
  milestones: Array<{ phase: string; title: string; target: string }>;
  targetAudience: string;
  demandDrivers: string[];
  competitiveSaturation: 'Low' | 'Moderate' | 'High';
  competitorInsights: string;
  regionalAdvantage: string;
}

export function synthesizeMsmeTradeIntelligence(input: AgentInput): SynthesizedTradeData {
  const ideaLower = (input.idea || '').toLowerCase();
  const location = input.location || 'India';
  const district = location.split(',')[0].trim();
  const budget = Math.max(25000, Number(input.budget) || 100000);
  const lang = input.language || 'en';

  // Realistic capex scale based on starting capital and leverage (bank loan 90% + margin 10%)
  const targetCapex = Math.max(120000, Math.round(budget * (budget < 100000 ? 5 : budget < 300000 ? 3.5 : 2.5)));

  // Helper to apportion capex percentages
  const cAmt = (pct: number) => Math.round((targetCapex * pct) / 1000) * 1000;

  // 1. EDIBLE OILS & EXPELLER MILLS
  if (ideaLower.includes('oil') || ideaLower.includes('mustard') || ideaLower.includes('expeller') || ideaLower.includes('groundnut') || ideaLower.includes('sesame')) {
    return {
      ventureName: lang === 'hi' ? `${district} शुद्ध कोल्ड प्रेस्ड तेल मिल` : lang === 'ta' ? `${district} தூய மரச்செக்கு எண்ணெய் ஆலை` : `${district} Pure Cold-Pressed Oil Expeller Mill`,
      itemUnitName: lang === 'hi' ? '1 लीटर शुद्ध तेल बोतल' : lang === 'ta' ? '1 லிட்டர் தூய எண்ணெய் பாட்டில்' : '1 Litre Pure Oil Bottle',
      unitSellingPrice: 175,
      unitVariableCost: 110,
      estimatedDailyUnits: Math.max(40, Math.round(targetCapex / 8000)),
      estimatedCapex: targetCapex,
      monthlyRawMaterials: Math.round(targetCapex * 0.4),
      monthlyLaborRentUtilities: Math.round(targetCapex * 0.18),
      setupTimeDays: 32,
      timeToFirstSaleDays: 45,
      operationalBreakEvenDays: 60,
      capexBreakdown: [
        { item: 'Stainless Steel Cold-Press Oil Expeller (5 HP Heavy-Duty)', specification: 'Cold press screw motor 120kg/hr capacity', amount: cAmt(42) },
        { item: 'Micro-Filtration Plate & Oil Transfer Pump Rig', specification: 'Food grade SS304 multi-stage filter', amount: cAmt(22) },
        { item: 'Automatic Semi-Digital Bottle Filling & Foil Capper', specification: 'Piston volumetric 200ml-1000ml filler', amount: cAmt(16) },
        { item: 'Seed Pre-Cleaning Screen, Moisture Meter & Silos', specification: 'Vibro screen destoner & 5-ton seed bin', amount: cAmt(12) },
        { item: 'Shop Electricals, 3-Phase Power Panel & Safety Rig', specification: 'Industrial copper wiring & MCB panel', amount: cAmt(8) }
      ],
      opexBreakdown: [
        { item: 'Monthly Raw Mustard / Oilseed Procurement', amount: Math.round(targetCapex * 0.4) },
        { item: 'Expeller Operator & Helper Wages', amount: Math.round(targetCapex * 0.12) },
        { item: '3-Phase Industrial Electric Power & Fuel', amount: Math.round(targetCapex * 0.08) },
        { item: 'Food-Grade PET Bottles, Labels & Outer Cartons', amount: Math.round(targetCapex * 0.06) }
      ],
      swot: {
        strengths: [
          lang === 'hi' ? 'कच्ची घानी / कोल्ड प्रेस्ड शुद्ध तेल की भारी मांग, सीधे ग्राहक और किराना दुकानों को नकद बिक्री।' : 'Surging demand for 100% unadulterated cold-pressed oil with direct cash retail sales.',
          lang === 'hi' ? 'तेल निकालने के बाद बची खल (खली) मवेशियों के चारे के रूप में ऊँचे दाम पर बिकती है (अतिरिक्त आमदनी)।' : 'Valuable oilcake by-product sold directly to local dairy farmers providing secondary income stream.',
          lang === 'hi' ? 'PMEGP योजना के तहत 35% तक गैर-वापसी योग्य मुफ्त सरकारी सब्सिडी।' : 'Eligible for up to 35% non-dilutive government grant under PMEGP.'
        ],
        weaknesses: [
          lang === 'hi' ? 'फसल कटाई के समय बीज के भाव में उतार-चढ़ाव, 30 दिन का स्टॉक रखना आवश्यक।' : 'Seasonal commodity price fluctuations in raw seed requiring a 30-day working capital cushion.',
          lang === 'hi' ? 'निर्बाध 3-फेज बिजली कनेक्शन और नियमित मशीन मेंटेनेंस की आवश्यकता।' : 'Requires uninterrupted 3-phase industrial power supply.'
        ],
        opportunities: [
          lang === 'hi' ? 'स्थानीय हलवाई, रेस्टोरेंट और शादियों के लिए 15 लीटर टिन में थोक आपूर्ति।' : 'Supplying 15-litre bulk tins to local sweet shops, wedding caterers, and dhabas.',
          lang === 'hi' ? 'ब्रांडेड ग्लास बोतल पैकिंग करके नजदीकी शहर के सुपरमार्केट में बेचना।' : 'Glass-bottle premium retail packaging for nearby city supermarkets.'
        ],
        threats: [
          lang === 'hi' ? 'बाजार में मिलने वाले सस्ते मिलावटी रिफाइंड तेल से मूल्य प्रतिस्पर्धा।' : 'Price competition from mass-market industrial refined oils.',
          lang === 'hi' ? 'बेमौसम बारिश से स्थानीय तिलहन फसल खराब होना।' : 'Unseasonal weather impacting local mustard or groundnut harvests.'
        ]
      },
      licenses: [
        { name: 'Udyam MSME Registration', authority: 'Ministry of MSME (Instant Online)', timelineDays: 2, criticality: 'Mandatory before opening' },
        { name: 'FSSAI Food Safety Registration', authority: 'State Food Safety Authority (FSSAI)', timelineDays: 14, criticality: 'Mandatory before opening' },
        { name: 'Legal Metrology (Weights & Measures Verification)', authority: 'Weights & Measures Dept', timelineDays: 21, criticality: 'Within 30 days of launch' },
        { name: 'Gram Panchayat / Municipal Trade NOC', authority: 'Local Governing Body', timelineDays: 30, criticality: 'Within 30 days of launch' }
      ],
      milestones: [
        { phase: 'Month 1', title: 'Power Connection & Machinery Installation', target: 'Secure 3-phase connection, install expeller & filter, obtain FSSAI license.' },
        { phase: 'Month 2', title: 'Trial Pressing & Local Wholesale Ties', target: 'Crush initial 2-ton seed lot, bottle test batches, supply 10 local kirana stores.' },
        { phase: 'Month 3-6', title: 'Break-Even & Daily Capacity Target', target: 'Reach steady daily crushing target, sell oilcake to local dairy farms.' },
        { phase: 'Month 7-12', title: 'Expansion & Retail Pouch Packing', target: 'Add pouch packaging line and supply regional grocery chains.' }
      ],
      targetAudience: `Households, local grocery stores, sweet makers, and dairy owners seeking unadulterated oil and feed in ${district}.`,
      demandDrivers: ['High health awareness against palm oil adulteration', 'Fresh extraction in front of customers builds intense trust', 'Cattle feed demand for oilcake'],
      competitiveSaturation: 'Moderate',
      competitorInsights: 'Dominated by stale packaged brands; fresh doorstep extraction commands immediate customer loyalty.',
      regionalAdvantage: `Proximity to local mandi for raw seed purchase at wholesale rates.`
    };
  }

  // 2. DAIRY FARMING & MILK CHILLING
  if (ideaLower.includes('dairy') || ideaLower.includes('milk') || ideaLower.includes('cow') || ideaLower.includes('buffalo') || ideaLower.includes('ghee') || ideaLower.includes('paneer')) {
    return {
      ventureName: lang === 'hi' ? `${district} उन्नत डेयरी फार्म व दुग्ध केंद्र` : lang === 'ta' ? `${district} நவீன பால் பண்ணை மற்றும் குளிர்பதன மையம்` : `${district} High-Yield Dairy Farm & Milk Centre`,
      itemUnitName: lang === 'hi' ? '1 लीटर ताजा शुद्ध दूध' : lang === 'ta' ? '1 லிட்டர் தூய பால்' : '1 Litre Fresh Chilled Milk',
      unitSellingPrice: 65,
      unitVariableCost: 32,
      estimatedDailyUnits: Math.max(60, Math.round(targetCapex / 5000)),
      estimatedCapex: targetCapex,
      monthlyRawMaterials: Math.round(targetCapex * 0.35),
      monthlyLaborRentUtilities: Math.round(targetCapex * 0.2),
      setupTimeDays: 28,
      timeToFirstSaleDays: 35,
      operationalBreakEvenDays: 50,
      capexBreakdown: [
        { item: 'High-Yield Indigenous / Crossbred Cattle Stock (Milking Stock)', specification: 'Gir / Murrah high milk yield animals', amount: cAmt(48) },
        { item: 'Stainless Steel Bulk Milk Chiller (300 Litre Unit)', specification: 'SS304 tank with hermetic refrigeration compressor', amount: cAmt(22) },
        { item: 'Automated Milking Machine & Sanitization System', specification: 'Dual bucket hygienic vacuum pulse milker', amount: cAmt(12) },
        { item: 'Insulated Milk Cans, Digital Fat & SNF Testing Meter', specification: 'Food grade aluminium cans & ultrasonic tester', amount: cAmt(10) },
        { item: 'Cattle Shed Flooring, Rubber Mats, Mangers & Waterers', specification: 'Ventilated shed with anti-slip mats & slurry drain', amount: cAmt(8) }
      ],
      opexBreakdown: [
        { item: 'Concentrate Cattle Feed, Mineral Mixtures & Dry Fodder', amount: Math.round(targetCapex * 0.35) },
        { item: 'Dairy Farm Attendant / Milker Wages', amount: Math.round(targetCapex * 0.12) },
        { item: 'Veterinary Care, Deworming & Artificial Insemination', amount: Math.round(targetCapex * 0.05) },
        { item: 'Electricity & Milk Chiller Maintenance', amount: Math.round(targetCapex * 0.05) }
      ],
      swot: {
        strengths: [
          lang === 'hi' ? 'सुबह और शाम रोजाना नकद आमदनी, दूध की कभी न खत्म होने वाली मांग।' : 'Daily non-stop morning & evening cash inflows with zero inventory obsolescence.',
          lang === 'hi' ? 'पनीर, दही, और घी बनाकर मुनाफा दोगुना करने का विकल्प।' : 'Value addition into paneer, curd, and pure desi ghee doubles gross margins.',
          lang === 'hi' ? 'गोबर से वर्मीकंपोस्ट (जैविक खाद) बनाकर अतिरिक्त कमाई।' : 'Cow dung converts to organic vermicompost for additional recurring revenue.'
        ],
        weaknesses: [
          lang === 'hi' ? '365 दिन बिना छुट्टी देखभाल की जरूरत, पशुओं के चारे और स्वास्थ्य पर कड़ी नजर रखनी होगी।' : 'Demands 365-day operational commitment without holidays.',
          lang === 'hi' ? 'गर्मियों में हरे चारे की कमी से दूध उत्पादन पर असर।' : 'Summer green fodder shortages requiring planned silage storage.'
        ],
        opportunities: [
          lang === 'hi' ? 'शहर की सोसायटियों में कांच की बोतलों में शुद्ध A2 दूध की होम डिलीवरी।' : 'Direct glass-bottle monthly milk subscriptions to residential colonies.',
          lang === 'hi' ? 'स्थानीय चाय की दुकानों और हलवाइयों से 100% नकद आपूर्ति का अनुबंध।' : 'Direct supply contracts with local tea stalls and sweet shops.'
        ],
        threats: [
          lang === 'hi' ? 'पशुओं में अचानक बीमारी या खुरपका-मुंहपका रोग का जोखिम (टीकाकरण आवश्यक)।' : 'Risk of cattle diseases requiring mandatory preventive vaccination.',
          lang === 'hi' ? 'पावर कट होने पर दूध फटने का डर (चिलर बैकअप जरूरी)।' : 'Risk of milk spoilage during power cuts if backup power fails.'
        ]
      },
      licenses: [
        { name: 'Udyam MSME Registration', authority: 'Ministry of MSME', timelineDays: 2, criticality: 'Mandatory before opening' },
        { name: 'FSSAI Food Safety Registration', authority: 'State Food Safety Authority', timelineDays: 14, criticality: 'Mandatory before opening' },
        { name: 'Veterinary Health & Vaccination Clearance', authority: 'District Animal Husbandry Dept', timelineDays: 10, criticality: 'Mandatory before opening' },
        { name: 'Gram Panchayat Dairy NOC', authority: 'Local Gram Panchayat', timelineDays: 21, criticality: 'Within 30 days of launch' }
      ],
      milestones: [
        { phase: 'Month 1', title: 'Shed Preparation & Cattle Induction', target: 'Construct shed, install rubber mats, purchase vetted cattle with health certificates.' },
        { phase: 'Month 2', title: 'Chiller Setup & Route Delivery', target: 'Install bulk milk chiller, start morning doorstep delivery to 40 households.' },
        { phase: 'Month 3-6', title: 'Scale to Full Capacity & Paneer Making', target: 'Reach full daily milking yield, convert surplus evening milk to fresh paneer.' },
        { phase: 'Month 7-12', title: 'Breeding Cycle & Feed Fodder Plot', target: 'Cultivate hybrid Napier grass on 0.5 acre for free green fodder, service bank loan.' }
      ],
      targetAudience: `Residential households, tea stalls, sweet vendors, and local dairy cooperatives in ${district}.`,
      demandDrivers: ['Constant daily domestic consumption', 'Preference for fresh unpasteurized thick farm milk', 'High festival demand for sweets & paneer'],
      competitiveSaturation: 'Moderate',
      competitorInsights: 'Most milk is sold loose with questionable fat testing; digital fat testing builds instant trust.',
      regionalAdvantage: 'Direct access to village grazing grounds and nearby crop residues for low-cost feeding.'
    };
  }

  // 3. POULTRY BROILER / LAYER FARM
  if (ideaLower.includes('poultry') || ideaLower.includes('chicken') || ideaLower.includes('broiler') || ideaLower.includes('bird') || ideaLower.includes('egg') || ideaLower.includes('layer')) {
    return {
      ventureName: lang === 'hi' ? `${district} ब्रायलर पोल्ट्री फार्म (1000 पक्षी)` : lang === 'ta' ? `${district} பிராய்லர் கோழி பண்ணை (1000 பறவைகள்)` : `${district} Modern Broiler Poultry Farm (1000 Birds)`,
      itemUnitName: lang === 'hi' ? '1 किग्रा जीवित ब्रायलर चिकन' : lang === 'ta' ? '1 கிலோ உயிருள்ள கோழி' : '1 Kg Live Broiler Bird',
      unitSellingPrice: 125,
      unitVariableCost: 78,
      estimatedDailyUnits: Math.max(50, Math.round(targetCapex / 6000)),
      estimatedCapex: targetCapex,
      monthlyRawMaterials: Math.round(targetCapex * 0.42),
      monthlyLaborRentUtilities: Math.round(targetCapex * 0.16),
      setupTimeDays: 30,
      timeToFirstSaleDays: 42,
      operationalBreakEvenDays: 55,
      capexBreakdown: [
        { item: 'Bio-Secure Poultry Shed Construction & Curtains', specification: 'Naturally ventilated shed with mesh & side curtains', amount: cAmt(42) },
        { item: 'Automated Nipple Drinker & Bell Feeder Pipeline', specification: 'Pressure regulated pipe line with anti-leak nipples', amount: cAmt(22) },
        { item: 'Infrared Gas Brooder Heating & Cooling Fogger System', specification: 'Chick temperature regulation & summer foggers', amount: cAmt(16) },
        { item: 'Feed Storage Bins, Bird Weighing Scales & Crates', specification: 'Damp-proof feed room & 50 heavy-duty bird crates', amount: cAmt(10) },
        { item: 'Backup Inverter, Water Sanitation Pump & Piping', specification: 'Continuous water supply & chlorine dosing unit', amount: cAmt(10) }
      ],
      opexBreakdown: [
        { item: 'Commercial Pre-Starter & Finisher Poultry Feed', amount: Math.round(targetCapex * 0.42) },
        { item: 'Day-Old Chicks (DOC) Induction Lots', amount: Math.round(targetCapex * 0.12) },
        { item: 'Poultry Farm Attendant & Helper Wages', amount: Math.round(targetCapex * 0.08) },
        { item: 'Vaccines, Bio-Security Disinfectants & Electricity', amount: Math.round(targetCapex * 0.05) }
      ],
      swot: {
        strengths: [
          lang === 'hi' ? 'सिर्फ 40-42 दिनों का उत्पादन चक्र, साल में 6 से 7 बैच निकालने की सुविधा।' : 'Fast 40-42 day rearing cycle allowing 6 to 7 profit-generating batches per year.',
          lang === 'hi' ? 'स्थानीय चिकन दुकानों और ढाबों से भारी नकद मांग।' : 'Immediate cash wholesale off-take from local meat shops and highway eateries.',
          lang === 'hi' ? 'पोल्ट्री खाद (लिट्टर) जैविक खेती के लिए ऊंचे दामों पर बिकती है।' : 'High nitrogen poultry litter sold as organic fertilizer to local farmers.'
        ],
        weaknesses: [
          lang === 'hi' ? 'दाने (फीड) के दामों में तेजी का असर मुनाफे पर पड़ सकता है।' : 'Feed cost fluctuations represent over 65% of operating expenditure.',
          lang === 'hi' ? 'सख्त बायो-सिक्योरिटी और स्वच्छता बनाए रखना जरूरी है।' : 'Strict sanitation required to prevent chick mortality.'
        ],
        opportunities: [
          lang === 'hi' ? 'बड़ी कंपनियों (जैसे वेंकीज, सुगंधा) के साथ बाय-बैक कॉन्ट्रैक्ट फार्मिंग।' : 'Contract farming tie-ups with leading poultry integrators with assured margins.',
          lang === 'hi' ? 'अपनी खुद की रिटेल चिकन कटिंग शॉप खोलकर सीधा 30% अधिक मुनाफा।' : 'Opening an owned retail fresh-cut meat shop to capture full consumer margins.'
        ],
        threats: [
          lang === 'hi' ? 'सावन या नवरात्रि के दौरान मांग में मौसमी गिरावट।' : 'Seasonal demand dips during regional fasting months.',
          lang === 'hi' ? 'अत्यधिक गर्मी में मुर्गियों की हीट स्ट्रोक से सुरक्षा जरूरी।' : 'Extreme summer heat requiring reliable fogger misting operations.'
        ]
      },
      licenses: [
        { name: 'Udyam MSME Registration', authority: 'Ministry of MSME', timelineDays: 2, criticality: 'Mandatory before opening' },
        { name: 'Gram Panchayat Poultry NOC', authority: 'Local Gram Panchayat', timelineDays: 21, criticality: 'Mandatory before opening' },
        { name: 'District Animal Husbandry Registration', authority: 'Dept of Animal Husbandry', timelineDays: 15, criticality: 'Within 30 days of launch' },
        { name: 'State Pollution Control Board Green Exemption', authority: 'State PCB (Green Category)', timelineDays: 30, criticality: 'Recommended for scaling' }
      ],
      milestones: [
        { phase: 'Month 1', title: 'Shed Setup & Bio-Security Sanitization', target: 'Complete shed flooring, install nipple drinkers, disinfect entire premises.' },
        { phase: 'Month 2', title: 'First Batch (1000 Chicks) & Harvest', target: 'Brood day-old chicks, complete vaccination protocol, sell Batch 1 at 2.2 kg weight.' },
        { phase: 'Month 3-6', title: 'Continuous 42-Day Batch Rotation', target: 'Achieve feed conversion ratio (FCR) of 1.55, establish repeat retailer tie-ups.' },
        { phase: 'Month 7-12', title: 'Expansion to 2000 Birds', target: 'Construct Shed 2 from retained profits, expand batch size, service bank loan.' }
      ],
      targetAudience: `Local fresh meat vendors, hotel canteens, dhabas, and retail consumers in ${district}.`,
      demandDrivers: ['High daily protein demand', 'Fast rotation cycle', 'Stable local mandi chicken prices'],
      competitiveSaturation: 'Moderate',
      competitorInsights: 'Supply is fragmented; disciplined weight gain and bio-security give a decisive cost advantage.',
      regionalAdvantage: 'Low land cost and natural cross-ventilation in the rural sector.'
    };
  }

  // 4. MUSHROOM CULTIVATION
  if (ideaLower.includes('mushroom') || ideaLower.includes('spore') || ideaLower.includes('spawn') || ideaLower.includes('oyster') || ideaLower.includes('button')) {
    return {
      ventureName: lang === 'hi' ? `${district} ऑर्गेनिक मशरूम उत्पादन इकाई` : lang === 'ta' ? `${district} ஆர்கானிக் காளான் உற்பத்தி நிலையம்` : `${district} Organic Mushroom Cultivation Enterprise`,
      itemUnitName: lang === 'hi' ? '1 किग्रा ताजा मशरूम पैकेट' : lang === 'ta' ? '1 கிலோ புதிய காளான் பாக்கெட்' : '1 Kg Fresh Mushroom Pack',
      unitSellingPrice: 190,
      unitVariableCost: 65,
      estimatedDailyUnits: Math.max(30, Math.round(targetCapex / 8000)),
      estimatedCapex: targetCapex,
      monthlyRawMaterials: Math.round(targetCapex * 0.32),
      monthlyLaborRentUtilities: Math.round(targetCapex * 0.18),
      setupTimeDays: 25,
      timeToFirstSaleDays: 38,
      operationalBreakEvenDays: 52,
      capexBreakdown: [
        { item: 'Climate Controlled Growing Room & Bamboo Stacking Racks', specification: 'Insulated room with 5-tier vertical bamboo racks', amount: cAmt(38) },
        { item: 'Automated Ultrasonic Humidifiers & Fogging Nozzles', specification: 'Maintains 85-90% relative humidity automatically', amount: cAmt(24) },
        { item: 'Straw Boiling & Steam Autoclave Sterilization Unit', specification: 'Heavy duty SS boiler drum for substrate sterilization', amount: cAmt(16) },
        { item: 'Pouch Vacuum Sealer, Digital Hygrometers & Lab Tools', specification: 'Commercial sealer & temperature monitoring sensors', amount: cAmt(12) },
        { item: 'Substrate Raw Material, Spawn Culture & Perforated Bags', specification: 'Initial certified mother spawn & wheat straw buffer', amount: cAmt(10) }
      ],
      opexBreakdown: [
        { item: 'Paddy Straw, Wheat Bran & High-Yield Mushroom Spawn', amount: Math.round(targetCapex * 0.32) },
        { item: 'Cultivation Helper & Harvesting Labor', amount: Math.round(targetCapex * 0.12) },
        { item: 'Electricity & Humidifier Power Consumption', amount: Math.round(targetCapex * 0.06) },
        { item: 'Breathable Perforated Packaging Trays & Film', amount: Math.round(targetCapex * 0.05) }
      ],
      swot: {
        strengths: [
          lang === 'hi' ? 'कम जगह में बहुमंजिला बांस के रैक पर भारी उत्पादन (वर्टिकल फार्मिंग)।' : 'Requires minimal land footprint due to vertical multi-tier stacking racks.',
          lang === 'hi' ? 'कच्चे माल (पुआल/भूसा) की गांव में बेहद कम कीमत पर प्रचुर उपलब्धता।' : 'Abundant and cheap raw agricultural substrate (paddy/wheat straw) locally.',
          lang === 'hi' ? 'उच्च पोषण और औषधीय गुणों के कारण शाकाहारी परिवारों में भारी मांग।' : 'High protein vegetarian appeal commanding premium profit margins.'
        ],
        weaknesses: [
          lang === 'hi' ? 'कमरे में नमी (85%) और तापमान (22-26°C) का लगातार ध्यान रखना आवश्यक।' : 'Requires strict temperature and humidity maintenance.',
          lang === 'hi' ? 'ताजे मशरूम की शेल्फ लाइफ 48-72 घंटे होती है, त्वरित बिक्री जरूरी।' : 'Fresh mushrooms have 48-72 hour shelf life requiring immediate sales logistics.'
        ],
        opportunities: [
          lang === 'hi' ? 'अतिरिक्त मशरूम को सुखाकर (ड्राई मशरूम) या मशरूम पाउडर बनाकर बेचना।' : 'Drying surplus mushrooms into mushroom powder for higher off-season value.',
          lang === 'hi' ? 'शहर के रेस्टोरेंट, पिज्जा कैफे और शादियों में सीधी आपूर्ति।' : 'Direct daily supply agreements with local hotels, pizzerias, and caterers.'
        ],
        threats: [
          lang === 'hi' ? 'जीवाणु या फफूंद संक्रमण का खतरा यदि सफाई में लापरवाही हो।' : 'Contamination risk if substrate sterilization is not rigorous.',
          lang === 'hi' ? 'सर्दियों में स्थानीय आवक बढ़ने पर अस्थायी मूल्य दबाव।' : 'Temporary wholesale price dips during peak winter harvest.'
        ]
      },
      licenses: [
        { name: 'Udyam MSME Registration', authority: 'Ministry of MSME', timelineDays: 2, criticality: 'Mandatory before opening' },
        { name: 'FSSAI Food Safety Registration', authority: 'State Food Safety Authority', timelineDays: 14, criticality: 'Mandatory before opening' },
        { name: 'Gram Panchayat Agricultural Trade NOC', authority: 'Local Gram Panchayat', timelineDays: 21, criticality: 'Within 30 days of launch' }
      ],
      milestones: [
        { phase: 'Month 1', title: 'Room Sterilization & Racking Setup', target: 'Erect bamboo racks, install ultrasonic misting system, sterilize straw.' },
        { phase: 'Month 2', title: 'Spawning & First Harvest Pinhead Flush', target: 'Spawn 500 bags, monitor spawn run, harvest first flush within 21 days.' },
        { phase: 'Month 3-6', title: 'Daily Harvesting & Supermarket Tie-Up', target: 'Stagger bag cycles to harvest 40 kg daily, supply 15 grocery stores.' },
        { phase: 'Month 7-12', title: 'Mushroom Drying & Pouch Value Addition', target: 'Introduce sun/solar dried packs and mushroom soup mix packets.' }
      ],
      targetAudience: `Health-conscious consumers, grocery shops, hotels, pizzerias, and wedding caterers in ${district}.`,
      demandDrivers: ['High vegetarian protein demand', 'Rising wellness lifestyle', 'Fast 25-day production cycle'],
      competitiveSaturation: 'Low',
      competitorInsights: 'Very few commercial mushroom growers in rural areas; high local pricing advantage over distant imports.',
      regionalAdvantage: 'Inexpensive straw and farm waste locally available from harvest fields.'
    };
  }

  // 5. TAILORING, BOUTIQUE & APPAREL
  if (ideaLower.includes('tailor') || ideaLower.includes('boutique') || ideaLower.includes('cloth') || ideaLower.includes('garment') || ideaLower.includes('sewing') || ideaLower.includes('dress')) {
    return {
      ventureName: lang === 'hi' ? `${district} मॉडर्न बुटीक व लेडीज टेलरिंग स्टूडियो` : lang === 'ta' ? `${district} நவீன பூட்டிக் மற்றும் தையல் நிலையம்` : `${district} Designer Boutique & Custom Tailoring Studio`,
      itemUnitName: lang === 'hi' ? '1 सिला हुआ डिजाइनर सूट / कुर्ती' : lang === 'ta' ? '1 தைக்கப்பட்ட ஆடை' : '1 Stitched Custom Garment',
      unitSellingPrice: 380,
      unitVariableCost: 115,
      estimatedDailyUnits: Math.max(12, Math.round(targetCapex / 14000)),
      estimatedCapex: targetCapex,
      monthlyRawMaterials: Math.round(targetCapex * 0.28),
      monthlyLaborRentUtilities: Math.round(targetCapex * 0.24),
      setupTimeDays: 20,
      timeToFirstSaleDays: 25,
      operationalBreakEvenDays: 40,
      capexBreakdown: [
        { item: 'Industrial Direct-Drive High Speed Sewing Machines (2 Units)', specification: 'Direct drive servo motor with auto needle positioning', amount: cAmt(38) },
        { item: '4-Thread Overlock / Interlock Edge Machine & Pico Unit', specification: 'Heavy duty high speed overlocking unit', amount: cAmt(22) },
        { item: 'Commercial Vacuum Ironing Board & Steam Press Station', specification: 'Industrial boiler with Teflon sole steam iron', amount: cAmt(16) },
        { item: 'Large Cutting Table, Pattern Rulers & Rotary Fabric Cutter', specification: 'Laminated hardwood cutting table & electric shears', amount: cAmt(12) },
        { item: 'Boutique Display Mannequins, Fitting Room & Mirrors', specification: 'Full length trial room, LED lighting & display racks', amount: cAmt(12) }
      ],
      opexBreakdown: [
        { item: 'Linings, Designer Laces, Zippers, Threads & Trims', amount: Math.round(targetCapex * 0.28) },
        { item: 'Assistant Tailor & Finishing Helper Wages', amount: Math.round(targetCapex * 0.16) },
        { item: 'Shop Commercial Rent & Electricity', amount: Math.round(targetCapex * 0.14) },
        { item: 'Packaging Bags, Hangers & Branding Labels', amount: Math.round(targetCapex * 0.04) }
      ],
      swot: {
        strengths: [
          lang === 'hi' ? 'सिलाई में कच्चा माल ग्राहक खुद कपड़ा लाकर देता है, जिससे न्यूनतम कार्यशील पूंजी लगती है।' : 'Clients bring their own fabric; near-zero working capital lockup on inventory.',
          lang === 'hi' ? 'शादियों और त्योहारों के सीजन में भारी एडवांस बुकिंग और 70% तक शुद्ध मुनाफा।' : 'Peak wedding and festival seasons generate heavy advance cash deposits with 70% gross margins.',
          lang === 'hi' ? 'महिला उद्यमी होने पर PMEGP योजना में केवल 5% पूंजी लगानी होती है और 35% मुफ्त सब्सिडी।' : 'Special 35% PMEGP subsidy with only 5% margin for women entrepreneurs.'
        ],
        weaknesses: [
          lang === 'hi' ? 'कुशल कारीगर या सहायक दर्जी की उपलब्धता पर निर्भरता।' : 'Dependence on skilled cutting and stitching assistants.',
          lang === 'hi' ? 'त्योहारों के बाद कुछ महीनों में मौसमी सुस्ती आ सकती है।' : 'Post-wedding season dry spells requiring school uniform contracts.'
        ],
        opportunities: [
          lang === 'hi' ? 'स्थानीय स्कूलों की यूनिफॉर्म और सरकारी कॉलेजों के कोट की थोक सिलाई।' : 'Securing bulk school uniform stitching contracts for off-peak stability.',
          lang === 'hi' ? 'रेडीमेड कुर्तियों और ब्लाउज की ऑनलाइन व इंस्टाग्राम पर बिक्री।' : 'Selling standardized ready-to-wear kurtis on Instagram and WhatsApp.'
        ],
        threats: [
          lang === 'hi' ? 'ई-कॉमर्स (मीशो, फ्लिपकार्ट) से सस्ते रेडीमेड कपड़ों की प्रतिस्पर्धा।' : 'Price competition from ultra-low cost mass-manufactured readymade garments.',
          lang === 'hi' ? 'गलत नाप या समय पर डिलीवरी न होने पर ग्राहक का असंतोष।' : 'Customer dissatisfaction risks if delivery deadlines are missed.'
        ]
      },
      licenses: [
        { name: 'Udyam MSME Registration', authority: 'Ministry of MSME', timelineDays: 2, criticality: 'Mandatory before opening' },
        { name: 'Shop & Establishment Act Registration', authority: 'State Labour Department', timelineDays: 14, criticality: 'Mandatory before opening' },
        { name: 'Gram Panchayat / Municipal Trade Permit', authority: 'Local Municipal Body', timelineDays: 21, criticality: 'Within 30 days of launch' }
      ],
      milestones: [
        { phase: 'Month 1', title: 'Shop Interior & Machine Procurement', target: 'Install direct-drive machines, set up fitting room, print promotional rate cards.' },
        { phase: 'Month 2', title: 'Grand Opening & First 50 Orders', target: 'Launch with 15% discount for first 50 customers, distribute local flyers.' },
        { phase: 'Month 3-6', title: 'Peak Season Scaling & Bulk Contracts', target: 'Hire apprentice tailor, take on wedding trousseau orders, achieve break-even.' },
        { phase: 'Month 7-12', title: 'Readymade Line & Uniform Supply', target: 'Stock 100 fast-moving cotton kurtis, service bank loan on time.' }
      ],
      targetAudience: `Women, college students, wedding families, and school children in ${district}.`,
      demandDrivers: ['Preference for perfect customized fit', 'High festival and wedding spending', 'Rapid fashion changes'],
      competitiveSaturation: 'Moderate',
      competitorInsights: 'Traditional village tailors have slow turnaround and outdated patterns; modern boutique styling wins rapidly.',
      regionalAdvantage: 'High local trust and word-of-mouth referral network in the community.'
    };
  }

  // 6. BAKERY & CONFECTIONERY
  if (ideaLower.includes('bakery') || ideaLower.includes('bread') || ideaLower.includes('cake') || ideaLower.includes('biscuit') || ideaLower.includes('cookie') || ideaLower.includes('pastry')) {
    return {
      ventureName: lang === 'hi' ? `${district} फ्रेश बेकरी व कन्फेक्शनरी मार्ट` : lang === 'ta' ? `${district} சுவையான பேக்கரி மற்றும் கேக் நிலையம்` : `${district} Fresh Oven Bakery & Confectionery Mart`,
      itemUnitName: lang === 'hi' ? '1 किग्रा ताजा ब्रेड / केक पैकेट' : lang === 'ta' ? '1 கிலோ புதிய ரொட்டி / கேக்' : '1 Kg Fresh Bread / Cake Pack',
      unitSellingPrice: 95,
      unitVariableCost: 40,
      estimatedDailyUnits: Math.max(70, Math.round(targetCapex / 3500)),
      estimatedCapex: targetCapex,
      monthlyRawMaterials: Math.round(targetCapex * 0.38),
      monthlyLaborRentUtilities: Math.round(targetCapex * 0.22),
      setupTimeDays: 28,
      timeToFirstSaleDays: 36,
      operationalBreakEvenDays: 48,
      capexBreakdown: [
        { item: 'Double-Deck Commercial Electric Baking Oven', specification: 'Digital temperature control up to 400°C with timer', amount: cAmt(40) },
        { item: 'Heavy Duty Spiral Flour Mixer & Dough Kneader (25 Kg)', specification: 'Stainless steel bowl with dual speed motor', amount: cAmt(22) },
        { item: 'Commercial Display Chiller Counter for Cakes & Pastries', specification: 'Curved glass refrigerated showcase with LED lights', amount: cAmt(16) },
        { item: 'Bread Slicing Machine, Proofing Racks & Aluminum Trays', specification: 'Heavy duty gravity slicer & 40 baking trays', amount: cAmt(12) },
        { item: 'Shop Front Glass Counter, Billing Counter & Neon Signboard', specification: 'Front retail display & POS billing terminal', amount: cAmt(10) }
      ],
      opexBreakdown: [
        { item: 'Flour (Maida), Yeast, Sugar, Butter & Cream', amount: Math.round(targetCapex * 0.38) },
        { item: 'Master Baker & Shop Assistant Wages', amount: Math.round(targetCapex * 0.16) },
        { item: 'Commercial Electricity & Baking Fuel', amount: Math.round(targetCapex * 0.12) },
        { item: 'Food-Grade Cake Boxes, Bread Sleeves & Bags', amount: Math.round(targetCapex * 0.06) }
      ],
      swot: {
        strengths: [
          lang === 'hi' ? 'सुबह ताजा ब्रेड, पाव और रस्क की रोजाना निश्चित खपत और नकद बिक्री।' : 'High daily turnover of morning breakfast items (fresh bread, pav, rusk) with instant cash payment.',
          lang === 'hi' ? 'जन्मदिन केक और पेस्ट्री में 60% से 75% तक भारी मुनाफा मार्जिन।' : 'Celebration cakes command 60% to 75% profit margins.',
          lang === 'hi' ? 'PMEGP योजना में 35% तक गैर-वापसी योग्य सब्सिडी।' : 'Eligible for 35% capital subsidy under PMEGP.'
        ],
        weaknesses: [
          lang === 'hi' ? 'क्रीम और ब्रेड की सीमित शेल्फ लाइफ (2 से 4 दिन), दैनिक मांग का सटीक आकलन जरूरी।' : 'Perishable shelf-life requiring disciplined daily production planning.',
          lang === 'hi' ? 'बिजली कटौती होने पर ओवन चलाने के लिए पर्याप्त पावर बैकअप आवश्यक।' : 'Requires reliable electrical power for continuous oven heating.'
        ],
        opportunities: [
          lang === 'hi' ? 'स्थानीय चाय स्टॉलों, कैफे और बर्गर ठेलों को रोजाना पाव और बन की थोक सप्लाई।' : 'Supplying fresh buns and burger pavs to local fast food stalls on daily bulk contracts.',
          lang === 'hi' ? 'स्कूलों और ऑफिसों में जन्मदिन पार्टियों के लिए कस्टमाइज्ड फोटो केक डिलीवरी।' : 'Custom birthday and anniversary theme cakes for residential neighborhoods.'
        ],
        threats: [
          lang === 'hi' ? 'मैदा, चीनी और मक्खन की थोक कीमतों में अचानक उछाल।' : 'Price inflation in key ingredients like flour, dairy butter, and edible oils.',
          lang === 'hi' ? 'पैकेज्ड ब्रांडेड ब्रेड कंपनियों से स्थानीय प्रतिस्पर्धा।' : 'Competition from industrial packaged bread brands.'
        ]
      },
      licenses: [
        { name: 'Udyam MSME Registration', authority: 'Ministry of MSME', timelineDays: 2, criticality: 'Mandatory before opening' },
        { name: 'FSSAI Food Safety Registration', authority: 'State Food Safety Authority', timelineDays: 14, criticality: 'Mandatory before opening' },
        { name: 'Shop & Establishment Act Registration', authority: 'State Labour Department', timelineDays: 14, criticality: 'Mandatory before opening' },
        { name: 'Fire Safety NOC (for Commercial Oven)', authority: 'Local Fire Services', timelineDays: 28, criticality: 'Within 30 days of launch' }
      ],
      milestones: [
        { phase: 'Month 1', title: 'Oven Installation & Recipe Calibration', target: 'Install deck oven and spiral mixer, bake test batches, obtain FSSAI license.' },
        { phase: 'Month 2', title: 'Grand Opening & Tea Stall Tie-Ups', target: 'Launch storefront, supply 20 local tea stalls with fresh buns and rusks daily.' },
        { phase: 'Month 3-6', title: 'Cake Customization & Full Break-Even', target: 'Reach daily sales of 120 bread loaves and 10 birthday cakes, achieve profit break-even.' },
        { phase: 'Month 7-12', title: 'Packaged Biscuits & Cookies Line', target: 'Add sealed cookie packs for retail distribution across 30 neighboring village stores.' }
      ],
      targetAudience: `Families, school children, tea stalls, office workers, and party hosts in ${district}.`,
      demandDrivers: ['Daily breakfast consumption habits', 'Growing popularity of western bakery snacks', 'Frequent birthday parties'],
      competitiveSaturation: 'Moderate',
      competitorInsights: 'Packaged factory breads lack oven-fresh aroma; freshly baked items sold warm attract long queues.',
      regionalAdvantage: 'High roadside visibility and walk-in footfall in town center.'
    };
  }

  // 7. GENERIC / DYNAMIC SYNTHESIZER FOR ANY OTHER RAW BUSINESS IDEA
  // Sanitizes the raw idea into a clean trade title and builds a 100% custom plan
  const cleanIdea = input.idea
    .replace(/^(i want to start|start|open|create|build|make|setup|set up|a|an)\s+/i, '')
    .trim();
  const tradeTitle = cleanIdea.charAt(0).toUpperCase() + cleanIdea.slice(1);

  return {
    ventureName: lang === 'hi' ? `${district} ${tradeTitle} उद्यम` : lang === 'ta' ? `${district} ${tradeTitle} தொழில் நிறுவனம்` : `${district} ${tradeTitle} Micro Enterprise`,
    itemUnitName: lang === 'hi' ? `1 इकाई / ऑर्डर (${tradeTitle})` : lang === 'ta' ? `1 அலகு (${tradeTitle})` : `1 Unit / Order of ${tradeTitle}`,
    unitSellingPrice: Math.max(50, Math.round(targetCapex / 1500)),
    unitVariableCost: Math.max(22, Math.round((targetCapex / 1500) * 0.48)),
    estimatedDailyUnits: Math.max(25, Math.round(targetCapex / 6000)),
    estimatedCapex: targetCapex,
    monthlyRawMaterials: Math.round(targetCapex * 0.35),
    monthlyLaborRentUtilities: Math.round(targetCapex * 0.2),
    setupTimeDays: 28,
    timeToFirstSaleDays: 40,
    operationalBreakEvenDays: 55,
    capexBreakdown: [
      { item: `Core Commercial Production & Processing Machinery for ${tradeTitle}`, specification: 'Heavy duty commercial grade equipment', amount: cAmt(42) },
      { item: `Precision Tooling, Workstations & Operating Bench Setup`, specification: 'Stainless steel furniture & tooling setup', amount: cAmt(22) },
      { item: `Commercial Raw Material Storage Racks & Inventory Silos`, specification: 'Safe storage shelving and handling equipment', amount: cAmt(16) },
      { item: `Quality Testing, Packaging & Finishing Equipment`, specification: 'Verification gauge and packaging sealing station', amount: cAmt(12) },
      { item: `Shopfront Electrical Wiring, Commercial Lighting & Signboard`, specification: 'Safety circuit breakers, cabling and display board', amount: cAmt(8) }
    ],
    opexBreakdown: [
      { item: 'Monthly Raw Materials, Consumables & Production Stock', amount: Math.round(targetCapex * 0.35) },
      { item: 'Operator & Skilled Helper Wages', amount: Math.round(targetCapex * 0.15) },
      { item: 'Premises Commercial Rent, Electricity & Fuel', amount: Math.round(targetCapex * 0.12) },
      { item: 'Packaging, Local Logistics & Equipment Maintenance', amount: Math.round(targetCapex * 0.08) }
    ],
    swot: {
      strengths: [
        lang === 'hi' ? `स्थानीय स्तर पर ${tradeTitle} की मजबूत मांग और दैनिक ग्राहकों से सीधा नकद भुगतान।` : `Strong direct customer demand for ${tradeTitle} in ${district} with immediate cash collections.`,
        lang === 'hi' ? 'PMEGP योजना के तहत 35% तक गैर-वापसी योग्य मुफ्त सरकारी सब्सिडी।' : 'Eligible for up to 35% non-dilutive capital subsidy under government PMEGP scheme.',
        lang === 'hi' ? 'अपनी जेब से केवल 5% से 10% पूंजी लगाकर बैंक ऋण की पूर्ण सुविधा।' : 'Only 5% to 10% own pocket equity required with bank financing the balance.'
      ],
      weaknesses: [
        lang === 'hi' ? 'शुरुआती 30 दिनों में दुकान तैयार करने और ग्राहकों का भरोसा बनाने में समय लगना।' : 'Initial 30-day setup and customer trust-building period before achieving steady volume.',
        lang === 'hi' ? 'दैनिक बिक्री और खर्चों का नियमित खाता-बही रखना जरूरी।' : 'Requires disciplined daily bookkeeping and stock tracking.'
      ],
      opportunities: [
        lang === 'hi' ? 'नजदीकी ग्रामीण हाटों, बाजारों और थोक व्यापारियों को नियमित आपूर्ति।' : `Supplying neighboring village markets, local fairs, and wholesale trade accounts.`,
        lang === 'hi' ? 'व्यापार स्थापित होने पर मुद्रा योजना (किशोर/तरुण) से बिना गारंटी विस्तार ऋण।' : 'Collateral-free business expansion loans under Mudra Kishor/Tarun once established.'
      ],
      threats: [
        lang === 'hi' ? 'कच्चे माल के दाम में मौसमी उतार-चढ़ाव।' : 'Fluctuations in raw material prices requiring an emergency reserve fund.',
        lang === 'hi' ? 'स्थानीय स्तर पर बिना गुणवत्ता वाले असंगठित विक्रेताओं से प्रतिस्पर्धा।' : 'Price pressure from informal unorganized operators lacking quality standards.'
      ]
    },
    licenses: [
      { name: 'Udyam MSME Registration', authority: 'Ministry of MSME (Free Instant Online)', timelineDays: 2, criticality: 'Mandatory before opening' },
      { name: 'Shop & Establishment Act Registration', authority: 'State Labour Department', timelineDays: 14, criticality: 'Mandatory before opening' },
      { name: 'Gram Panchayat / Municipal Trade Permit', authority: 'Local Governing Authority', timelineDays: 21, criticality: 'Within 30 days of launch' },
      { name: 'Goods & Services Tax (GST) if TurnOver > 40L', authority: 'Central Board of Indirect Taxes', timelineDays: 10, criticality: 'Recommended for scaling' }
    ],
    milestones: [
      { phase: 'Month 1', title: 'Machinery Procurement & Premises Setup', target: `Procure core machinery for ${tradeTitle}, complete electrical wiring, obtain Udyam MSME registration.` },
      { phase: 'Month 2', title: 'Pilot Launch & First Customer Acquisition', target: 'Commence trial production, onboard first 25 local paying customers, test unit economics.' },
      { phase: 'Month 3-6', title: 'Daily Capacity Target & Break-Even', target: 'Achieve daily sales break-even target, maintain punctual bank EMI repayments, build 1-month reserve.' },
      { phase: 'Month 7-12', title: 'Expansion & Trade Channel Tie-Ups', target: 'Expand product range, appoint 5 local retail distributors, establish steady family profit.' }
    ],
    targetAudience: `Households, retail shoppers, and commercial buyers in and around ${district}.`,
    demandDrivers: [`Steady local requirement for affordable ${tradeTitle}`, 'Direct neighborhood access and convenience', 'Personalized customer service and local trust'],
    competitiveSaturation: 'Moderate',
    competitorInsights: 'Existing services are mostly informal and inconsistent; a reliable, clean commercial unit builds instant customer goodwill.',
    regionalAdvantage: `Strategic location in ${district} with low rental overheads and good local connectivity.`
  };
}
