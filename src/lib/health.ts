import { monitors } from '@/config/monitors';
import { calculateDashboardSummary } from '@/lib/dashboard-summary';
import { runHealthChecks } from '@/lib/health-check';
import type { HealthApiResponse, MonitorDefinition } from '@/types/monitor';

export async function getHealthData(
  monitorDefinitions: MonitorDefinition[] = monitors,
  fetchImpl: typeof fetch = fetch,
): Promise<HealthApiResponse> {
  const results = await runHealthChecks(monitorDefinitions, fetchImpl);
  const summary = calculateDashboardSummary(results);

  return {
    summary,
    results,
  };
}
