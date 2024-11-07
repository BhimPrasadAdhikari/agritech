// app/api/video-call/answer/route.ts
import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
  try {
    const { answer, recipientId } = await req.json();

    await pusherServer.trigger(`user-${recipientId}`, 'video-answer', answer);
    return NextResponse.json({ message: 'Answer sent' });
  } catch (error) {
    console.error('Error triggering video answer:', error);
    return NextResponse.json({ error: 'Failed to send answer' }, { status: 500 });
  }
}
