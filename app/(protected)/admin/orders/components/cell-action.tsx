"use client";
import axios from "axios";
import React, { useState } from "react";
import { OrderColumn } from "./columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/Button";
import { MoreHorizontal, TrashIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CellActionProps {
  data: OrderColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onDeliver = async () => {
    setLoading(true);

    try {
      await axios.patch(`/api/orders/${data.id}`, {
        orderStatus: "Delivered",
      });
      router.refresh();
      toast.success("Status updated to Delivered");
    } catch (error) {
      console.error("ORDERS_UPDATE", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    setLoading(true);

    try {
      await axios.delete(`/api/orders/${data.id}`);
      router.refresh();
      toast.success("Order Deleted");
    } catch (error) {
      console.error("ORDERS_DELETE", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onNotDeliverd = async () => {
    setLoading(true);

    try {
      await axios.patch(`/api/orders/${data.id}`, {
        orderStatus: "Not Delivered",
      });
      router.refresh();
      toast.success("Status updated to Not Delivered");
    } catch (error) {
      console.error("ORDERS_UPDATE", error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onComplete = async (paymentStatus: string) => {
    setLoading(true);

    try {
      await axios.patch(`/api/orders/${data.id}`, {
        isPaid: true,
        paymentStatus,
      });
      router.refresh();
      toast.success("Status updated to complete");
    } catch (error) {
      console.error("ORDERS_UPDATE", error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onAbandoned = async (paymentStatus: string) => {
    setLoading(true);

    try {
      await axios.patch(`/api/orders/${data.id}`, {
        isPaid: false,
        paymentStatus,
      });
      router.refresh();
      toast.success("Status updated to Abandoned");
    } catch (error) {
      console.error("ORDERS_UPDATE", error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onRefunded = async (paymentStatus: string) => {
    setLoading(true);

    try {
      await axios.patch(`/api/orders/${data.id}`, {
        isPaid: false,
        paymentStatus,
      });
      router.refresh();
      toast.success("Status updated to Refunded");
    } catch (error) {
      console.error("ORDERS_UPDATE", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onPending = async (paymentStatus: string) => {
    setLoading(true);

    try {
      await axios.patch(`/api/orders/${data.id}`, {
        isPaid: false,
        paymentStatus,
      });
      router.refresh();
      toast.success("Status updated to Pending");
    } catch (error) {
      console.error("ORDERS_UPDATE", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={loading}>
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onComplete("Completed")}
            disabled={loading}
          >
            Completed
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onAbandoned("Abandoned")}
            disabled={loading}
          >
            abandoned
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onRefunded("Refunded")}
            disabled={loading}
          >
            refunded
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onPending("Pending")}
            disabled={loading}
          >
            Pending
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onDeliver} disabled={loading}>
            Delivered
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onNotDeliverd} disabled={loading}>
            Not Delivered
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} disabled={loading}>
            <Button variant="destructive" disabled={loading}>
              <TrashIcon size={15} />
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
