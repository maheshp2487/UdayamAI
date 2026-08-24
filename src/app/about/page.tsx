export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-6">
      <h1 className="text-4xl font-bold mb-6">About UdayamAI</h1>
      
      <p className="text-lg text-slate-700 leading-relaxed">
        UdayamAI is a multilingual, hyper-local business advisory and financial structuring platform. We empower rural and semi-urban micro-entrepreneurs by bridging the gap between anecdotal business choices and data-driven market realities.
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
      <p className="text-lg text-slate-700 leading-relaxed">
        Starting a business is intimidating, especially without access to professional financial advisors or market research. 
        UdayamAI acts as an automated, digital &quot;Bank Manager.&quot; We take simple inputs—like your location and available capital—and transform them into a comprehensive, bank-ready feasibility report.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">What We Do</h2>
      <ul className="list-disc list-inside space-y-3 text-lg text-slate-700 leading-relaxed">
        <li><strong>Market Intelligence:</strong> Analyze local demographics, competitor density, and product demand to ensure business viability.</li>
        <li><strong>Financial Structuring:</strong> Automatically structure capital using a strict 10/90 model (10% owner margin, 90% term loan) to perfectly align with government MSME guidelines.</li>
        <li><strong>Repayment Visualization:</strong> Generate exact 7-year loan amortization schedules, factoring in critical grace periods like 6-month moratoriums.</li>
        <li><strong>Multilingual Accessibility:</strong> Break down language barriers by serving insights natively in English, Hindi, and Tamil.</li>
      </ul>
    </div>
  );
}
