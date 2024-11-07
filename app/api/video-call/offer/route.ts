// app/api/video-call/offer/route.ts
import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
  try {
    const { offer, recipientId } = await req.json();

    await pusherServer.trigger(`user-${recipientId}`, 'video-offer', offer);
    return NextResponse.json({ message: 'Offer sent' });
  } catch (error) {
    console.error('Error triggering video offer:', error);
    return NextResponse.json({ error: 'Failed to send offer' }, { status: 500 });
  }
}
