'use client';

import { usePathname } from 'next/navigation';
import { FloatingCopilot } from './FloatingCopilot';

export function GlobalCopilot() {
  const pathname = usePathname();

  // If on /agent, the agent page renders its own enriched FloatingCopilot with live DPR context
  if (pathname === '/agent') {
    return null;
  }

  return <FloatingCopilot />;
}
