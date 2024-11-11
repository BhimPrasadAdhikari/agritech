/* eslint-disable @typescript-eslint/no-unused-vars */
export const dynamic = 'force-dynamic'

import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { expertId, farmerId, amount, commission } = body;
    console.log(body);
    const consultation = await prismadb.consultation.create({
      data: {
        expertId,
        amount,
        commission,
        farmerId,
      },
    });
    if (!consultation) {
      return NextResponse.json(
        { success: false, error: "Server error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, consultation: consultation },
      { status: 200 }
    );
  } catch (error) {
    console.error("CONSULT_POST", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req:Request) {
  try {
    const session = await getServerSession();
    const farmerId = session?.user.id;
    const consultations = await prismadb.consultation.findMany({
      where: {
        farmerId: farmerId,
      },
      select: {
        id: true,
        date: true,
        status: true,
        farmer: {
          select: {
            name: true,
            email: true,
            image: {
              select: {
                url: true,
              },
            },
          },
        },
        expert: {
          select: {
            name: true,
            email: true,
            image: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });
    if (!consultations) {
      return NextResponse.json(
        { success: false, error: "Server error" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, consultations: consultations },
      { status: 200 }
    );
  } catch (error) {
    console.error("CONSULT_GET", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
