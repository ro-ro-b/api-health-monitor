import { StatusBadge } from '@/components/status-badge';
import type { MonitorResult } from '@/types/monitor';

interface EndpointTableProps {
  results: MonitorResult[];
}

function formatLatency(value: number | null): string {
  return value === null ? '—' : `${value} ms`;
}

function formatCheckedAt(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function EndpointTable({ results }: EndpointTableProps) {
  if (results.length === 0) {
    return <div className="card empty-state">No monitored endpoints configured.</div>;
  }

  return (
    <section className="card table-card" aria-label="Endpoint health table">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Status</th>
              <th>Status Code</th>
              <th>Latency</th>
              <th>Last Checked</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>
                  <div className="endpoint-meta">
                    <span className="endpoint-meta__name">{result.name}</span>
                    <span className="endpoint-meta__url">{result.url}</span>
                  </div>
                </td>
                <td>{result.method}</td>
                <td>
                  <StatusBadge status={result.status} />
                </td>
                <td>{result.statusCode ?? '—'}</td>
                <td>{formatLatency(result.responseTimeMs)}</td>
                <td>{formatCheckedAt(result.checkedAt)}</td>
                <td className={result.error ? 'error-text' : 'muted'}>{result.error ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
