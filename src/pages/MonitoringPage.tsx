import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Filter } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ProgressBar } from '@/components/common/ProgressBar';
import { generateCityAQIData, generateTrendData, generatePollutantData, indianCities } from '@/data/mockData';
import { AQIData, PollutantData } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const pollutants = ['All', 'PM2.5', 'PM10', 'NO2', 'SO2', 'O3', 'CO'];
const timeRanges = ['24 Hours', '7 Days', '30 Days', '90 Days'];

const MonitoringPage = () => {
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [selectedPollutant, setSelectedPollutant] = useState('All');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24 Hours');
  const [cityData, setCityData] = useState<AQIData | null>(null);
  const [trendData, setTrendData] = useState<{ time: string; aqi: number }[]>([]);
  const [pollutantData, setPollutantData] = useState<PollutantData[]>([]);

  useEffect(() => {
    const allData = generateCityAQIData();
    const city = allData.find(c => c.city === selectedCity);
    if (city) {
      setCityData(city);
      setTrendData(generateTrendData(city.aqi));
      setPollutantData(generatePollutantData(city));
    }
  }, [selectedCity]);

  const handleExport = () => {
    if (!cityData) return;
    
    const csvContent = [
      ['Metric', 'Value', 'Unit', 'WHO Limit', 'Status'],
      ...pollutantData.map(p => [p.name, p.value, p.unit, p.whoLimit, p.status])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCity}_air_quality_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const pollutantChartData = pollutantData.map(p => ({
    name: p.name,
    value: p.value,
    limit: p.whoLimit,
  }));

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Real-Time Monitoring</h1>
            <p className="text-muted-foreground">Environmental data tracking and analysis</p>
          </div>
          <button onClick={handleExport} className="btn-primary flex items-center gap-2 w-fit">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-flat p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {indianCities.map(city => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Pollutant</label>
              <select
                value={selectedPollutant}
                onChange={(e) => setSelectedPollutant(e.target.value)}
                className="w-full px-4 py-2 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {pollutants.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Time Range</label>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="w-full px-4 py-2 border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {timeRanges.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AQI Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-elevated"
          >
            <h2 className="font-semibold mb-4">AQI Trend - {selectedCity}</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 11 }} 
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }} 
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 0,
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="aqi" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pollutant Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-elevated"
          >
            <h2 className="font-semibold mb-4">Pollutant Levels vs WHO Limits</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pollutantChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11 }} 
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11 }} 
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 0,
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" name="Current" />
                  <Bar dataKey="limit" fill="hsl(var(--warning))" name="WHO Limit" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* WHO Compliance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated"
        >
          <h2 className="font-semibold mb-4">WHO Compliance Status - {selectedCity}</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pollutant</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Current Value</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">WHO Limit</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-[200px]">Compliance</th>
                </tr>
              </thead>
              <tbody>
                {pollutantData.map((pollutant) => (
                  <tr key={pollutant.name} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{pollutant.name}</td>
                    <td className="py-3 px-4">
                      {pollutant.value} {pollutant.unit}
                    </td>
                    <td className="py-3 px-4">
                      {pollutant.whoLimit} {pollutant.unit}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={pollutant.status} />
                    </td>
                    <td className="py-3 px-4">
                      <ProgressBar 
                        value={pollutant.value} 
                        max={pollutant.whoLimit * 2}
                        variant={pollutant.status === 'Safe' ? 'success' : pollutant.status === 'Warning' ? 'warning' : 'danger'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default MonitoringPage;
