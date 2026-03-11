import { describe, expect, it, vi } from 'vitest';

import { runHealthCheck } from '@/lib/health-check';
import type { MonitorDefinition } from '@/types/monitor';

const monitor: MonitorDefinition = {
  id: 'test-monitor',
  name: 'Test Monitor',
  url: 'https://example.com/health',
  method: 'GET',
  expectedStatusCodes: [200],
  timeoutMs: 50,
};

describe('runHealthCheck', () => {
  it('returns healthy for expected successful responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });

    const result = await runHealthCheck(monitor, fetchMock as unknown as typeof fetch);

    expect(result.status).toBe('healthy');
    expect(result.statusCode).toBe(200);
    expect(result.error).toBeNull();
    expect(result.responseTimeMs).not.toBeNull();
  });

  it('returns degraded for unexpected non-5xx status codes', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await runHealthCheck(monitor, fetchMock as unknown as typeof fetch);

    expect(result.status).toBe('degraded');
    expect(result.statusCode).toBe(404);
    expect(result.error).toBe('Unexpected status code: 404');
  });

  it('returns down for 5xx responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
    });

    const result = await runHealthCheck(monitor, fetchMock as unknown as typeof fetch);

    expect(result.status).toBe('down');
    expect(result.statusCode).toBe(503);
    expect(result.error).toBe('Unexpected status code: 503');
  });

  it('returns down with normalized error output on fetch failure', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network failure'));

    const result = await runHealthCheck(monitor, fetchMock as unknown as typeof fetch);

    expect(result.status).toBe('down');
    expect(result.statusCode).toBeNull();
    expect(result.error).toBe('Network failure');
  });

  it('returns timeout error when request is aborted', async () => {
    const fetchMock = vi.fn().mockImplementation(async (_input: RequestInfo | URL, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new Error('Aborted'));
        });
      });
    });

    const result = await runHealthCheck(monitor, fetchMock as unknown as typeof fetch);

    expect(result.status).toBe('down');
    expect(result.statusCode).toBeNull();
    expect(result.error).toBe('Request timed out after 50ms');
  });
});
