import prismadb from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

// PATCH request to update the status of an appointment
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  const { status } = await request.json();

  try {
    const updatedAppointment = await prismadb.appointment.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, data: updatedAppointment });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return NextResponse.json({ success: false, error: 'Failed to update appointment' }, { status: 500 });
  }
}

// DELETE request to remove an appointment
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    await prismadb.appointment.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete appointment' }, { status: 500 });
  }
}
