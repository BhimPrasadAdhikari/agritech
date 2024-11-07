import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
    const sizes = await prismadb.size.findMany({
      where: {
        storeID: params.storeId,
      },
    });
    return NextResponse.json(sizes);
  } catch (err) {
    console.log('SIZES_GET', err);
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
    const sizes = body.sizes; // Extract the sizes array from the request body

    // Validation
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return new NextResponse('An array of sizes is required', { status: 400 });
    }

    // Create multiple sizes
    const createdColors = await prismadb.size.createMany({
      data: sizes.map((size: { name: string; value: string }) => ({
        name: size.name,
        value: size.value,
        storeID: params.storeId,
      })),
    });

    return NextResponse.json(createdColors);
  } catch (error) {
    console.log('SIZES_POST', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
