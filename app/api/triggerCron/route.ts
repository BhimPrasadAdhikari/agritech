// app/api/triggerCron/route.ts
import data from '@/utils/data';
import { sendCropReminder } from '@/utils/email';
import { NextResponse } from 'next/server';

export async function GET(
    req:Request
) {
  const today = new Date();
  for (const crop of data.cropsInfo) {
      // Trigger the email
      await sendCropReminder(
        'farmer@example.com',
        crop.cropName,
        '3',
        ['']
      );
    }
  return NextResponse.json({ success: true });
}
