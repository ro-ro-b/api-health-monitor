import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';
import * as healthModule from '@/lib/health';

describe('HomePage', () => {
  it('renders dashboard data using shared health logic', async () => {
    const getHealthDataSpy = vi.spyOn(healthModule, 'getHealthData').mockResolvedValue({
      summary: {
        totalServices: 2,
        healthyServices: 1,
        degradedServices: 1,
        downServices: 0,
        averageLatencyMs: 210,
      },
      results: [
        {
          id: 'service-1',
          name: 'Service 1',
          url: 'https://example.com/1',
          method: 'GET',
          status: 'healthy',
          statusCode: 200,
          responseTimeMs: 120,
          checkedAt: '2024-01-01T00:00:00.000Z',
          error: null,
        },
        {
          id: 'service-2',
          name: 'Service 2',
          url: 'https://example.com/2',
          method: 'POST',
          status: 'degraded',
          statusCode: 429,
          responseTimeMs: 300,
          checkedAt: '2024-01-01T00:01:00.000Z',
          error: 'Unexpected status code: 429',
        },
      ],
    });

    const page = await HomePage();
    render(page);

    expect(getHealthDataSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', { name: 'API Health Monitor' })).toBeInTheDocument();
    expect(screen.getByText('Total Services')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
    expect(screen.getByText('Healthy')).toBeInTheDocument();
    expect(screen.getByText('Degraded')).toBeInTheDocument();
  });
});
