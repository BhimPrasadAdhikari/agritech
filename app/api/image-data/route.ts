// app/api/image-data/route.ts

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req:Request) {
  const url = 'www'
  // req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing required query parameter: url" }, { status: 400 });
  }

  try {
    // Fetch image or stats data
    const response = await axios.get(url, { responseType: "blob"});

    if (url.includes("image")) {
      // If it's an image, convert to a blob URL
      const imageBlob = await response.data.blob();
      const imageURL = URL.createObjectURL(imageBlob);
      return NextResponse.json({ imageURL });
    }

    // If it's not an image, return JSON data (stats)
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching image data:", error);
    return NextResponse.json({ error: "Failed to fetch image or stats data" }, { status: 500 });
  }
}
