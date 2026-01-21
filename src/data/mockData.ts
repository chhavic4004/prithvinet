import { AQIData, Alert, City, ForecastData, Product, MaterialListing, ConsumerProduct, Report, PollutantData } from '@/types';

// Indian Cities Data
export const indianCities: City[] = [
  { name: 'Delhi', lat: 28.6139, lng: 77.2090, state: 'Delhi' },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, state: 'Maharashtra' },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946, state: 'Karnataka' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, state: 'West Bengal' },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, state: 'Telangana' },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, state: 'Maharashtra' },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, state: 'Gujarat' },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873, state: 'Rajasthan' },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh' },
  { name: 'Kanpur', lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh' },
  { name: 'Nagpur', lat: 21.1458, lng: 79.0882, state: 'Maharashtra' },
  { name: 'Indore', lat: 22.7196, lng: 75.8577, state: 'Madhya Pradesh' },
  { name: 'Bhopal', lat: 23.2599, lng: 77.4126, state: 'Madhya Pradesh' },
  { name: 'Patna', lat: 25.5941, lng: 85.1376, state: 'Bihar' },
];

// Helper to get AQI status
export const getAQIStatus = (aqi: number): AQIData['status'] => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return 'hsl(145, 60%, 45%)';
  if (aqi <= 100) return 'hsl(45, 90%, 50%)';
  if (aqi <= 150) return 'hsl(30, 90%, 50%)';
  if (aqi <= 200) return 'hsl(15, 85%, 50%)';
  if (aqi <= 300) return 'hsl(340, 70%, 45%)';
  return 'hsl(0, 60%, 40%)';
};

export const getAQIClass = (aqi: number): string => {
  if (aqi <= 50) return 'aqi-good';
  if (aqi <= 100) return 'aqi-moderate';
  if (aqi <= 150) return 'aqi-unhealthy-sensitive';
  if (aqi <= 200) return 'aqi-unhealthy';
  if (aqi <= 300) return 'aqi-very-unhealthy';
  return 'aqi-hazardous';
};

// Generate realistic AQI data for cities
export const generateCityAQIData = (): AQIData[] => {
  const baseData: Record<string, { baseAqi: number; variation: number }> = {
    'Delhi': { baseAqi: 185, variation: 40 },
    'Mumbai': { baseAqi: 95, variation: 25 },
    'Bangalore': { baseAqi: 72, variation: 20 },
    'Chennai': { baseAqi: 68, variation: 18 },
    'Kolkata': { baseAqi: 125, variation: 30 },
    'Hyderabad': { baseAqi: 85, variation: 22 },
    'Pune': { baseAqi: 78, variation: 20 },
    'Ahmedabad': { baseAqi: 110, variation: 28 },
    'Jaipur': { baseAqi: 130, variation: 32 },
    'Lucknow': { baseAqi: 165, variation: 35 },
    'Kanpur': { baseAqi: 175, variation: 38 },
    'Nagpur': { baseAqi: 88, variation: 22 },
    'Indore': { baseAqi: 92, variation: 24 },
    'Bhopal': { baseAqi: 98, variation: 25 },
    'Patna': { baseAqi: 155, variation: 35 },
  };

  return indianCities.map(city => {
    const { baseAqi, variation } = baseData[city.name] || { baseAqi: 80, variation: 20 };
    const aqi = Math.round(baseAqi + (Math.random() - 0.5) * variation);
    
    return {
      city: city.name,
      aqi,
      status: getAQIStatus(aqi),
      pm25: Math.round(aqi * 0.6 + Math.random() * 20),
      pm10: Math.round(aqi * 0.9 + Math.random() * 30),
      no2: Math.round(25 + Math.random() * 45),
      so2: Math.round(12 + Math.random() * 28),
      o3: Math.round(35 + Math.random() * 55),
      co: Math.round(0.8 + Math.random() * 1.5),
      timestamp: new Date().toISOString(),
      lat: city.lat,
      lng: city.lng,
    };
  });
};

// Active Alerts
export const generateAlerts = (): Alert[] => [
  {
    id: '1',
    city: 'Delhi',
    message: 'AQI exceeds 180. Avoid outdoor activities.',
    severity: 'High',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: '2',
    city: 'Lucknow',
    message: 'PM2.5 levels rising. Health advisory issued.',
    severity: 'High',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: '3',
    city: 'Kanpur',
    message: 'Industrial emissions detected above threshold.',
    severity: 'Medium',
    timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
  },
  {
    id: '4',
    city: 'Kolkata',
    message: 'Moderate air quality. Sensitive groups advised caution.',
    severity: 'Medium',
    timestamp: new Date(Date.now() - 120 * 60000).toISOString(),
  },
  {
    id: '5',
    city: 'Ahmedabad',
    message: 'Dust storm warning. AQI may increase.',
    severity: 'Low',
    timestamp: new Date(Date.now() - 180 * 60000).toISOString(),
  },
];

