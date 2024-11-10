import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../components/authoptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  try {
    const conversation = await prismadb.conversation.findMany({
      where: {
        userIds:{
          has:userId
        }
      },
      select:{
        id:true,
        users:{
          select:{
            id:true,
            messages:{
              select:{
                id:true,
                body:true,
                image:true,
                createdAt:true,
                sender:{
                  select:{
                    id:true,
                    name:true,
                    image:{
                      select:{
                        url:true
                      }
                    },
                  }
                }
               },
              },
            }
          },
        createdAt:true,
        },
      }
    );

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }
const formattedConversation = conversation.map(c=>(
  {
    id:c.id,
    createdAt:c.createdAt,
    users: c.users.map(u=>({
      ...u,
      messages:u.messages.filter(m=>m.sender.id !== userId).sort((a,b)=>b.createdAt.getTime()-a.createdAt.getTime())

    })).filter(u=>u.messages.length>0 )
  }
 
)).filter(c=>c.users.length>0)
    return NextResponse.json({conversation:formattedConversation,success:true},{status:200});
  } catch (error) {
    console.error("Error fetching conversation messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation messages" },
      { status: 500 }
    );
  }
}
