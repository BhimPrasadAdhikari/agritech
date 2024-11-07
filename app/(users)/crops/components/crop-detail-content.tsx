// components/crop-detail-content.tsx
import { motion } from "framer-motion";

interface CropDetailContentProps {
  crop: {
    scientificName: string;
    cultivationSeason: string;
  };
}

const CropDetailContent: React.FC<CropDetailContentProps> = ({ crop }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 rounded-lg bg-green-50 text-green-800"
    >
      <p className="text-lg font-semibold">
        Scientific Name: <span className="font-normal">{crop.scientificName}</span>
      </p>
      <p className="text-lg font-semibold mt-2">
        Cultivation Season: <span className="font-normal">{crop.cultivationSeason}</span>
      </p>
    </motion.div>
  );
};

export default CropDetailContent;
