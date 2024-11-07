import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return NextResponse.json({ error: "conversationId is required" }, { status: 400 });
  }

  try {
    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          select: {
            id: true,
            body: true,
            image: true,
            createdAt: true,
            seen: {
              select: {
                id: true,
                name: true, // Example additional info
              },
            },
            sender: {
              select: {
                id: true,
                name: true,
                email: true, // Additional sender info if needed
              },
            },
          },
          orderBy: { createdAt: 'asc' }, // Orders messages by creation time, oldest first
        },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    return NextResponse.json(conversation.messages);
  } catch (error) {
    console.error("Error fetching conversation messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation messages" },
      { status: 500 }
    );
  }
}
