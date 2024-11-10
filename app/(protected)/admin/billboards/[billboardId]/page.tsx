import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-setting";

const BillboardPage=async(
    // { params
    // }:{params:{billboardId:string}}
)=> {
  try{
    const billboard= null
    // await prismadb.billboard.findUnique(
    //    { 
    //     where:{
    //         id:params.billboardId
    //     }
    // }
    // )
    return (
      <div>
       <BillboardForm initialData={billboard}/>
      </div>
    )
  
  }catch(error){
    console.error('Billboardpage',error)
  }
  
 
}

export default BillboardPage