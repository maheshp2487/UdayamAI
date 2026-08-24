# UdayamAI - Local Setup & Run Guide

This guide will walk you through setting up and running the UdayamAI prototype locally. 

This project was built for **Smart India Hackathon 2026** (Problem Statement 26092). The application is designed to be highly resilient and will run perfectly in "Demo Mode" using deterministic fallback logic and local data even if you do not have external API keys configured.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18.17.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes bundled with Node.js)
- **Git** (optional, for cloning)

---

## Step 1: Install Dependencies

1. Open your terminal (Command Prompt, PowerShell, or macOS/Linux Terminal).
2. Navigate to the root directory of the project:
   ```bash
   cd path/to/udayam-ai
   ```
3. Install all required npm dependencies by running:
   ```bash
   npm install
   ```
   *(This process will download all necessary packages like Next.js, React, TailwindCSS, etc.)*

---

## Step 2: Environment Variables (Optional but Recommended)

We have created an `.env` file for you based on `.env.example`. 

You can find the `.env` file in the root directory. Out of the box, it is empty. **You do NOT need to fill these out to run the prototype.** 

### What happens if you leave `.env` empty?
- **Supabase (Database)**: The application will automatically use an internal `FallbackRepository` that serves pre-populated, verified seed data (NSFDC, NSKFDC, etc.).
- **Mapbox (Maps)**: The Channel Partner Locator will skip rendering the visual map and instead present a deterministic, ranked list view with distance calculations intact.
- **Gemini (AI)**: The AI Guidance engine will bypass network requests and use a fast, deterministic local rule-engine to explain scheme matching reasons.

If you *do* have keys, open the `.env` file in a text editor and populate them:
```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
NEXT_PUBLIC_MAPBOX_TOKEN="pk.your-token..."
GOOGLE_GEMINI_API_KEY="AIzaSy..."
```

---

## Step 3: Start the Development Server

Once dependencies are installed, you can start the local development server:

```bash
npm run dev
```

You should see output similar to this:
```
> udayam-ai@0.1.0 dev
> next dev

   ▲ Next.js 16.3.2
   - Local:        http://localhost:3000
```

---

## Step 4: Access the Application

1. Open your preferred web browser (Chrome, Edge, Firefox, Safari).
2. Navigate to: **[http://localhost:3000](http://localhost:3000)**

You should now see the UdayamAI landing page!

---

## Step 5: How to Test the Demo (Judging Flow)

To quickly test the functionality for SIH judging, follow these steps:
1. Click **Check Eligibility** on the homepage.
2. At the top of the Assessment Wizard, look for the **SIH Demo Scenarios** box.
3. Click the **Small Micro-Enterprise** button. This will instantly pre-fill all the complex forms.
4. Click **Find My Schemes** at the bottom.
5. Review your **Scheme Match Score** and click **Compare Schemes Side-by-Side**.
6. Select the best match and enter the **Financial Planner** to test the "What-If" simulation sliders. Watch the Financial Readiness status change in real time!
7. Explore the **Channel Partner Locator** and finally the **Unified Dashboard** to download your personalized report.

---

## Troubleshooting

- **"npm is not recognized..."**: Ensure Node.js is installed and added to your system's PATH.
- **Port 3000 is in use**: If another app is using port 3000, Next.js will ask to use a different port (like 3001). Just hit 'Y' or manually run `npm run dev -- -p 3001`.
- **PowerShell Execution Policies (Windows)**: If you get a security error running `npm run build` or `npm run dev`, you can bypass it by running the command as `npm.cmd run dev` or by changing your execution policy: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.
