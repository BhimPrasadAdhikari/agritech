// app/api/triggerCron/route.ts
import data from '@/utils/data';
import { sendCropReminder } from '@/utils/email';
import { NextResponse } from 'next/server';

export async function GET() {
  const today = new Date();
  for (const crop of data.cropsInfo) {
    if (today >= crop.nextWateringDate) {
      // Trigger the email
      await sendCropReminder(
        'farmer@example.com',
        crop.cropName,
        crop.wateringSchedule,
        crop.fertilizerSuggestions
      );
    }
  }
  return NextResponse.json({ success: true });
}
