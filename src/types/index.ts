// User roles for the platform
export type UserRole = 'government' | 'industry' | 'urban-planner' | 'citizen' | 'recycler';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

// AQI and Environmental Data Types
export interface AQIData {
  city: string;
  aqi: number;
  status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  o3: number;
  co: number;
  timestamp: string;
  lat: number;
  lng: number;
}

export interface Alert {
  id: string;
  city: string;
  message: string;
  severity: 'Low' | 'Medium' | 'High';
  timestamp: string;
}

export interface PollutantData {
  name: string;
  value: number;
  unit: string;
  whoLimit: number;
  status: 'Safe' | 'Warning' | 'Danger';
}

export interface ForecastData {
  date: string;
  aqi: number;
  confidence: number;
}

export interface SimulationParams {
  productionChange: number;
  renewableEnergy: number;
  urbanExpansion: number;
  wasteReduction: number;
}

export interface SimulationResult {
  predictedAqi: number;
  emissions: number;
  sustainabilityScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

// Circular Economy Types
export interface Product {
  id: string;
  name: string;
  category: string;
  lifecycleStage: 'Raw Materials' | 'Manufacturing' | 'Distribution' | 'Use' | 'End of Life';
  carbonFootprint: number;
  progress: number;
}

export interface MaterialListing {
  id: string;
  material: string;
  quantity: number;
  unit: string;
  location: string;
  price: number;
  seller: string;
}

export interface ConsumerProduct {
  id: string;
  name: string;
  sustainabilityScore: number;
  alternatives: string[];
  repairSuggestions: string[];
}

// Report Types
export interface Report {
  id: string;
  title: string;
  type: 'Compliance' | 'Analytics' | 'Audit' | 'Summary';
  date: string;
  status: 'Generated' | 'Pending' | 'Failed';
}

// City data for dropdowns
export interface City {
  name: string;
  lat: number;
  lng: number;
  state: string;
}
