import { EndpointTable } from '@/components/endpoint-table';
import { SummaryCards } from '@/components/summary-cards';
import type { HealthApiResponse } from '@/types/monitor';

async function getHealthData(): Promise<HealthApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endpoint = baseUrl ? `${baseUrl}/api/health` : 'http://localhost:3000/api/health';

  const response = await fetch(endpoint, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch health data: ${response.status}`);
  }

  return response.json();
}

export default async function HomePage() {
  const data = await getHealthData();
  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'API Health Monitor';

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">{appName}</h1>
        <p className="dashboard__subtitle">
          Real-time overview of monitored API endpoints, response times, and current availability.
        </p>
      </header>

      <SummaryCards summary={data.summary} />
      <EndpointTable results={data.results} />
    </main>
  );
}
