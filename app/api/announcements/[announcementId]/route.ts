import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: {announcementId: string } }
) {
  try {
    const announcement = await prismadb.announcement.delete({
      where: {
        id: params.announcementId,
      },
    });
    console.log(announcement);
    return NextResponse.json(
      { success: true, message: "announcement deleted successful." },
      { status: 200 }
    );
  } catch (error) {
    console.error("ANNOUNCEMENT_DELETE", error);
    return NextResponse.json(
      { success: false, error: "announcement delete failed" },
      { status: 500 }
    );
  }
}
