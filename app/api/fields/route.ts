import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import prisma from "@/lib/prismadb";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name, coordinates, area, cropType, soilType } = body;

    // Get user ID from email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Create field in database
    const field = await prisma.field.create({
      data: {
        name,
        coordinates,
        area,
        cropType,
        soilType,
        userId: user.id
      }
    });

    // Register field with Agromonitoring API
    const agromonitoringResponse = await axios.post(
      `https://api.agromonitoring.com/agro/1.0/polygons?appid=${process.env.AGRO_APP_ID}`,
      {
        name: field.name,
        geo_json: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [coordinates]
          }
        }
      }
    );

    // Update field with Agromonitoring polygon ID
    await prisma.field.update({
      where: { id: field.id },
      data: {
        agromonitoringId: agromonitoringResponse.data.id
      }
    });

    return NextResponse.json(field);
  } catch (error) {
    console.error("[FIELDS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const fields = await prisma.field.findMany({
      where: { userId: user.id },
      include: {
        alerts: {
          where: { isRead: false },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    return NextResponse.json(fields);
  } catch (error) {
    console.error("[FIELDS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 