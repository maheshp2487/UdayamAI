"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [uxRating, setUxRating] = useState(0);
  const [finRating, setFinRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
        <Card className="max-w-lg w-full text-center py-12 border-green-100 bg-green-50/30">
          <CardContent className="space-y-6 flex flex-col items-center">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Thank you for your feedback!</h2>
            <p className="text-slate-600 px-4">
              Your insights help us strengthen the Udayam ecosystem and build better tools for rural entrepreneurs across India.
            </p>
            <Link href="/advisor">
              <Button className="mt-4" variant="outline">Run Another Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8 text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">We Value Your Ground Truth</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Help us improve UdayamAI. Whether you found a bug, want a new feature, or have feedback on our financial models—your voice matters.
        </p>
      </div>

      <Card className="shadow-lg border-primary/10">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Submit Feedback</CardTitle>
            <CardDescription>
              All fields are optional, but detailed feedback helps us resolve issues faster.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 pt-4">
            
            {/* Category */}
            <div className="space-y-3">
              <Label>Feedback Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="What kind of feedback is this?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug Report / Technical Issue</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="financial">Financial Accuracy / Scheme Rules</SelectItem>
                  <SelectItem value="ux">User Experience / Design</SelectItem>
                  <SelectItem value="general">General Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ratings Grid */}
            <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-6">
              <div className="space-y-3">
                <Label className="text-slate-700">Platform Ease of Use</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setUxRating(star)}
                      className="transition-colors focus:outline-none"
                    >
                      <Star className={`h-6 w-6 ${uxRating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300 hover:text-amber-200'}`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-slate-700">Financial Accuracy</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setFinRating(star)}
                      className="transition-colors focus:outline-none"
                    >
                      <Star className={`h-6 w-6 ${finRating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300 hover:text-amber-200'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 mt-6">
              <Label>Detailed Feedback (Optional)</Label>
              <textarea 
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Please describe your experience or suggestions in detail..." 
              />
            </div>

            {/* Contact Info (Optional) */}
            <div className="space-y-3 pt-4 border-t">
              <Label>Contact Information (Optional)</Label>
              <p className="text-xs text-slate-500 mb-2">Leave your email if you'd like our team to follow up with you.</p>
              <Input type="email" placeholder="your.email@example.com" />
            </div>

          </CardContent>

          <CardFooter className="flex justify-end border-t bg-slate-50/50 pt-6">
            <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
              ) : (
                'Submit Feedback'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
