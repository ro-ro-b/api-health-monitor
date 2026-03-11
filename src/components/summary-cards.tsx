import type { DashboardSummary } from '@/types/monitor';

interface SummaryCardsProps {
  summary: DashboardSummary;
}

const cards = [
  { key: 'totalServices', label: 'Total Services' },
  { key: 'healthyServices', label: 'Healthy' },
  { key: 'degradedServices', label: 'Degraded' },
  { key: 'downServices', label: 'Down' },
  { key: 'averageLatencyMs', label: 'Avg Latency (ms)' },
] as const;

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <section className="summary-grid" aria-label="Dashboard summary">
      {cards.map((card) => (
        <article className="card" key={card.key}>
          <p className="card__label">{card.label}</p>
          <p className="card__value">{summary[card.key]}</p>
        </article>
      ))}
    </section>
  );
}
