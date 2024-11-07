"use client"

import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/heading"
import { PlusIcon } from "lucide-react"
import {useRouter } from "next/navigation"
import { SubCategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"
import * as mongoose from 'mongoose'
interface SubCategoryClientProps{
    data: SubCategoryColumn[]
}
export const SubCategoryClient:React.FC<SubCategoryClientProps>=({
    data
})=>{
    const router =useRouter()
    const fakeObjectId= new mongoose.Types.ObjectId();

    return(
        <>
        <div className="flex items-center justify-between">
           <Heading 
           title={`Sub-Categories (${data.length})`}
           description="Manage Sub-Categories For Your Categories"
           />
           <Button onClick={()=>router.push(`/admin/subcategories/${fakeObjectId}`)}>
            <PlusIcon className="mr-2 h-4 w-4"/>
            Add New
           </Button>
        </div>
        <hr/>
        <DataTable columns={columns} data={data} searchKey="name"/>
 <ApiList entityName="subcategories" entityIdName="categoryId"/>
        </>
    )
}