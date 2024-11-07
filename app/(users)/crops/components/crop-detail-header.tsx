// components/crop-detail-header.tsx
import Image from "next/image";
import { motion } from "framer-motion";

interface CropDetailHeaderProps {
  crop: {
    cropName: string;
    imageUrl: string;
  };
}

const CropDetailHeader: React.FC<CropDetailHeaderProps> = ({ crop }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row items-center bg-green-50 p-4 rounded-lg shadow-md"
    >
      <Image
        src={crop.imageUrl}
        alt={crop.cropName}
        width={150}
        height={150}
        className="rounded-lg"
      />
      <div className="ml-4 mt-4 md:mt-0">
        <h2 className="text-3xl font-bold text-green-800">{crop.cropName}</h2>
      </div>
    </motion.div>
  );
};

export default CropDetailHeader;
