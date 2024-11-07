"use client"

import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/heading"
import { PlusIcon } from "lucide-react"
import {useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"
import * as mongoose from 'mongoose'
interface CategoryClientProps{
    data: CategoryColumn[]
}
export const BillboardClient:React.FC<CategoryClientProps>=({
    data
})=>{
    const router =useRouter()
    const fakeObjectId= new mongoose.Types.ObjectId();

    return(
        <>
        <div className="flex items-center justify-between">
           <Heading 
           title={`Categories (${data.length})`}
           description="Manage Categories For Your Billboards"
           />
           <Button onClick={()=>router.push(`/admin/categories/${fakeObjectId}`)}>
            <PlusIcon className="mr-2 h-4 w-4"/>
            Add New
           </Button>
        </div>
        <hr/>
        <DataTable columns={columns} data={data} searchKey="name"/>
 <ApiList entityName="categories" entityIdName="billboardId"/>
        </>
    )
}