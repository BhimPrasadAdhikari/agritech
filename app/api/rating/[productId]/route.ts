import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
type Params = Promise<{ productId: string }>

export async function GET(
  request: Request, segmentData: { params: Params }
) {
  const params= await segmentData.params
  try { 
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
  request: Request, segmentData: { params: Params }
) {
  const params= await segmentData.params
  const{productId}=params
  try {
    const body = await request.json();
    const {rating,userEmail} = body.data; // Extract the sizes array from the request body
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
