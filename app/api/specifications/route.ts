export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";

export async function POST(
  req: Request,
) {
  try {
    const session = await getServerSession()
    const body = await req.json();
    const { categoryId, specifications } = body; // Change here

    const user = await prismadb.user.findUnique({
      where:{
        email:session?.user.email as string
      }
    })
    const userId = session?.user.id || user?.id

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    if (!specifications || !Array.isArray(specifications) || specifications.length === 0) {
      return new NextResponse("at least one specification is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("categoryId must be selected", { status: 400 });
    }

    // Loop through specifications and create each specification
    const specificationsCreated = await Promise.all(specifications.map(async (specification: { name: string; values: string[] }) => {
      return await prismadb.specification.create({
        data: {
          name: specification.name,
          values: specification.values,
          categoryId,
        },
      });
    }));

    return NextResponse.json(specificationsCreated);
  } catch (error) {
    console.log("[SPECIFICATION_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
) {
  try {
    const session = await getServerSession()
    const user = await prismadb.user.findUnique({
      where:{
        email:session?.user.email as string
      }
    })
    const userId = session?.user.id || user?.id

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const specifications = await prismadb.specification.findMany();

    return NextResponse.json(specifications);
  } catch (error) {
    console.log("SPECIFICATION_GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
