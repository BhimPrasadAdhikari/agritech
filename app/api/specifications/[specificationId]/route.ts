export const dynamic = 'force-dynamic'

import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';

import { NextResponse } from 'next/server';

type Params= Promise<{specificationId:string}>
export async function GET(
  request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params
    const session = await getServerSession();
   const user = await prismadb.user.findUnique({
     where: {
       email: session?.user.email as string,
     },
   });
   const userId = session?.user.id || user?.id;

   if (!userId) {
     return new NextResponse("unauthorized", { status: 401 });
   }
    if (!params.specificationId) {
      return new NextResponse('category id is required', { status: 400 });
    }

    const specifications = await prismadb.specification.findMany({
      where: {
        categoryId: params.specificationId,
      },
    });
    console.log(specifications)
    return NextResponse.json(specifications.map(spec => ({
      id: spec.id,
      name: spec.name,
      values: spec.values, // Assuming values are stored as a comma-separated string
    })));
  } catch (err) {
    console.log('SPECIFICATION_GET', err);
    return new NextResponse('internal error', { status: 500 }); 
  }
}

export async function PATCH(
  request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params

    const session = await getServerSession();
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = session?.user.id || user?.id;
 
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const body = await request.json();
    const { categoryId, specifications} = body;
    const {name,values} =specifications[0];
    if (!userId) {
      return new NextResponse('unauthenticated', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name Is Required', { status: 400 });
    }
    if (!values) {
      return new NextResponse('Value Is Required', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('Category id is Required', { status: 400 });
    }
    if (!params.specificationId) {
      return new NextResponse('Specification id is required', { status: 400 });
    }
    const category = await prismadb.specification.update({
      where: {
        id: params.specificationId,
      },
      data: {
        name,
        values,
        categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log('SPECIFICATION_PATCH', err);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function DELETE(
  request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params
    const session = await getServerSession();
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = session?.user.id || user?.id;
 
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!userId) {
      return new NextResponse('unauthenticated', { status: 401 });
    }
   
    if (!params.specificationId) {
      return new NextResponse('specification id is required', { status: 400 });
    }

    const specification = await prismadb.specification.deleteMany({
      where: {
        id: params.specificationId,
      },
    });

    return NextResponse.json(specification);
  } catch (err) {
    console.log('SPECIFICATION_DELETE', err);
    return new NextResponse('internal error', { status: 500 });
  }
}
