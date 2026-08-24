import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary text-primary-foreground p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l2-9 5 18 5-18 2 9h4"/></svg>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">UdayamAI</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/schemes" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden md:block">Explore Schemes</Link>
            <Link href="/planner" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden md:block">Financial Planner</Link>
            <Link href="/partners" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden md:block">Partner Locator</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Link href="/assessment">
              <Button size="sm" className="hidden sm:flex">Check Eligibility</Button>
            </Link>
            {/* Mobile menu could go here */}
          </div>
        </div>
      </div>
    </header>
  );
}
