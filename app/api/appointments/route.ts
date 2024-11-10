// app/api/appointments/route.ts
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authoptions";

export async function POST(request:Request) {
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

export async function GET(
  req:Request
) { 
  const session = await getServerSession(authOptions);
  const appointments = await prismadb.appointment.findMany({
    where:{
      expertId:session?.user.id,
      status:'pending'
    },
    select:{
      id:true,
      expert:{
        select:{
          name:true,
          image:{
            select:{
              url:true
            }
          },
        }
      },
      user:{
        select:{
          name:true,
          image:{
            select:{
              url:true
            }
          },
          email:true,
        }
      },
      date:true,
      time:true,
      status:true,
      
    }
  })
  return NextResponse.json({appointments:appointments,success:true},{status:200})

}