// Pollutant WHO Limits
export const pollutantLimits: Record<string, number> = {
  'PM2.5': 15,
  'PM10': 45,
  'NO2': 25,
  'SO2': 40,
  'O3': 100,
  'CO': 4,
};

export const generatePollutantData = (cityData: AQIData): PollutantData[] => [
  {
    name: 'PM2.5',
    value: cityData.pm25,
    unit: 'ug/m3',
    whoLimit: pollutantLimits['PM2.5'],
    status: cityData.pm25 <= pollutantLimits['PM2.5'] ? 'Safe' : cityData.pm25 <= pollutantLimits['PM2.5'] * 2 ? 'Warning' : 'Danger',
  },
  {
    name: 'PM10',
    value: cityData.pm10,
    unit: 'ug/m3',
    whoLimit: pollutantLimits['PM10'],
    status: cityData.pm10 <= pollutantLimits['PM10'] ? 'Safe' : cityData.pm10 <= pollutantLimits['PM10'] * 2 ? 'Warning' : 'Danger',
  },
  {
    name: 'NO2',
    value: cityData.no2,
    unit: 'ug/m3',
    whoLimit: pollutantLimits['NO2'],
    status: cityData.no2 <= pollutantLimits['NO2'] ? 'Safe' : cityData.no2 <= pollutantLimits['NO2'] * 2 ? 'Warning' : 'Danger',
  },
  {
    name: 'SO2',
    value: cityData.so2,
    unit: 'ug/m3',
    whoLimit: pollutantLimits['SO2'],
    status: cityData.so2 <= pollutantLimits['SO2'] ? 'Safe' : cityData.so2 <= pollutantLimits['SO2'] * 2 ? 'Warning' : 'Danger',
  },
  {
    name: 'O3',
    value: cityData.o3,
    unit: 'ug/m3',
    whoLimit: pollutantLimits['O3'],
    status: cityData.o3 <= pollutantLimits['O3'] ? 'Safe' : cityData.o3 <= pollutantLimits['O3'] * 2 ? 'Warning' : 'Danger',
  },
  {
    name: 'CO',
    value: cityData.co,
    unit: 'mg/m3',
    whoLimit: pollutantLimits['CO'],
    status: cityData.co <= pollutantLimits['CO'] ? 'Safe' : cityData.co <= pollutantLimits['CO'] * 2 ? 'Warning' : 'Danger',
  },
];

// 7-day AQI Forecast
export const generateForecast = (baseAqi: number): ForecastData[] => {
  const forecast: ForecastData[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      aqi: Math.round(baseAqi + (Math.random() - 0.5) * 30 + (i * (Math.random() > 0.5 ? 3 : -3))),
      confidence: Math.round(95 - i * 5 + Math.random() * 5),
    });
  }
  
  return forecast;
};

// AI Recommendations
export const generateRecommendations = (aqi: number): string[] => {
  const baseRecommendations = [
    'Deploy additional air quality monitoring stations in high-traffic zones.',
    'Implement traffic management during peak pollution hours.',
    'Increase green cover in identified pollution hotspots.',
    'Enforce stricter emission norms for industrial units.',
    'Launch public awareness campaigns on air quality.',
  ];

  if (aqi > 150) {
    return [
      'URGENT: Issue immediate health advisory for sensitive groups.',
      'Activate emergency response protocols in affected zones.',
      ...baseRecommendations,
      'Consider temporary shutdown of non-essential industrial activities.',
      'Deploy mobile air purification units in critical areas.',
    ];
  }

  if (aqi > 100) {
    return [
      'Issue precautionary health advisory for outdoor activities.',
      ...baseRecommendations,
      'Increase frequency of road cleaning and dust suppression.',
    ];
  }

  return baseRecommendations;
};

// AQI Trend Data (last 24 hours)
export const generateTrendData = (baseAqi: number): { time: string; aqi: number }[] => {
  const data: { time: string; aqi: number }[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now);
    time.setHours(time.getHours() - i);
    
    data.push({
      time: time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      aqi: Math.round(baseAqi + Math.sin(i * 0.5) * 20 + (Math.random() - 0.5) * 15),
    });
  }
  
  return data;
};

