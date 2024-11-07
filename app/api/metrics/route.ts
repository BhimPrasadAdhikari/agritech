// app/api/metrics/route.ts
import { NextResponse } from 'next/server';
import { calculateMetrics } from '@/components/calculations';
export async function GET(
  req:Request,
) {
  const { searchParams } = new URL(req.url);
  const startDate = new Date(searchParams.get('startDate') || '');
  const endDate = new Date(searchParams.get('endDate') || '');
  // if(!userId){
  //  return new NextResponse("unauthorized",{status:401})
  // }
  if(!startDate){
   return new NextResponse("startDate is required",{status:400})
  }
  if(!endDate){
   return new NextResponse("endDate must be selected",{status:400})
  }
  if ( !startDate || !endDate) {
    return NextResponse.json({ error: 'Store ID, start date, and end date are required' }, { status: 400 });
  }

  try {
    const metrics = await calculateMetrics(new Date(String(startDate)), new Date(String(endDate)));
    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
  }
}
