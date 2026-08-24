import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();
    
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing Gemini API Key in environment variables.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
You are UdayamAI, a helpful, knowledgeable, and multilingual business advisory assistant. 
You are currently helping an entrepreneur review their Business Feasibility Report.

--- REPORT CONTEXT ---
${JSON.stringify(context, null, 2)}
----------------------

Instructions:
1. Answer the user's latest question based on the Conversation History below.
2. If their question is about their business, loan, EMI, or market, heavily prioritize using the exact numbers and facts from the Report Context above to give them personalized answers.
3. If they ask a general question outside the scope of the report (e.g. general business advice, accounting, world facts), you may answer it normally as a helpful assistant. Do not strictly restrict yourself.
4. Be concise, friendly, and easy to understand (max 2-3 short paragraphs).
5. ALWAYS respond in the language the user is speaking in!

--- CONVERSATION HISTORY ---
${messages.map((m: { role: string, content: string }) => `${m.role === 'user' ? 'User' : 'UdayamAI'}: ${m.content}`).join('\n')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate response' }, { status: 500 });
  }
}
