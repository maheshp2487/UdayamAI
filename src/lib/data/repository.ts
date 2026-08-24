import { Scheme, SchemeRule, ChannelPartner, DocumentRequirement } from '@/lib/types/schema';
import { schemes, schemeRules, channelPartners, documentRequirements } from '@/data/seed';

// This is the fallback repository architecture for UdayamAI
// It mimics an async database client but uses static seed data if Supabase is unavailable.

export const Repository = {
  getSchemes: async (): Promise<Scheme[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return schemes;
  },

  getSchemeById: async (id: string): Promise<Scheme | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return schemes.find(s => s.id === id);
  },

  getSchemeRules: async (schemeId: string): Promise<SchemeRule | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return schemeRules.find(r => r.scheme_id === schemeId);
  },

  getChannelPartners: async (): Promise<ChannelPartner[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return channelPartners;
  },

  getDocumentRequirements: async (schemeId: string): Promise<DocumentRequirement[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return documentRequirements.filter(d => d.scheme_id === schemeId);
  }
};
