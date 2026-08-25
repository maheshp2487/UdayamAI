"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

// Form shape (Original 4 + 12 AHP fields)
export type AdvisoryFormData = {
  // Step 1
  location: string;
  business_category: string;
  business_vision: string;
  available_margin: number;
  
  // Step 2: AHP Entrepreneur Profile
  industryExperienceYears: number;
  managementExperience: number;
  educationLevel: number;
  recordKeepingHabits: number;
  businessPlanning: number;
  professionalAdviceAccess: number;
  staffingPlanAdequacy: number;
  needForAchievement: number;
  riskTolerance: number;
  selfConfidence: number;
  familyBusinessBackground: number;
  socioculturalSupport: number;
};

const DEFAULT_AHP_DATA = {
  industryExperienceYears: 5,
  managementExperience: 5,
  educationLevel: 5,
  recordKeepingHabits: 5,
  businessPlanning: 5,
  professionalAdviceAccess: 5,
  staffingPlanAdequacy: 5,
  needForAchievement: 5,
  riskTolerance: 5,
  selfConfidence: 5,
  familyBusinessBackground: 5,
  socioculturalSupport: 5,
};

const DEMO_SCENARIOS = {
  dairy_micro: {
    location: "Kondagaon Block, Bastar",
    business_category: "Dairy & Livestock",
    business_vision: "I want to buy 5 Gir cows and sell fresh A2 milk locally.",
    available_margin: 10000,
    ...DEFAULT_AHP_DATA,
    industryExperienceYears: 8,
    managementExperience: 2,
    recordKeepingHabits: 2, // Weak
    riskTolerance: 8, // High
    familyBusinessBackground: 8,
  },
  retail_term: {
    location: "Palghar District, Maharashtra",
    business_category: "Retail & Trading",
    business_vision: "Planning to open a small grocery shop targeting daily wage workers.",
    available_margin: 50000,
    ...DEFAULT_AHP_DATA,
    industryExperienceYears: 2,
    managementExperience: 7,
    businessPlanning: 8,
    recordKeepingHabits: 8,
  },
  textiles_term: {
    location: "Varanasi Weavers Colony, UP",
    business_category: "Textiles & Handloom",
    business_vision: "Setting up 2 manual looms to weave traditional silk sarees.",
    available_margin: 200000,
    ...DEFAULT_AHP_DATA,
    industryExperienceYears: 15, // Very high
    managementExperience: 2,     // Weak
    recordKeepingHabits: 4,      // Weak
    businessPlanning: 2,         // Weak
    needForAchievement: 9,
    selfConfidence: 9,
    familyBusinessBackground: 10,
    riskTolerance: 8,
  }
};

