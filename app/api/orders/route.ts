











import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"




export async function POST(
    req:Request,
  {params}:{params:{storeId:string}}
){
    try{
   const {userId} =auth()
   const body = await req.json();
   const {name,billboardId} =body
   if(!userId){
    return new NextResponse("unauthorized",{status:401})
   }
   if(!name){
    return new NextResponse("name is required",{status:400})
   }
   if(!billboardId){
    return new NextResponse("billboard must be selected",{status:400})
   }
   if(!params.storeId){
    return new NextResponse("storeId is required",{status:400})
   }

const store=await prismadb.store.findFirst({
    where:{
        id:params.storeId,
        userId
    }
})
if(!store){
    return new NextResponse("Unauthorized",{status:403})
}
  const category=await prismadb.category.create({
   data:{ 
    name,
    billboardId,
    storeID:params.storeId
      }
  });
 return NextResponse.json(category)
    }catch(error){
  console.log('[BILLBOARD_POST',error)
  return new NextResponse("Internal Error",{status:500})
    }
}

export async function GET(
    req:Request,
  {params}:{params:{storeId:string}}
){
    try{
      const { searchParams } = new URL(req.url);
const email=searchParams.get('email')||undefined;
  //  const {userId} =auth()
  //  if(!userId){
  //   return new NextResponse("unauthorized",{status:401})
  //  }
   if(!params.storeId){
    return new NextResponse("storeId is required",{status:400})
   }

const orders=await prismadb.order.findMany({
    where:{
       storeID:params.storeId,
       email
    },
    include:{
      orderItems:{
        include: {
          product: true, // Include product details for each order item
      },
      }
    }
})

return NextResponse.json(orders);
}catch(error){
  console.log('[ORDERS_GET',error)
  return new NextResponse("Internal Error",{status:500})
    }
}











