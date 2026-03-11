import { describe, expect, it, vi } from 'vitest';

vi.mock('@/config/monitors', () => ({
  monitors: [
    {
      id: 'mock-monitor',
      name: 'Mock Monitor',
      url: 'https://example.com/health',
      method: 'GET',
      expectedStatusCodes: [200],
      timeoutMs: 1000,
    },
  ],
}));

vi.mock('@/lib/health-check', () => ({
  runHealthChecks: vi.fn(),
}));

import { GET } from '@/app/api/health/route';
import { runHealthChecks } from '@/lib/health-check';
import type { MonitorResult } from '@/types/monitor';

describe('GET /api/health', () => {
  it('returns structured health response', async () => {
    const mockedResults: MonitorResult[] = [
      {
        id: 'mock-monitor',
        name: 'Mock Monitor',
        url: 'https://example.com/health',
        method: 'GET',
        status: 'healthy',
        statusCode: 200,
        responseTimeMs: 123,
        checkedAt: '2025-01-01T00:00:00.000Z',
        error: null,
      },
    ];

    vi.mocked(runHealthChecks).mockResolvedValue(mockedResults);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.summary).toEqual({
      totalServices: 1,
      healthyServices: 1,
      degradedServices: 0,
      downServices: 0,
      averageLatencyMs: 123,
    });
    expect(body.results).toEqual(mockedResults);
  });

  it('handles failed monitor results gracefully', async () => {
    const mockedResults: MonitorResult[] = [
      {
        id: 'mock-monitor',
        name: 'Mock Monitor',
        url: 'https://example.com/health',
        method: 'GET',
        status: 'down',
        statusCode: null,
        responseTimeMs: null,
        checkedAt: '2025-01-01T00:00:00.000Z',
        error: 'Request timed out after 1000ms',
      },
    ];

    vi.mocked(runHealthChecks).mockResolvedValue(mockedResults);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.summary.downServices).toBe(1);
    expect(body.results[0].error).toBe('Request timed out after 1000ms');
  });
});
