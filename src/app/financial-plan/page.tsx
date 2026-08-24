"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FinancialPlanRedirect() {
  const router = useRouter();

  useEffect(() => {
    // The new PS 26091 architecture integrates the financial structuring 
    // directly into the main Business Feasibility dashboard.
    router.push('/advisor/results');
  }, [router]);

  return <div className="p-12 text-center">Loading Financial Structure...</div>;
}
