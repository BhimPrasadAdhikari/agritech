import {format} from "date-fns"
import prismadb from "@/lib/prismadb"
import { BillboardClient } from "./components/client"
import { BillboardColumn } from "./components/columns"


const BillboardsPage =async (
) => {
    const billboards= await prismadb.billboard.findMany({
        orderBy:{
            createdAt:'desc'
        } 
    })
 const formattedBillboards: BillboardColumn[]=billboards.map(item=>({
    id:item.id,
    label:item.label,
    imageUrl:item.imageUrl,
    createdAt:format(item.createdAt,"MMMM do, yyyy")

 }))
    return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formattedBillboards}/>
        </div>

    </div>

  )
}

export default BillboardsPage