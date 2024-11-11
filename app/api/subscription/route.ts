export const dynamic = 'force-dynamic'

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { plan, paymentId, paymentAmount } = await request.json();
    const session = await getServerSession();
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = (session?.user?.id as string) || user?.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { session } },
        { status: 500 }
      );
    }
    const subscription = await prismadb.subscription.create({
      data: {
        userId,
        paymentId,
        paymentAmount,
        plan,
        status: "active", // initially pending until payment is confirmed
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // assuming 1-month subscription
      },
    });
    if (!subscription) {
      return NextResponse.json(
        { success: false, error: "Failed to create subscription." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, subscription: subscription },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create subscription." },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") || undefined;
    const session = await getServerSession();
    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });
    const userId = (session?.user?.id as string) || user?.id;

    const subscription = await prismadb.subscription.findUnique({
      where: {
        userId,
      },
    });
    if (!subscription) {
      return NextResponse.json(
        { success: false, message: "subscription not found" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: true, subscription: subscription },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET_SUBSCRIPTION", error);
    return NextResponse.json(
      { success: false, error: "failed to fetch subscription" },
      { status: 500 }
    );
  }
}
