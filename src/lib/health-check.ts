import type { MonitorDefinition, MonitorResult, MonitorStatus } from '@/types/monitor';

const DEFAULT_TIMEOUT_MS = Number(process.env.HEALTH_CHECK_TIMEOUT_MS ?? '5000');

function getExpectedStatusCodes(monitor: MonitorDefinition): number[] {
  return monitor.expectedStatusCodes && monitor.expectedStatusCodes.length > 0
    ? monitor.expectedStatusCodes
    : [200];
}

function normalizeStatus(statusCode: number | null, expectedStatusCodes: number[], error: string | null): MonitorStatus {
  if (error) {
    return 'down';
  }

  if (statusCode === null) {
    return 'down';
  }

  if (expectedStatusCodes.includes(statusCode)) {
    return 'healthy';
  }

  if (statusCode >= 500) {
    return 'down';
  }

  return 'degraded';
}

function normalizeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}

export async function runHealthCheck(
  monitor: MonitorDefinition,
  fetchImpl: typeof fetch = fetch,
): Promise<MonitorResult> {
  const timeoutMs = monitor.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = Date.now();
  const checkedAt = new Date().toISOString();

  try {
    const response = await fetchImpl(monitor.url, {
      method: monitor.method,
      signal: controller.signal,
      cache: 'no-store',
    });

    const responseTimeMs = Date.now() - startedAt;
    const statusCode = response.status;
    const error = response.ok || getExpectedStatusCodes(monitor).includes(statusCode)
      ? null
      : `Unexpected status code: ${statusCode}`;

    return {
      id: monitor.id,
      name: monitor.name,
      url: monitor.url,
      method: monitor.method,
      status: normalizeStatus(statusCode, getExpectedStatusCodes(monitor), error),
      statusCode,
      responseTimeMs,
      checkedAt,
      error,
    };
  } catch (error) {
    const responseTimeMs = Date.now() - startedAt;
    const message = controller.signal.aborted ? `Request timed out after ${timeoutMs}ms` : normalizeError(error);

    return {
      id: monitor.id,
      name: monitor.name,
      url: monitor.url,
      method: monitor.method,
      status: 'down',
      statusCode: null,
      responseTimeMs,
      checkedAt,
      error: message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function runHealthChecks(
  monitorDefinitions: MonitorDefinition[],
  fetchImpl: typeof fetch = fetch,
): Promise<MonitorResult[]> {
  return Promise.all(monitorDefinitions.map((monitor) => runHealthCheck(monitor, fetchImpl)));
}
