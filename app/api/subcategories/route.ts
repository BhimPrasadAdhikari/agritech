export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = session?.user.id || user?.id;
    const body = await req.json();
    const { name, categoryId } = body;
    const nameArray = name.split(",");
    const subCategoryData = nameArray.map((subCategoryName:string) => ({
      name: subCategoryName.trim(),
      categoryId,
    }));
    
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("billboard must be selected", { status: 400 });
    }
    const category = await prismadb.subCategory.createMany({
      data:subCategoryData
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[BILLBOARD_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = session?.user.id || user?.id;

    if (!userId) {
      return new NextResponse("userId is required", { status: 400 });
    }

    const subCategories = await prismadb.category.findMany();

    return NextResponse.json(subCategories);
  } catch (error) {
    console.log("SUBCATEGORIES_GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
