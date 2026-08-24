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
You are UdayamAI, a specialized business advisory assistant. 
You are currently helping an entrepreneur review their Business Feasibility Report.

--- REPORT CONTEXT ---
${JSON.stringify(context, null, 2)}
----------------------

STRICT INSTRUCTIONS:
1. Answer the user's latest question based ONLY on the Conversation History and Report Context above.
2. Prioritize using exact numbers (like EMI, margin, loan amount) and facts from the Report Context.
3. If the user asks a question that is NOT related to business, finance, their report, or entrepreneurship (e.g., "what is the color of an apple", spam, games, general knowledge), YOU MUST REFUSE TO ANSWER. Reply politely with: "I am a specialized business advisor. I can only assist you with questions related to your business plan, financial details, or market feasibility."
4. Do not hallucinate. If the answer is not in the report, advise them generally about business but clarify that the report doesn't contain that specific data.
5. Keep your responses short and fast (max 2 short paragraphs).
6. Do NOT use LaTeX or complex math formatting (like $$). Use plain text for formulas (e.g. ROI = Profit / Investment).
7. ALWAYS respond in the language the user is speaking in!

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
