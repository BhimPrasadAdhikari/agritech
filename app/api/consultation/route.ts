/* eslint-disable @typescript-eslint/no-unused-vars */
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {expertId,farmerId,consultationId } = body;

    // Get the current authenticated user (expert)
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    // Find the consultation to ensure it exists and verify the expert
    const consultation = await prismadb.consultation.findUnique({
      where: { id: consultationId },
      include: { expert: true }, // Include expert data to verify
    });

    if (!consultation) {
      return NextResponse.json({ message: 'Consultation not found' }, { status: 404 });
    }
    // Verify the current user is the expert assigned to the consultation
    if (consultation.expertId !== session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    // Mark the consultation as completed and set the end date
    await prismadb.consultation.update({
      where: { id: consultationId },
      data: {
        status: 'COMPLETED',   // Update the status
        updatedAt: new Date(),   // Set the end time
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error ending consultation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const {expertId,farmerId,consultationId } = body;

    // Get the current authenticated user (expert)
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    // Find the consultation to ensure it exists and verify the expert
    const consultation = await prismadb.consultation.findUnique({
      where: { id: consultationId },
      include: { expert: true }, // Include expert data to verify
    });

    if (!consultation) {
      return NextResponse.json({ message: 'Consultation not found' }, { status: 404 });
    }
    // Verify the current user is the expert assigned to the consultation
    if (consultation.expertId !== session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }
    // Mark the consultation as completed and set the end date
    await prismadb.consultation.update({
      where: { id: consultationId },
      data: {
        status: 'COMPLETED',   // Update the status
        updatedAt: new Date(),   // Set the end time
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error ending consultation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
