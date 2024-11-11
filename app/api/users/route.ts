/* eslint-disable @typescript-eslint/no-unused-vars */
export const dynamic = 'force-dynamic'

import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req:Request){
    try{
    const users = await prismadb.user.findMany({
        select:{
            id:true,
            name:true,
            email:true,
            image:{
                select:{
                    url:true
                }
            }
        }
    })
    if(!users){
        return NextResponse.json({success:false,error:"Somthing went wrong"},{status:500})
    }
    return NextResponse.json({success:true,users:users},{status:200})
}catch(error){
        return NextResponse.json({success:false,error:error},{status:500})
    }
}