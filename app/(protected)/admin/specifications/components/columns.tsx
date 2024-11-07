"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SpecificationColumn = {
  id: string;
  name: string;
  values: string; // Updated from value to values
  categoryName: string;
  createdAt: string;
};

export const columns: ColumnDef<SpecificationColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "values", // Changed from "value" to "values"
    header: "Values", // Changed header text for clarity
    cell: ({ row }) => row.original.values, // Use row.original.values directly
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.categoryName,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
