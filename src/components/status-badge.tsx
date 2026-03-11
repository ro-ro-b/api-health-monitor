import type { MonitorStatus } from '@/types/monitor';

interface StatusBadgeProps {
  status: MonitorStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status}`}>{status}</span>;
}
