import type { MonitorDefinition } from '@/types/monitor';

const defaultTimeoutMs = Number(process.env.HEALTH_CHECK_TIMEOUT_MS ?? '5000');

export const monitors: MonitorDefinition[] = [
  {
    id: 'jsonplaceholder-posts',
    name: 'JSONPlaceholder Posts',
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    expectedStatusCodes: [200],
    timeoutMs: defaultTimeoutMs,
  },
  {
    id: 'jsonplaceholder-users',
    name: 'JSONPlaceholder Users',
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'GET',
    expectedStatusCodes: [200],
    timeoutMs: defaultTimeoutMs,
  },
  {
    id: 'httpbin-status-200',
    name: 'HTTPBin Status 200',
    url: 'https://httpbin.org/status/200',
    method: 'GET',
    expectedStatusCodes: [200],
    timeoutMs: defaultTimeoutMs,
  },
];
