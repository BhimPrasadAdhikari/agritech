// pages/plantCrop.tsx
import React, {useState } from "react";
import { getWateringSchedule } from "@/utils/wateringSchedule";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CropSelection from "./cropSelection";
const PlantationForm: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [soilType, setSoilType] = useState("");
  const [preferredFertilizer, setPreferredFertilizer] = useState("");
  const [notificationPreference, setNotificationPreference] = useState("email");
  const [wateringDetails, setWateringDetails] = useState<{ nextWateringDate: Date; schedule: string | undefined } | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const handleCropSelect = (cropName: string) => {
    setSelectedCrop(cropName);
    const schedule = getWateringSchedule(cropName);
    setWateringDetails(schedule);
    setError(""); // Clear error if crop is selected
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedCrop || !soilType || !preferredFertilizer) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    if (wateringDetails) {
      console.log("Planting details:", {
        crop: selectedCrop,
        soilType,
        preferredFertilizer,
        notificationPreference,
        wateringDetails,
      });

      setSuccessMessage("Crop planted successfully!");
      setTimeout(() => {
        router.push("/"); // Redirect to home or dashboard
      }, 2000);
    }
  };
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto p-6 bg-white      rounded-lg shadow-lg mt-10 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Plant a Crop</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CropSelection onCropSelect={handleCropSelect} />
          <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <label className="block text-gray-700">Soil Type</label>
            <select
              className="w-full p-2 border rounded-md"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              required
            >
              <option value="" disabled>Select soil type</option>
              <option value="sandy">Sandy</option>
              <option value="clay">Clay</option>
              <option value="silty">Silty</option>
              <option value="loamy">Loamy</option>
            </select>
          </motion.div>

          <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <label className="block text-gray-700">Preferred Fertilizer</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={preferredFertilizer}
              onChange={(e) => setPreferredFertilizer(e.target.value)}
              placeholder="Enter preferred fertilizer"
              required
            />
          </motion.div>

          <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <label className="block text-gray-700">Notification Preference</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="email"
                  checked={notificationPreference === "email"}
                  onChange={() => setNotificationPreference("email")}
                />
                Email
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="sms"
                  checked={notificationPreference === "sms"}
                  onChange={() => setNotificationPreference("sms")}
                />
                SMS
              </label>
            </div>
          </motion.div>

          {error && <p className="text-red-500">{error}</p>}
          {wateringDetails && (
            <div className="mt-4">
              <p className="text-lg font-medium text-gray-700">
                Next Watering Date:{" "}
                <span className="font-normal text-gray-500">{wateringDetails.nextWateringDate.toDateString()}</span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                Watering Schedule:{" "}
                <span className="font-normal text-gray-500">{wateringDetails.schedule}</span>
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white     py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Submit Planting Details
          </button>
        </form>
        {successMessage && (
          <motion.p
            className="mt-4 text-green-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {successMessage}
          </motion.p>
        )}
      </motion.div>
    );
};

export default PlantationForm;
