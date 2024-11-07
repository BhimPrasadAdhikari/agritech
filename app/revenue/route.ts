// app/api/revenue/route.ts
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const subscriptionRevenue = await prismadb.subscription.aggregate({
      _sum: { paymentAmount: true }, // Assume there's a paymentAmount field
    });

    const consultationCommission = await prismadb.consultation.aggregate({
      _sum: { commission: true },
    });

    const totalRevenue =
    (subscriptionRevenue._sum.paymentAmount || 0) + 
    (consultationCommission._sum.commission || 0);

    return NextResponse.json({ success: true, totalRevenue });
  } catch (error) {
    console.error('Error calculating revenue:', error);
    return NextResponse.json({ success: false, error: 'Failed to calculate revenue.' }, { status: 500 });
  }
}
