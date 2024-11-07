"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string
  label: string
  createdAt:string
  imageUrl :string
}
export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey:'imageUrl',
    header:'Image',
    cell:({row})=>{
      const imageUrl = row.original.imageUrl;
      return(
        <div className="w-32 h-32 relative">
          <Image 
          src={imageUrl}
          alt="product Image"
          fill
          className="object-contain"
          />
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id:'Actions',
    cell:({row})=><CellAction data={row.original} />,
    header:"Actions"
  }
 
]
