import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    // const { userId } = auth();
    // if (!userId) return new NextResponse('unauthorized access', { status: 401 });
    
    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });
    if (!params.sizeId)
      return new NextResponse('size id is required', { status: 400 });
    
    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    // Check if size exists
    if (!size) {
      return new NextResponse('size not found', { status: 404 });
    }

    return NextResponse.json(size);
  } catch (error) {
    console.log('SIZE_GET', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { sizes } = body;
    const {name, value}=sizes[0];

    if (!userId) return new NextResponse('unauthenticated', { status: 401 });
    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });
    if (!params.sizeId)
      return new NextResponse('size id is required', { status: 400 });
    if (!name)
      return new NextResponse('size name is required', { status: 400 });
    if (!value)
      return new NextResponse('size code is required', { status: 400 });
    
    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!store) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await prismadb.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('SIZE_PATCH', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse('unauthenticated', { status: 401 });
    if (!params.storeId)
      return new NextResponse('Store id is required', { status: 400 });
    if (!params.sizeId)
      return new NextResponse('size id is required', { status: 400 });

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('DELETE_SIZE', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
