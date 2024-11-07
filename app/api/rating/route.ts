import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string,productId:string } }
) {
  try { 
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
    if (!params.productId) {
        return new NextResponse('productId is required', { status: 400 });
      }
    const ratings = await prismadb.rating.findMany({
      where: {
        productId: params.productId,
      },
    });
    return NextResponse.json(ratings);
  } catch (err) {
    console.log('RATINGS_GET', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    // Expecting an array of sizes
    const {productId,rating,userEmail} = body.data; // Extract the sizes array from the request body
    // Validation
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
    if(!productId)
    {
        return new NextResponse('productId  is required', { status: 400 });

    }
    if(!rating)
        {
            return new NextResponse('rating  is required', { status: 400 });
    
        }
        if(!userEmail)
            {
                return new NextResponse('userEmail  is required', { status: 400 });
        
            }
    const createdRating = await prismadb.rating.create({
      data: {
        productId,
        rating,
        userEmail
      }
    });

    return NextResponse.json(createdRating);
  } catch (error) {
    console.log('RATING_POST', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
