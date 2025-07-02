/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/polygons/route.ts
export const dynamic = 'force-static'

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { AgromonitoringService } from "@/lib/agromonitoring";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const agromonitoring = AgromonitoringService.getInstance();
    const polygons = await agromonitoring.getPolygons();

    // Filter and transform the data
    const filteredData = polygons.map((field: any) => ({
      id: field.id,
      name: field.name,
      area: field.area,
      center: field.center,
      geo_json: field.geo_json
    }));

    return NextResponse.json(filteredData);
  } catch (error: any) {
    console.error("Error fetching polygons:", error);
    return new NextResponse(
      error.message || "Internal Server Error",
      { status: error.response?.status || 500 }
    );
  }
}
