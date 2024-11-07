import prismadb from '@/lib/prismadb';
import { mailOffer } from '@/utils/email';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const offerDetails = body;
  console.log(offerDetails);

  const users = await prismadb.user.findMany({
    select: {
      email: true,
    },
  });

  try {
    const emailResults = await Promise.all(
      users.map(async (user) => {
        const result = await mailOffer(offerDetails, user.email as string);
        return result;
      })
    );

    const hasErrors = emailResults.some((result) => !result.success);
    if (hasErrors) {
      return NextResponse.json({ success: false, error: 'Some emails failed to send' }, { status: 500 });
    } else {
      return NextResponse.json({ success: true,message:'emails sent' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ success: false, error: 'An error occurred while sending emails' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
