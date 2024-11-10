import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
type Params = Promise<{ billboardId: string }>
export async function GET(
  request: Request, segmentData: { params: Params }
){
  const params = await segmentData.params

    try{
        const session = await getServerSession();
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = session?.user.id || user?.id;

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
 if(!params.billboardId){
    return new NextResponse("billboard id is required",{status:400})
 }

 const billboard=await prismadb.billboard.findUnique({
    where:{
        id:params.billboardId,
    }
 });

 return NextResponse.json(billboard)
    }catch(err){
        console.log("BILLBOARD_GET",err);
        return new NextResponse("internal error",{status:500})
    }
}

export async function PATCH(
  request: Request, segmentData: { params: Params }

){
  const params = await segmentData.params
    try{
        const session = await getServerSession();
    const user = await prismadb.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = session?.user.id || user?.id;

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
        const body=await request.json();
        const {label,imageUrl}=body
        if(!userId){
            return new NextResponse("unauthenticated",{status:401})
        }
        if(!label){
            return new NextResponse("Name Is Required",{status:400})
        }
        if(!imageUrl){
            return new NextResponse("image url  Is Required",{status:400})
        }
 if(!params.billboardId){
    return new NextResponse("billboard id is required",{status:400})
 }
 const billboard=await prismadb.billboard.updateMany({
    where:{
        id:params.billboardId,
    },data:{
        label,
        imageUrl
    }
 })
 
 ;
 return NextResponse.json(billboard)
    }catch(err){
        console.log("BILLBOARD_PATCH",err);
        return new NextResponse("internal error",{status:500})
    }
}

export async function DELETE(
  request: Request, segmentData: { params: Params }

){
  const params = await segmentData.params
    try{
        const session = await getServerSession();
        const user = await prismadb.user.findUnique({
          where: {
            email: session?.user.email as string,
          },
        });
        const userId = session?.user.id || user?.id;
    
        if (!userId) {
          return new NextResponse("unauthorized", { status: 401 });
        }
 
 if(!params.billboardId){
    return new NextResponse("billboard id is required",{status:400})
 }

 const billboard=await prismadb.billboard.deleteMany({
    where:{
        id:params.billboardId,
    }
 });

 return NextResponse.json(billboard)
    }catch(err){
        console.log("BILLBOARD_DELETE",err);
        return new NextResponse("internal error",{status:500})
    }
}