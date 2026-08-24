"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

// Form shape
type FormData = {
  location: string;
  business_category: string;
  available_margin: number;
};

const DEMO_SCENARIOS = {
  dairy_micro: {
    location: "Kondagaon Block, Bastar",
    business_category: "Dairy & Livestock",
    available_margin: 10000, // Leads to 1L project -> Micro Finance
  },
  retail_term: {
    location: "Palghar District, Maharashtra",
    business_category: "Retail & Trading",
    available_margin: 50000, // Leads to 5L project -> Term Loan
  },
  textiles_term: {
    location: "Varanasi Weavers Colony, UP",
    business_category: "Textiles & Handloom",
    available_margin: 200000, // Leads to 20L project -> Term Loan
  }
};

export default function AdvisoryWizard() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadDemo = (key: keyof typeof DEMO_SCENARIOS) => {
    setFormData(DEMO_SCENARIOS[key] as Partial<FormData>);
  };

  const submitForm = () => {
    if (!formData.location || !formData.business_category || !formData.available_margin) {
      alert("Please fill all fields.");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.setItem('advisoryData', JSON.stringify(formData));
      router.push('/advisor/results');
    }, 500);
  };

  const updateField = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Business Advisory & Structuring</h1>
        <p className="text-slate-600">Enter your location and available capital to generate a hyper-local feasibility report.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-8">
        <div className="text-sm font-semibold text-amber-900 mb-2">Quick Fill Scenarios (Prefill Only)</div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => loadDemo('dairy_micro')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Dairy (Micro)</Button>
          <Button variant="outline" size="sm" onClick={() => loadDemo('retail_term')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Retail (Term)</Button>
          <Button variant="outline" size="sm" onClick={() => loadDemo('textiles_term')} className="bg-white hover:bg-amber-100 text-amber-900 border-amber-300">Textiles (Term)</Button>
        </div>
      </div>

      <Card className="shadow-lg border-primary/10">
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>
            Tell us where you want to start and how much initial capital you have.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                  <SelectItem value="Retail & Trading">Retail & Trading</SelectItem>
                  <SelectItem value="Textiles & Handloom">Textiles & Handloom</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing & Processing</SelectItem>
                  <SelectItem value="Agriculture & Allied">Agriculture & Allied</SelectItem>
                  <SelectItem value="Services">Services (e.g., Salon, Repair)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="available_margin">Available Margin Capital (₹)</Label>
              <Input id="available_margin" type="number" value={formData.available_margin || ''} onChange={e => updateField('available_margin', e.target.value)} placeholder="The 10% contribution you currently have" />
              <p className="text-xs text-slate-500">The government provides 90% as a concessional loan based on this 10% margin.</p>
            </div>

          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t bg-slate-50/50 pt-6">
          <Button onClick={submitForm} disabled={isSubmitting}>
            {isSubmitting ? 'Generating AI Report...' : 'Generate Feasibility Report'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
