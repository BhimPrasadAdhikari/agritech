// app/api/appointments/route.ts
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    const { userId, expertId, date, time } = await request.json();

    // Validate input
    if (!userId || !expertId || !date || !time) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create a new appointment
    const newAppointment = await prismadb.appointment.create({
      data: {
        userId,
        expertId,
        date: new Date(date),
        time: new Date(time),
      },
    });

    return NextResponse.json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
