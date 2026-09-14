export type Language = 'en' | 'hi' | 'ta';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  tagline: string;
  selectLanguage: string;
  
  // Navigation
  navFeasibility: string;
  navOpportunities: string;
  navMethodology: string;
  navSaved: string;
  navAbout: string;
  btnAppraise: string;

  // Questionnaire common
  questionTag: (current: number, total: number) => string;
  completedPct: (pct: number) => string;
  btnBack: string;
  btnContinue: string;
  btnGenerateDPR: string;

  // Question 1: Enterprise Concept
  q1Title: string;
  q1Subtitle: string;
  q1Placeholder: string;
  q1CustomOption: string;
  q1CustomOptionSub: string;

  // Question 2: Location
  q2Title: string;
  q2Subtitle: string;
  q2DistrictLabel: string;
  q2DistrictPlaceholder: string;
  q2AreaLabel: string;
  q2RuralTitle: string;
  q2RuralSub: string;
  q2RuralBadge: string;
  q2UrbanTitle: string;
  q2UrbanSub: string;
  q2UrbanBadge: string;

  // Question 3: Premises
  q3Title: string;
  q3Subtitle: string;
  q3KioskTitle: string;
  q3KioskSub: string;
  q3ShopTitle: string;
  q3ShopSub: string;
  q3HomeTitle: string;
  q3HomeSub: string;

  // Question 4: Capital & Scale
  q4Title: string;
  q4Subtitle: string;
  q4BudgetLabel: string;
  q4BudgetTip: string;
  q4ScaleLabel: string;
  q4ScaleMicroTitle: string;
  q4ScaleMicroSub: string;
  q4ScaleStandardTitle: string;
  q4ScaleStandardSub: string;
  q4ScaleFacilityTitle: string;
  q4ScaleFacilitySub: string;

  // Question 5: Promoter Category & Subsidy
  q5Title: string;
  q5Subtitle: string;
  q5WomenTitle: string;
  q5WomenSub: string;
  q5ScStTitle: string;
  q5ScStSub: string;
  q5ObcTitle: string;
  q5ObcSub: string;
  q5GenTitle: string;
  q5GenSub: string;
  q5ExpLabel: string;
  q5ExpBeginner: string;
  q5ExpExperienced: string;
  q5ExpArtisan: string;

  // Underwriting Execution Screen
  underwritingTitle: (name: string) => string;
  underwritingSub: (loc: string) => string;
  stage1: string;
  stage2: string;
  stage3: string;
  stage4: string;
  stage5: string;

  // DPR Output Screen
  dprBadge: string;
  tabSummary: string;
  tabEquipment: string;
  tabEconomics: string;
  tabSchemes: string;
  tabCompliance: string;
  tabSwot: string;
  tabTimeline: string;
  tabSimulator: string;

  // Plain language financial metrics
  metricTotalOutlayTitle: string;
  metricTotalOutlaySub: string;
  metricMarginTitle: string;
  metricMarginSub: string;
  metricGrantTitle: string;
  metricGrantSub: string;
  metricEmiTitle: string;
  metricEmiSub: string;
  metricSafetyTitle: string;
  metricSafetySafe: string;
  metricSafetyModerate: string;

  // Visual Charts
  chartCapitalTitle: string;
  chartCapitalSub: string;
  chartCashflowTitle: string;
  chartCashflowSub: string;
  legendMargin: string;
  legendGrant: string;
  legendLoan: string;
  legendRevenue: string;
  legendCosts: string;
  legendProfit: string;

  // Daily unit economics in simple words
  unitPriceLabel: string;
  rawMaterialCostLabel: string;
  dailyTargetLabel: string;
  dailyBreakEvenLabel: string;
  breakEvenExplanation: (be: number) => string;

  // Modify Refiner
  btnModifyInputs: string;
  btnSaveDPR: string;
  btnPrintDPR: string;
  refinerTitle: string;
  refinerSub: string;
  btnRecalculate: string;

  // SWOT labels
  swotStrengths: string;
  swotWeaknesses: string;
  swotOpportunities: string;
  swotThreats: string;

  // Timeline & ROI labels
  roiAnnualTitle: string;
  roiAnnualSub: string;
  roiPaybackTitle: string;
  roiPaybackSub: string;
  setupTimeTitle: string;
  setupTimeSub: string;
  firstSaleTitle: string;
  firstSaleSub: string;

  // Floating Copilot (Udayam Sahayak)
  copilotFloatingBadge: string;
  copilotTitle: string;
  copilotSub: string;
  copilotPlaceholder: string;
  copilotChip1: string;
  copilotChip2: string;
  copilotChip3: string;
  copilotChip4: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'UdayamAI',
    appSubtitle: 'Turn Raw Ideas into Bank-Approved Businesses',
    tagline: 'Empowering rural & semi-urban entrepreneurs to turn raw ideas and savings into profitable businesses with up to 35% government subsidies.',
    selectLanguage: 'Choose Language / भाषा चुनें / மொழி தேர்வு',
    
    navFeasibility: 'Business Plan Maker',
    navOpportunities: 'Business Ideas',
    navMethodology: 'How Banking Works',
    navSaved: 'My Saved Plans',
    navAbout: 'About Us',
    btnAppraise: 'Start My Plan →',

    questionTag: (cur, tot) => `QUESTION ${cur} OF ${tot}`,
    completedPct: (pct) => `${pct}% Completed`,
    btnBack: 'Back',
    btnContinue: 'Continue',
    btnGenerateDPR: 'Generate Bank-Ready Plan (DPR)',

    q1Title: 'What business or shop do you want to start?',
    q1Subtitle: "Choose an idea below or write your own raw concept. We calculate authentic machine prices, daily earnings, and government subsidies.",
    q1Placeholder: 'e.g. Dosa tiffin stall, Solar cold storage, Dairy farming with cows, Tailoring shop, Cane juice...',
    q1CustomOption: 'Something else / Write my own idea',
    q1CustomOptionSub: 'Type any specific shop, stall, farm, or workshop idea in your own words',

    q2Title: 'Where will your business be located?',
    q2Subtitle: 'Your location determines raw material costs, customer footfall, and whether you qualify for 35% rural or 25% urban government subsidies.',
    q2DistrictLabel: 'Your District & State',
    q2DistrictPlaceholder: 'e.g. Madurai, Tamil Nadu (or Nashik, Maharashtra / Varanasi, UP)',
    q2AreaLabel: 'Area Type (For Government Subsidy Calculation)',
    q2RuralTitle: 'Village / Rural Area (Gram Panchayat)',
    q2RuralSub: 'Qualifies for the highest 35% free government capital subsidy under PMEGP',
    q2RuralBadge: 'Up to 35% Free Govt Grant',
    q2UrbanTitle: 'City / Town Limit (Municipality)',
    q2UrbanSub: 'Higher footfall density and faster daily customer transactions',
    q2UrbanBadge: 'Up to 25% Free Govt Grant',

    q3Title: 'What type of shop or setup will you use?',
    q3Subtitle: 'Choose your operating setup so we calculate realistic setup carpentry/fittings and monthly rent expenses.',
    q3KioskTitle: 'Mobile Pushcart / Street Stall (ठेला / स्टॉल)',
    q3KioskSub: 'Low starting cost and freedom to move to busy market spots',
    q3ShopTitle: 'Rented Commercial Shop (किराये की दुकान)',
    q3ShopSub: 'Permanent storefront in a busy market with electricity and safety shutter',
    q3HomeTitle: 'Own Home / House Frontage (अपना घर / जमीन)',
    q3HomeSub: 'Zero monthly rent expense; perfect for home kitchens, workshops, and processing units',

    q4Title: 'How much money can you put from your pocket?',
    q4Subtitle: 'Under government banking rules (PMEGP/Mudra), you only need 5% to 10% from your own pocket as margin money. The bank loan and government subsidy fund the rest!',
    q4BudgetLabel: 'Your Starting Savings / Margin Money (अपनी बचत)',
    q4BudgetTip: 'With this small margin, bank loans and government grants can unlock a total business setup worth up to 10x your savings.',
    q4ScaleLabel: 'Planned Size of Business',
    q4ScaleMicroTitle: 'Micro / Kiosk Unit (1–2 Persons)',
    q4ScaleMicroSub: 'Basic tools and machines, low cost, fast daily profit',
    q4ScaleStandardTitle: 'Standard Commercial Shop (2–4 Staff)',
    q4ScaleStandardSub: 'Semi-automated machines, dedicated commercial storefront',
    q4ScaleFacilityTitle: 'Processing / Production Unit',
    q4ScaleFacilitySub: 'Higher capacity machines supplying wholesale shops and markets',

    q5Title: 'Which category are you applying under?',
    q5Subtitle: 'Government schemes provide special reservation incentives. Women, SC, ST, and OBC entrepreneurs qualify for up to 35% free non-repayable grant and only 5% margin!',
    q5WomenTitle: 'Women Entrepreneur (महिला उद्यमी)',
    q5WomenSub: 'Special PMEGP Category: 35% Rural Subsidy / Only 5% from pocket',
    q5ScStTitle: 'SC / ST Community (अनुसूचित जाति/जनजाति)',
    q5ScStSub: 'Special PMEGP Category: 35% Rural Subsidy / Only 5% from pocket',
    q5ObcTitle: 'OBC / Minorities (अन्य पिछड़ा वर्ग)',
    q5ObcSub: 'Special PMEGP Category: 35% Rural Subsidy / Only 5% from pocket',
    q5GenTitle: 'General Category (सामान्य वर्ग)',
    q5GenSub: 'Standard MSME Category: 25% Rural Subsidy / 10% from pocket',
    q5ExpLabel: 'Your Prior Experience',
    q5ExpBeginner: 'First-Time Starter (Beginner)',
    q5ExpExperienced: '1–3 Years Experience',
    q5ExpArtisan: 'Skilled Artisan / Master',

    underwritingTitle: (name) => `Formulating Plan for: ${name}`,
    underwritingSub: (loc) => `Analyzing local prices in ${loc} and checking government subsidy quotas...`,
    stage1: 'Step 1: Analyzing local customers and market demand',
    stage2: 'Step 2: Getting realistic machinery and equipment quotes',
    stage3: 'Step 3: Calculating PMEGP, Mudra & PM SVANidhi subsidy',
    stage4: 'Step 4: Checking Bank Loan Safety Score (DSCR) for loan approval',
    stage5: 'Step 5: Generating official bank-ready Project Report (DPR)',

    dprBadge: 'Official Bank-Ready Business Plan',
    tabSummary: 'Capital & Loan',
    tabEquipment: 'Machines & Quotes',
    tabEconomics: 'Daily Profit & Sales',
    tabSchemes: 'Govt Subsidies',
    tabSwot: 'SWOT Analysis',
    tabTimeline: 'Launch Time & ROI',
    tabCompliance: 'Licenses & Roadmap',
    tabSimulator: 'What-If Simulator',

    metricTotalOutlayTitle: 'Total Money to Set Up Shop',
    metricTotalOutlaySub: 'All machines, tools, fittings & initial stock',
    metricMarginTitle: 'Your Own Money (From Pocket)',
    metricMarginSub: 'Only 5% to 10% required under bank rules',
    metricGrantTitle: 'Free Govt Subsidy Grant',
    metricGrantSub: 'Free money from Govt that you never repay',
    metricEmiTitle: 'Monthly Bank Loan EMI',
    metricEmiSub: '5-Year easy repayment tenure',
    metricSafetyTitle: 'Bank Loan Safety Score (DSCR)',
    metricSafetySafe: 'Very Safe — Daily profits easily cover the monthly EMI!',
    metricSafetyModerate: 'Bank Approved — Healthy monthly coverage',

    chartCapitalTitle: 'Where Does the Money Come From?',
    chartCapitalSub: 'Visual split between your own pocket savings, free government grant, and bank loan',
    chartCashflowTitle: 'Monthly Sales vs Costs & Take-Home Profit',
    chartCashflowSub: 'How much money comes in, total expenses, and the net cash you take home to your family',
    legendMargin: 'Your Pocket Money (Margin)',
    legendGrant: 'Free Govt Subsidy (Grant)',
    legendLoan: 'Bank Term Loan',
    legendRevenue: 'Monthly Sales Revenue',
    legendCosts: 'Raw Material & Expenses',
    legendProfit: 'Net Take-Home Family Profit',

    unitPriceLabel: 'Customer Selling Price',
    rawMaterialCostLabel: 'Raw Ingredient / Material Cost',
    dailyTargetLabel: 'Daily Sales Target',
    dailyBreakEvenLabel: 'Minimum Daily Sales to Break Even',
    breakEvenExplanation: (be) => `Every single item you sell above ${be} units per day is 100% pure profit for your family!`,

    btnModifyInputs: 'Change Details / Edit',
    btnSaveDPR: 'Save Plan to My Portfolio',
    btnPrintDPR: 'Print / Download Official DPR',
    refinerTitle: 'Quick Detail Adjuster — Change & Recalculate',
    refinerSub: 'Adjust your starting savings or location to see updated numbers instantly',
    btnRecalculate: 'Recalculate Plan Instantly',

    swotStrengths: 'Business Strengths (ताकत)',
    swotWeaknesses: 'Weaknesses to Watch (सावधानियां)',
    swotOpportunities: 'Growth Opportunities (अवसर)',
    swotThreats: 'Local Risks & Threats (जोखिम)',

    roiAnnualTitle: 'Annual Return on Investment (ROI)',
    roiAnnualSub: 'Net profit earned per year for every ₹100 invested in the setup',
    roiPaybackTitle: 'Time to Recover Your Savings (Payback)',
    roiPaybackSub: 'Months of profit needed to completely recover your initial setup cost',
    setupTimeTitle: 'Time Needed to Set Up Shop',
    setupTimeSub: 'Days to procure machines, install fittings, and prepare shop',
    firstSaleTitle: 'Days to First Customer Sale',
    firstSaleSub: 'Estimated days until your first paying customer walks in',

    copilotFloatingBadge: '💬 Udayam Sahayak (Ask Doubts)',
    copilotTitle: 'Udayam Sahayak — Your Business Friend',
    copilotSub: 'Ask any doubt about loans, machines, profits & subsidies in simple words',
    copilotPlaceholder: 'Ask about machine prices, loan papers, or subsidy forms...',
    copilotChip1: 'How do I apply for the PMEGP 35% subsidy?',
    copilotChip2: 'Do I need to give land or property as mortgage?',
    copilotChip3: 'Which licenses are mandatory before opening?',
    copilotChip4: 'How many days before I make a steady profit?',
  },

  hi: {
    appName: 'UdayamAI (उद्यम एआई)',
    appSubtitle: 'कच्चे विचार से बैंक लोन और सफल व्यापार',
    tagline: 'ग्रामीण और छोटे शहरों के उद्यमियों के लिए: कच्चे विचार से 35% सरकारी सब्सिडी और बैंक लोन के साथ सफल व्यापार बनाएं।',
    selectLanguage: 'भाषा चुनें / Select Language / மொழி தேர்வு',

    navFeasibility: 'व्यापार योजना बनाएं',
    navOpportunities: 'व्यापार विचार',
    navMethodology: 'बैंक नियम कैसे काम करते हैं',
    navSaved: 'मेरी सहेजी गई योजनाएं',
    navAbout: 'हमारे बारे में',
    btnAppraise: 'योजना शुरू करें →',

    questionTag: (cur, tot) => `प्रश्न ${cur} / ${tot}`,
    completedPct: (pct) => `${pct}% पूर्ण`,
    btnBack: 'पिछला कदम',
    btnContinue: 'आगे बढ़ें',
    btnGenerateDPR: 'बैंक लोन प्रोजेक्ट रिपोर्ट तैयार करें',

    q1Title: 'आप कौन सा व्यवसाय या दुकान शुरू करना चाहते हैं?',
    q1Subtitle: 'नीचे से कोई व्यापार चुनें या अपना विचार लिखें। हम आपके क्षेत्र के अनुसार मशीनों के दाम, दैनिक बिक्री और सरकारी सब्सिडी की सटीक गणना करेंगे।',
    q1Placeholder: 'जैसे: डोसा स्टॉल, सोलर कोल्ड स्टोरेज, 5 गायों की डेयरी, टेलरिंग दुकान, गन्ने का रस...',
    q1CustomOption: 'कोई अन्य व्यवसाय / अपना विचार खुद लिखें',
    q1CustomOptionSub: 'किसी भी दुकान, ठेले, फार्म या कार्यशाला का नाम अपने शब्दों में लिखें',

    q2Title: 'आपकी दुकान या व्यवसाय किस स्थान पर होगा?',
    q2Subtitle: 'स्थान से तय होता है कि कच्चा माल कहाँ मिलेगा, ग्राहक कितने आएंगे और क्या आप 35% ग्रामीण या 25% शहरी सब्सिडी के पात्र हैं।',
    q2DistrictLabel: 'आपका जिला और राज्य',
    q2DistrictPlaceholder: 'जैसे: मदुरै, तमिलनाडु (या नासिक, महाराष्ट्र / वाराणसी, उप्र)',
    q2AreaLabel: 'क्षेत्र का प्रकार (सरकारी सब्सिडी की गणना के लिए)',
    q2RuralTitle: 'ग्रामीण क्षेत्र (ग्राम पंचायत / गांव)',
    q2RuralSub: 'PMEGP योजना के तहत सबसे अधिक 35% तक मुफ्त सरकारी सब्सिडी मिलती है',
    q2RuralBadge: '35% तक मुफ्त सरकारी सब्सिडी',
    q2UrbanTitle: 'शहरी क्षेत्र (नगर पालिका / शहर)',
    q2UrbanSub: 'ग्राहकों की अधिक आवाजाही और दैनिक बिक्री की तेज रफ्तार',
    q2UrbanBadge: '25% तक मुफ्त सरकारी सब्सिडी',

    q3Title: 'आप किस प्रकार की दुकान या सेटअप का उपयोग करेंगे?',
    q3Subtitle: 'सेटअप चुनें ताकि दुकान की फिटिंग और मासिक किराये का सही हिसाब लगाया जा सके।',
    q3KioskTitle: 'ठेला / मोबाइल कियोस्क / स्टॉल',
    q3KioskSub: 'कम खर्च में शुरुआत और बाजार में जगह बदलने की पूरी आज़ादी',
    q3ShopTitle: 'किराये की पक्की दुकान',
    q3ShopSub: 'बाजार में पक्की दुकान शटर और बिजली कनेक्शन के साथ',
    q3HomeTitle: 'अपना घर / जमीन / सामने का हिस्सा',
    q3HomeSub: 'दुकान का कोई मासिक किराया नहीं; घरेलू कार्यशाला या चक्की के लिए सर्वोत्तम',

    q4Title: 'आप अपनी जेब से कितनी बचत लगा सकते हैं?',
    q4Subtitle: 'सरकारी बैंक नियमों (PMEGP/मुद्रा) के अनुसार आपको पूरी लागत नहीं लगानी होती। केवल 5% से 10% अपनी पूंजी लगानी है, बाकी बैंक ऋण और सरकारी सब्सिडी से मिलता है!',
    q4BudgetLabel: 'आपकी अपनी उपलब्ध बचत (अपनी जेब से मार्जिन)',
    q4BudgetTip: 'इस थोड़ी सी पूंजी के आधार पर बैंक और सरकार से कुल 10 गुना तक का बड़ा प्रोजेक्ट स्वीकृत हो सकता है।',
    q4ScaleLabel: 'व्यवसाय का पैमाना (स्तर)',
    q4ScaleMicroTitle: 'माइक्रो / कियोस्क यूनिट (1-2 व्यक्ति)',
    q4ScaleMicroSub: 'साधारण मशीनें, कम खर्च, जल्दी मुनाफा शुरू',
    q4ScaleStandardTitle: 'मानक व्यावसायिक दुकान (2-4 कर्मचारी)',
    q4ScaleStandardSub: 'अर्ध-स्वचालित मशीनें और व्यवस्थित व्यावसायिक काउंटर',
    q4ScaleFacilityTitle: 'उत्पादन एवं प्रोसेसिंग यूनिट',
    q4ScaleFacilitySub: 'बड़ी मशीनें और थोक बाजार में माल की आपूर्ति',

    q5Title: 'आप किस सामाजिक श्रेणी के तहत आवेदन कर रहे हैं?',
    q5Subtitle: 'सरकारी योजनाओं में विशेष आरक्षण मिलता है। महिलाओं, एससी, एसटी और ओबीसी उद्यमियों को 35% तक मुफ्त सब्सिडी और केवल 5% पूंजी लगानी होती है!',
    q5WomenTitle: 'महिला उद्यमी (Women Entrepreneur)',
    q5WomenSub: 'PMEGP विशेष श्रेणी: 35% ग्रामीण सब्सिडी / केवल 5% अपनी पूंजी',
    q5ScStTitle: 'अनुसूचित जाति / जनजाति (SC / ST)',
    q5ScStSub: 'PMEGP विशेष श्रेणी: 35% ग्रामीण सब्सिडी / केवल 5% अपनी पूंजी',
    q5ObcTitle: 'अन्य पिछड़ा वर्ग / अल्पसंख्यक (OBC / Minorities)',
    q5ObcSub: 'PMEGP विशेष श्रेणी: 35% ग्रामीण सब्सिडी / केवल 5% अपनी पूंजी',
    q5GenTitle: 'सामान्य वर्ग (General Category)',
    q5GenSub: 'मानक श्रेणी: 25% ग्रामीण सब्सिडी / 10% अपनी पूंजी',
    q5ExpLabel: 'आपका कार्य अनुभव',
    q5ExpBeginner: 'शुरुआती (पहली बार नया व्यवसाय)',
    q5ExpExperienced: '1 से 3 वर्ष का कार्य अनुभव',
    q5ExpArtisan: 'कुशल कारीगर / विशेषज्ञ',

    underwritingTitle: (name) => `व्यापार योजना तैयार हो रही है: ${name}`,
    underwritingSub: (loc) => `${loc} में बाजार दरें, मशीनरी और सरकारी सब्सिडी नियमों की जांच हो रही है...`,
    stage1: 'चरण 1: स्थानीय ग्राहकों की मांग और बिक्री का विश्लेषण',
    stage2: 'चरण 2: वास्तविक मशीनों और उपकरणों के बाजार भाव',
    stage3: 'चरण 3: PMEGP, मुद्रा एवं स्वनिधि सब्सिडी का आवंटन',
    stage4: 'चरण 4: बैंक ऋण सुरक्षा (DSCR) व मासिक किश्त की जांच',
    stage5: 'चरण 5: बैंक में जमा करने योग्य प्रोजेक्ट रिपोर्ट तैयार करना',

    dprBadge: 'बैंक लोन के लिए आधिकारिक बिजनेस प्लान',
    tabSummary: 'पूंजी व बैंक ऋण',
    tabEquipment: 'मशीनें व दाम',
    tabEconomics: 'दैनिक बिक्री व मुनाफा',
    tabSchemes: 'सरकारी सब्सिडी',
    tabSwot: 'ताकत व चुनौतियां (SWOT)',
    tabTimeline: 'शुरू करने का समय व ROI',
    tabCompliance: 'लाइसेंस व चरण',
    tabSimulator: 'मुनाफा कैलकुलेटर (सिम्युलेटर)',

    metricTotalOutlayTitle: 'दुकान/काम शुरू करने की कुल लागत',
    metricTotalOutlaySub: 'पूरी मशीनरी, सामान और शुरुआती माल',
    metricMarginTitle: 'आपकी अपनी जेब से पूंजी',
    metricMarginSub: 'सरकारी नियमों के तहत केवल 5% से 10%',
    metricGrantTitle: 'मुफ्त सरकारी सब्सिडी (अनुदान)',
    metricGrantSub: 'यह पैसा सरकार देती है, वापस नहीं लौटाना',
    metricEmiTitle: 'मासिक बैंक किश्त (EMI)',
    metricEmiSub: '5 वर्ष की आसान बैंक किश्त',
    metricSafetyTitle: 'बैंक ऋण सुरक्षा स्कोर (DSCR)',
    metricSafetySafe: 'अत्यंत सुरक्षित — आपका दैनिक मुनाफा किश्त से 3 गुना अधिक है!',
    metricSafetyModerate: 'बैंक स्वीकृत — पर्याप्त मासिक बचत',

    chartCapitalTitle: 'पूंजी कहां से आएगी? (पूंजी संरचना)',
    chartCapitalSub: 'आपकी अपनी जेब की पूंजी, सरकारी सब्सिडी और बैंक ऋण का साफ-साफ आरेख',
    chartCashflowTitle: 'मासिक आमदनी, खर्चे और घर ले जाने योग्य शुद्ध मुनाफा',
    chartCashflowSub: 'दुकान चलाने के बाद आपके परिवार के लिए बचने वाली असली बचत',
    legendMargin: 'आपकी जेब की पूंजी (मार्जिन)',
    legendGrant: 'मुफ्त सरकारी सब्सिडी',
    legendLoan: 'बैंक का टर्म लोन',
    legendRevenue: 'कुल मासिक बिक्री (आमदनी)',
    legendCosts: 'कच्चा माल व बिजली/किराया',
    legendProfit: 'घर ले जाने योग्य शुद्ध मुनाफा',

    unitPriceLabel: 'ग्राहक को बिक्री मूल्य',
    rawMaterialCostLabel: 'कच्चे माल/सामग्री की लागत',
    dailyTargetLabel: 'दैनिक बिक्री का लक्ष्य',
    dailyBreakEvenLabel: 'दैनिक न्यूनतम बिक्री (ब्रेक-ईवन)',
    breakEvenExplanation: (be) => `प्रतिदिन ${be} से अधिक बिकने वाली हर एक चीज का पूरा पैसा आपकी जेब का शुद्ध मुनाफा है!`,

    btnModifyInputs: 'विवरण बदलें / एडिट करें',
    btnSaveDPR: 'योजना सहेजें (Save)',
    btnPrintDPR: 'प्रिंट / डाउनलोड करें',
    refinerTitle: 'विवरण तुरंत बदलें और पुनः गणना करें',
    refinerSub: 'पूंजी या स्थान बदलकर तुरंत नया वित्तीय परिणाम देखें',
    btnRecalculate: 'तुरंत नई रिपोर्ट बनाएं',

    swotStrengths: 'व्यापार की असली ताकत (Strengths)',
    swotWeaknesses: 'कमियां व सावधानियां (Weaknesses)',
    swotOpportunities: 'कमाई बढ़ाने के नए अवसर (Opportunities)',
    swotThreats: 'संभावित जोखिम व बचाव (Threats)',

    roiAnnualTitle: 'सालाना पूंजी का मुनाफा (ROI)',
    roiAnnualSub: 'कुल लगाई गई ₹100 की लागत पर हर साल मिलने वाला शुद्ध मुनाफा',
    roiPaybackTitle: 'लगाई गई पूरी पूंजी वापस मिलने का समय',
    roiPaybackSub: 'दुकान और मशीन का पूरा पैसा शुद्ध मुनाफे से कितने महीने में निकल आएगा',
    setupTimeTitle: 'दुकान और मशीन लगाने में लगने वाले दिन',
    setupTimeSub: 'मशीन खरीदने, दुकान तैयार करने और सामान भरने का अनुमानित समय',
    firstSaleTitle: 'पहली बिक्री शुरू होने का समय',
    firstSaleSub: 'पहला ग्राहक आने और कमाई शुरू होने का समय',

    copilotFloatingBadge: '💬 उद्यम सहायक (सवाल पूछें)',
    copilotTitle: 'उद्यम सहायक — आपका व्यापार साथी',
    copilotSub: 'लोन, मशीन, सरकारी सब्सिडी और मुनाफे से जुड़े सवाल बेझिझक पूछें',
    copilotPlaceholder: 'मशीनों के दाम, बैंक लोन या सब्सिडी फॉर्म के बारे में पूछें...',
    copilotChip1: 'PMEGP की 35% सब्सिडी कैसे मिलती है?',
    copilotChip2: 'क्या बैंक लोन के लिए जमीन गिरवी रखनी होगी?',
    copilotChip3: 'दुकान खोलने से पहले कौन सा लाइसेंस जरूरी है?',
    copilotChip4: 'शुरुआत के कितने दिनों में मुनाफा होने लगेगा?',
  },

  ta: {
    appName: 'UdayamAI (உதயம் AI)',
    appSubtitle: 'புதிய யோசனை முதல் வங்கி கடன் வரை',
    tagline: 'கிராமப்புற மற்றும் சிறு தொழில் முனைவோரின் யோசனைகளை 35% அரசு மானியத்துடன் கூடிய வங்கி கடன் தொழிலாக மாற்றும் தளம்.',
    selectLanguage: 'மொழி தேர்வு / Choose Language / भाषा चुनें',

    navFeasibility: 'தொழில் திட்டம் உருவாக்க',
    navOpportunities: 'தொழில் யோசனைகள்',
    navMethodology: 'வங்கி விதிமுறைகள்',
    navSaved: 'எனது சேமிக்கப்பட்ட திட்டங்கள்',
    navAbout: 'எங்களை பற்றி',
    btnAppraise: 'திட்டம் தொடங்குக →',

    questionTag: (cur, tot) => `கேள்வி ${cur} / ${tot}`,
    completedPct: (pct) => `${pct}% நிறைவுற்றது`,
    btnBack: 'பின்செல்ல',
    btnContinue: 'தொடரவும்',
    btnGenerateDPR: 'வங்கி திட்ட அறிக்கையை உருவாக்கு (DPR)',

    q1Title: 'நீங்கள் என்ன தொழில் தொடங்க விரும்புகிறீர்கள்?',
    q1Subtitle: 'கீழே உள்ள பட்டியலிலிருந்து தேர்வு செய்யுங்கள் அல்லது உங்கள் சொந்த யோசனையை எழுதுங்கள். இயந்திர விலை, மூலப்பொருள் செலவு மற்றும் அரசு மானியத்தை துல்லியமாக கணக்கிடுவோம்.',
    q1Placeholder: 'உதாரணம்: தோசை கடை, சோலார் குளிர்பதன கிடங்கு, பால் பண்ணை, தையல் கடை, கரும்பு சாறு...',
    q1CustomOption: 'வேறு ஏதேனும் தொழில் / உங்கள் சொந்த யோசனை',
    q1CustomOptionSub: 'எந்தவொரு கடை, பட்டறை அல்லது தயாரிப்பு தொழிலை உங்கள் சொந்த வார்த்தைகளில் குறிப்பிடவும்',

    q2Title: 'உங்கள் தொழில் எங்கு அமைய உள்ளது?',
    q2Subtitle: 'உங்கள் அமைவிடம் மூலப்பொருள் விலை, வாடிக்கையாளர் வருகை மற்றும் 35% கிராமப்புற அல்லது 25% நகர்ப்புற மானியத்தை தீர்மானிக்கிறது.',
    q2DistrictLabel: 'உங்கள் மாவட்டம் மற்றும் மாநிலம்',
    q2DistrictPlaceholder: 'உதாரணம்: மதுரை, தமிழ்நாடு (அல்லது சேலம், திருச்சி, கோவை)',
    q2AreaLabel: 'பகுதி வகைப்பாடு (அரசு மானியத்தை கணக்கிட)',
    q2RuralTitle: 'கிராமப்புற பகுதி (கிராம பஞ்சாயத்து)',
    q2RuralSub: 'PMEGP திட்டத்தில் அதிகபட்சமாக 35% வரை இலவச மானியம் கிடைக்கும்',
    q2RuralBadge: '35% வரை இலவச அரசு மானியம்',
    q2UrbanTitle: 'நகர்ப்புற பகுதி (நகராட்சி / மாநகராட்சி)',
    q2UrbanSub: 'அதிக வாடிக்கையாளர் கூட்டம் மற்றும் தினசரி விற்பனை வேகம்',
    q2UrbanBadge: '25% வரை அரசு மானியம்',

    q3Title: 'நீங்கள் எந்த வகையான கடையை பயன்படுத்தப் போகிறீர்கள்?',
    q3Subtitle: 'தொடக்க முதலீடு மற்றும் மாதாந்திர வாடகையை துல்லியமாக கணக்கிட உங்கள் அமைப்பை தேர்ந்தெடுக்கவும்.',
    q3KioskTitle: 'தள்ளுவண்டி / நடமாடும் கியோஸ்க் (Mobile Cart)',
    q3KioskSub: 'குறைந்த முதலீடு மற்றும் சந்தை பகுதியில் எங்கு வேண்டுமானாலும் நகர்த்தும் வசதி',
    q3ShopTitle: 'வாடகை வணிகக் கடை (Rented Shop)',
    q3ShopSub: 'மின்சாரம் மற்றும் ஷட்டருடன் கூடிய நிலையான கடை',
    q3HomeTitle: 'சொந்த வீடு / சொந்த இடம் (Own House/Land)',
    q3HomeSub: 'மாதாந்திர வாடகை செலவு இல்லை; சிறிய பட்டறைகள் மற்றும் ஆலைகளுக்கு சிறந்தது',

    q4Title: 'நீங்கள் சொந்தமாக எவ்வளவு சேமிப்பை முதலீடு செய்ய முடியும்?',
    q4Subtitle: 'அரசு வங்கி விதிகளின்படி (PMEGP/முத்ரா), மொத்த தொகையையும் நீங்கள் போட வேண்டியதில்லை. 5% முதல் 10% மட்டுமே உங்கள் முதலீடு, மீதத்தை வங்கி கடன் மற்றும் அரசு மானியம் வழங்கும்!',
    q4BudgetLabel: 'உங்கள் சொந்த சேமிப்புத் தொகை (உங்கள் முதலீடு)',
    q4BudgetTip: 'இந்த முதலீட்டைக் கொண்டு வங்கி மற்றும் அரசு மூலம் 10 மடங்கு பெரிய திட்டத்தை தொடங்கலாம்.',
    q4ScaleLabel: 'திட்டமிடப்பட்ட தொழிலின் அளவு',
    q4ScaleMicroTitle: 'குறு / கியோஸ்க் அலகு (1-2 நபர்கள்)',
    q4ScaleMicroSub: 'அடிப்படை இயந்திரங்கள், குறைந்த முதலீடு, விரைவான லாபம்',
    q4ScaleStandardTitle: 'நிலையான வணிக கடை (2-4 பணியாளர்கள்)',
    q4ScaleStandardSub: 'பாதி தானியங்கி இயந்திரங்கள் மற்றும் நிலையான வாடிக்கையாளர் கூடம்',
    q4ScaleFacilityTitle: 'உற்பத்தி மற்றும் பதப்படுத்தும் ஆலை',
    q4ScaleFacilitySub: 'அதிநவீன இயந்திரங்கள் மற்றும் மொத்த விற்பனை கட்டமைப்பு',

    q5Title: 'நீங்கள் எந்த பிரிவின் கீழ் விண்ணப்பிக்கிறீர்கள்?',
    q5Subtitle: 'அரசு திட்டங்களில் சிறப்பு சலுகைகள் உண்டு. பெண்கள், SC, ST மற்றும் OBC தொழில்முனைவோருக்கு 35% வரை இலவச மானியமும், 5% சொந்த முதலீடும் போதும்!',
    q5WomenTitle: 'பெண் தொழில்முனைவோர் (Women Entrepreneur)',
    q5WomenSub: 'PMEGP சிறப்பு பிரிவு: 35% கிராமப்புற மானியம் / 5% மட்டுமே சொந்த முதலீடு',
    q5ScStTitle: 'SC / ST சமூகம் (பட்டியலினத்தவர்)',
    q5ScStSub: 'PMEGP சிறப்பு பிரிவு: 35% கிராமப்புற மானியம் / 5% மட்டுமே சொந்த முதலீடு',
    q5ObcTitle: 'OBC / சிறுபான்மையினர் (Minorities)',
    q5ObcSub: 'PMEGP சிறப்பு பிரிவு: 35% கிராமப்புற மானியம் / 5% மட்டுமே சொந்த முதலீடு',
    q5GenTitle: 'பொதுப் பிரிவு (General Category)',
    q5GenSub: 'நிலையான பிரிவு: 25% கிராமப்புற மானியம் / 10% சொந்த முதலீடு',
    q5ExpLabel: 'உங்கள் தொழில் அனுபவம்',
    q5ExpBeginner: 'தொடக்கநிலை (புதிய தொழில்முனைவோர்)',
    q5ExpExperienced: '1 முதல் 3 ஆண்டுகள் அனுபவம்',
    q5ExpArtisan: 'திறமையான கைவினைஞர் / நிபுணர்',

    underwritingTitle: (name) => `திட்ட அறிக்கை தயாராகிறது: ${name}`,
    underwritingSub: (loc) => `${loc} பகுதியில் சந்தை நிலவரம், இயந்திரங்கள் மற்றும் மானிய விதிகள் ஆராயப்படுகின்றன...`,
    stage1: 'படி 1: உள்ளூர் வாடிக்கையாளர் தேவை மற்றும் விற்பனை ஆய்வு',
    stage2: 'படி 2: தொழிலுக்கான உண்மையான இயந்திரங்களின் விலை பட்டியல்',
    stage3: 'படி 3: PMEGP, முத்ரா மற்றும் ஸ்வநிதி மானிய ஒதுக்கீடு',
    stage4: 'படி 4: வங்கி கடன் பாதுகாப்பு மதிப்பீடு (DSCR) ஆய்வு',
    stage5: 'படி 5: வங்கியில் சமர்ப்பிப்பதற்கான முழு திட்ட அறிக்கை',

    dprBadge: 'வங்கி கடன் அங்கீகரிக்கப்பட்ட தொழில் திட்டம்',
    tabSummary: 'முதலீடு மற்றும் கடன்',
    tabEquipment: 'இயந்திரங்கள் மற்றும் உபகரணங்கள்',
    tabEconomics: 'தினசரி விற்பனை மற்றும் லாபம்',
    tabSchemes: 'அரசு மானியங்கள்',
    tabSwot: 'நிறை குறைகள் (SWOT)',
    tabTimeline: 'தொடங்கும் காலம் & ROI',
    tabCompliance: 'உரிமங்கள் மற்றும் கால அட்டவணை',
    tabSimulator: 'லாப கால்குலேட்டர் (சிமுலேட்டர்)',

    metricTotalOutlayTitle: 'தொழில் தொடங்குவதற்கான மொத்த செலவு',
    metricTotalOutlaySub: 'இயந்திரங்கள், உபகரணங்கள் மற்றும் மூலதனம்',
    metricMarginTitle: 'உங்கள் சொந்த முதலீடு (உங்கள் பாக்கெட்டிலிருந்து)',
    metricMarginSub: 'அரசு விதிகளின்படி 5% முதல் 10% மட்டுமே தேவை',
    metricGrantTitle: 'இலவச அரசு மானியம் (திரும்ப செலுத்த வேண்டாம்)',
    metricGrantSub: 'அரசு வழங்கும் இலவச உதவித் தொகை',
    metricEmiTitle: 'மாதாந்திர வங்கி கடன் தவணை (EMI)',
    metricEmiSub: '5 ஆண்டுகள் எளிய வங்கி தவணை',
    metricSafetyTitle: 'வங்கி கடன் பாதுகாப்பு மதிப்பீடு (DSCR)',
    metricSafetySafe: 'மிகவும் பாதுகாப்பானது — உங்கள் தினசரி லாபம் EMI தொகையை விட 3 மடங்கு அதிகம்!',
    metricSafetyModerate: 'வங்கி அனுமதிக்கும் அளவு — போதுமான லாபம்',

    chartCapitalTitle: 'முதலீட்டு கட்டமைப்பு மற்றும் நிதி ஆதாரம்',
    chartCapitalSub: 'உங்கள் சொந்த பணம், அரசு மானியம் மற்றும் வங்கி கடனின் காட்சி வரைபடம்',
    chartCashflowTitle: 'மாதாந்திர வரவு, செலவு மற்றும் கையில் நிற்கும் நிகர லாபம்',
    chartCashflowSub: 'அனைத்து செலவுகளும் போக உங்கள் குடும்பத்திற்கு கிடைக்கும் உண்மையான சேமிப்பு',
    legendMargin: 'உங்கள் சொந்த பணம் (Margin)',
    legendGrant: 'இலவச அரசு மானியம் (Grant)',
    legendLoan: 'வங்கி கடன் (Term Loan)',
    legendRevenue: 'மாதாந்திர மொத்த விற்பனை',
    legendCosts: 'மூலப்பொருள் மற்றும் செலவுகள்',
    legendProfit: 'கையில் நிற்கும் நிகர லாபம்',

    unitPriceLabel: 'ஒரு பொருளின் விற்பனை விலை',
    rawMaterialCostLabel: 'ஒரு பொருளுக்கான மூலப்பொருள் செலவு',
    dailyTargetLabel: 'தினசரி விற்பனை இலக்கு',
    dailyBreakEvenLabel: 'தினசரி குறைந்தபட்ச விற்பனை (Break-Even)',
    breakEvenExplanation: (be) => `தினமும் ${be} எண்ணிக்கைக்கு மேல் விற்கும் ஒவ்வொரு பொருளும் உங்கள் குடும்பத்திற்கான 100% நேரடி லாபம்!`,

    btnModifyInputs: 'விவரங்களை மாற்றியமைக்க',
    btnSaveDPR: 'திட்டத்தை சேமிக்க',
    btnPrintDPR: 'அச்சிட / பதிவிறக்க',
    refinerTitle: 'விவரங்களை மாற்றி உடனடியாக மீண்டும் கணக்கிடுங்கள்',
    refinerSub: 'முதலீடு அல்லது இடத்தை மாற்றி உடனடியாக புதிய அறிக்கையை பெறுங்கள்',
    btnRecalculate: 'உடனடியாக கணக்கிடவும்',

    swotStrengths: 'தொழிலின் பலங்கள் (Strengths)',
    swotWeaknesses: 'கவனிக்க வேண்டியவை (Weaknesses)',
    swotOpportunities: 'வளர்ச்சி வாய்ப்புகள் (Opportunities)',
    swotThreats: 'அபாயங்கள் & பாதுகாப்பு (Threats)',

    roiAnnualTitle: 'வருடாந்திர முதலீட்டு லாபம் (ROI)',
    roiAnnualSub: 'மொத்த முதலீட்டில் ₹100க்கு கிடைக்கும் ஆண்டு நிகர லாபம்',
    roiPaybackTitle: 'முழு முதலீட்டை திரும்ப எடுக்கும் காலம்',
    roiPaybackSub: 'தொடக்க செலவுகள் அனைத்தும் லாபத்தில் திரும்பக் கிடைக்கும் மாதங்கள்',
    setupTimeTitle: 'தொழில் அமைக்க தேவையான நாட்கள்',
    setupTimeSub: 'இயந்திரங்கள் வாங்க மற்றும் கடையை தயார் செய்ய ஆகும் காலம்',
    firstSaleTitle: 'முதல் வாடிக்கையாளர் விற்பனை காலம்',
    firstSaleSub: 'முதல் வாடிக்கையாளர் வந்து விற்பனை தொடங்கும் காலம்',

    copilotFloatingBadge: '💬 உத்யம் வழிகாட்டி (கேளுங்கள்)',
    copilotTitle: 'உத்யம் வழிகாட்டி — உங்கள் தொழில் நண்பன்',
    copilotSub: 'வங்கி கடன், இயந்திரங்கள், மானியம் மற்றும் லாபம் குறித்த சந்தேகங்களை எளிதாகக் கேளுங்கள்',
    copilotPlaceholder: 'இயந்திர சப்ளையர்கள், மானிய படிவங்கள் அல்லது வங்கி ஆவணங்கள் பற்றி கேளுங்கள்...',
    copilotChip1: 'PMEGP 35% மானியத்திற்கு எப்படி விண்ணப்பிப்பது?',
    copilotChip2: 'வங்கி கடனுக்கு நிலம் அல்லது வீடு அடமானம் வைக்க வேண்டுமா?',
    copilotChip3: 'தொழில் தொடங்கும் முன் என்னென்ன உரிமங்கள் தேவை?',
    copilotChip4: 'எத்தனை நாட்களில் நிலையான லாபம் கிடைக்கும்?',
  }
};