export default function AdvisoryWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<Partial<AdvisoryFormData>>({ ...DEFAULT_AHP_DATA });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadDemo = (key: keyof typeof DEMO_SCENARIOS) => {
    setFormData(DEMO_SCENARIOS[key] as Partial<AdvisoryFormData>);
    // Removed setStep(2) so it stays on Step 1
  };

  const submitForm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.setItem('advisoryData', JSON.stringify(formData));
      router.push('/advisor/results');
    }, 500);
  };

  const nextStep = () => {
    if (!formData.location || !formData.business_category || !formData.available_margin) {
      alert("Please fill all required fields in Step 1.");
      return;
    }
    setStep(2);
  };

  const updateField = (field: keyof AdvisoryFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Business Advisory & Structuring</h1>
        <p className="text-slate-600">Complete your profile to generate a hyper-local feasibility report and Journey Readiness Score.</p>
      </div>

      {step === 1 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-8">
          <div className="text-sm font-semibold text-amber-900 mb-2">Quick Fill Demo Scenarios (Bypasses typing)</div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => loadDemo('dairy_micro')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Dairy (Micro)</Button>
            <Button variant="outline" size="sm" onClick={() => loadDemo('retail_term')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Retail (Term)</Button>
            <Button variant="outline" size="sm" onClick={() => loadDemo('textiles_term')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Textiles (Varanasi Weaver)</Button>
          </div>
        </div>
      )}

      <Card className="shadow-lg border-primary/10">
        <CardHeader>
          <CardTitle>
            {step === 1 ? "Step 1: Business Details" : "Step 2: Entrepreneur Profile"}
          </CardTitle>
          <CardDescription>
            {step === 1 
              ? "Tell us where you want to start and how much initial capital you have."
              : "Help us understand your background to calculate your AHP Journey Readiness Score."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Geographic Location (Village/Block/District)</Label>
                <Input id="location" value={formData.location || ''} onChange={e => updateField('location', e.target.value)} placeholder="e.g. Kondagaon Block, Chhattisgarh" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_category">Proposed Business Category</Label>
                <Select value={formData.business_category || ""} onValueChange={(v: string | null) => updateField('business_category', v ?? '')}>  
                  <SelectTrigger id="business_category">
                    <SelectValue placeholder="Select business sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dairy & Livestock">Dairy & Livestock</SelectItem>
                    <SelectItem value="Agriculture & Allied">Agriculture & Farming</SelectItem>
                    <SelectItem value="Retail & Trading">Retail & Trading</SelectItem>
                    <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Textiles & Handloom">Textiles & Handloom</SelectItem>
                    <SelectItem value="Services">Services (Salon, Repair, etc.)</SelectItem>
                    <SelectItem value="Healthcare & Pharmacy">Healthcare & Pharmacy</SelectItem>
                    <SelectItem value="Technology & IT">Technology & IT Services</SelectItem>
                    <SelectItem value="Others">Others (Describe in Vision)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_vision">Abstract Idea / Business Vision</Label>
                <textarea 
                  id="business_vision"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.business_vision || ''} 
                  onChange={e => updateField('business_vision', e.target.value)} 
                  placeholder="Briefly describe your idea in your own words (e.g. 'I want to open a small organic milk shop')" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="available_margin">Available Margin Capital (₹)</Label>
                <Input id="available_margin" type="number" value={formData.available_margin || ''} onChange={e => updateField('available_margin', Number(e.target.value))} placeholder="The 10% contribution you currently have" />
                <p className="text-xs text-slate-500">The government provides 90% as a concessional loan based on this 10% margin.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category A & D */}
              <div className="space-y-6">
                <h3 className="font-semibold text-slate-800 border-b pb-2">Experience & Background</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Industry Experience (Years)</Label>
                    <span className="text-sm font-medium">{formData.industryExperienceYears} yrs</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="30" step="1" value={formData.industryExperienceYears || 0} onChange={e => updateField('industryExperienceYears', Number(e.target.value))} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Management Experience</Label>
                    <span className="text-sm font-medium">{formData.managementExperience}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.managementExperience || 0} onChange={e => updateField('managementExperience', Number(e.target.value))} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Education Level (Relevance)</Label>
                    <span className="text-sm font-medium">{formData.educationLevel}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.educationLevel || 0} onChange={e => updateField('educationLevel', Number(e.target.value))} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Family Business Background</Label>
                    <span className="text-sm font-medium">{formData.familyBusinessBackground}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.familyBusinessBackground || 0} onChange={e => updateField('familyBusinessBackground', Number(e.target.value))} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Socio-cultural Support</Label>
                    <span className="text-sm font-medium">{formData.socioculturalSupport}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.socioculturalSupport || 0} onChange={e => updateField('socioculturalSupport', Number(e.target.value))} />
                </div>
              </div>

              {/* Category B & C */}
              <div className="space-y-6">
                <h3 className="font-semibold text-slate-800 border-b pb-2">Preparedness & Traits</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Record-Keeping Habits</Label>
                    <span className="text-sm font-medium">{formData.recordKeepingHabits}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.recordKeepingHabits || 0} onChange={e => updateField('recordKeepingHabits', Number(e.target.value))} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Business / Strategic Planning</Label>
                    <span className="text-sm font-medium">{formData.businessPlanning}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.businessPlanning || 0} onChange={e => updateField('businessPlanning', Number(e.target.value))} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Access to Prof. Advice</Label>
                    <span className="text-sm font-medium">{formData.professionalAdviceAccess}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.professionalAdviceAccess || 0} onChange={e => updateField('professionalAdviceAccess', Number(e.target.value))} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Staffing Plan Adequacy</Label>
                    <span className="text-sm font-medium">{formData.staffingPlanAdequacy}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.staffingPlanAdequacy || 0} onChange={e => updateField('staffingPlanAdequacy', Number(e.target.value))} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Need for Achievement</Label>
                    <span className="text-sm font-medium">{formData.needForAchievement}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.needForAchievement || 0} onChange={e => updateField('needForAchievement', Number(e.target.value))} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Risk Tolerance</Label>
                    <span className="text-sm font-medium">{formData.riskTolerance}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.riskTolerance || 0} onChange={e => updateField('riskTolerance', Number(e.target.value))} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Self Confidence</Label>
                    <span className="text-sm font-medium">{formData.selfConfidence}/10</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-600 cursor-pointer" min="0" max="10" step="1" value={formData.selfConfidence || 0} onChange={e => updateField('selfConfidence', Number(e.target.value))} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-slate-50/50 pt-6">
          {step === 2 ? (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={submitForm} disabled={isSubmitting}>
                {isSubmitting ? 'Scoring & Generating Report...' : 'Generate AHP Feasibility Report'}
              </Button>
            </>
          ) : (
            <>
              <div /> {/* Placeholder for flex-between */}
              <Button onClick={nextStep}>Next Step: Entrepreneur Profile</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
