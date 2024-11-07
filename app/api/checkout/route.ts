// import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";
const corsHeaders={

"Access-Control-Allow-Credentials":"true",
  // "Access-Control-Allow-Origin":"https://kurtaglow-y7cc.vercel.app",
  "Access-Control-Allow-Origin":`${process.env.STORE_PUBLIC_URL}`,

  "Access-Control-Allow-Methods":"GET,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":"Content-Type",
}

export async function OPTIONS(){
    return NextResponse.json({});

}
export async function POST(req:Request,{params}:{params:{storeId:string}})
  {
    // const {userId} =auth()
    const {productDetails,details,identifier,paymentMethod}=await req.json();
    const {fullName,email,phone,address}=details;
    const productIds=productDetails.map((product:any)=>product.productId)
    const quantities =productDetails.map((product:any)=>product.quantity)
    const existingOrder = await prismadb.order.findFirst({
      where: {
        email: email,
        isPaid: false,
        orderItems: {
          some: {
            productId: { in: productIds },
          },
        },
      },
    });
  
    // If an unpaid order already exists, don't create a new one
    if (existingOrder) {
      return new NextResponse("Order already exists", { status: 200, headers: corsHeaders });
    }
    // if(!userId){
    //   return new NextResponse("unauthorized",{status:401})
    //  }
    if (!quantities || quantities.length !== productIds.length) {
      return new NextResponse("Quantities must match product IDs", { status: 400, headers: corsHeaders });
    }
    if(!productIds || productIds.length===0){ return new NextResponse("Product ids are required",{status:400,headers:corsHeaders})}

    const products=await prismadb.product.findMany({
        where:{
            id:{
                in:productIds
            }
        }});
    const order=await prismadb.order.create({
        data:{
            // storeID:params.storeId,
            storeID:products[0].storeID,
            isPaid:false,
            fullName,
            email,
            identifier,
            paymentMethod,
            phone,
            address,
            orderItems:{
                create:productIds.map((productId:string,index:number)=>{
                  return {
                     product:{
                        connect:{
                        id: productId
                      },
                    },
                quantity:quantities[index]
                  };
                })
              }
        }
        });

       const orderItems=await prismadb.orderItem.findMany(
        {
          where:{
            orderId:order.id
          }
        }
       )
console.log(order)

   return NextResponse.json({orders:order,url:`${process.env.STORE_PUBLIC_URL}`},
    {
    status:200,
    headers:corsHeaders
   }
);
    }



