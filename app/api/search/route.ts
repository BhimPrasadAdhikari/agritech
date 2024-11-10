import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || undefined;

    const products = await prismadb.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search, // Match product name (case-insensitive search)
              mode: "insensitive", // Makes the search case-insensitive
            },
          },
          {
            category: {
              name: {
                contains: search, // Match category name (case-insensitive search)
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        category: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log("SEARCH_GET", error);
    return NextResponse.json("Internal Error", { status: 500 });
  }
}
