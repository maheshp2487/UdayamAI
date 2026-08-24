// ============================================================
// PS 26091 — Canonical Financial Structuring Engine
// Single Source of Truth for all financial calculations.
// ============================================================

export interface PS26091CalculationResult {
  availableMargin: number;
  projectCost: number;
  requestedLoan: number;       // 90% of projectCost before caps
  effectiveLoan: number;       // After scheme maxLoanAmount cap
  schemeName: string;
  schemeId: string;
  interestRate: number;
  tenureMonths: number;
  moratoriumMonths: number;
  quarterlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  outOfRange: boolean;
  warningMessage: string;
  amortizationSchedule: AmortizationRow[];
}

export interface AmortizationRow {
  quarter: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  isMoratorium: boolean;
}

// Scheme constants — single place to update if rules change
const MICRO_FINANCE = {
  id: "micro_finance",
  name: "Micro Finance Scheme",
  projectCostMaxInclusive: 140000,  // <= ₹1.40 lakh
  maxLoanAmount: 125000,            // ₹1.25 lakh cap
  interestRate: 6.5,
  tenureMonths: 36,                 // 3 years
  moratoriumMonths: 3,
} as const;

const TERM_LOAN = {
  id: "term_loan",
  name: "Term Loan Scheme",
  projectCostMaxInclusive: 5000000, // <= ₹50 lakh
  maxLoanAmount: 4500000,           // ₹45 lakh cap
  interestRate: 8.0,
  tenureMonths: 84,                 // 7 years
  moratoriumMonths: 6,
} as const;

export class FinancialCalculator {
  /**
   * PS 26091 core calculation.
   * Input: The user's available 10% margin capital.
   * Output: Full financial structuring plan including scheme routing,
   *         capped loan amount, quarterly schedule, and moratorium.
   */
  static calculatePS26091(availableMargin: number): PS26091CalculationResult {
    const projectCost = availableMargin / 0.10;
    const requestedLoan = projectCost * 0.90;

    // ── Scheme Routing ───────────────────────────────────────
    if (projectCost > TERM_LOAN.projectCostMaxInclusive) {
      // Out-of-range: project cost > ₹50 lakh — ineligible for both schemes
      return {
        availableMargin, projectCost, requestedLoan,
        effectiveLoan: 0,
        schemeName: "Out of Scheme Range",
        schemeId: "out_of_range",
        interestRate: 0, tenureMonths: 0, moratoriumMonths: 0,
        quarterlyPayment: 0, totalInterest: 0, totalRepayment: 0,
        outOfRange: true,
        warningMessage: `Your proposed project cost of ₹${Math.round(projectCost).toLocaleString()} exceeds the ₹50 lakh maximum for the Term Loan Scheme. Please reduce the project scope, increase your own margin contribution, or explore other financing avenues.`,
        amortizationSchedule: []
      };
    }

    const scheme = projectCost <= MICRO_FINANCE.projectCostMaxInclusive
      ? MICRO_FINANCE
      : TERM_LOAN;

    // ── Loan Cap Enforcement ─────────────────────────────────
    // finalLoanAmount = min(projectCost × 0.90, scheme.maxLoanAmount)
    const effectiveLoan = Math.min(requestedLoan, scheme.maxLoanAmount);
    const loanWasCapped = effectiveLoan < requestedLoan;

    // ── Quarterly Schedule ───────────────────────────────────
    const quarterlyRate = (scheme.interestRate / 100) / 4;
    const moratoriumQuarters = scheme.moratoriumMonths / 3;
    const tenureQuarters = scheme.tenureMonths / 3;
    const repaymentQuarters = tenureQuarters - moratoriumQuarters;

    let balance = effectiveLoan;
    let totalInterest = 0;
    const schedule: AmortizationRow[] = [];

    // Moratorium: simple interest accrued and capitalised each quarter
    for (let q = 1; q <= moratoriumQuarters; q++) {
      const interest = balance * quarterlyRate;
      balance += interest;
      totalInterest += interest;
      schedule.push({ quarter: q, payment: 0, principal: 0, interest, balance, isMoratorium: true });
    }

    // Post-moratorium: reducing-balance quarterly EMI
    let quarterlyPayment = 0;
    if (repaymentQuarters > 0 && balance > 0) {
      quarterlyPayment =
        (balance * quarterlyRate * Math.pow(1 + quarterlyRate, repaymentQuarters)) /
        (Math.pow(1 + quarterlyRate, repaymentQuarters) - 1);
    }

    for (let q = 1; q <= repaymentQuarters; q++) {
      const interest = balance * quarterlyRate;
      const principal = quarterlyPayment - interest;
      balance = Math.max(0, balance - principal);
      totalInterest += interest;
      schedule.push({ quarter: q + moratoriumQuarters, payment: quarterlyPayment, principal, interest, balance, isMoratorium: false });
    }

    return {
      availableMargin,
      projectCost,
      requestedLoan,
      effectiveLoan,
      schemeName: scheme.name,
      schemeId: scheme.id,
      interestRate: scheme.interestRate,
      tenureMonths: scheme.tenureMonths,
      moratoriumMonths: scheme.moratoriumMonths,
      quarterlyPayment,
      totalInterest,
      totalRepayment: effectiveLoan + totalInterest,
      outOfRange: false,
      warningMessage: loanWasCapped
        ? `Your 90% loan of ₹${Math.round(requestedLoan).toLocaleString()} has been capped to the scheme maximum of ₹${scheme.maxLoanAmount.toLocaleString()}.`
        : "",
      amortizationSchedule: schedule
    };
  }

