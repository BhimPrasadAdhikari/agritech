"use client";

import { useEffect, useState } from "react";
import { Model } from "@/components/ui/model";
import { Button } from "@/components/ui/Button";

interface AlertModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
export const AlertModel: React.FC<AlertModelProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Model
        title="Are you sure?"
        description="This action can not be undone"
        onClose={onClose}
        isOpen={isOpen}
      >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </Model>
    </>
  );
};
