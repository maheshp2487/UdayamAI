'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReportPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-xs text-slate-500">
      Loading Project Reports...
    </div>
  );
}
