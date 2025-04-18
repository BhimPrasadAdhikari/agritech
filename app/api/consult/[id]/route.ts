export const dynamic = 'force-dynamic'

import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
type Params = Promise<{id:string}>
// PATCH request to update the status of an consultation
export async function PATCH(
  request: Request, segmentData: { params: Params }
) {

  const params = await segmentData.params
  const id = params.id;
  const { status } = await request.json();
  try {
    const updatedAppointment = await prismadb.consultation.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, data: updatedAppointment });
  } catch (error) {
    console.error("Error updating consultation status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update consultation" },
      { status: 500 }
    );
  }
}

// DELETE request to remove an consultation
export async function DELETE(
  request: Request, segmentData: { params: Params }
) {
  const params = await segmentData.params
  const id = params.id
  try {
    await prismadb.consultation.delete({
      where: {id },
    });
    return NextResponse.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting consultation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete consultation" },
      { status: 500 }
    );
  }
}
