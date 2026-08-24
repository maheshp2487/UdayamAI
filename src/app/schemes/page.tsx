import { Repository } from "@/lib/data/repository";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, GraduationCap, Banknote, Clock, Percent } from "lucide-react";

export default async function SchemesPage() {
  const schemes = await Repository.getSchemes();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Explore Official Schemes</h1>
        <p className="text-lg text-slate-600">Browse through available government schemes, understand their purposes, and view indicative terms before applying.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar (Static for now) */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm text-slate-600">
                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
                <span>Business & Enterprise</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-slate-600">
                <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
                <span>Education</span>
              </label>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Loan Amount</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <label className="flex items-center space-x-2">
                <input type="radio" name="loan_amt" className="border-slate-300 text-primary focus:ring-primary" defaultChecked />
                <span>Any Amount</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="loan_amt" className="border-slate-300 text-primary focus:ring-primary" />
                <span>Up to ₹5 Lakhs</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="loan_amt" className="border-slate-300 text-primary focus:ring-primary" />
                <span>₹5 - ₹20 Lakhs</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="loan_amt" className="border-slate-300 text-primary focus:ring-primary" />
                <span>Above ₹20 Lakhs</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Scheme List */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={scheme.category === 'business' ? 'default' : 'secondary'} className="mb-2">
                    {scheme.category === 'business' ? <Building2 className="w-3 h-3 mr-1" /> : <GraduationCap className="w-3 h-3 mr-1" />}
                    {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                  </Badge>
                  {scheme.name.includes('[Supplementary]') ? (
                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-[10px]">Representative Data</Badge>
                  ) : (
                    <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50 text-[10px]">Verified Official Data</Badge>
                  )}
                </div>
                <CardTitle className="text-xl line-clamp-2">{scheme.name.replace('[Supplementary] ', '')}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2 text-slate-600">{scheme.purpose}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground flex items-center mb-1"><Banknote className="w-3 h-3 mr-1"/> Max Loan</span>
                    <span className="font-semibold text-sm">₹{(scheme.max_loan_amount / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground flex items-center mb-1"><Percent className="w-3 h-3 mr-1"/> Indicative Rate</span>
                    <span className="font-semibold text-sm">{scheme.indicative_interest_rate}% p.a.</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground flex items-center mb-1"><Clock className="w-3 h-3 mr-1"/> Max Tenure</span>
                    <span className="font-semibold text-sm">{scheme.max_tenure_months} Months</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t bg-slate-50/50 mt-auto">
                <div className="w-full flex justify-between items-center">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={scheme.official_reference} target="_blank" rel="noopener noreferrer" className="text-xs">Official Portal</a>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={`/schemes/${scheme.id}`}>Learn More</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
