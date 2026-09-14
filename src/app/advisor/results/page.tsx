'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdvisorResultsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/agent');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-xs text-slate-500">
      Redirecting to Techno-Economic Feasibility Studio...
    </div>
  );
}
