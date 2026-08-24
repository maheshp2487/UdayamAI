import { AssessmentFormData } from "../types/business";

export const DEMO_SCENARIOS: Record<string, AssessmentFormData> = {
  dairy_micro: {
    location: "Kondagaon Block, Bastar",
    businessCategory: "Dairy & Livestock",
    marginCapital: 10000, 
    businessDetails: "Small dairy with 2 cows supplying to local milk cooperative."
  },
  retail_micro: {
    location: "Palghar District, Maharashtra",
    businessCategory: "Retail & Trading",
    marginCapital: 14000, 
    businessDetails: "General provision store in village square."
  },
  textiles_term: {
    location: "Varanasi Weavers Colony, UP",
    businessCategory: "Textiles & Handloom",
    marginCapital: 250000,
    businessDetails: "Expanding handloom unit with 4 new power looms."
  },
  high_risk: {
    location: "Urban Outskirts, Delhi",
    businessCategory: "Services",
    marginCapital: 500000,
    businessDetails: "High-end mobile repair and accessories shop in a highly saturated market."
  }
};
