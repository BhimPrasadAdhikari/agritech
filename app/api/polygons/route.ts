/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/polygons/route.ts

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const { AGRO_APP_ID } = process.env;
    const response = await axios.get(`https://api.agromonitoring.com/agro/1.0/polygons?appid=${AGRO_APP_ID}`);
    // Selectively return only required fields, excluding app_id
    const filteredData = response.data.map((field: any) => ({
        id: field.id,
        name: field.name,
        area: field.area,
      }));
  
    
    return NextResponse.json(filteredData);
  } catch (error) {
    console.error("Error fetching polygons:", error);
    return NextResponse.json({ error: "Failed to fetch polygons" }, { status: 500 });
  }
}
