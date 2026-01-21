import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Activity, 
  Brain, 
  Recycle, 
  Shield, 
  BarChart3,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { generateCityAQIData, getAQIClass } from '@/data/mockData';
import { useEffect, useState } from 'react';
import { AQIData } from '@/types';

const features = [
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Track air quality, pollutants, and environmental metrics across Indian cities in real-time.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Intelligence',
    description: 'Advanced predictive analytics and recommendations for environmental decision-making.',
  },
  {
    icon: Recycle,
    title: 'Circular Economy Hub',
    description: 'Enable sustainable material exchange and product lifecycle management.',
  },
  {
    icon: Shield,
    title: 'Compliance & Reports',
    description: 'Automated compliance monitoring and comprehensive reporting tools.',
  },
  {
    icon: BarChart3,
    title: 'Impact Simulator',
    description: 'Model environmental scenarios and predict outcomes of policy decisions.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [aqiData, setAqiData] = useState<AQIData[]>([]);

  useEffect(() => {
    setAqiData(generateCityAQIData().slice(0, 5));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">PRITHVI-NET</h1>
              <p className="text-xs text-muted-foreground">Environmental Intelligence Platform</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary flex items-center gap-2"
          >
            Login
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-6">
              Protecting Earth through<br />
              <span className="text-primary">Data & Intelligence</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              A comprehensive environmental monitoring, sustainability intelligence, and circular economy platform 
              designed for government authorities, industries, and citizens of India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/awareness" className="btn-outline flex items-center justify-center gap-2">
                Public Awareness Portal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live AQI Indicators */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-semibold text-center mb-8">Live Air Quality Indicators</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {aqiData.map((city, index) => (
              <motion.div
                key={city.city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-flat text-center"
              >
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" />
                  <span className="text-sm">{city.city}</span>
                </div>
                <div className={`inline-block px-4 py-2 ${getAQIClass(city.aqi)}`}>
                  <span className="text-2xl font-semibold">{city.aqi}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{city.status}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-semibold text-center mb-12">Platform Capabilities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-elevated"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15+', label: 'Cities Monitored' },
              { value: '50K+', label: 'Data Points Daily' },
              { value: '24/7', label: 'Real-Time Updates' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            PRITHVI-NET - Environmental Intelligence & Circular Economy Platform
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Government of India Initiative for Sustainable Development
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
