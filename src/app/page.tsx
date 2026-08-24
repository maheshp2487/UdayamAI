import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, MapPin, Briefcase, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-slate-100 text-slate-800 mb-6">
            AI-Driven Hyper-Local Business Advisory
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl">
            Before you invest, understand your market.
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-600 max-w-2xl">
            Your Business. Your Location. Your Opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/advisor">
              <Button size="lg" className="w-full sm:w-auto text-base">Analyze My Business Idea</Button>
            </Link>
            <Link href="/business-ideas">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base bg-white">Explore Business Opportunities</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Empowering Rural Micro-Entrepreneurs</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Build a clear financing plan before applying for concessional credit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-blue-50/50">
              <CardHeader>
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Know Your Local Market</CardTitle>
                <CardDescription className="text-sm">Understand demand, competition and opportunity within your specific village or block.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-emerald-50/50">
              <CardHeader>
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                  <Activity className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Test Business Viability</CardTitle>
                <CardDescription className="text-sm">Evaluate whether your business idea actually fits your local economy.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-purple-50/50">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                  <Briefcase className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Plan Your Financing</CardTitle>
                <CardDescription className="text-sm">Turn your available margin capital into a clear project and 90% loan structure.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-amber-50/50">
              <CardHeader>
                <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Build Your Roadmap</CardTitle>
                <CardDescription className="text-sm">Receive a personalized business feasibility plan and quarterly EMI projection.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
