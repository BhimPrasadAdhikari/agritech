// utils/wateringSchedule.ts

import data from "./data";

export const getWateringSchedule = (cropName: string) => {
  const crop = data.cropsInfo.find((c) => c.cropName === cropName);
  if (!crop) {
    throw new Error("Crop not found");
  }

  // Calculate next watering date by adding the wateringInterval to today's date
  const today = new Date();
  const nextWateringDate = new Date(today);
  nextWateringDate.setDate(today.getDate() + Number(crop.wateringInterval));

  return {
    schedule: crop.wateringSchedule,
    nextWateringDate,
  };
};
