# UdayamAI Architecture (PS 26091)

## High-Level Flow
1. **User Input:** Village/Block/District, Margin Capital (e.g. ₹1L), Business Category (e.g. Dairy).
2. **Advisory Engine (`src/lib/advisory/`):** Generates local market reach, opportunity, SWOT, threats, and pricing deterministically.
3. **Financial Structuring (`src/lib/financial/`):** Applies 10/90 rule. Calculates Project Cost and Loan Amount. Auto-routes to Micro Finance or Term Loan. Outputs Quarterly EMI & Moratorium schedule.
4. **Viability Score:** Calculates a 0-100 business score based on demand, competition, feasibility, risk, and local fit.

## Data Layer
- Statically loaded seed data via `src/lib/data/repository.ts` ensures 100% offline functionality.
- AI Guidance Provider (`AIGuidanceProvider`) is built to fail gracefully to deterministic templates if Google Gemini APIs are missing.

## UI Layer
- Next.js 16 App Router.
- ShadCN UI with Tailwind CSS.
- Core route: `/advisor/results` rendering the 6 pillars of feasibility.
