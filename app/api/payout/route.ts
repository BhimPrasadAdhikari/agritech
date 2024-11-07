// app/api/payout/route.ts
import { payoutToExpert } from '@/lib/payment';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { consultationId } = await request.json();
    
    const consultation = await prismadb.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation) {
      return NextResponse.json({ success: false, error: 'Consultation not found' }, { status: 404 });
    }
    // Perform payout to the expert (via payment gateway or manual process)
    const payoutResult = await payoutToExpert(consultation.expertId, consultation.amount);

    if (payoutResult.success) {
      return NextResponse.json({ success: true, message: 'Payout successful' });
    } else {
      return NextResponse.json({ success: false, error: 'Payout failed' });
    }
  } catch (error) {
    console.error('Error processing payout:', error);
    return NextResponse.json({ success: false, error: 'Failed to process payout.' }, { status: 500 });
  }
}
