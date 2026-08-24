import { generateGeminiResponse } from './gemini';

export interface AIContextParams {
  topic: string;
  context: Record<string, any>;
  language?: string;
}

export interface AIResponse {
  content: string;
  isFallback: boolean;
}

// Fallback Knowledge Base
const GLOSSARY: Record<string, string> = {
  'moratorium': 'A moratorium period is a time during the loan term when the borrower is not required to make any repayment. It acts as a repayment holiday.',
  'emi': 'Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.',
  'margin_money': 'Margin money or own contribution is the percentage of the project cost that the applicant must fund themselves.',
  'pmegp': 'Prime Minister Employment Generation Programme is a credit-linked subsidy scheme aimed at generating self-employment opportunities.',
};

export class AIGuidanceProvider {
  
  static async getContextualExplanation(params: AIContextParams): Promise<AIResponse> {
    const { topic, context, language = 'English' } = params;
    
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

    // 1. Try AI Provider (Gemini)
    if (apiKey && apiKey !== 'your-gemini-api-key') {
      try {
        const responseText = await generateGeminiResponse(topic, context, language, apiKey);
        if (responseText) {
          return { content: responseText, isFallback: false };
        }
      } catch (error) {
        console.error('AI Provider Error:', error);
        // Fallthrough to deterministic fallback
      }
    }

    // 2. Deterministic Fallback
    return this.getFallbackExplanation(topic, language);
  }

  private static getFallbackExplanation(topic: string, language: string): AIResponse {
    const key = topic.toLowerCase().trim();
    let explanation = GLOSSARY[key];
    
    if (!explanation) {
      // Find closest match or generic response
      const matchedKey = Object.keys(GLOSSARY).find(k => key.includes(k) || k.includes(key));
      if (matchedKey) {
        explanation = GLOSSARY[matchedKey];
      } else {
        explanation = 'This term refers to a specific condition in the financial or government scheme ecosystem. Please consult the official scheme guidelines for precise definitions.';
      }
    }

    if (language !== 'English') {
      explanation = `[Translation unavailable in fallback mode] ${explanation}`;
    }

    return { content: explanation, isFallback: true };
  }
}
