/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
const revalidate = 0;
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ToastMessage({ message }: { message: string }) {
  const [status, setStatus] = useState(message);
  useEffect(() => {
    if (status === "COMPLETE" || status === "COMPLETED") {
      window.location.href = "/";
    }
  }, [status]);
  return toast.success(message);
}
