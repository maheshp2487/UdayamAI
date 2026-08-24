import { BusinessCategory } from "../types/business";

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: "dairy",
    name: "Dairy & Livestock",
    description: "Milk production, processing, and livestock rearing.",
    typicalMarginRequirements: { min: 10000, max: 200000 }
  },
  {
    id: "retail",
    name: "Retail & Trading",
    description: "Kirana stores, garments, hardware, and general merchants.",
    typicalMarginRequirements: { min: 5000, max: 150000 }
  },
  {
    id: "textiles",
    name: "Textiles & Handloom",
    description: "Weaving, tailoring, boutique, and handloom production.",
    typicalMarginRequirements: { min: 15000, max: 300000 }
  },
  {
    id: "agriculture",
    name: "Agriculture & Allied",
    description: "Farming, organic inputs, seeds, and fertilizers.",
    typicalMarginRequirements: { min: 10000, max: 500000 }
  },
  {
    id: "food_processing",
    name: "Food Processing",
    description: "Pickle making, papad, milling, and packaging.",
    typicalMarginRequirements: { min: 20000, max: 400000 }
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Small scale fabrication, carpentry, and assembly.",
    typicalMarginRequirements: { min: 50000, max: 1000000 }
  },
  {
    id: "services",
    name: "Services",
    description: "Salon, mobile repair, auto garage, and IT services.",
    typicalMarginRequirements: { min: 10000, max: 100000 }
  }
];
