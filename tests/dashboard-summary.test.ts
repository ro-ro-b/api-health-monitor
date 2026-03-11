import { describe, expect, it } from 'vitest';

import { calculateDashboardSummary } from '@/lib/dashboard-summary';
import type { MonitorResult } from '@/types/monitor';

const results: MonitorResult[] = [
  {
    id: '1',
    name: 'Service 1',
    url: 'https://example.com/1',
    method: 'GET',
    status: 'healthy',
    statusCode: 200,
    responseTimeMs: 100,
    checkedAt: '2025-01-01T00:00:00.000Z',
    error: null,
  },
  {
    id: '2',
    name: 'Service 2',
    url: 'https://example.com/2',
    method: 'GET',
    status: 'degraded',
    statusCode: 429,
    responseTimeMs: 200,
    checkedAt: '2025-01-01T00:00:00.000Z',
    error: 'Unexpected status code: 429',
  },
  {
    id: '3',
    name: 'Service 3',
    url: 'https://example.com/3',
    method: 'GET',
    status: 'down',
    statusCode: null,
    responseTimeMs: null,
    checkedAt: '2025-01-01T00:00:00.000Z',
    error: 'Network failure',
  },
];

describe('calculateDashboardSummary', () => {
  it('aggregates counts and average latency correctly', () => {
    const summary = calculateDashboardSummary(results);

    expect(summary).toEqual({
      totalServices: 3,
      healthyServices: 1,
      degradedServices: 1,
      downServices: 1,
      averageLatencyMs: 150,
    });
  });

  it('returns zero average latency when no latency values are available', () => {
    const summary = calculateDashboardSummary([
      {
        id: '4',
        name: 'Service 4',
        url: 'https://example.com/4',
        method: 'GET',
        status: 'down',
        statusCode: null,
        responseTimeMs: null,
        checkedAt: '2025-01-01T00:00:00.000Z',
        error: 'Timeout',
      },
    ]);

    expect(summary.averageLatencyMs).toBe(0);
  });
});
