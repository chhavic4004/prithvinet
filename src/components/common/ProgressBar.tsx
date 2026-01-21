import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar = ({ value, max = 100, variant = 'primary', showLabel = false, className }: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const variantClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-destructive',
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="progress-bar">
        <div
          className={cn("progress-fill", variantClasses[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground mt-1">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};
