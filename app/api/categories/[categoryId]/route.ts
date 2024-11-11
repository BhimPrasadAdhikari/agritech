export const dynamic = 'force-dynamic'

import { authOptions } from '@/authOptions';
import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
type Params = Promise<{ categoryId: string }>

export async function GET(
  request: Request, segmentData: { params: Params }) {
  try {
    const params= await segmentData.params
   const session = await getServerSession(authOptions);
   const user = await prismadb.user.findUnique({
     where: {
       email: session?.user.email as string,
     },
   });
   const userId = session?.user.id || user?.id;

   if (!userId) {
     return new NextResponse("unauthorized", { status: 401 });
   }
if(!params.categoryId){
 return new NextResponse("categoryId must be selected",{status:400})
}
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include:{
        billboard:true,
        specifications:true
      }
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log('CATEGORY_GET', err);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function PATCH(
  request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params
    const body = await request.json();
    const {name,billboardId} = body;
    const session = await getServerSession(authOptions);
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = session?.user.id || user?.id;
 
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!params.categoryId) {
      return new NextResponse('category id is required', { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse('billboard id is required', { status: 400 });
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
  request: Request, segmentData: { params: Params }) {

    const params = await segmentData.params
  try {
    const session = await getServerSession(authOptions);
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = session?.user.id || user?.id;
 
    if (!userId) {
      return new NextResponse('unauthenticated', { status: 401 });
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
