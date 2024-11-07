/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/satellite-images/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { AGRO_APP_ID } = process.env;
    const { searchParams } = req.nextUrl;
    const polyid = searchParams.get("polyid");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!polyid || !start || !end) {
      return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
    }

    // Step 1: Fetch satellite images data
    const satelliteResponse = await axios.get(
      `https://api.agromonitoring.com/agro/1.0/image/search?start=${start}&end=${end}&polyid=${polyid}&appid=${AGRO_APP_ID}`
    );

    console.log(satelliteResponse.data)

    const satelliteData = satelliteResponse.data;

    // Step 2: Fetch image URLs and stats data for each satellite image
    const imageDataPromises = satelliteData.map(async (item: any, index: number) => {
      const imageFeatures = await Promise.all(
        Object.entries(item.image).map(async ([feature, url]) => {
          try {
            return { feature, url: url };    
  
          } catch (error) { 
            console.error(`Error fetching ${feature} image`, error);
            return null;
          }
        })
      );
      const statsFeatures = await Promise.all(
        Object.entries(item.stats).map(async ([feature, url]) => {
          try {
            const statsResponse = await axios.get(url as string);
            return { feature, data: statsResponse.data };
          } catch (error) {
            console.error(`Error fetching ${feature} stats`, error);
            return null;
          }
        })
      );

      // Map image and stats data to a structured format
      return {
        dt: item.dt,
        type: item.type,
        images: imageFeatures,
        stats: statsFeatures.filter(Boolean),
      };
    });

    const imageData = await Promise.all(imageDataPromises);
     console.log('imageData',imageData)
    return NextResponse.json(imageData);
  } catch (error) {
    console.error("Error fetching satellite images and data:", error);
    return NextResponse.json({ error: "Failed to fetch satellite images and data" }, { status: 500 });
  }
}
