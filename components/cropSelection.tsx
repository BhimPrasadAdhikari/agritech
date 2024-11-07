// components/CropSelection.tsx

import React, { useState } from "react";
import data from "@/utils/data";
import { motion } from "framer-motion";

const CropSelection: React.FC<{ onCropSelect: (cropName: string) => void }> = ({
  onCropSelect,
}) => {
  const [selectedCrop, setSelectedCrop] = useState("");

  const handleCropChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cropName = event.target.value;
    setSelectedCrop(cropName);
    onCropSelect(cropName);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <label
        htmlFor="crop-select"
        className="block text-lg font-medium text-gray-700"
      >
        Select a Crop:
      </label>
      <select
        id="crop-select"
        value={selectedCrop}
        onChange={handleCropChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      >
        <option value="">--Choose a crop--</option>
        {data.cropsInfo.map((crop) => (
          <option key={crop.cropName} value={crop.cropName}>
            {crop.cropName}
          </option>
        ))}
      </select>
    </motion.div>
  );
};

export default CropSelection;
