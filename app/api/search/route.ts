import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // const { userId } = auth();
    const { searchParams } = new URL(req.url);
const search=searchParams.get('search')||undefined;
    // if (!userId) {
    //   return new NextResponse('unauthorized', { status: 401 });
    // }
    if (!params.storeId) {
      return new NextResponse('storeId is required', { status: 400 });
    }

    const products = await prismadb.product.findMany({
        where: {
          storeID: params.storeId,
          OR: [
            {
              name: {
                contains: search,  // Match product name (case-insensitive search)
                mode: 'insensitive' // Makes the search case-insensitive
              },
            },
            {
              category: {
                name: {
                  contains: search, // Match category name (case-insensitive search)
                  mode: 'insensitive'
                }
              }
            }
          ]
        },
        include: {
          category: true,
          size: true,
          color: true,
          images: true,
        },
        orderBy: {
          createdAt: 'desc',
        }
      });
    return NextResponse.json(products);
  } catch (error) {
    console.log('SEARCH_GET', error);
    return  NextResponse.json('Internal Error', { status: 500 });
  }
}
