import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
export async function GET(
  req: Request,
  { params }: { params: { storeId: string; orderId: string ; status:string} }
) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return new NextResponse('unauthenticated', { status: 401 });
    // }
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
    if (!params.orderId) {
      return new NextResponse('order id is required', { status: 400 });
    }

    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId,
        paymentStatus:params.status
      },
      include:{
        orderItems:true
      }
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log('ORDER_GET', err);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { isPaid,paymentStatus,orderStatus } = body;
    console.log(isPaid);
    if (!userId) {
      return new NextResponse('unauthenticated', { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
   
    if (!params.orderId) {
      return new NextResponse('order id is required', { status: 400 });
    }
    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    // if (!store) {
    //   return new NextResponse('Unauthorized', { status: 403 });
    // }
    const order = await prismadb.order.updateMany({
      where: {
        id: params.orderId,
      },
      data: {
        isPaid,
        paymentStatus,
        orderStatus,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log('ORDER_PATCH', err);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthenticated', { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
    if (!params.orderId) {
      return new NextResponse('order id is required', { status: 400 });
    }
    const orderItem=await prismadb.orderItem.deleteMany({
      where:{
        orderId:params.orderId
      }
    })
    const order = await prismadb.order.deleteMany({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    console.log('ORDER_DELETE', err);
    return new NextResponse('internal error', { status: 500 });
  }
}
