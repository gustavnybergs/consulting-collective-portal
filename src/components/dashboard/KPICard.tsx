import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  highlight?: boolean;
}

export function KPICard({ title, value, icon, children, className, highlight }: KPICardProps) {
  return (
    <div className={cn(
      'kpi-card animate-fade-in',
      highlight && 'border-l-4 border-l-accent',
      className
    )}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="kpi-value">{value}</div>
      {children && (
        <div className="mt-3 text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
