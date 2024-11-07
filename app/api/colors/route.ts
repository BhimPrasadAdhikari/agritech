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
    const colors = await prismadb.color.findMany({
      where: {
        storeID: params.storeId,
      },
    });
    return NextResponse.json(colors);
  } catch (err) {
    console.log('COLORS_GET', err);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();

    // Expecting an array of colors
    const colors = body.colors; // Extract the colors array from the request body

    // Validation
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }
    if (!Array.isArray(colors) || colors.length === 0) {
      return new NextResponse('An array of colors is required', { status: 400 });
    }

    // Create multiple colors
    const createdColors = await prismadb.color.createMany({
      data: colors.map((color: { name: string; value: string }) => ({
        name: color.name,
        value: color.value,
        storeID: params.storeId,
      })),
    });

    return NextResponse.json(createdColors);
  } catch (error) {
    console.log('COLORS_POST', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
