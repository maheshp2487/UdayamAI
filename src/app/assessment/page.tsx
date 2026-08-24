"use client";

import { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

// Zod schema for validation
const formSchema = z.object({
  // Profile
  full_name: z.string().min(2, "Name is required"),
  age: z.coerce.number().min(18, "Must be at least 18"),
  category: z.string().min(1, "Category is required"),
  annual_family_income: z.coerce.number().min(0, "Income cannot be negative"),
  state: z.string().min(1, "State is required"),
  
  // Requirement
  project_type: z.enum(['business', 'education']),
  estimated_project_cost: z.coerce.number().min(1000, "Project cost is required"),
  required_loan_amount: z.coerce.number().min(1000, "Loan amount is required"),
  
  // Financial Profile
  available_own_contribution: z.coerce.number().min(0),
  estimated_monthly_income: z.coerce.number().min(0),
  existing_monthly_obligations: z.coerce.number().min(0),
  preferred_repayment_period_months: z.coerce.number().min(12, "Minimum 12 months").max(120, "Maximum 120 months"),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { id: 'profile', title: 'Personal Profile' },
  { id: 'requirement', title: 'Project Requirement' },
  { id: 'financial', title: 'Financial Readiness' }
];

const DEMO_SCENARIOS = {
  small_micro: {
    full_name: "Ravi Kumar", age: 35, category: "SC", annual_family_income: 180000, state: "Maharashtra",
    project_type: "business", estimated_project_cost: 80000, required_loan_amount: 75000,
    available_own_contribution: 5000, estimated_monthly_income: 15000, existing_monthly_obligations: 0,
    preferred_repayment_period_months: 36
  },
  large_term: {
    full_name: "Anita Sharma", age: 42, category: "Women", annual_family_income: 450000, state: "Delhi",
    project_type: "business", estimated_project_cost: 2500000, required_loan_amount: 2200000,
    available_own_contribution: 300000, estimated_monthly_income: 80000, existing_monthly_obligations: 12000,
    preferred_repayment_period_months: 84
  },
  education: {
    full_name: "Arjun Singh", age: 21, category: "Safai Karamchari", annual_family_income: 120000, state: "Uttar Pradesh",
    project_type: "education", estimated_project_cost: 1500000, required_loan_amount: 1500000,
    available_own_contribution: 0, estimated_monthly_income: 40000, existing_monthly_obligations: 0,
    preferred_repayment_period_months: 60
  },
  ineligible: {
    full_name: "Rahul Verma", age: 16, category: "General", annual_family_income: 1500000, state: "Karnataka",
    project_type: "business", estimated_project_cost: 5000000, required_loan_amount: 5000000,
    available_own_contribution: 0, estimated_monthly_income: 20000, existing_monthly_obligations: 30000,
    preferred_repayment_period_months: 120
  }
};

export default function AssessmentWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({
    project_type: 'business',
    preferred_repayment_period_months: 60,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadDemo = (key: keyof typeof DEMO_SCENARIOS) => {
    setFormData(DEMO_SCENARIOS[key] as Partial<FormData>);
    // Don't auto-submit, just prefill so the judge can see
  };

  const handleNext = () => {
    // Validate current step fields before proceeding (Simplified for demo)
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    setIsSubmitting(true);
    // In a real app, this would validate everything with Zod, save to DB, and redirect
    // For demo, we store in localStorage/state and redirect to results
    setTimeout(() => {
      localStorage.setItem('assessmentData', JSON.stringify(formData));
      router.push('/assessment/results');
    }, 500);
  };

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Check Your Eligibility</h1>
        <p className="text-slate-600">Complete this short assessment to find government schemes tailored to your profile.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-8">
        <div className="text-sm font-semibold text-amber-900 mb-2">SIH Demo Scenarios (Prefill Only)</div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => loadDemo('small_micro')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Small Micro-Enterprise</Button>
          <Button variant="outline" size="sm" onClick={() => loadDemo('large_term')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Larger Term Loan</Button>
          <Button variant="outline" size="sm" onClick={() => loadDemo('education')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Education Loan</Button>
          <Button variant="outline" size="sm" onClick={() => loadDemo('ineligible')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Ineligible Applicant</Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          {STEPS.map((step, idx) => (
            <span key={step.id} className={idx <= currentStep ? 'text-primary' : ''}>{step.title}</span>
          ))}
        </div>
        <Progress value={((currentStep + 1) / STEPS.length) * 100} className="h-2" />
      </div>

      <Card className="shadow-lg border-primary/10">
        <CardHeader>
          <CardTitle>{STEPS[currentStep].title}</CardTitle>
          <CardDescription>
            {currentStep === 0 && "Let's start with your basic demographic information."}
            {currentStep === 1 && "Tell us about what you need the loan for."}
            {currentStep === 2 && "Help us understand your current financial capability."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* STEP 1: Profile */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input id="full_name" value={formData.full_name || ''} onChange={e => updateField('full_name', e.target.value)} placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" value={formData.age || ''} onChange={e => updateField('age', e.target.value)} placeholder="e.g. 25" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Social Category</Label>
                <Select value={formData.category || ""} onValueChange={v => updateField('category', v)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select your category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="OBC">OBC</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                    <SelectItem value="Women">Women Entrepreneur</SelectItem>
                    <SelectItem value="Minority">Minority</SelectItem>
                    <SelectItem value="Safai Karamchari">Safai Karamchari</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annual_family_income">Annual Family Income (₹)</Label>
                <Input id="annual_family_income" type="number" value={formData.annual_family_income || ''} onChange={e => updateField('annual_family_income', e.target.value)} placeholder="Total family income per year" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={formData.state || ""} onValueChange={v => updateField('state', v)}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* STEP 2: Requirement */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project_type">What is the loan for?</Label>
                <Select value={formData.project_type} onValueChange={v => updateField('project_type', v)}>
                  <SelectTrigger id="project_type">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Starting / Expanding a Business</SelectItem>
                    <SelectItem value="education">Higher Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated_project_cost">Estimated Total Project Cost / Course Fee (₹)</Label>
                <Input id="estimated_project_cost" type="number" value={formData.estimated_project_cost || ''} onChange={e => updateField('estimated_project_cost', e.target.value)} placeholder="e.g. 500000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="required_loan_amount">Required Loan Amount (₹)</Label>
                <Input id="required_loan_amount" type="number" value={formData.required_loan_amount || ''} onChange={e => updateField('required_loan_amount', e.target.value)} placeholder="e.g. 400000" />
                <p className="text-xs text-muted-foreground">The remaining amount ({((formData.estimated_project_cost || 0) - (formData.required_loan_amount || 0))} ₹) will be your own contribution.</p>
              </div>
            </div>
          )}

          {/* STEP 3: Financial Profile */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="available_own_contribution">Available Own Contribution (Margin Money) (₹)</Label>
                <Input id="available_own_contribution" type="number" value={formData.available_own_contribution || ''} onChange={e => updateField('available_own_contribution', e.target.value)} placeholder="Funds you can contribute" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated_monthly_income">Estimated Monthly Income after project completion (₹)</Label>
                <Input id="estimated_monthly_income" type="number" value={formData.estimated_monthly_income || ''} onChange={e => updateField('estimated_monthly_income', e.target.value)} placeholder="Expected monthly earnings" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="existing_monthly_obligations">Existing Monthly Loan EMIs / Obligations (₹)</Label>
                <Input id="existing_monthly_obligations" type="number" value={formData.existing_monthly_obligations || ''} onChange={e => updateField('existing_monthly_obligations', e.target.value)} placeholder="e.g. 0 if no active loans" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred_repayment_period_months">Preferred Repayment Period (Months)</Label>
                <Select value={formData.preferred_repayment_period_months?.toString() || ""} onValueChange={v => updateField('preferred_repayment_period_months', parseInt(v || "0"))}>
                  <SelectTrigger id="preferred_repayment_period_months">
                    <SelectValue placeholder="Select tenure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="36">3 Years (36 Months)</SelectItem>
                    <SelectItem value="60">5 Years (60 Months)</SelectItem>
                    <SelectItem value="84">7 Years (84 Months)</SelectItem>
                    <SelectItem value="120">10 Years (120 Months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

        </CardContent>
        <CardFooter className="flex justify-between border-t bg-slate-50/50 pt-6">
          <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 0 || isSubmitting}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={isSubmitting}>
            {isSubmitting ? 'Analyzing...' : currentStep === STEPS.length - 1 ? 'Find My Schemes' : 'Continue'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
