import { NextResponse } from 'next/server';

import { monitors } from '@/config/monitors';
import { calculateDashboardSummary } from '@/lib/dashboard-summary';
import { runHealthChecks } from '@/lib/health-check';
import type { HealthApiResponse } from '@/types/monitor';

export async function GET(): Promise<NextResponse<HealthApiResponse>> {
  const results = await runHealthChecks(monitors);
  const summary = calculateDashboardSummary(results);

  return NextResponse.json({
    summary,
    results,
  });
}
