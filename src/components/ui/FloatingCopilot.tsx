'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/i18n/translations';

interface FloatingCopilotProps {
  language?: Language;
  ventureContext?: {
    ventureName?: string;
    location?: string;
    capex?: number;
    margin?: number;
    subsidy?: number;
    dscr?: number;
  };
}

export function FloatingCopilot({ language: propLanguage, ventureContext }: FloatingCopilotProps) {
  const [currentLang, setCurrentLang] = useState<Language>(propLanguage || 'en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('udayam_language') as Language;
      if (stored && (stored === 'en' || stored === 'hi' || stored === 'ta')) {
        setCurrentLang(stored);
      }

      const handleLangChange = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        if (detail && (detail === 'en' || detail === 'hi' || detail === 'ta')) {
          setCurrentLang(detail);
        }
      };

      window.addEventListener('udayam_language_changed', handleLangChange);
      return () => window.removeEventListener('udayam_language_changed', handleLangChange);
    }
  }, []);

  useEffect(() => {
    if (propLanguage) {
      setCurrentLang(propLanguage);
    }
  }, [propLanguage]);

  const t = translations[currentLang] || translations.en;

  const getGreeting = (lang: Language) => {
    if (lang === 'hi') {
      return 'नमस्ते! मैं आपका उद्यम सहायक हूँ — आपका अपना व्यापार और लोन साथी। दुकान, मशीन, सरकारी सब्सिडी (PMEGP/Mudra), लागत या मुनाफे को लेकर कोई भी शंका हो, बेझिझक पूछें।';
    }
    if (lang === 'ta') {
      return 'வணக்கம்! நான் உங்கள் உத்யம் வழிகாட்டி — உங்கள் தொழில் மற்றும் வங்கி கடன் நண்பன். தொழில் யோசனை, இயந்திரங்கள், அரசு மானியம் (PMEGP/Mudra) அல்லது லாபம் குறித்த உங்கள் சந்தேகங்களை எளிதாகக் கேளுங்கள்.';
    }
    return 'Namaste! I am your Udayam Sahayak — your friendly business and loan guide. Ask me any doubt about starting your business, finding machines, calculating profits, or applying for bank loans and government subsidies like PMEGP and Mudra.';
  };

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: getGreeting(currentLang),
    },
  ]);

  // Update greeting when language switches if user hasn't started chatting yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [{ role: 'assistant', content: getGreeting(currentLang) }];
      }
      return prev;
    });
  }, [currentLang]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const newMsgs = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMsgs);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs,
          context: ventureContext || {
            ventureName: 'MSME Business',
            location: 'India',
          },
          language: currentLang,
        }),
      });

      const data = await res.json();
      if (data.text) {
        setMessages([...newMsgs, { role: 'assistant', content: data.text }]);
      } else {
        setMessages([
          ...newMsgs,
          {
            role: 'assistant',
            content: currentLang === 'hi'
              ? 'PMEGP योजना के तहत आप 35% तक मुफ्त सरकारी सब्सिडी और केवल 5% अपनी बचत लगाकर बैंक लोन प्राप्त कर सकते हैं।'
              : currentLang === 'ta'
              ? 'PMEGP திட்டத்தின் கீழ் நீங்கள் 35% வரை இலவச அரசு மானியம் மற்றும் வெறும் 5% சொந்த முதலீட்டுடன் வங்கி கடன் பெறலாம்.'
              : 'Under government MSME schemes, you are eligible for up to 35% free non-repayable capital subsidy and bank financing with just 5% from your pocket.',
          },
        ]);
      }
    } catch {
      setMessages([
        ...newMsgs,
        { role: 'assistant', content: currentLang === 'hi' ? 'इंटरनेट कनेक्शन में कुछ समस्या है। कृपया पुनः प्रयास करें।' : 'Connection issue. Please verify your internet or try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickChips = [
    t.copilotChip1,
    t.copilotChip2,
    t.copilotChip3,
    t.copilotChip4,
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Floating Dialogue Window */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-96 max-h-[520px] bg-white rounded-2xl border border-amber-300/80 shadow-2xl flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-lg bg-amber-500/40 border border-amber-300/30 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">{t.copilotTitle}</h3>
                <p className="text-[11px] text-amber-200">
                  {ventureContext?.ventureName ? ventureContext.ventureName : t.appName}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white text-xs transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-xs bg-slate-50/50 min-h-[220px] max-h-[300px]">
            {messages.map((msg, idx) => (
              <div
                key={'copilot-msg-' + idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-amber-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 text-xs flex items-center space-x-2">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-600" />
                  <span>Checking bank guidelines...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Chips */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {quickChips.map((chip, idx) => (
              <button
                key={'chip-' + idx}
                type="button"
                onClick={() => handleSend(chip)}
                className="text-[11px] px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors text-left font-medium"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.copilotPlaceholder}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-600"
            />
            <Button
              type="submit"
              size="sm"
              disabled={isLoading || !input.trim()}
              className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg text-xs font-semibold shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button (Attention-Catching with Pulse) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-xs shadow-xl hover:shadow-2xl transition-all cursor-pointer ring-4 ring-amber-100"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <MessageSquare className="h-4 w-4" />
        <span className="font-bold tracking-tight">{t.copilotFloatingBadge}</span>
      </button>
    </div>
  );
}
