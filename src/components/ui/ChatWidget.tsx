"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from './button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './card';

export function ChatWidget({ reportContext }: { reportContext: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([
    { role: 'ai', content: "Hi! I'm UdayamAI. I've read your business report. What questions do you have?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;
    
    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages as any);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, context: reportContext })
      });
      
      const data = await res.json();
      
      if (data.text) {
        setMessages([...newMessages, { role: 'ai', content: data.text }] as any);
      } else {
        setMessages([...newMessages, { role: 'ai', content: "Sorry, I ran into an error processing that." }] as any);
      }
    } catch (e) {
      setMessages([...newMessages, { role: 'ai', content: "Network error. Please try again." }] as any);
    } finally {
      setIsLoading(false);
    }
  };

  const formatText = (text: string) => {
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\n/g, '<br />');
    return { __html: html };
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button 
          onClick={() => setIsOpen(true)}
          className="print:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl bg-slate-900 hover:bg-slate-800 z-50"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="print:hidden fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-5">
          <CardHeader className="p-4 border-b bg-slate-900 text-white rounded-t-xl flex flex-row justify-between items-center">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageCircle className="h-5 w-5" /> UdayamAI Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-800 hover:text-white" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white rounded-br-none' : 'bg-white border text-slate-800 rounded-bl-none shadow-sm'}`}
                  dangerouslySetInnerHTML={m.role === 'ai' ? formatText(m.content) : undefined}
                >
                  {m.role === 'user' ? m.content : null}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border rounded-lg p-3 rounded-bl-none shadow-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                  <span className="text-xs text-slate-500">Thinking...</span>
                </div>
              </div>
            )}
            
            {/* Quick Actions */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2">
                <p className="text-xs text-slate-500 mb-2 px-1">Not sure what to ask? Choose something:</p>
                <button 
                  onClick={() => sendMessage("Summarize the report")}
                  className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-800 py-1.5 px-3 rounded-full transition-colors border border-slate-300"
                >
                  Summarize the report
                </button>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-3 border-t bg-white">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex w-full gap-2">
              <input 
                type="text" 
                placeholder="Ask about your report..." 
                className="flex-1 text-sm border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-slate-900"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-slate-900">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
