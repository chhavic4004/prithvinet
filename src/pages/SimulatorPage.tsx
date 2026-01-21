import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Play, AlertTriangle, TrendingUp, Leaf, Gauge } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/common/KPICard';
import { ProgressBar } from '@/components/common/ProgressBar';
import { SimulationParams, SimulationResult } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SimulatorPage = () => {
  const [params, setParams] = useState<SimulationParams>({
    productionChange: 0,
    renewableEnergy: 30,
    urbanExpansion: 50,
    wasteReduction: 20,
  });

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    
    // Simulate processing time
    setTimeout(() => {
      const baseAqi = 125;
      const productionImpact = params.productionChange * 0.5;
      const renewableImpact = params.renewableEnergy * -0.3;
      const urbanImpact = params.urbanExpansion * 0.4;
      const wasteImpact = params.wasteReduction * -0.2;
      
      const predictedAqi = Math.round(Math.max(20, Math.min(300, 
        baseAqi + productionImpact + renewableImpact + urbanImpact + wasteImpact
      )));
      
      const emissions = Math.round(1000 + params.productionChange * 10 - params.renewableEnergy * 5 - params.wasteReduction * 3);
      const sustainabilityScore = Math.min(100, Math.max(0, 
        50 + params.renewableEnergy * 0.5 + params.wasteReduction * 0.3 - params.urbanExpansion * 0.2 - params.productionChange * 0.1
      ));

      setResult({
        predictedAqi,
        emissions,
        sustainabilityScore: Math.round(sustainabilityScore),
        riskLevel: predictedAqi <= 100 ? 'Low' : predictedAqi <= 200 ? 'Medium' : 'High',
      });
      setIsRunning(false);
    }, 1500);
  };

  const comparisonData = result ? [
    { name: 'AQI', current: 125, predicted: result.predictedAqi },
    { name: 'Emissions (tons)', current: 1000, predicted: result.emissions },
    { name: 'Sustainability (%)', current: 50, predicted: result.sustainabilityScore },
  ] : [];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Impact Simulator</h1>
          <p className="text-muted-foreground">Model environmental scenarios and predict outcomes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Parameters Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-elevated"
          >
            <h2 className="font-semibold mb-6">Scenario Parameters</h2>
            
            <div className="space-y-6">
              {/* Production Change */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Production Change</label>
                  <span className="text-sm text-muted-foreground">{params.productionChange > 0 ? '+' : ''}{params.productionChange}%</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={params.productionChange}
                  onChange={(e) => setParams({ ...params, productionChange: Number(e.target.value) })}
                  className="w-full h-2 bg-muted appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>-50%</span>
                  <span>0%</span>
                  <span>+50%</span>
                </div>
              </div>

              {/* Renewable Energy */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Renewable Energy Adoption</label>
                  <span className="text-sm text-muted-foreground">{params.renewableEnergy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={params.renewableEnergy}
                  onChange={(e) => setParams({ ...params, renewableEnergy: Number(e.target.value) })}
                  className="w-full h-2 bg-muted appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Urban Expansion */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Urban Expansion</label>
                  <span className="text-sm text-muted-foreground">{params.urbanExpansion} sq km</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={params.urbanExpansion}
                  onChange={(e) => setParams({ ...params, urbanExpansion: Number(e.target.value) })}
                  className="w-full h-2 bg-muted appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 km</span>
                  <span>100 km</span>
                  <span>200 km</span>
                </div>
              </div>

              {/* Waste Reduction */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Waste Reduction</label>
                  <span className="text-sm text-muted-foreground">{params.wasteReduction}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={params.wasteReduction}
                  onChange={(e) => setParams({ ...params, wasteReduction: Number(e.target.value) })}
                  className="w-full h-2 bg-muted appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent animate-spin" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Simulation
                </>
              )}
            </button>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {result ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <KPICard
                    title="Predicted AQI"
                    value={result.predictedAqi}
                    icon={Gauge}
                    badge={result.riskLevel}
                    badgeVariant={result.riskLevel === 'Low' ? 'success' : result.riskLevel === 'Medium' ? 'warning' : 'error'}
                  />
                  <KPICard
                    title="Emissions (tons/yr)"
                    value={result.emissions.toLocaleString()}
                    icon={TrendingUp}
                    trend={{ value: Math.round(((result.emissions - 1000) / 1000) * 100), direction: result.emissions < 1000 ? 'down' : 'up' }}
                  />
                </div>

                <div className="card-elevated">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Sustainability Score</span>
                    <span className="text-lg font-semibold text-primary">{result.sustainabilityScore}/100</span>
                  </div>
                  <ProgressBar 
                    value={result.sustainabilityScore} 
                    variant={result.sustainabilityScore >= 70 ? 'success' : result.sustainabilityScore >= 40 ? 'warning' : 'danger'}
                  />
                </div>

                <div className="card-elevated">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`w-4 h-4 ${result.riskLevel === 'Low' ? 'text-success' : result.riskLevel === 'Medium' ? 'text-warning' : 'text-destructive'}`} />
                    <span className="font-medium">Risk Assessment: {result.riskLevel}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.riskLevel === 'Low' && 'Environmental conditions are projected to be within safe limits.'}
                    {result.riskLevel === 'Medium' && 'Some environmental parameters may exceed safe thresholds. Monitoring recommended.'}
                    {result.riskLevel === 'High' && 'Critical environmental risks detected. Immediate intervention recommended.'}
                  </p>
                </div>
              </>
            ) : (
              <div className="card-elevated h-full flex items-center justify-center text-center">
                <div>
                  <FlaskConical className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Simulation Results</h3>
                  <p className="text-sm text-muted-foreground">Adjust the parameters and run a simulation to see predicted outcomes.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Comparison Chart */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-elevated"
          >
            <h2 className="font-semibold mb-4">Current vs Predicted Comparison</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
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
                  <Legend />
                  <Bar dataKey="current" fill="hsl(var(--muted-foreground))" name="Current" />
                  <Bar dataKey="predicted" fill="hsl(var(--primary))" name="Predicted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default SimulatorPage;
