# api-health-monitor

Self-hosted API health monitoring dashboard with endpoint pinging, response time tracking, and status visualization.

## Sprint 1 Features

- Configurable list of monitored API endpoints
- Server-side health checks with latency measurement
- Status normalization for healthy, degraded, and down states
- Dashboard summary cards for service counts and average latency
- Endpoint table with status, method, URL, last checked time, latency, and error details
- Next.js API route for fetching current health data
- Vitest test suite for core monitoring logic and API behavior

## Getting Started

### Install dependencies

```bash
npm install
```

### Configure environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

### Run development server

```bash
npm run dev
```

Open http://localhost:3000.

## Available Scripts

- `npm run dev` — start the Next.js development server
- `npm run build` — create a production build
- `npm run start` — run the production server
- `npm run lint` — run linting
- `npm run test` — run tests once
- `npm run test:watch` — run tests in watch mode
- `npm run typecheck` — run TypeScript checks

## Environment Variables

- `HEALTH_CHECK_TIMEOUT_MS` — request timeout per endpoint in milliseconds
- `NEXT_PUBLIC_APP_NAME` — optional dashboard title override

## Project Structure

- `src/config/monitors.ts` — monitor definitions
- `src/lib/health-check.ts` — health-check execution logic
- `src/lib/dashboard-summary.ts` — dashboard aggregation helpers
- `src/app/api/health/route.ts` — health API endpoint
- `src/app/page.tsx` — dashboard page
- `src/components/*` — UI components
- `tests/*` — unit and integration-style tests
