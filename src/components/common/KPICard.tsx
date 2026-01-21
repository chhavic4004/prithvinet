import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  badge?: string;
  badgeVariant?: 'success' | 'warning' | 'error' | 'info';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  className?: string;
}

export const KPICard = ({ title, value, icon: Icon, badge, badgeVariant = 'info', trend, className }: KPICardProps) => {
  const badgeClasses = {
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
  };

  return (
    <div className={cn("kpi-card animate-fade-in", className)}>
      <div className="flex items-start justify-between">
        <div className="p-2 bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {badge && (
          <span className={cn("text-xs px-2 py-1", badgeClasses[badgeVariant])}>
            {badge}
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-2xl font-semibold text-foreground">{value}</span>
          {trend && (
            <span className={cn(
              "text-xs font-medium pb-1",
              trend.direction === 'up' ? 'text-success' : 'text-destructive'
            )}>
              {trend.direction === 'up' ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