  // ── Deterministic Boundary Tests (called by test runner) ──
  static runBoundaryTests(): { passed: boolean; results: string[] } {
    const results: string[] = [];
    let passed = true;

    const assert = (label: string, condition: boolean) => {
      results.push(`${condition ? "✅" : "❌"} ${label}`);
      if (!condition) passed = false;
    };

    // Test 1: ₹14,000 margin → ₹1.40 lakh project → Micro Finance → loan capped at ₹1.25 lakh
    const t1 = FinancialCalculator.calculatePS26091(14000);
    assert("T1: Margin ₹14,000 → projectCost = ₹1,40,000", t1.projectCost === 140000);
    assert("T1: Routes to Micro Finance", t1.schemeId === "micro_finance");
    assert("T1: requestedLoan = ₹1,26,000", t1.requestedLoan === 126000);
    assert("T1: effectiveLoan capped at ₹1,25,000", t1.effectiveLoan === 125000);
    assert("T1: warningMessage present (loan capped)", t1.warningMessage.length > 0);
    assert("T1: Not out-of-range", !t1.outOfRange);

    // Test 2: ₹15,000 margin → ₹1.50 lakh project → Term Loan → ₹1.35 lakh loan (no cap needed)
    const t2 = FinancialCalculator.calculatePS26091(15000);
    assert("T2: Margin ₹15,000 → projectCost = ₹1,50,000", t2.projectCost === 150000);
    assert("T2: Routes to Term Loan", t2.schemeId === "term_loan");
    assert("T2: requestedLoan = ₹1,35,000", t2.requestedLoan === 135000);
    assert("T2: effectiveLoan = ₹1,35,000 (no cap)", t2.effectiveLoan === 135000);
    assert("T2: warningMessage empty (no cap)", t2.warningMessage === "");
    assert("T2: Not out-of-range", !t2.outOfRange);

    // Test 3: ₹50 lakh project cost → margin ₹5,00,000 → Term Loan → capped at ₹45 lakh
    const t3 = FinancialCalculator.calculatePS26091(500000);
    assert("T3: Margin ₹5,00,000 → projectCost = ₹50,00,000", t3.projectCost === 5000000);
    assert("T3: Routes to Term Loan", t3.schemeId === "term_loan");
    assert("T3: requestedLoan = ₹45,00,000", t3.requestedLoan === 4500000);
    assert("T3: effectiveLoan = ₹45,00,000 (exactly at cap)", t3.effectiveLoan === 4500000);
    assert("T3: Not out-of-range", !t3.outOfRange);

    // Test 4: Project cost above ₹50 lakh → out-of-range
    const t4 = FinancialCalculator.calculatePS26091(510000); // → ₹51 lakh project
    assert("T4: Margin ₹5,10,000 → projectCost = ₹51,00,000", t4.projectCost === 5100000);
    assert("T4: outOfRange = true", t4.outOfRange);
    assert("T4: effectiveLoan = 0", t4.effectiveLoan === 0);
    assert("T4: warningMessage present", t4.warningMessage.length > 0);

    return { passed, results };
  }
}
