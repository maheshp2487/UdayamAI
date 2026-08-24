import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">UdayamAI</h3>
            <p className="text-sm text-muted-foreground">
              Know your market. Plan your business. Build your future.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/business-ideas" className="hover:text-primary">Business Ideas</Link></li>
              <li><Link href="/advisor" className="hover:text-primary">Business Advisory</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/financial-plan" className="hover:text-primary">Financial Planning</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Organization</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About the Platform</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-2">Disclaimer:</p>
          <p className="mb-2">
            UdayamAI provides indicative guidance and does not guarantee business success or loan approval. Final decisions are subject to verification by authorized institutions.
          </p>
          <p className="mt-2 text-sm text-slate-500 max-w-xl">
            An AI-driven platform for hyper-local business feasibility and financial structuring.
          </p>
        </div>
      </div>
    </footer>
  );
}
