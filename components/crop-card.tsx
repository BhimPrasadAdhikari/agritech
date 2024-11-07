// components/CropSection.tsx
"use client"; // Add this line

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
interface CropCardProps {
  crop: { name: string; image: string; description: string };
}

const CropCard: React.FC<CropCardProps> = ({ crop }) => (
  <Link href={`/crops/${encodeURIComponent(crop.name)}`}>
    <motion.div
      className="bg-white dark:bg-black shadow-lg p-4 rounded-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image
        src={crop.image}
        alt={crop.name}
        width={400} // Set a suitable width
        height={200} // Set a suitable height
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <h3 className="text-xl font-bold mt-2">{crop.name}</h3>
      <p>{crop.description}</p>
    </motion.div>
  </Link>
);
export default CropCard;
