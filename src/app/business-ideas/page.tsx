"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { TrendingUp, IndianRupee, MapPin, Store } from "lucide-react";

export default function BusinessIdeasPage() {
  const router = useRouter();

  const exploreIdea = (idea: any) => {
    localStorage.setItem('advisoryData', JSON.stringify({
      location: idea.location,
      business_category: idea.category,
      business_vision: idea.vision,
      available_margin: idea.margin
    }));
    router.push('/advisor/results');
  };

  const IDEAS = [
    {
      title: "Organic Dairy & A2 Milk",
      location: "Kondagaon Block, Bastar",
      category: "Dairy & Livestock",
      vision: "I want to buy 5 Gir cows and sell fresh A2 milk locally.",
      margin: 10000,
      scheme: "Micro Finance",
      demand: "High"
    },
    {
      title: "Daily Needs FMCG Retail",
      location: "Palghar District, Maharashtra",
      category: "Retail & Trading",
      vision: "Planning to open a small grocery shop targeting daily wage workers.",
      margin: 50000,
      scheme: "Term Loan",
      demand: "Very High"
    },
    {
      title: "Traditional Handloom Weaving",
      location: "Varanasi Weavers Colony, UP",
      category: "Textiles & Handloom",
      vision: "Setting up 2 manual looms to weave traditional silk sarees.",
      margin: 200000,
      scheme: "Term Loan",
      demand: "Moderate"
    },
    {
      title: "Agri-Tech Equipment Rental",
      location: "Ludhiana Rural, Punjab",
      category: "Agriculture & Allied",
      vision: "Buying a mini-tractor and implements to rent out to smallholder farmers.",
      margin: 80000,
      scheme: "Term Loan",
      demand: "Seasonal High"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">Explore High-Potential Opportunities</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Not sure where to start? Browse these pre-validated business models tailored for rural and semi-urban markets. Click 'Analyze Idea' to instantly generate a full feasibility and financial report.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {IDEAS.map((idea, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl text-slate-900">{idea.title}</CardTitle>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">{idea.category}</Badge>
              </div>
              <CardDescription className="flex items-center gap-1 mt-2 text-slate-500">
                <MapPin className="h-3 w-3" /> {idea.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-md italic text-sm text-slate-600 border border-slate-100">
                "{idea.vision}"
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1 text-slate-700">
                  <IndianRupee className="h-4 w-4 text-emerald-600" /> 
                  <span className="font-medium">Margin Required:</span> ₹{idea.margin.toLocaleString('en-IN')}
                </div>
                <div className="flex items-center gap-1 text-slate-700">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Local Demand:</span> {idea.demand}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 border-t mt-4 bg-slate-50/50">
              <Button className="w-full" onClick={() => exploreIdea(idea)}>
                <Store className="mr-2 h-4 w-4" /> Analyze This Idea
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
