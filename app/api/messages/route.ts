// // app/api/messages/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import pusherServer from "@/lib/pusher"; // Adjust import based on your structure
// import prismadb from "@/lib/prismadb";
// import { connect } from "http2";


// export async function POST(req: NextRequest) {
//   try {
//     const { text,sender, senderId,conversationId, timestamp, imageUrls } = await req.json();

//     // Save the message to the database using Prisma
//     const newMessage = await prismadb.message.create({
//       data: {
//         body: text,
//         image: imageUrls || [],
//         conversation:{
//             connect:{
//                 id:conversationId
//             }
//         },
//         sender :{
//             connect:{
//                 id:senderId
//             }
//         },
//         seen:{
//             connect:{
//                 id:senderId
//             }
//         },
//       },
//       include: {
//         seen:true,
//         sender: true,
//          // Optionally include sender details for frontend if needed
//       },
//     });

//     const updatedConversation = await prismadb.conversation.update({
//         where:{
//             id:senderId
//         },
//         data:{
//             lastMessageAt: timestamp,
//             messages:{
//                 connect:{
//                     id:newMessage.id
//                 }
//             }
//         },
//         include:{
//             users:true,
//             messages:{
//                 include:{
//                     seen:true
//                 }
//             }
//         }
//     })
//     // Trigger the message event on Pusher
//     await pusherServer.trigger(conversationId, "messages:new", newMessage);
//     const lastMessage = updatedConversation.messages[updatedConversation.messages.length-1]
//     updatedConversation.users.map(user=>{
//         pusherServer.trigger(user.email!,"conversation:update",{
//             id:conversationId,
//             messages:[lastMessage]
//         })
//     })
//     return NextResponse.json(newMessage);
//   } catch (error) {
//     console.error("Error creating message:", error);
//     return NextResponse.json(
//       { error: "Failed to create message" },
//       { status: 500 }
//     );
//   }
// }
// app/api/messages/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { pusherServer } from "@/lib/pusher";
// import prismadb from "@/lib/prismadb";

// export async function POST(req: NextRequest) {
//   try {
//     const { text, senderId, conversationId, timestamp, imageUrls } = await req.json();
    
//     // Save the new message
//     const newMessage = await prismadb.message.create({
//       data: {
//         body: text,
//         image: imageUrls || [],
//         conversation: { connect: { id: conversationId } },
//         sender: { connect: { id: senderId } },
//         seen: { connect: { id: senderId } },
//       },
//       include: { sender: true, seen: true },
//     });

//     // Broadcast to the conversation channel for real-time updates
//     await pusherServer.trigger(conversationId, "messages:new", newMessage);

//     // Broadcast to each user to update the conversation list
//     const conversation = await prismadb.conversation.findUnique({
//       where: { id: conversationId },
//       include: { users: true },
//     });

//     conversation?.users.forEach((user) => {
//       if (user.id !== senderId) {
//         pusherServer.trigger(user.email!, "conversation:update", {
//           id: conversationId,
//           lastMessage: newMessage,
//         });
//       }
//     });

//     return NextResponse.json(newMessage);
//   } catch (error) {
//     console.error("Error creating message:", error);
//     return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
//   }
// }



// app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";
import {pusherServer} from "@/lib/pusher";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
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
