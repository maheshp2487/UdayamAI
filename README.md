# UdayamAI

**Smart India Hackathon 2026 - Problem Statement 26092**
*AI-Driven Scheme Matching for Marginalized Entrepreneurs*

UdayamAI is a robust, deterministic, and highly accessible web platform designed to seamlessly connect marginalized entrepreneurs with the right government concessional finance schemes (such as NSFDC and NSKFDC), assess their financial readiness, and locate the nearest channel partners.

---

## 🚀 Quick Start (Local Run)

The application is built to run flawlessly even without external API credentials by utilizing its built-in fallback modes (local seed data and deterministic engines).

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   *(On Windows, if you run into Execution Policy issues, try `npm.cmd run dev`)*
3. **Open the App**:
   Navigate to [http://localhost:3000](http://localhost:3000)

**For detailed instructions and environment variable configuration, please read the full [Setup Guide](docs/SETUP_GUIDE.md).**

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS & Shadcn UI
- **Database (Optional)**: Supabase (falls back to local JSON repository if keys are absent)
- **AI (Optional)**: Google Gemini (falls back to rule-based contextual matching explanations)

## 📋 SIH Judging Guide

For judging purposes, we have compiled an exhaustive readiness audit and traceability matrix that validates this prototype against every technical and functional requirement of Problem Statement 26092.

**Read the final audit report:** [SIH_READINESS_AUDIT.md](docs/SIH_READINESS_AUDIT.md)
