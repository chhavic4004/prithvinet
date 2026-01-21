import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertCircle, Download, Lightbulb } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/common/KPICard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { generateCityAQIData, generateForecast, generateRecommendations, indianCities } from '@/data/mockData';
import { AQIData, ForecastData } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const IntelligencePage = () => {
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [cityData, setCityData] = useState<AQIData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const allData = generateCityAQIData();
    const city = allData.find(c => c.city === selectedCity);
    if (city) {
      setCityData(city);
      setForecast(generateForecast(city.aqi));
      setRecommendations(generateRecommendations(city.aqi));
    }
  }, [selectedCity]);

  const getTrend = () => {
    if (!forecast.length) return 'Stable';
    const first = forecast[0].aqi;
    const last = forecast[forecast.length - 1].aqi;
    if (last < first - 10) return 'Improving';
    if (last > first + 10) return 'Worsening';
    return 'Stable';
  };

  const getRiskLevel = (aqi: number): 'Low' | 'Medium' | 'High' => {
    if (aqi <= 100) return 'Low';
    if (aqi <= 200) return 'Medium';
    return 'High';
  };

  const handleDownloadReport = () => {
    const reportContent = `
PRITHVI-NET AI Intelligence Report
City: ${selectedCity}
Generated: ${new Date().toLocaleString()}

--- Summary ---
Current AQI: ${cityData?.aqi || 'N/A'}
Trend: ${getTrend()}
Risk Level: ${cityData ? getRiskLevel(cityData.aqi) : 'N/A'}

--- 7-Day Forecast ---
${forecast.map(f => `${f.date}: AQI ${f.aqi} (Confidence: ${f.confidence}%)`).join('\n')}

--- AI Recommendations ---
${recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Report_${selectedCity}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Sustainability Intelligence</h1>
            <p className="text-muted-foreground">AI-powered environmental analytics and predictions</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {indianCities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
            <button onClick={handleDownloadReport} className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <KPICard
              title="Trend Analysis"
              value={getTrend()}
              icon={TrendingUp}
              badge={getTrend()}
              badgeVariant={getTrend() === 'Improving' ? 'success' : getTrend() === 'Worsening' ? 'error' : 'info'}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <KPICard
              title="Average AQI (7-day)"
              value={Math.round(forecast.reduce((sum, f) => sum + f.aqi, 0) / (forecast.length || 1))}
              icon={Brain}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <KPICard
              title="Risk Level"
              value={cityData ? getRiskLevel(cityData.aqi) : 'N/A'}
              icon={AlertCircle}
              badge={cityData ? getRiskLevel(cityData.aqi) : 'N/A'}
              badgeVariant={cityData && getRiskLevel(cityData.aqi) === 'Low' ? 'success' : cityData && getRiskLevel(cityData.aqi) === 'Medium' ? 'warning' : 'error'}
            />
          </motion.div>
        </div>

        {/* Forecast Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-elevated"
        >
          <h2 className="font-semibold mb-4">7-Day AQI Forecast - {selectedCity}</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11 }} 
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                />
                <YAxis 
                  tick={{ fontSize: 11 }} 
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  domain={[0, 'dataMax + 50']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 0,
                  }}
                  formatter={(value: number, name: string) => [value, name === 'aqi' ? 'Predicted AQI' : 'Confidence']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                />
                <defs>
                  <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fill="url(#aqiGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {forecast.map((f, i) => (
              <div key={f.date} className="flex items-center gap-2">
                <span>{new Date(f.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                <span className="font-medium text-foreground">{f.aqi}</span>
                <span className="text-xs">({f.confidence}% conf.)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">AI Recommendations</h2>
              <p className="text-sm text-muted-foreground">Actionable insights for {selectedCity}</p>
            </div>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="flex gap-4 p-4 bg-muted/50 border border-border"
              >
                <span className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default IntelligencePage;
