"use client";

import { useEffect, useState } from "react";

export const formatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "NPR",
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <p>{formatter.format(Number(value))}</p>;
};

export default Currency;
