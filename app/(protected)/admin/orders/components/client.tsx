"use client";

import { Heading } from "@/components/ui/heading";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  console.log(data);
  const [filter, setFilter] = useState("Completed");
  const filterData = data.filter(
    (order) =>
      order.paymentStatus.toLocaleLowerCase() === filter.toLocaleLowerCase()
  );
  const statuses = ["Pending", "Completed", "Abandoned", "Returned"];
  return (
    <>
      <div className="flex gap-10">
        {statuses.map((status) => {
          return (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              className={`${
                filter === status
                  ? "bg-gray-200 text-black" // Selected button style
                  : "" // Non-selected button style
              }`}
            >
              {status}
            </Button>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage Orders "
        />
      </div>
      <DataTable columns={columns} data={filterData} searchKey="products" />
    </>
  );
};
