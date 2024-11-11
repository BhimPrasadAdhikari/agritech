import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
type Params = Promise<{ announcementId: string }>
export async function GET(
  request: Request, segmentData: { params: Params }
){
  const params = await segmentData.params
  try {
    const announcement = await prismadb.announcement.findUnique({
      where: {
        id: params.announcementId,
      },
    });
    
    if (!announcement) {
      return NextResponse.json(
        { success: false, message: "Announcement not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, announcement });
  } catch (error) {
    console.error("ANNOUNCEMENT_FETCH_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch announcement." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { announcementId: string } }
) {
  try {
    const announcement = await prismadb.announcement.delete({
      where: {
        id: params.announcementId,
      },
    });

    console.log(announcement);
    return NextResponse.json(
      { success: true, message: "Announcement deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("ANNOUNCEMENT_DELETE", error);
    return NextResponse.json(
      { success: false, error: "Announcement delete failed." },
      { status: 500 }
    );
  }
}
