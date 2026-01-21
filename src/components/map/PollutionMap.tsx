import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AQIData } from '@/types';
import { getAQIColor } from '@/data/mockData';

interface PollutionMapProps {
  data: AQIData[];
  className?: string;
}

export const PollutionMap = ({ data, className }: PollutionMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on India
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [22.5937, 78.9629],
      zoom: 5,
      zoomControl: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.CircleMarker) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    // Add markers for each city
    data.forEach((city) => {
      const color = getAQIColor(city.aqi);
      
      const marker = L.circleMarker([city.lat, city.lng], {
        radius: Math.min(20, Math.max(8, city.aqi / 15)),
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.6,
      });

      marker.bindPopup(`
        <div style="font-family: 'DM Sans', sans-serif; padding: 4px;">
          <strong style="font-size: 14px;">${city.city}</strong><br/>
          <span style="font-size: 12px;">AQI: <strong style="color: ${color}">${city.aqi}</strong></span><br/>
          <span style="font-size: 11px; color: #666;">Status: ${city.status}</span><br/>
          <span style="font-size: 10px; color: #999;">Updated: ${new Date(city.timestamp).toLocaleTimeString('en-IN')}</span>
        </div>
      `);

      marker.addTo(mapInstanceRef.current!);
    });
  }, [data]);

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full min-h-[400px]" />
    </div>
  );
};
