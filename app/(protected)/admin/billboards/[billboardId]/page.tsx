import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-setting";
interface BillboardPageProps {
  params: { billboardId: string };
}

const BillboardPage=async(
    { params
    }:BillboardPageProps
)=> {
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