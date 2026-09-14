'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/i18n/translations';
import { Logo } from '@/components/ui/Logo';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('udayam_language') as Language;
      if (stored === 'en' || stored === 'hi' || stored === 'ta') {
        setLanguage(stored);
      }
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('udayam_language', newLang);
      window.dispatchEvent(new CustomEvent('udayam_language_changed', { detail: newLang }));
    }
  };

  const t = translations[language] || translations.en;

  const navLinks = [
    { href: '/agent', label: t.navFeasibility },
    { href: '/business-ideas', label: t.navOpportunities },
    { href: '/dashboard', label: t.navSaved },
    { href: '/methodology', label: t.navMethodology },
    { href: '/about', label: t.navAbout },
  ];

  const tagline = language === 'hi'
    ? 'कच्चे विचार से बैंक लोन और सफल व्यापार'
    : language === 'ta'
    ? 'புதிய யோசனை முதல் வங்கி கடன் வரை'
    : 'Turn Raw Ideas into Bank-Approved Business';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/80 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Contained Brand Logo with Golden Amber Theme */}
        <Link href="/" className="group inline-flex items-center">
          <Logo size="md" contained={true} tagline={tagline} />
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Language Selector & CTA */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Trilingual Language Selector */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <Globe className="h-3.5 w-3.5 text-amber-700 ml-1.5 mr-1 hidden sm:inline" />
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-0.5 rounded transition-all ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('hi')}
              className={`px-2 py-0.5 rounded transition-all ${
                language === 'hi'
                  ? 'bg-amber-600 text-white shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('ta')}
              className={`px-2 py-0.5 rounded transition-all ${
                language === 'ta'
                  ? 'bg-amber-600 text-white shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              தமிழ்
            </button>
          </div>

          <Link href="/agent" className="hidden sm:inline-block">
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-4 py-1.5 text-xs rounded-lg shadow-sm transition-all"
            >
              <span>{t.btnAppraise}</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>

          {/* Mobile menu hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200/80 bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={'mobile-' + link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 border border-amber-300'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/agent"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block"
            >
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs py-2.5 rounded-lg shadow-sm flex items-center justify-center">
                <span>{t.btnAppraise}</span>
                <ArrowUpRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
