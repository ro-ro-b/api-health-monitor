import { NextResponse } from 'next/server';

import { getHealthData } from '@/lib/health';
import type { HealthApiResponse } from '@/types/monitor';

export async function GET(): Promise<NextResponse<HealthApiResponse | { error: string }>> {
  try {
    const data = await getHealthData();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to retrieve health data';

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}
