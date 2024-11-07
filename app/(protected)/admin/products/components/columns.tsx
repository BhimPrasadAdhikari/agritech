"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { Image as ImageType } from "@prisma/client"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  price:string
  category:string
  subCategory:string | undefined
  images:ImageType[]
  isFeatured:boolean
  isArchived:boolean
  createdAt:string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey:"images",
    header:"Images",
    cell:({row})=>{
      const images = row.original.images;
      console.log(images)
     return <div>
      {images.length>0 &&
      images.map((image)=>(
        <div key={image.id} className="w-32 h-32 relative">
          <Image 
          src={image.url}
          alt="product Image"
          fill
          className=""
          />
        </div>
      )
    )
    }
    </div>

    }

  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey:"discount",
    header:"Discount"

  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "subCategory",
    header: "Sub-Category",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
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
