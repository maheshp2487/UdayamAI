"use client";

import { useEffect, useState } from "react";
import { PartnerSuitabilityEngine } from "@/lib/engine/partnerSuitability";
import { ChannelPartner, PartnerMatchResult } from "@/lib/types/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Navigation, AlertCircle, Building, CheckCircle2 } from "lucide-react";

export default function PartnerLocator() {
  const [partners, setPartners] = useState<ChannelPartner[]>([]);
  const [rankedResults, setRankedResults] = useState<PartnerMatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Default coordinates (e.g. New Delhi center) for demo purposes
  // In a real app, we would use navigator.geolocation
  const userLat = 28.6139;
  const userLon = 77.2090;

  useEffect(() => {
    // Fetch mock partners and rank them
    // For Next.js client component without a dedicated API route, we could import the mock directly, 
    // but in reality we'd fetch from an API. Since this is demo, we'll fetch from a quick API route or just mock import here.
    // Let's dynamically import the mock data for now to simulate fetch.
    import('@/data/seed').then(module => {
      const allPartners = module.channelPartners;
      setPartners(allPartners);
      const ranked = PartnerSuitabilityEngine.rankPartners(allPartners, userLat, userLon);
      setRankedResults(ranked);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Channel Partner Locator</h1>
        <p className="text-lg text-slate-600">Find the most suitable, authorized institutions near you to process your scheme application.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-8 flex items-start">
        <MapPin className="w-5 h-5 mr-3 mt-0.5 shrink-0" />
        <div>
          <p className="font-medium">Using Location: New Delhi (Demo)</p>
          <p className="text-sm opacity-90 mt-1">Partners are ranked based on scheme support, fund availability, operational status, and distance from your location.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {rankedResults.map((result, index) => (
          <Card key={result.partner.id} className={index === 0 ? "border-primary/50 shadow-md relative overflow-hidden" : ""}>
            {index === 0 && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                BEST MATCH
              </div>
            )}
            <CardHeader className="md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline">{result.partner.type}</Badge>
                  {result.partner.status === 'Available' ? (
                    <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-amber-700 bg-amber-50 border-amber-200">
                      <AlertCircle className="w-3 h-3 mr-1" /> {result.partner.status}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{result.partner.name}</CardTitle>
                <CardDescription className="flex items-center mt-2 text-slate-600">
                  <Building className="w-4 h-4 mr-2" /> {result.partner.address}, {result.partner.district}
                </CardDescription>
              </div>
              <div className="flex flex-col items-center md:items-end shrink-0 bg-slate-50 p-3 rounded-md">
                <div className="text-3xl font-bold text-slate-900">{result.total_score}</div>
                <div className="text-xs text-slate-500 font-medium">Suitability Score</div>
                <div className="text-sm font-semibold text-primary mt-1 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" /> {result.distance_km} km away
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-3 rounded-md text-sm text-slate-700 mb-4 border">
                <strong>Why recommended?</strong> {result.recommendation_reason}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Fund Availability</p>
                  <p className="font-medium text-slate-900">{result.score_breakdown.fund_availability}%</p>
                </div>
                <div>
                  <p className="text-slate-500">Processing Capacity</p>
                  <p className="font-medium text-slate-900">{result.score_breakdown.processing_capacity}%</p>
                </div>
                <div>
                  <p className="text-slate-500">Contact Phone</p>
                  <p className="font-medium text-slate-900 flex items-center">
                    {result.partner.contact_phone ? <><Phone className="w-3 h-3 mr-1" /> {result.partner.contact_phone}</> : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Email</p>
                  <p className="font-medium text-slate-900 truncate">
                    {result.partner.contact_email ? result.partner.contact_email : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/50 border-t pt-4 flex gap-3">
              <Button asChild>
                <a href={`https://maps.google.com/?q=${result.partner.latitude},${result.partner.longitude}`} target="_blank" rel="noopener noreferrer">
                  <Navigation className="w-4 h-4 mr-2" /> Get Directions
                </a>
              </Button>
              <Button variant="outline">Select Partner</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
