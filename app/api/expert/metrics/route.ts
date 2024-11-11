export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server';
import { calculateExpertMetrics } from './components/consultationMetrics';
// import { cache } from 'some-caching-lib'; // Use appropriate caching library if needed

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startDateParam = searchParams.get('startDate');
  const endDateParam = searchParams.get('endDate');
 
  if (!startDateParam || !endDateParam) {
    return new NextResponse("startDate and endDate are required", { status: 400 });
  }
  const startDate = new Date(startDateParam);
  const endDate = new Date(endDateParam);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return new NextResponse("Invalid date format", { status: 400 });
  }

  // Check if metrics for this date range are cached
  // const cacheKey = `metrics-${startDateParam}-${endDateParam}`;
  // const cachedMetrics = await cache.get(cacheKey);
  // if (cachedMetrics) return NextResponse.json(cachedMetrics);

  try {
    const metrics = await calculateExpertMetrics(startDate, endDate);
    // await cache.set(cacheKey, metrics, { ttl: 60 * 60 }); // Cache for 1 hour
    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
