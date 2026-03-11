export type MonitorStatus = 'healthy' | 'degraded' | 'down';

export interface MonitorDefinition {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
  expectedStatusCodes?: number[];
  timeoutMs?: number;
}

export interface MonitorResult {
  id: string;
  name: string;
  url: string;
  method: MonitorDefinition['method'];
  status: MonitorStatus;
  statusCode: number | null;
  responseTimeMs: number | null;
  checkedAt: string;
  error: string | null;
}

export interface DashboardSummary {
  totalServices: number;
  healthyServices: number;
  degradedServices: number;
  downServices: number;
  averageLatencyMs: number;
}

export interface HealthApiResponse {
  summary: DashboardSummary;
  results: MonitorResult[];
}
