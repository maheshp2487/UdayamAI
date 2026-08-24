"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import Link from "next/link";

export default function ReportPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="container mx-auto px-8 py-12 max-w-4xl border my-8 shadow-sm print:shadow-none print:border-none print:my-0">
        
        {/* Print Action (Hidden in print) */}
        <div className="flex justify-end mb-8 print:hidden">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" /> Print / Save as PDF
          </Button>
        </div>

        {/* Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider text-slate-900">UdayamAI</h1>
            <p className="text-sm text-slate-600 mt-1">Personalized Financial & Scheme Guidance Report</p>
          </div>
          <div className="text-right text-sm">
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Applicant:</strong> John Doe</p>
            <p><strong>Reference:</strong> UAI-{Math.floor(Math.random() * 10000)}</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-10">
          <h2 className="text-lg font-bold border-b pb-2 mb-4">1. Executive Summary</h2>
          <p className="text-sm leading-relaxed mb-4">
            Based on the assessment conducted on UdayamAI, the applicant demonstrates a strong financial readiness profile. The deterministic rule engine has identified the <strong>Prime Minister Employment Generation Programme (PMEGP)</strong> as the most suitable scheme for the stated business requirement.
          </p>
          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 border text-sm">
            <div>
              <p className="text-slate-500">Match Score</p>
              <p className="font-bold text-lg">92%</p>
            </div>
            <div>
              <p className="text-slate-500">Readiness Status</p>
              <p className="font-bold text-lg text-emerald-700">Excellent</p>
            </div>
            <div>
              <p className="text-slate-500">Est. EMI Burden</p>
              <p className="font-bold text-lg">28%</p>
            </div>
          </div>
        </div>

        {/* Financial Plan */}
        <div className="mb-10">
          <h2 className="text-lg font-bold border-b pb-2 mb-4">2. Financial Plan Details</h2>
          <table className="w-full text-sm text-left border-collapse border border-slate-300">
            <tbody>
              <tr className="border-b border-slate-300">
                <th className="p-3 bg-slate-100 font-semibold border-r border-slate-300 w-1/3">Project Cost</th>
                <td className="p-3">₹5,00,000</td>
              </tr>
              <tr className="border-b border-slate-300">
                <th className="p-3 bg-slate-100 font-semibold border-r border-slate-300">Own Contribution</th>
                <td className="p-3">₹50,000 (10%)</td>
              </tr>
              <tr className="border-b border-slate-300">
                <th className="p-3 bg-slate-100 font-semibold border-r border-slate-300">Recommended Loan</th>
                <td className="p-3 font-bold">₹4,50,000</td>
              </tr>
              <tr className="border-b border-slate-300">
                <th className="p-3 bg-slate-100 font-semibold border-r border-slate-300">Indicative Rate</th>
                <td className="p-3">9.5% p.a.</td>
              </tr>
              <tr className="border-b border-slate-300">
                <th className="p-3 bg-slate-100 font-semibold border-r border-slate-300">Tenure</th>
                <td className="p-3">60 Months</td>
              </tr>
              <tr>
                <th className="p-3 bg-slate-100 font-semibold border-r border-slate-300">Estimated EMI</th>
                <td className="p-3 font-bold">₹9,451</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Partner Info */}
        <div className="mb-10">
          <h2 className="text-lg font-bold border-b pb-2 mb-4">3. Recommended Channel Partner</h2>
          <div className="border p-4">
            <h3 className="font-bold text-lg">State Bank of India (Main Branch)</h3>
            <p className="text-sm mt-2"><strong>Type:</strong> Public Sector Bank</p>
            <p className="text-sm"><strong>Address:</strong> 123 Parliament Street, New Delhi, Delhi 110001</p>
            <p className="text-sm"><strong>Contact:</strong> 1800-11-2211</p>
            <p className="text-sm mt-3 pt-3 border-t">
              <em>Note: Partner has a high fund availability index (90%) and is currently fully operational.</em>
            </p>
          </div>
        </div>

        {/* Action Items */}
        <div className="mb-10">
          <h2 className="text-lg font-bold border-b pb-2 mb-4">4. Required Action Items</h2>
          <ul className="list-disc pl-5 text-sm space-y-2">
            <li>Prepare Detailed Project Report (DPR).</li>
            <li>Collate Original Aadhaar Card and 2 self-attested photocopies.</li>
            <li>Submit official application through the PMEGP online portal referencing this assessment.</li>
            <li>Visit the recommended channel partner branch for document verification.</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t text-xs text-center text-slate-500">
          <p><strong>Disclaimer:</strong> This report is auto-generated by the UdayamAI platform for guidance purposes only. It does not constitute a legal approval of the loan or scheme eligibility. Final decisions rest with the respective channelizing agency.</p>
          <p className="mt-2 text-[10px] uppercase">Smart India Hackathon 2026 Prototype Document</p>
        </div>
      </div>
    </div>
  );
}
