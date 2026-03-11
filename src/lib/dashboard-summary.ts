import type { DashboardSummary, MonitorResult } from '@/types/monitor';

export function calculateDashboardSummary(results: MonitorResult[]): DashboardSummary {
  const totalServices = results.length;
  const healthyServices = results.filter((result) => result.status === 'healthy').length;
  const degradedServices = results.filter((result) => result.status === 'degraded').length;
  const downServices = results.filter((result) => result.status === 'down').length;

  const latencyValues = results
    .map((result) => result.responseTimeMs)
    .filter((value): value is number => typeof value === 'number');

  const averageLatencyMs = latencyValues.length > 0
    ? Math.round(latencyValues.reduce((sum, value) => sum + value, 0) / latencyValues.length)
    : 0;

  return {
    totalServices,
    healthyServices,
    degradedServices,
    downServices,
    averageLatencyMs,
  };
}
