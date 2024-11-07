import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";

type StatData = {
  std: number;
  p25: number;
  num: number;
  min: number;
  max: number;
  median: number;
  p75: number;
  mean: number;
};
type StatItem = {
  feature: string;
  data: StatData;
};

type StatsDisplayProps = {
  statsData: StatItem[];
};

const StatsDisplay: React.FC<StatsDisplayProps> = ({ statsData }) => {
  const [selectedStat, setSelectedStat] = useState<string>(
    statsData[0]?.feature || ""
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStat(e.target.value);
  };

  const getRecommendations = (feature: string, stats: StatData) => {
    let recommendations = "";
    switch (feature) {
      case "evi":
        if (stats.mean < 0.2) {
          recommendations =
            "The vegetation is under severe stress. **Action Required**: Increase irrigation and consider using nutrient-rich fertilizers.";
        } else if (stats.mean < 0.3) {
          recommendations =
            "The vegetation shows some stress. **Recommendation**: Monitor irrigation levels and apply fertilizers as needed.";
        } else {
          recommendations =
            "The vegetation is healthy. **Keep it up**: Continue current practices.";
        }
        break;

      case "ndvi":
        if (stats.mean < 0.2) {
          recommendations =
            "Low NDVI values indicate poor vegetation health. **Action Needed**: Check soil quality and water supply.";
        } else if (stats.mean < 0.5) {
          recommendations =
            "Moderate NDVI values suggest good vegetation health. **Tip**: Regular monitoring is recommended.";
        } else {
          recommendations =
            "High NDVI values indicate strong vegetation health. **Advice**: Maintain your current care routine.";
        }
        break;

      case "nri":
        if (stats.mean < 0.02) {
          recommendations =
            "Low NRI values indicate potential issues with soil moisture. **Action Needed**: Investigate soil drainage and moisture retention.";
        } else if (stats.mean < 0.06) {
          recommendations =
            "Moderate NRI values suggest good soil moisture, but be cautious. **Tip**: Consider routine checks on irrigation systems.";
        } else {
          recommendations =
            "High NRI values indicate healthy vegetation with adequate moisture. **Keep it up**: Maintain current practices.";
        }
        break;

      case "ndwi":
        if (stats.mean < 0.1) {
          recommendations =
            "Low NDWI values indicate dry vegetation. **Action Needed**: Increase irrigation and check soil moisture levels.";
        } else if (stats.mean < 0.15) {
          recommendations =
            "Moderate NDWI values suggest that water retention could improve. **Tip**: Ensure proper irrigation scheduling.";
        } else {
          recommendations =
            "High NDWI values indicate good water retention. **Advice**: Continue to monitor irrigation practices.";
        }
        break;

      case "evi2":
        if (stats.mean < 0.1) {
          recommendations =
            "Low EVI2 values suggest poor vegetation health. **Action Needed**: Implement soil improvement measures.";
        } else if (stats.mean < 0.15) {
          recommendations =
            "Moderate EVI2 values suggest potential for improvement. **Tip**: Assess nutrient application strategies.";
        } else {
          recommendations =
            "High EVI2 values indicate vigorous growth. **Keep it up**: Maintain effective fertilization practices.";
        }
        break;

      case "dswi":
        if (stats.mean > 1.2) {
          recommendations =
            "High DSWI values indicate very dry soil. **Action Required**: Increase irrigation immediately.";
        } else if (stats.mean > 1.0) {
          recommendations =
            "Moderate DSWI values suggest monitoring soil moisture levels. **Tip**: Use mulch to retain soil moisture.";
        } else {
          recommendations =
            "Low DSWI values indicate sufficient moisture. **Advice**: Continue current irrigation practices.";
        }
        break;

      default:
        recommendations = "No specific recommendations available.";
    }

    return recommendations;
  };

  const getStatDescription = (statType: string) => {
    switch (statType) {
      case "evi":
        return "Enhanced Vegetation Index (EVI) is used to assess vegetation health, particularly in areas with dense canopies. Higher values indicate healthier vegetation.";
      case "ndvi":
        return "Normalized Difference Vegetation Index (NDVI) measures the difference between near-infrared and red light to assess vegetation health. Values range from -1 to 1, where higher values indicate healthier vegetation.";
      case "nri":
        return "Normalized Residual Index (NRI) is a measure that indicates soil moisture levels and vegetation health. Positive values suggest healthy vegetation and adequate moisture.";
      case "ndwi":
        return "Normalized Difference Water Index (NDWI) helps assess water content in vegetation. Higher values indicate better water retention in crops.";
      case "evi2":
        return "EVI2 is a simplified version of EVI, focusing on vegetation density. It provides an indication of overall crop health and vigor.";
      case "dswi":
        return "Dry Soil Water Index (DSWI) measures soil moisture content. Higher values indicate drier soil, which may require irrigation.";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className="p-6 bg-white border border-green-700 rounded-lg shadow-lg w-full max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-2xl font-semibold text-green-800 mb-6">
        Field Statistics
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="stat-select">
          Select a Stat:
        </label>
        <select
          id="stat-select"
          className="border border-gray-300 rounded p-2 w-full"
          onChange={handleSelectChange}
          value={selectedStat}
        >
          {statsData &&
            statsData.map((statItem) => (
              <option key={statItem.feature} value={statItem.feature}>
                {statItem.feature.toUpperCase()}
              </option>
            ))}
        </select>
      </div>

      {selectedStat && statsData && (
        <div key={selectedStat} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            {selectedStat.toUpperCase()}
            <span className="ml-2 text-gray-500 tooltip">
              <FaInfoCircle className="inline" />
              <span className="tooltiptext">
                {getStatDescription(selectedStat)}
              </span>
            </span>
          </h3>

          <motion.div
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {statsData.map((statItem) =>
              statItem.feature === selectedStat
                ?<div key=''>
               { Object.entries(statItem.data).map(([key, value]) => (
                    <motion.div
                      key={key}
                      className="flex items-center space-x-4"
                      variants={itemVariants}
                    >
                      <span className="font-semibold w-20 text-green-700 capitalize">
                        {key}:
                      </span>
                      <span>{value.toFixed(4)}</span>
                      <div className="flex-grow bg-gray-300 h-2 rounded-lg overflow-hidden">
                        <motion.div
                          className="bg-green-500 h-full"
                          style={{
                            width: `${(value / statItem.data.max) * 100}%`,
                          }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(value / statItem.data.max) * 100}%`,
                          }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </motion.div>
                  ))}

                   {/* Recommendations Section */}
          <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
            <h4 className="font-semibold text-lg">Recommendations:</h4>
            <p>{getRecommendations(selectedStat,statItem.data)}</p>
          </div> 
                  </div>

                : null
            )
            
            }
          </motion.div>

         
        </div>
      )}
    </motion.div>
  );
};

export default StatsDisplay;
