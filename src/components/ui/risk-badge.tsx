import { cn } from '@/lib/utils';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const riskConfig = {
  critical: {
    label: 'Critical Risk',
    className: 'bg-critical/10 text-critical border-critical/20',
  },
  high: {
    label: 'High Risk',
    className: 'bg-high/10 text-high border-high/20',
  },
  medium: {
    label: 'Medium Risk',
    className: 'bg-medium/10 text-medium border-medium/20',
  },
  low: {
    label: 'Low Risk',
    className: 'bg-low/10 text-low border-low/20',
  },
};

export const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  const config = riskConfig[level];

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-semibold border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
