export const dynamic = 'force-dynamic'
import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';

import { NextResponse } from 'next/server';
type Params = Promise<{productId:string}>
export async function GET(
  request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params
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
    if (!params.productId) {
      return new NextResponse('product id is required', { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
        include: {
          category:true,
          images:true,
          Ratings:true,
          subCategory:true,
          productSpecification: true
  },

    });

    return NextResponse.json(product);
  } catch (err) {
    console.log('product_GET', err);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function PATCH(
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
    const body = await request.json();
    const {
      name,
      images,
      price,
      discount,
      stock,
      categoryId,
      subCategoryId,
      isFeatured,
      isArchived,
      sizes,
      productSpecification, // New field for specifications
    } = body;


    console.log("ProductSpecification",productSpecification);
    if (!name) {
      return new NextResponse('Name Is Required', { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse('Image Is Required', { status: 400 });
    }
    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse('Category must be selected', { status: 400 });
    }
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        stock,
        subCategoryId,
        discount,
        categoryId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
        productSpecification: {
          deleteMany: {}, // Clear existing specifications
        },
      },
    });

    // Add new images
    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });

    // Add selected specifications
    if (productSpecification && productSpecification.length) {
      await prismadb.product.update({
        where: {
          id: params.productId,
        },
        data: {
          productSpecification: {
            createMany: {
              data: [
                ...productSpecification.map((sp: { name: string,value:string }) =>sp),
              ],
            },
          },
        },
      });
     
    }


    // Retrieve and return the updated product
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
        subCategory:true,
        images: true,
        productSpecification: true
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log('PRODUCT_PATCH', err);
    return new NextResponse('internal error', { status: 500 });
  }
}

export async function DELETE(
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
    if (!params.productId) {
      return new NextResponse('product id is required', { status: 400 });
    }


     const ps = await prismadb.productSpecification.deleteMany({
      where:{
        productId:params.productId
      }
     })
if(ps)
  {  const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);}
  } catch (err) {
    console.log('PRODUCT_DELETE', err);
    return new NextResponse('internal error', { status: 500 });
  }
}
