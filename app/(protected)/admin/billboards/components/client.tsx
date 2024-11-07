"use client"

import { Button } from "@/components/ui/Button"
import { Heading } from "@/components/ui/heading"
import { PlusIcon } from "lucide-react"
import {useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"
import * as mongoose from 'mongoose'
interface BillboardClientProps{
    data: BillboardColumn[]
}

export const BillboardClient:React.FC<BillboardClientProps>=({
    data
})=>{
    const router =useRouter()
    const fakeObjectId= new mongoose.Types.ObjectId();

    return(
        <>
        <div className="flex items-center justify-between">
           <Heading 
           title={`Billboards (${data.length})`}
           description="Manage Billboards For Your Store"
           />
           <Button onClick={()=>router.push(`/admin/billboards/${fakeObjectId}`)}>
            <PlusIcon className="mr-2 h-4 w-4"/>
            Add New
           </Button>
        </div>
        <hr/>
        <DataTable columns={columns} data={data} searchKey="label"/>
 <ApiList entityName="billboards" entityIdName="billboardId"/>
        </>
    )
}