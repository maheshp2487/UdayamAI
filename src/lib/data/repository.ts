import { BusinessCategory } from '@/types/business';
import { BUSINESS_CATEGORIES } from '@/data/business-categories';
import { DEMO_SCENARIOS } from '@/data/demo-scenarios';
import { AssessmentFormData } from '@/types/business';

// This is the fallback repository architecture for UdayamAI (PS 26091)
// It mimics an async database client but uses static seed data if a live DB is unavailable.

export const Repository = {
  getBusinessCategories: async (): Promise<BusinessCategory[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return BUSINESS_CATEGORIES;
  },

  getBusinessCategoryById: async (id: string): Promise<BusinessCategory | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return BUSINESS_CATEGORIES.find(c => c.id === id);
  },

  getDemoScenario: async (scenarioKey: string): Promise<AssessmentFormData | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return DEMO_SCENARIOS[scenarioKey];
  }
};
