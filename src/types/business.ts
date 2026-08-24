export interface AssessmentFormData {
  location: string;
  marginCapital: number;
  businessCategory: string;
  businessDetails?: string;
}

export interface BusinessCategory {
  id: string;
  name: string;
  description: string;
  typicalMarginRequirements: { min: number; max: number };
}

export interface GeographicLocation {
  id: string;
  village: string;
  block: string;
  district: string;
  state: string;
  tier: 'rural' | 'semi-urban' | 'urban';
}
