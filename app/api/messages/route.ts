export const dynamic = 'force-dynamic'

import {  NextResponse } from "next/server";
import {pusherServer} from "@/lib/pusher";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

export async function POST(req:Request) {
  try {
    const { text, senderId, recipientId, timestamp, imageUrls } = await req.json();

    // Check for an existing conversation involving the sender and recipient
   const existingConversation = await prismadb.conversation.findFirst({
  where: {
    AND: [
      { users: { some: { id: senderId } } },
      { users: { some: { id: recipientId } } }
    ]
  },
  include: { users: true }
});


    let conversationId;

    if (existingConversation) {
      // If a conversation exists, use its ID
      conversationId = existingConversation.id;
    } else {
      // If no conversation exists, create a new one
      const newConversation = await prismadb.conversation.create({
        data: {
          users: {
            connect: [
              { id: senderId },
              { id: recipientId },
            ],
          },
          lastMessageAt: timestamp, // Optionally set the last message timestamp
        },
      });

      conversationId = newConversation.id;
    }

    // Save the message to the database
    const newMessage = await prismadb.message.create({
      data: {
        body: text,
        image: imageUrls || [],
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: senderId,
          },
        },
        seen: {
          connect: {
            id: senderId,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    });

    // Update the conversation's lastMessageAt field
    const updatedConversation = await prismadb.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: timestamp,
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    // Trigger Pusher event
    await pusherServer.trigger(conversationId, "messages:new", newMessage);
    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.forEach((user) => {
      pusherServer.trigger(`user-${user.id}`!,  "messages:new", newMessage);
    });
    return NextResponse.json({newMessage:newMessage});
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const recipientId = searchParams.get('recipientId') as string;
  const session= await getServerSession(authOptions);
  const senderId = session?.user.id;
  try{
    // Find the conversation involving only the two users
const conversation = await prismadb.conversation.findFirst({
  where: {
    AND: [
      { users: { some: { id: senderId } } },
      { users: { some: { id: recipientId } } }
    ]
  },
  select: {
    id: true,
    messages: {
      select: {
        id: true,
        body: true,
        image: true,
        createdAt: true,
        sender: {
          select: {
            id: true,
            name: true,
            image: {
              select: {
                url: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc', // Order messages chronologically
      },
    },
  },
});
// Now `conversation.messages` will contain only the messages exchanged between the two users

if (!conversation?.messages || conversation?.messages.length === 0) {
  return NextResponse.json({ messages:[], success: true }, { status: 200 });
}
return NextResponse.json({ messages:conversation?.messages, success: true }, { status: 200 });
} catch (error) {
console.error("Error fetching conversation messages:", error);
return NextResponse.json(
  { error: "Failed to fetch conversation messages" },
  { status: 500 }
);
}






}