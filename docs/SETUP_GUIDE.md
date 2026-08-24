# UdayamAI — Local Setup & Run Guide

This guide walks you through setting up and running the UdayamAI prototype locally.

This project solves **Problem Statement 26091 (PS 26091)**: *AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs*.

The application is fully resilient and runs in **Demo Mode** using deterministic fallback logic and local seed data even without external API keys.

---

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.17.0 or higher) — [Download here](https://nodejs.org/)
- **npm** (comes bundled with Node.js)

---

## Step 1: Install Dependencies

Navigate to the project root and run:
```bash
npm install
```

---

## Step 2: Environment Variables (Optional)

The `.env` file is pre-created from `.env.example`. **You do NOT need to fill it out to run the prototype.** The app degrades gracefully:

- **Supabase (Database):** Automatically falls back to local seed data (`src/data/`).
- **Gemini (AI):** Bypasses network and uses deterministic rule-based advisory templates.

If you do have keys:
```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
GOOGLE_GEMINI_API_KEY="AIzaSy..."
```

---

## Step 3: Start the Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 16.3.2
   - Local: http://localhost:3000
```

---

## Step 4: Access the Application

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Step 5: Test the Demo Flow

To quickly test the full PS 26091 journey:

1. Click **Generate Feasibility Report** on the homepage.
2. In the **Quick Fill Scenarios** box, click one of the prefill buttons:
   - **Dairy (Micro)** → ₹10,000 margin → ₹1 lakh project → Micro Finance route
   - **Retail (Term)** → ₹50,000 margin → ₹5 lakh project → Term Loan route
   - **Textiles (Term)** → ₹2,00,000 margin → ₹20 lakh project → Term Loan route
3. Review the pre-filled form and click **Generate Feasibility Report**.
4. Review the **Hyper-Local Feasibility Dashboard**:
   - Business Feasibility Module (Market Reach, Opportunity, SWOT, Threats, Competitor Mapping, Pricing)
   - 10/90 Financial Structuring Module (Scheme Auto-Routing, Loan Cap, Quarterly EMI Schedule)
5. Click **Print Report** to open the printable PDF-ready report.

---

## Troubleshooting

- **"npm is not recognized..."** — Ensure Node.js is installed and added to your system PATH.
- **Port 3000 in use** — Run `npm run dev -- -p 3001` instead.
- **PowerShell Execution Policy (Windows)** — If you get a security error, run: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
