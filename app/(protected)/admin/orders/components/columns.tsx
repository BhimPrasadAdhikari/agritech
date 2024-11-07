"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
// import CellAction

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string
  paymentStatus: string
  orderStatus:string
  phone:string
  address:string
  totalPrice:string
  products:string
  quantities:string
  createdAt:string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "quantities",
    header: "Quantity",
  },
  {
    accessorKey: "sizes",
    header: "Size",
  },
  {
    accessorKey: "colors",
    header: "Color",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Contact",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  }, 
  {
    id:'actions',
    cell:({row})=><CellAction data={row.original}/>,
    header:"Update Status"
  },
]
