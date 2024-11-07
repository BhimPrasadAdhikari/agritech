"use client"

import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/heading"
import { PlusIcon } from "lucide-react"
import { useParams,useRouter } from "next/navigation"
import { SpecificationColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"
import * as mongoose from 'mongoose'
interface SpecificationClientProps{
    data: SpecificationColumn[]
}
export const SpecificationClient:React.FC<SpecificationClientProps>=({
    data
})=>{
    const router =useRouter()
    const params=useParams()
    const fakeObjectId= new mongoose.Types.ObjectId();

    return(
        <>
        <div className="flex items-center justify-between">
           <Heading 
           title={`Specifications (${data.length})`}
           description="Manage Specifications For Your Store"
           />
           <Button onClick={()=>router.push(`/admin/specifications/${fakeObjectId}`)}>
            <PlusIcon className="mr-2 h-4 w-4"/>
            Add New
           </Button>
        </div>
        <hr/>
        <DataTable columns={columns} data={data} searchKey="name"/>
 <ApiList entityName="specifications" entityIdName="specificationId"/>
        </>
    )
}