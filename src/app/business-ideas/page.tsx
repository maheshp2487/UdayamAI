import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BusinessIdeasPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Explore Business Opportunities</h1>
      <p className="text-slate-600 mb-8">Browse high-potential business categories suitable for your local geography.</p>
      <Link href="/advisor">
        <Button>Analyze My Idea</Button>
      </Link>
    </div>
  );
}
