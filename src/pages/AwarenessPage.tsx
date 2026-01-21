import { motion } from 'framer-motion';
import { MapPin, TrendingUp, TrendingDown, BookOpen, Heart, Lightbulb, Shield } from 'lucide-react';
import { cityRankings, awarenessContent, generateCityAQIData, getAQIClass } from '@/data/mockData';
import { useEffect, useState } from 'react';
import { AQIData } from '@/types';

const AwarenessPage = () => {
  const [aqiData, setAqiData] = useState<AQIData[]>([]);

  useEffect(() => {
    setAqiData(generateCityAQIData());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-semibold">Public Awareness Portal</h1>
          <p className="text-muted-foreground">Environmental information for citizens</p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* City Pollution Status */}
        <section>
          <h2 className="text-xl font-semibold mb-4">City Pollution Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {aqiData.slice(0, 10).map((city, index) => (
              <motion.div
                key={city.city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-flat text-center"
              >
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3" />
                  <span className="text-sm">{city.city}</span>
                </div>
                <div className={`inline-block px-4 py-2 ${getAQIClass(city.aqi)}`}>
                  <span className="text-xl font-semibold">{city.aqi}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{city.status}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sustainability Rankings */}
        <section>
          <h2 className="text-xl font-semibold mb-4">City Sustainability Rankings</h2>
          <div className="card-elevated overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 text-sm font-medium">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">City</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {cityRankings.slice(0, 10).map((city) => (
                  <tr key={city.city} className="border-b border-border last:border-b-0">
                    <td className="py-3 px-4 font-medium">#{city.rank}</td>
                    <td className="py-3 px-4">{city.city}</td>
                    <td className="py-3 px-4">{city.score}/100</td>
                    <td className="py-3 px-4">
                      {city.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Educational Content */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Educational Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {awarenessContent.map((content, index) => (
              <motion.div
                key={content.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated flex gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {content.type === 'educational' && <BookOpen className="w-6 h-6 text-primary" />}
                  {content.type === 'tips' && <Lightbulb className="w-6 h-6 text-primary" />}
                  {content.type === 'health' && <Heart className="w-6 h-6 text-primary" />}
                </div>
                <div>
                  <h3 className="font-medium mb-1">{content.title}</h3>
                  <p className="text-sm text-muted-foreground">{content.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AwarenessPage;
