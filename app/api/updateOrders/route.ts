export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb'; // Adjust the import based on your Prisma setup
import { subHours } from 'date-fns';

export async function POST(
    req:Request,
) {
  try {
    const oneHourAgo = subHours(new Date(), 1);

    const updatedOrders = await prismadb.order.updateMany({
      where: {
        isPaid: false,
        createdAt: {
          lte: oneHourAgo,
        },
        paymentStatus: 'Pending',
      },
      data: {
        paymentStatus: 'Abandoned',
      },
    });

    return NextResponse.json({ updatedOrders });
  } catch (error) {
    console.error('Error updating orders:', error);
    return NextResponse.json({ error: 'Error updating orders' }, { status: 500 });
  }
}
