import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous' | 'Low' | 'Medium' | 'High' | 'Safe' | 'Warning' | 'Danger';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getClasses = () => {
    switch (status) {
      case 'Good':
      case 'Safe':
      case 'Low':
        return 'aqi-good';
      case 'Moderate':
      case 'Medium':
        return 'aqi-moderate';
      case 'Unhealthy for Sensitive Groups':
      case 'Warning':
        return 'aqi-unhealthy-sensitive';
      case 'Unhealthy':
        return 'aqi-unhealthy';
      case 'Very Unhealthy':
      case 'High':
        return 'aqi-very-unhealthy';
      case 'Hazardous':
      case 'Danger':
        return 'aqi-hazardous';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <span className={cn("px-3 py-1 text-xs font-medium", getClasses(), className)}>
      {status}
    </span>
  );
};
