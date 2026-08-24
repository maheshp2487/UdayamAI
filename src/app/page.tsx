import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Calculator, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
            Smart India Hackathon 2026 Prototype
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl">
            Find the right financial support for your next step.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
            Understand your eligibility, compare suitable schemes, plan your finances, and connect with the right authorized channel partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/assessment">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-medium">
                Check My Eligibility <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/schemes">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-medium">
                Explore Schemes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / Value Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-none bg-slate-50/50">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Smart Scheme Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600">
                  Our deterministic engine matches your profile strictly against official eligibility criteria, providing transparent recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-slate-50/50">
              <CardHeader>
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                  <Calculator className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Clear Financial Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600">
                  Calculate accurate EMIs, understand interest impact, and determine realistic repayment capabilities instantly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-slate-50/50">
              <CardHeader>
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Authorized Partner Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600">
                  Locate the nearest active channelizing agencies with sufficient fund availability for your specific scheme.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-slate-50/50">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Application Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600">
                  Get personalized, scheme-specific document checklists to ensure you are fully prepared before approaching a partner.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600">A simple, transparent journey to financial empowerment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200" />
            
            {[
              { step: 1, title: "Tell us about your requirement", desc: "Share basic details about your profile and what you need funding for." },
              { step: 2, title: "Understand eligible schemes", desc: "See clear, explainable matches based strictly on official guidelines." },
              { step: 3, title: "Plan your finances", desc: "Simulate loan amounts, EMIs, and understand your financial readiness." },
              { step: 4, title: "Find the right channel partner", desc: "Locate nearby active institutions authorized for your recommended scheme." },
            ].map((item, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-6 ring-8 ring-slate-50 shadow-sm">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Impact / CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
            Start your financial journey with clarity.
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Join thousands of entrepreneurs discovering the right pathways to launch or expand their enterprises through guided support.
          </p>
          <Link href="/assessment">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
              Start Free Assessment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
