// components/Layout.tsx
"use client"; // Ensure this is used in a client-side component

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col bg-white min-h-screen dark:bg-black"> {/* Ensure the layout takes up full height */}
      <motion.main
        initial={{ opacity: 0, scale: 0.95 }} // Start small and transparent
        animate={{ opacity: 1, scale: 1 }} // Animate to full size and opacity
        exit={{ opacity: 0, scale: 0.95 }} // Animate out
        transition={{ duration: 0.5 }} // Duration for the transition
        className="flex-grow p-3" // Ensures this part grows to fill the available space
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
