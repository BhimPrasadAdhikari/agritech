// app/api/sendCropReminder/route.ts
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server';
import { sendCropReminder } from '@/utils/email';
import data from '@/utils/data'; // Import your crop data

export async function POST(req: Request) {
  const body = await req.json();
  const { farmerEmail, cropName } = body;

  const crop = data.cropsInfo.find(crop => crop.cropName === cropName);

  if (!crop) {
    return NextResponse.json({ success: false, message: 'Crop not found' }, { status: 404 });
  }

  const result = await sendCropReminder(
    farmerEmail,
    crop.cropName,
   'Every 3 days',
   ['Nitrogen', 'Phosphorus', 'Potassium'],  );

  if (result.success) {
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json({ success: false, error: result.error }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
