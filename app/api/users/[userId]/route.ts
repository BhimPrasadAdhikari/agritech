/* eslint-disable @typescript-eslint/no-unused-vars */
import prismadb from "@/lib/prismadb";
import {NextResponse } from "next/server";
type Params = Promise<{userId:string}>
export async function GET(
  request: Request, segmentData: { params: Params }
) {
  const params= await segmentData.params
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: {
          select: {
            url: true,
          },
        },
        accounts: {
          select: {
            id: true,
            provider: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Somthing went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, user: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

export async function PATCH(
  request: Request, segmentData: { params: Params }
) {
  const params= await segmentData.params
  const { userId } = params;
  console.log(userId);
  try {
    // Parse the JSON body
    const { name, expertise, availability, image } = await request.json();

    // Validate that necessary data is present
    if (!name || !expertise || !availability) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Update user in the database
    const updatedUser = await prismadb.user.update({
      where: { id: userId },
      data: {
        name,
        expertise,
        availability,
      },
    });
    const userImage = await prismadb.image.upsert({
      where: { userId: userId },
      update: {
        url: image,
      },
      create: {
        userId,
        url: image,
      },
    });
    // Respond with the updated user data

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user." },
      { status: 500 }
    );
  }
}
