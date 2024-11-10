import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, billboardId } = body;
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

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("billboard must be selected", { status: 400 });
    }
    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[BILLBOARD_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { name, billboardId } = body;
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

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("billboard must be selected", { status: 400 });
    }

    const categories = await prismadb.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("BILLBOARDS_GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
