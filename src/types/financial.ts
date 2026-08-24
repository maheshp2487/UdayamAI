export interface FinancialPlan {
  availableMargin: number;
  projectCost: number;
  loanAmount: number;
  scheme: SchemeDetails;
  emiProjection: EMIProjection;
  workingCapital: WorkingCapitalStructure;
}

export interface SchemeDetails {
  id: string;
  name: string;
  maxFundingPct: number;
  maxLoanAmount: number;
  interestRate: number;
  tenureYears: number;
  moratoriumMonths: number;
}

export interface EMIProjection {
  quarterlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  schedule: AmortizationQuarter[];
}

export interface AmortizationQuarter {
  quarter: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  isMoratorium: boolean;
}

export interface WorkingCapitalStructure {
  fixedSetupCosts: number;
  workingCapital: number;
  emergencyBuffer: number;
  warnings: string[];
}
