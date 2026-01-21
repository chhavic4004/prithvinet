import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  MapPin, 
  AlertTriangle, 
  Database,
  Brain,
  FlaskConical,
  Recycle,
  FileText,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/common/KPICard';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PollutionMap } from '@/components/map/PollutionMap';
import { generateCityAQIData, generateAlerts } from '@/data/mockData';
import { AQIData, Alert } from '@/types';

const quickAccessCards = [
  { icon: Activity, title: 'Monitoring', description: 'Real-time environmental data', path: '/monitoring' },
  { icon: Brain, title: 'AI Intelligence', description: 'Predictive analytics', path: '/intelligence' },
  { icon: FlaskConical, title: 'Simulator', description: 'Impact modeling', path: '/simulator' },
  { icon: Recycle, title: 'Circular Economy', description: 'Material exchange hub', path: '/circular-economy' },
];

const DashboardPage = () => {
  const [aqiData, setAqiData] = useState<AQIData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [avgAqi, setAvgAqi] = useState(0);

  useEffect(() => {
    const data = generateCityAQIData();
    setAqiData(data);
    setAlerts(generateAlerts());
    setAvgAqi(Math.round(data.reduce((sum, city) => sum + city.aqi, 0) / data.length));
  }, []);

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getAqiStatus = (aqi: number): 'Good' | 'Moderate' | 'Unhealthy' => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    return 'Unhealthy';
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Environmental monitoring overview</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <KPICard
              title="Average AQI"
              value={avgAqi}
              icon={Activity}
              badge={getAqiStatus(avgAqi)}
              badgeVariant={avgAqi <= 50 ? 'success' : avgAqi <= 100 ? 'warning' : 'error'}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <KPICard
              title="Cities Monitored"
              value={aqiData.length}
              icon={MapPin}
              trend={{ value: 12, direction: 'up' }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <KPICard
              title="Active Alerts"
              value={alerts.filter(a => a.severity === 'High').length}
              icon={AlertTriangle}
              badge="Critical"
              badgeVariant="error"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <KPICard
              title="Data Points Today"
              value="48.5K"
              icon={Database}
              trend={{ value: 8, direction: 'up' }}
            />
          </motion.div>
        </div>

        {/* Map and Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2 card-elevated p-0 overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">Live Pollution Heatmap</h2>
              <p className="text-sm text-muted-foreground">Real-time AQI across Indian cities</p>
            </div>
            <PollutionMap data={aqiData} className="h-[400px]" />
          </motion.div>

          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card-elevated p-0"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Active Alerts</h2>
                <p className="text-sm text-muted-foreground">{alerts.length} alerts</p>
              </div>
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium text-sm">{alert.city}</span>
                    </div>
                    <StatusBadge status={alert.severity} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{getTimeAgo(alert.timestamp)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Access Cards */}
        <div>
          <h2 className="font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccessCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link
                  to={card.path}
                  className="card-flat flex items-start gap-4 hover:border-primary/50 hover:bg-muted/50 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{card.title}</h3>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