// Circular Economy Data
export const mockProducts: Product[] = [
  { id: '1', name: 'Electronic Components', category: 'Electronics', lifecycleStage: 'Manufacturing', carbonFootprint: 125, progress: 35 },
  { id: '2', name: 'Plastic Containers', category: 'Packaging', lifecycleStage: 'Distribution', carbonFootprint: 45, progress: 60 },
  { id: '3', name: 'Textile Materials', category: 'Fashion', lifecycleStage: 'Use', carbonFootprint: 78, progress: 75 },
  { id: '4', name: 'Metal Alloys', category: 'Industrial', lifecycleStage: 'Raw Materials', carbonFootprint: 210, progress: 15 },
  { id: '5', name: 'Glass Products', category: 'Consumer Goods', lifecycleStage: 'End of Life', carbonFootprint: 38, progress: 95 },
];

export const mockMaterialListings: MaterialListing[] = [
  { id: '1', material: 'Recycled Aluminum', quantity: 500, unit: 'kg', location: 'Mumbai', price: 85000, seller: 'MetalCycle Industries' },
  { id: '2', material: 'PET Plastic Flakes', quantity: 1200, unit: 'kg', location: 'Delhi', price: 42000, seller: 'GreenPoly Solutions' },
  { id: '3', material: 'Copper Wire Scrap', quantity: 300, unit: 'kg', location: 'Pune', price: 195000, seller: 'E-Waste Handlers' },
  { id: '4', material: 'Cotton Textile Waste', quantity: 800, unit: 'kg', location: 'Ahmedabad', price: 24000, seller: 'Fabric Recyclers Co.' },
  { id: '5', material: 'Glass Cullet', quantity: 2000, unit: 'kg', location: 'Chennai', price: 18000, seller: 'Crystal Clear Recycling' },
];

export const mockConsumerProducts: ConsumerProduct[] = [
  { id: '1', name: 'Smartphone XR Pro', sustainabilityScore: 72, alternatives: ['EcoPhone Z1', 'GreenTech Mobile'], repairSuggestions: ['Battery replacement', 'Screen repair available'] },
  { id: '2', name: 'Cotton T-Shirt', sustainabilityScore: 85, alternatives: ['Organic Cotton Tee', 'Bamboo Fabric Shirt'], repairSuggestions: ['Local tailor alterations', 'Patch repair kits'] },
  { id: '3', name: 'Plastic Water Bottle', sustainabilityScore: 35, alternatives: ['Steel Flask', 'Glass Bottle', 'Bamboo Bottle'], repairSuggestions: ['Consider switching to reusable'] },
  { id: '4', name: 'LED Television', sustainabilityScore: 68, alternatives: ['Solar-powered Display', 'Refurbished Models'], repairSuggestions: ['Panel repair services', 'Component replacement'] },
];

// Reports Data
export const mockReports: Report[] = [
  { id: '1', title: 'Monthly Air Quality Compliance Report', type: 'Compliance', date: '2026-01-20', status: 'Generated' },
  { id: '2', title: 'Industrial Emissions Analytics Q4', type: 'Analytics', date: '2026-01-18', status: 'Generated' },
  { id: '3', title: 'Environmental Audit - Northern Region', type: 'Audit', date: '2026-01-15', status: 'Generated' },
  { id: '4', title: 'Weekly Pollution Summary', type: 'Summary', date: '2026-01-14', status: 'Generated' },
  { id: '5', title: 'Sustainability Performance Report', type: 'Analytics', date: '2026-01-10', status: 'Generated' },
  { id: '6', title: 'February Compliance Assessment', type: 'Compliance', date: '2026-02-01', status: 'Pending' },
];

// Public Awareness Data
export const cityRankings = indianCities.map((city, index) => ({
  rank: index + 1,
  city: city.name,
  score: Math.round(85 - index * 3 + Math.random() * 10),
  trend: Math.random() > 0.5 ? 'up' : 'down',
})).sort((a, b) => b.score - a.score).map((item, index) => ({ ...item, rank: index + 1 }));

export const awarenessContent = [
  {
    title: 'Understanding AQI',
    description: 'Learn what Air Quality Index means and how it affects your health.',
    type: 'educational',
  },
  {
    title: 'Reducing Your Carbon Footprint',
    description: 'Simple steps to minimize your environmental impact daily.',
    type: 'tips',
  },
  {
    title: 'Circular Economy Benefits',
    description: 'How recycling and reusing materials helps the environment.',
    type: 'educational',
  },
  {
    title: 'Health Precautions During Poor AQI',
    description: 'Protective measures when air quality deteriorates.',
    type: 'health',
  },
];
