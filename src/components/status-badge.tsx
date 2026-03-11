import type { MonitorStatus } from '@/types/monitor';

interface StatusBadgeProps {
  status: MonitorStatus;
}

const statusLabels: Record<MonitorStatus, string> = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status}`}>{statusLabels[status]}</span>;
}
