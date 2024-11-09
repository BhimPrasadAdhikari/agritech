import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(
    req:Request,
    {params}:{params:{conversationId:string}}
) {
    try{
    const messages = await prismadb.message.findMany({
        where: {
          conversationId: params.conversationId,
        },
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
          createdAt: 'asc',
        },
      });
  
      if (!messages || messages.length === 0) {
        return NextResponse.json({ error: "No messages found" }, { status: 404 });
      }
      return NextResponse.json({ messages:messages, success: true }, { status: 200 });
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
      return NextResponse.json(
        { error: "Failed to fetch conversation messages" },
        { status: 500 }
      );
    }
    
}