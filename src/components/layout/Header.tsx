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
            <Link href="/advisor" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden md:block">New Assessment</Link>
            <Link href="/advisor/results" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden md:block">My Report</Link>
            <Link href="/business-ideas" className="transition-colors hover:text-foreground/80 text-foreground/60 hidden md:block">Explore Ideas</Link>
            <Link href="/feedback" className="transition-colors hover:text-primary text-foreground/60 hidden md:block font-medium">Feedback</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Link href="/advisor">
              <Button size="sm" className="hidden sm:flex">Generate Feasibility Report</Button>
            </Link>
            {/* Mobile menu could go here */}
          </div>
        </div>
      </div>
    </header>
  );
}
