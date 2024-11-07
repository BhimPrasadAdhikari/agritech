// components/CropSection.tsx
import CropCard from "./crop-card";
import data from "../utils/data"; // Adjust the import path based on your project structure

const CropSection = () => {
  // Get the current month (0 = January, 1 = February, ..., 11 = December)
  const currentMonth = new Date().getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Cultivation months for crops (1-based index for month numbers)

  // Filter crops based on current month
  const currentCrops = data.cropsInfo.filter((crop) => {
    const cropMonths = crop.cultivationSeason.split(" to ");
    const startMonth = monthNames.indexOf(cropMonths[0]) + 1; // Convert to 1-based month index
    const endMonth = monthNames.indexOf(cropMonths[1]) + 1;

    // Check if the current month is in the cultivation range
    return currentMonth + 1 >= startMonth && currentMonth + 1 <= endMonth;
  });

  return (
    <>
      <section className="py-8 px-4">
        <h2 className="text-3xl font-semibold">
          Recommended Crops for {monthNames[currentMonth]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCrops.map((crop, index) => (
            <CropCard
              key={index}
              crop={{
                name: crop.cropName,
                image: crop.imageUrl, // Use the image URL from cropsInfo
                description: `Best for: ${crop.cultivationSeason}`, // Use cultivation season from cropsInfo
              }}
            />
          ))}
        </div>
      </section>
      <section className="py-8 px-4">
        <h2 className="text-3xl font-semibold">Crops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.cropsInfo.map((crop, index) => (
            <CropCard
              key={index}
              crop={{
                name: crop.cropName,
                image: crop.imageUrl, // Use the image URL from cropsInfo
                description: `Best for: ${crop.cultivationSeason}`, // Use cultivation season from cropsInfo
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default CropSection;
