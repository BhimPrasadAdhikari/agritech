import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-setting";

const BillboardPage=async(
    props:{params:Promise<{billboardId:string}>}
)=> {
  const params = await props.params
  try{
    const billboard=await prismadb.billboard.findUnique(
       { 
        where:{
            id:params.billboardId
        }
    }
    )
    return (
      <div>
       existing billboard {billboard?.label}
       <BillboardForm initialData={billboard}/>
      </div>
    )
  
  }catch(error){
    console.error('Billboardpage',error)
  }
  
 
}

export default BillboardPage