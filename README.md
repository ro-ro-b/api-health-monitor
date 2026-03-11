# API Health Monitor

A self-hosted Next.js dashboard for monitoring API endpoints and visualizing service health, response times, and recent check results.

## Features

- Monitor multiple HTTP endpoints
- Server-rendered dashboard with summary cards and endpoint table
- Health API endpoint at `/api/health`
- Shared server-side health data utility used by both the dashboard and API route
- Status classification for healthy, degraded, and down services
- Vitest test suite for route and dashboard coverage

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and adjust values as needed:

```bash
cp .env.example .env.local
```

Available variables:

- `NEXT_PUBLIC_APP_NAME`: Dashboard title shown in the UI
- `HEALTH_CHECK_TIMEOUT_MS`: Timeout in milliseconds for endpoint checks
- `NEXT_PUBLIC_BASE_URL`: Optional public base URL for external consumers

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Dashboard Data Flow

Sprint 2 fixes the dashboard self-fetch bug by removing the internal HTTP request from the homepage. The dashboard now calls shared server-side health logic directly, which works reliably in local development, preview deployments, and production.

- `src/lib/health.ts` provides shared health data assembly
- `src/app/api/health/route.ts` returns the JSON API response
- `src/app/page.tsx` renders the dashboard using the same shared logic without self-fetching

## Testing

Run the test suite:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

Coverage:

```bash
npm run test:coverage
```

## Project Structure

- `src/app/page.tsx`: Dashboard page
- `src/app/api/health/route.ts`: Health API route
- `src/lib/health.ts`: Shared health data utility
- `src/lib/health-check.ts`: Endpoint check execution logic
- `src/config/monitors.ts`: Monitored endpoint definitions

## Notes

- If no endpoints are configured, the dashboard shows an empty state.
- Unexpected non-2xx responses are normalized into degraded or down states depending on status code.
- Timeout failures are reported as down.
