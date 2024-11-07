import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse('unauthorized access', { status: 401 });
    
    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });
    if (!params.colorId)
      return new NextResponse('Color id is required', { status: 400 });
    
    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    // Check if color exists
    if (!color) {
      return new NextResponse('Color not found', { status: 404 });
    }

    return NextResponse.json(color);
  } catch (error) {
    console.log('COLOR_GET', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { colors } = body;
    const {name, value}=colors[0];

    if (!userId) return new NextResponse('unauthenticated', { status: 401 });
    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });
    if (!params.colorId)
      return new NextResponse('Color id is required', { status: 400 });
    if (!name)
      return new NextResponse('Color name is required', { status: 400 });
    if (!value)
      return new NextResponse('Color code is required', { status: 400 });
    
    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!store) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('COLOR_PATCH', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse('unauthenticated', { status: 401 });
    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });
    if (!params.colorId)
      return new NextResponse('Color id is required', { status: 400 });

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log('DELETE_COLOR', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
