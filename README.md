# UdayamAI

**Know your market. Plan your business. Build your future.**

UdayamAI is a multilingual hyper-local business advisory and financial structuring platform. It helps rural and semi-urban micro-entrepreneurs evaluate business ideas using location-aware market intelligence and build a clear financing plan before applying for concessional credit.

This project was built to solve **Smart India Hackathon Problem Statement 26091**: 
*AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs*.

## Core Features

1. **Hyper-Local Business Feasibility Analysis**
   Evaluates a business idea based on Geographic Location, Margin Capital, and Business Category. Generates:
   - Market Reach (5–10km radius)
   - Local Opportunity Analysis
   - Localized SWOT & Threat Identification
   - Competitor Mapping
   - Product Market Value & Pricing Strategy

2. **Smart Financial Structuring (10/90 Rule)**
   Automatically structures the proposed business using a strict 10% Margin / 90% Loan formulation:
   - **Project Cost Calculation**: `Margin / 0.10`
   - **Micro Finance Auto-Routing**: Applied when Project Cost ≤ 1.40 Lakh (6.5% interest, 3 years, 3 mo moratorium).
   - **Term Loan Auto-Routing**: Applied when Project Cost > 1.40 Lakh (8% interest, 7 years, 6 mo moratorium).
   - **Quarterly EMI & Moratorium Engine**: Generates precise quarterly amortization schedules including simple interest accumulation during the moratorium.
   - **Working Capital Allocation**: Breaks down fixed costs vs operational buffer.

3. **Journey Readiness AHP Engine**
   A transparent, deterministic scoring engine using the Analytic Hierarchy Process (AHP) to evaluate entrepreneurial readiness without black-box ML models:
   - **Archetype Layer (60%)**: Scores psychological traits, preparedness, and experience based on published non-financial SME viability research.
   - **Financial Layer (40%)**: Embeds project cost viability and funding capability.
   - **Regional Multiplier (±15%)**: Contextualizes the score against the state's entrepreneurial ecosystem index.
   - **Transparent Methodology**: A dedicated methodology page exposing all citations, matrices, and consistency ratios (CR < 0.10) to the user.

4. **Deterministic Demo Fallback**
   Even without live internet or AI API credentials, UdayamAI operates at 100% functionality using a deterministic, rule-based fallback architecture perfect for offline judging.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to begin the journey. Click **Analyze My Business Idea** to access the hyper-local assessment wizard.
