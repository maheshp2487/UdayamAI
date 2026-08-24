import { GoogleGenAI } from '@google/genai';

export async function generateGeminiResponse(
  topic: string, 
  context: Record<string, any>, 
  language: string, 
  apiKey: string
): Promise<string | null> {
  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      You are UdayamAI, a professional financial assistant for Indian government schemes.
      Explain the following topic simply and clearly to a beneficiary.
      
      Topic: ${topic}
      Context: ${JSON.stringify(context)}
      Target Language: ${language}
      
      Guidelines:
      - Be concise, maximum 3 sentences.
      - Use professional, trustworthy tone.
      - Do not give financial advice, only factual explanation.
      - If explaining why a scheme matched, use the provided Context.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
      }
    });

    return response.text || null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}
