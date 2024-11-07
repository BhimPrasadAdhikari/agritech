import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb'; // Adjust the import based on your Prisma setup
import { subHours } from 'date-fns';

export async function POST() {
  try {
    const twentyFourHoursAgo = subHours(new Date(), 24); // Set to 24 hours

    // Step 1: Fetch abandoned orders that are older than 24 hours
    const abandonedOrders = await prismadb.order.findMany({
      where: {
        paymentStatus: 'Abandoned',
        isPaid: false,
        createdAt: {
          lte: twentyFourHoursAgo,
        },
      },
    });

    // If there are no orders to delete, return early
    if (abandonedOrders.length === 0) {
      return NextResponse.json({ message: 'No abandoned orders to delete.' });
    }

    // Step 2: Use a transaction to delete orderItems and orders
    const deletePromises = abandonedOrders.map(async (order) => {
      await prismadb.orderItem.deleteMany({
        where: { orderId: order.id },
      });
    });

    // Wait for all orderItems to be deleted
    await Promise.all(deletePromises);

    // Step 3: Delete abandoned orders
    const deletedOrders = await prismadb.order.deleteMany({
      where: {
        id: { in: abandonedOrders.map(order => order.id) },
      },
    });

    return NextResponse.json({ deletedOrders });
  } catch (error) {
    console.error('Error deleting abandoned orders:', error);
    return NextResponse.json({ error: 'Error deleting abandoned orders' }, { status: 500 });
  }
}
