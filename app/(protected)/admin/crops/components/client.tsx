"use client";

import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/heading";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CropColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import * as mongoose from "mongoose";
interface CropClientProps {
  data: CropColumn[];
}
export const CropClient: React.FC<CropClientProps> = ({ data }) => {
  const router = useRouter();
  const fakeObjectId = new mongoose.Types.ObjectId();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Crops (${data.length})`} description="Manage Crops" />
        <Button onClick={() => router.push(`/admin/crops/${fakeObjectId}`)} className="bg-green-500 text-white">
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <hr />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
