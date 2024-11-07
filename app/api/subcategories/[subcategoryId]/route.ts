import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
export async function GET(
  req: Request,
  { params }: { params: {subcategoryId: string } }
) {
  try {
    if (!params.subcategoryId) {
      return new NextResponse('category id is required', { status: 400 });
    }
    const subCategory = await prismadb.subCategory.findMany({
      where: {
        categoryId: params.subcategoryId,
      },
    });

    return NextResponse.json(subCategory);
  } catch (err) {
    console.log('CATEGORY_GET', err);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const body = await req.json();
    const { name, billboardId } = body;
    if (!userId) {
      return new NextResponse('unauthenticated', { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
    if (!name) {
      return new NextResponse('Name Is Required', { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse('Billboard id is Required', { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse('category id is required', { status: 400 });
    }
    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!store) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log('CATEGORY_PATCH', err);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('unauthenticated', { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse('category id is required', { status: 400 });
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log('CATEGORY_DELETE', err);
    return new NextResponse('internal error', { status: 500 });
  }
}
