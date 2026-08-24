import { Scheme, SchemeRule, ChannelPartner, DocumentRequirement } from '@/lib/types/schema';

export const schemes: Scheme[] = [
  {
    id: 'scheme-nsfdc-term',
    name: 'NSFDC Term Loan Scheme',
    category: 'business',
    purpose: 'To provide financial assistance to Scheduled Castes for setting up of income generating projects.',
    description: 'Term loans up to Rs. 30.00 Lakhs for viable income generating projects costing up to Rs. 30.00 Lakhs. The scheme aims to uplift marginalized SC entrepreneurs through highly concessional financing.',
    max_loan_amount: 3000000, 
    indicative_interest_rate: 6.0, 
    max_tenure_months: 120, // up to 10 years
    moratorium_months: 6,
    is_active: true,
    official_reference: 'https://nsfdc.nic.in/en/term-loan',
    disclaimer: 'Interest rates vary from 6% to 8% depending on loan amount.'
  },
  {
    id: 'scheme-nsfdc-mcf',
    name: 'NSFDC Micro Credit Finance (MCF)',
    category: 'business',
    purpose: 'To provide micro-finance to Scheduled Castes for small income generating projects.',
    description: 'Micro credit up to Rs. 1.00 Lakh for small projects. Delivered exclusively through State Channelizing Agencies (SCAs) or NGOs.',
    max_loan_amount: 100000,
    indicative_interest_rate: 5.0,
    max_tenure_months: 42,
    moratorium_months: 3,
    is_active: true,
    official_reference: 'https://nsfdc.nic.in/en/micro-credit-finance',
    disclaimer: 'Loans disbursed through self-help groups (SHGs) or SCAs.'
  },
  {
    id: 'scheme-4',
    name: 'NSKFDC Education Loan',
    category: 'education',
    purpose: 'Provide financial assistance for higher education to Safai Karamcharis, Manual Scavengers and their dependents.',
    description: 'Education loans for pursuing professional or technical education at graduate and post-graduate levels in India or abroad.',
    max_loan_amount: 2000000, 
    indicative_interest_rate: 4.0, 
    max_tenure_months: 60,
    moratorium_months: 6, 
    is_active: true,
    official_reference: 'https://nskfdc.nic.in/en/education-loan-scheme',
    disclaimer: 'Rebate of 0.5% for female beneficiaries.'
  },
  {
    id: 'scheme-1',
    name: '[Supplementary] Prime Minister Employment Generation Programme (PMEGP)',
    category: 'business',
    purpose: 'To generate employment opportunities in rural as well as urban areas of the country through setting up of new self-employment ventures/projects/micro enterprises.',
    description: 'A major credit-linked subsidy programme to generate self-employment opportunities through establishment of micro-enterprises in the non-farm sector by helping traditional artisans and unemployed youth.',
    max_loan_amount: 5000000, 
    indicative_interest_rate: 9.5, 
    max_tenure_months: 84, 
    moratorium_months: 6,
    is_active: true,
    official_reference: 'https://kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    disclaimer: 'Representative Prototype Data.'
  },
  {
    id: 'scheme-2',
    name: '[Supplementary] Mudra Yojana (Tarun)',
    category: 'business',
    purpose: 'Funding the unfunded - supporting small businesses and entrepreneurs.',
    description: 'Loans up to Rs 10 Lakh for non-corporate, non-farm small/micro enterprises.',
    max_loan_amount: 1000000,
    indicative_interest_rate: 10.0,
    max_tenure_months: 60,
    moratorium_months: 0,
    is_active: true,
    official_reference: 'https://www.mudra.org.in/',
    disclaimer: 'Representative Prototype Data.'
  }
];

export const schemeRules: SchemeRule[] = [
  {
    id: 'rule-nsfdc-term',
    scheme_id: 'scheme-nsfdc-term',
    min_age: 18,
    min_own_contribution_pct: 5,
    max_family_income: 300000, // Rs 3.00 Lakhs annual
    target_categories: ['SC']
  },
  {
    id: 'rule-nsfdc-mcf',
    scheme_id: 'scheme-nsfdc-mcf',
    min_age: 18,
    max_family_income: 300000,
    target_categories: ['SC']
  },
  {
    id: 'rule-4',
    scheme_id: 'scheme-4',
    target_categories: ['Safai Karamchari', 'Manual Scavenger', 'Dependent']
  },
  {
    id: 'rule-1',
    scheme_id: 'scheme-1',
    min_age: 18,
    min_own_contribution_pct: 5, 
    target_locations: ['urban', 'rural']
  },
  {
    id: 'rule-2',
    scheme_id: 'scheme-2',
    min_age: 18
  }
];

export const channelPartners: ChannelPartner[] = [
  {
    id: 'partner-1',
    name: 'State Bank of India (Main Branch)',
    type: 'Public Sector Bank',
    address: '123 Parliament Street, New Delhi',
    district: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    latitude: 28.6272,
    longitude: 77.2157,
    status: 'Available',
    processing_capacity_pct: 85,
    fund_availability_pct: 90,
    contact_phone: '1800-11-2211'
  },
  {
    id: 'partner-2',
    name: 'Delhi SC/ST/OBC/Minorities & Handicapped Financial and Development Corporation',
    type: 'State Channelizing Agency',
    address: 'Ambedkar Bhawan, Rohini, Delhi',
    district: 'North West Delhi',
    state: 'Delhi',
    pincode: '110085',
    latitude: 28.7159,
    longitude: 77.1186,
    status: 'Limited Capacity',
    processing_capacity_pct: 40,
    fund_availability_pct: 30,
    contact_email: 'info@dsfdc.delhi.gov.in'
  },
  {
    id: 'partner-3',
    name: 'Muthoot Microfin Ltd.',
    type: 'NBFC-MFI',
    address: 'Okhla Industrial Estate, New Delhi',
    district: 'South East Delhi',
    state: 'Delhi',
    pincode: '110020',
    latitude: 28.5393,
    longitude: 77.2711,
    status: 'Available',
    processing_capacity_pct: 95,
    fund_availability_pct: 75
  }
];

export const documentRequirements: DocumentRequirement[] = [
  { id: 'doc-0', scheme_id: 'scheme-nsfdc-term', document_type: 'Category', name: 'Caste Certificate', description: 'SC Certificate issued by competent authority', is_mandatory: true },
  { id: 'doc-01', scheme_id: 'scheme-nsfdc-term', document_type: 'Income', name: 'Income Certificate', description: 'Annual Family Income Proof', is_mandatory: true },
  { id: 'doc-1', scheme_id: 'scheme-1', document_type: 'Identity', name: 'Aadhaar Card', description: 'UIDAI Aadhaar Card', is_mandatory: true },
  { id: 'doc-2', scheme_id: 'scheme-1', document_type: 'Project', name: 'Project Report', description: 'Detailed Project Report (DPR)', is_mandatory: true },
  { id: 'doc-4', scheme_id: 'scheme-4', document_type: 'Education', name: 'Admission Proof', description: 'Admission letter from recognized institution', is_mandatory: true }
];
