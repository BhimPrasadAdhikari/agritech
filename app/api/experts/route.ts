export const dynamic = 'force-dynamic'
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req:Request){
    try{
    const experts = await prismadb.user.findMany({
        where:{
            role:'EXPERT'
        },
        include:{image:true}
    })
    if(!experts){
        return NextResponse.json({success:false,error:"Somthing went wrong"},{status:500})
    }
    return NextResponse.json({success:true,experts:experts},{status:200})
}catch(error){
        return NextResponse.json({success:false,error:error},{status:500})
    }
}