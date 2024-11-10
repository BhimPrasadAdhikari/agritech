import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/components/authoptions";

// POST request to create a new appointment
export async function POST(request: Request) {
  try {
    const { userId, expertId, date, time } = await request.json();

    // Validate input fields
    if (!userId || !expertId || !date || !time) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create a new appointment in Prisma
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

// GET request to fetch pending appointments for the logged-in expert
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const appointments = await prismadb.appointment.findMany({
      where: {
        expertId: session.user.id,
        status: "pending",
      },
      select: {
        id: true,
        expert: {
          select: {
            name: true,
            image: {
              select: {
                url: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            image: {
              select: {
                url: true,
              },
            },
            email: true,
          },
        },
        date: true,
        time: true,
        status: true,
      },
    });

    return NextResponse.json({ appointments, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
