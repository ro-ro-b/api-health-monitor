import { GET } from '@/app/api/health/route';
import * as healthModule from '@/lib/health';

describe('GET /api/health', () => {
  it('returns health data successfully', async () => {
    vi.spyOn(healthModule, 'getHealthData').mockResolvedValue({
      summary: {
        totalServices: 1,
        healthyServices: 1,
        degradedServices: 0,
        downServices: 0,
        averageLatencyMs: 120,
      },
      results: [
        {
          id: 'service-1',
          name: 'Service 1',
          url: 'https://example.com',
          method: 'GET',
          status: 'healthy',
          statusCode: 200,
          responseTimeMs: 120,
          checkedAt: '2024-01-01T00:00:00.000Z',
          error: null,
        },
      ],
    });

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.summary.totalServices).toBe(1);
    expect(body.results).toHaveLength(1);
  });

  it('returns a 500 response when health retrieval fails', async () => {
    vi.spyOn(healthModule, 'getHealthData').mockRejectedValue(new Error('Boom'));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: 'Boom' });
  });
});
