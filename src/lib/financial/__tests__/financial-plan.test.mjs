/**
 * PS 26091 — Deterministic Boundary Tests for Financial Engine
 *
 * Run with:   node src/lib/financial/__tests__/financial-plan.test.mjs
 *
 * These tests validate the critical scheme routing and loan cap logic
 * required by Problem Statement 26091.
 */

import { FinancialCalculator } from '../financial-plan.js';

const results = FinancialCalculator.runBoundaryTests();

console.log('\n═══════════════════════════════════════════════════════');
console.log('  UdayamAI — PS 26091 Financial Engine Boundary Tests');
console.log('═══════════════════════════════════════════════════════');
results.results.forEach(r => console.log('  ' + r));
console.log('───────────────────────────────────────────────────────');
console.log(`  Overall: ${results.passed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
console.log('═══════════════════════════════════════════════════════\n');

process.exit(results.passed ? 0 : 1);
