import { Repository } from "@/lib/data/repository";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, Building2, GraduationCap, FileCheck } from "lucide-react";

export default async function SchemeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const scheme = await Repository.getSchemeById(resolvedParams.id);
  
  if (!scheme) {
    notFound();
  }

  const rules = await Repository.getSchemeRules(scheme.id);
  const documents = await Repository.getDocumentRequirements(scheme.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="-ml-4 text-muted-foreground">
          <Link href="/schemes">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Schemes
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant={scheme.category === 'business' ? 'default' : 'secondary'}>
                {scheme.category === 'business' ? <Building2 className="w-3 h-3 mr-1" /> : <GraduationCap className="w-3 h-3 mr-1" />}
                {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
              </Badge>
              {scheme.is_active ? <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Active</Badge> : <Badge variant="destructive">Inactive</Badge>}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{scheme.name}</h1>
            <p className="text-lg text-slate-600 mb-6">{scheme.purpose}</p>
            
            <div className="prose max-w-none text-slate-600">
              <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Overview</h3>
              <p>{scheme.description}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Eligibility Criteria</h3>
            <ul className="space-y-3">
              {rules?.min_age && (
                <li className="flex items-start">
                  <span className="font-medium min-w-[200px]">Minimum Age:</span>
                  <span className="text-slate-600">{rules.min_age} years</span>
                </li>
              )}
              {rules?.max_family_income && (
                <li className="flex items-start">
                  <span className="font-medium min-w-[200px]">Max Family Income:</span>
                  <span className="text-slate-600">₹{(rules.max_family_income / 100000).toFixed(2)} Lakhs per annum</span>
                </li>
              )}
              {rules?.min_own_contribution_pct && (
                <li className="flex items-start">
                  <span className="font-medium min-w-[200px]">Own Contribution:</span>
                  <span className="text-slate-600">Minimum {rules.min_own_contribution_pct}% of project cost</span>
                </li>
              )}
              {rules?.target_categories && (
                <li className="flex items-start">
                  <span className="font-medium min-w-[200px]">Target Categories:</span>
                  <span className="text-slate-600">{rules.target_categories.join(', ')}</span>
                </li>
              )}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Required Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map(doc => (
                <Card key={doc.id} className="bg-slate-50 border-slate-200">
                  <CardHeader className="py-4">
                    <CardTitle className="text-base flex items-center">
                      <FileCheck className="w-4 h-4 mr-2 text-primary" />
                      {doc.name}
                      {doc.is_mandatory && <span className="ml-2 text-[10px] uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Required</span>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-0 pb-4 text-sm text-slate-600">
                    {doc.description}
                  </CardContent>
                </Card>
              ))}
              {documents.length === 0 && <p className="text-slate-500 italic">No specific document requirements listed.</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24 border-primary/20 shadow-md">
            <CardHeader className="bg-slate-50/50 border-b pb-4">
              <CardTitle>Financial Limits</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Maximum Loan Amount</p>
                <p className="text-3xl font-bold text-slate-900">₹{(scheme.max_loan_amount / 100000).toFixed(1)} <span className="text-lg text-slate-600 font-normal">Lakhs</span></p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Interest Rate</p>
                  <p className="text-xl font-semibold text-slate-900">{scheme.indicative_interest_rate}% <span className="text-sm text-slate-600 font-normal">p.a.</span></p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Max Tenure</p>
                  <p className="text-xl font-semibold text-slate-900">{scheme.max_tenure_months} <span className="text-sm text-slate-600 font-normal">mo</span></p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Moratorium Period</p>
                <p className="text-lg font-medium text-slate-900">{scheme.moratorium_months} months</p>
                <p className="text-xs text-slate-500 mt-1">Repayment holiday before EMI starts</p>
              </div>
              
              <div className="pt-4 border-t">
                <Button className="w-full mb-3" size="lg" asChild>
                  <Link href="/assessment">Check My Eligibility</Link>
                </Button>
                <Button variant="outline" className="w-full" size="lg" asChild>
                  <a href={scheme.official_reference} target="_blank" rel="noopener noreferrer">Visit Official Portal</a>
                </Button>
              </div>

              <div className="bg-amber-50 p-3 rounded-md text-xs text-amber-800 border border-amber-200">
                <strong>Disclaimer:</strong> {scheme.disclaimer}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
