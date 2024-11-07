// app/api/video-call/ice-candidate/route.ts
import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
  try {
    const { candidate, recipientId } = await req.json();

    await pusherServer.trigger(`user-${recipientId}`, 'new-ice-candidate', candidate);
    return NextResponse.json({ message: 'ICE candidate sent' });
  } catch (error) {
    console.error('Error sending ICE candidate:', error);
    return NextResponse.json({ error: 'Failed to send ICE candidate' }, { status: 500 });
  }
}
