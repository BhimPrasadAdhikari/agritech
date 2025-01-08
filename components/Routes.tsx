"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { AlignJustify } from "lucide-react";

interface RoutesProps {
  data: { name: string; href:string;Icon?: ReactNode}[];
}
const Routes: React.FC<RoutesProps> = ({ data }) => {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const routes = data?.map((route) => ({
    href:route.href,
    label: route.name,
    active: pathname === route.href,
    Icon: route.Icon,
  }));
  return (
    <>
      {/* Dropdown Menu for mobile view */}
      <div className="relative lg:hidden md:hidden">
        <Button onClick={() => setShowDropdown(!showDropdown)}>
          <AlignJustify />
        </Button>

        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute z-50 border bg-white      shadow-md rounded"
        >
          {showDropdown &&
            routes.map((route) => (
              <motion.li
                key={route.label}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <Link href={route.href} className="flex">
                  <span className="text-green-500">{route.Icon}</span>
                  {route.label}
                </Link>
              </motion.li>
            ))}
        </motion.ul>
      </div>
      {/* Horizontal Navigation for larger screens */}

      <nav className="hidden md:flex flex-row items-center space-x-4 lg:space-x-6 ">
        <ul className="flex space-x-4 flex-wrap justify-center md:justify-start flex-shrink-0">
          {routes.map((route) => (
            <li key={route.label}>
              {/* Motion for links */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }} // Rotate on hover
                initial={{ opacity: 0 }} // Start invisible
                animate={{ opacity: 1 }} // Animate to visible
                exit={{ opacity: 0 }} // Animate out on exit
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={route.href}
                  className={cn(
                    "text-gray-700 flex hover:text-green-600",
                    route.active
                      ? "text-green-600 "
                      : "text-gray-500"
                  )}
                >
                  {/* <span className="text-green-500">{route.Icon}</span> */}

                  {route.label}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Routes;
