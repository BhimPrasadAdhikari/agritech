export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
type Params= Promise<{conversationId:string}>
export async function GET(
  request: Request, segmentData: { params: Params }
) {
  const params= await segmentData.params
  try {
    const conversation = await prismadb.conversation.findUnique({
      where: {
        id:params.conversationId
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
               orderBy:{
                createdAt:'asc'
               }
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
    return NextResponse.json({conversation:conversation,success:true},{status:200});
  } catch (error) {
    console.error("Error fetching conversation messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation messages" },
      { status: 500 }
    );
  }
}
