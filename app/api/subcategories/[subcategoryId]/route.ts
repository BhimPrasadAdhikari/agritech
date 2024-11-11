export const dynamic = 'force-dynamic'

import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
type Params = Promise<{subcategoryId:string}>
export async function GET(
    request: Request, segmentData: { params: Params }
) {
  const params= await segmentData.params
  try {
    if (!params.subcategoryId) {
      return new NextResponse('subcategory id is required', { status: 400 });
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
    request: Request, segmentData: { params: Params }) 
 {
  const params= await segmentData.params
  try {
    const body = await request.json();
    const { name, categoryId} = body;
    const session = await getServerSession(authOptions);
    const userId = session?.user.id
    if (!userId) {
      return new NextResponse('unauthenticated', { status: 401 });
    }
    if (!params.subcategoryId) {
      return new NextResponse('subcategoryId is required', { status: 400 });
    }
    if (!name) {
      return new NextResponse('Name Is Required', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('categoryId is Required', { status: 400 });
    }
    const subcategory = await prismadb.subCategory.updateMany({
      where: {
        id: params.subcategoryId,
      },
      data: {
        name,
        categoryId,
      },
    });

    return NextResponse.json(subcategory);
  } catch (err) {
    console.log('CATEGORY_PATCH', err);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function DELETE(
  request: Request, segmentData: { params: Params }
) {
  const params= await segmentData.params
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id
    if (!userId) {
      return new NextResponse('unauthenticated', { status: 401 });
    }
   
    if (!params.subcategoryId) {
      return new NextResponse('subcategory id is required', { status: 400 });
    }

    const category = await prismadb.subCategory.deleteMany({
      where: {
        id: params.subcategoryId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log('CATEGORY_DELETE', err);
    return new NextResponse('internal error', { status: 500 });
  }
}
