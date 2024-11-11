export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";

// POST request to create a product
export async function POST(req: Request) {
  try {
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
    const body = await req.json();
    const {
      name,
      detail,
      images,
      discount,
      price,
      stock,
      categoryId,
      subCategoryId,
      sizes,
      isFeatured,
      isArchived,
      productSpecification, // New field for specifications
    } = body;
    console.log(body);

    // Validation checks
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!detail) {
      return new NextResponse("Detail is required", { status: 400 });
    }
    if (discount === undefined) {
      return new NextResponse("Discount is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Image is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category must be selected", { status: 400 });
    }

    // Create the product
    const product = await prismadb.product.create({
      data: {
        name,
        detail,
        price,
        discount,
        categoryId,
        stock,
        subCategoryId,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
        productSpecification: {
          createMany: {
            data: productSpecification.map(
              (sp: { name: string; value: string }) => sp
            ),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse(`Internal Error`, { status: 500 });
  }
}

// GET request to retrieve products
export async function GET(req: Request) {
  try {
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
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const subCategoryId = searchParams.get("subCategoryId") || undefined;
    const isFeatured = searchParams.get("isFeatured");
    const min_price = Number(searchParams.get("min_price")) || undefined;
    const max_price = Number(searchParams.get("max_price")) || undefined;
    const min_discount = Number(searchParams.get("min_discount")) || undefined;
    const max_discount = Number(searchParams.get("max_discount")) || undefined;

    const products = await prismadb.product.findMany({
      where: {
        categoryId,
        subCategoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        price: {
          gte: min_price,
          lte: max_price,
        },
        discount: {
          gte: min_discount,
          lte: max_discount,
        },
      },
      include: {
        category: true,
        images: true,
        Ratings: true,
        subCategory:true,
        productSpecification: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("PRODUCTS_GET", error);
    return NextResponse.json("Internal Error", { status: 500 });
  }
}
