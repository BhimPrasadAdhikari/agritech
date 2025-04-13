/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import StatsDisplay from "./StatsDisplay";
// Get the Unix timestamp for January 1, 2024
const startDate = Math.floor(new Date("2020-10-30").getTime() / 1000);

// Get the current date as Unix timestamp
const endDate = Math.floor(Date.now() / 1000);

type FieldDataPanelProps = {
  coordinates: { lat: number; lng: number }[];
};
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
type Field = {
  id: string;
  name: string;
  area: number;
};
type SatelliteImage = {
  dt: number;
  type: string;
  images: Record<string, any>[];
  stats: StatItem[];
};
const FieldDataPanel: React.FC<FieldDataPanelProps> = ({ coordinates }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedPolygonId, setSelectedPolygonId] = useState<string | null>(
    null
  );
  const [satelliteData, setSatelliteData] = useState<SatelliteImage[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(satelliteData);
  useEffect(() => {
    async function fetchPolygons() {
      try {
        const response = await axios.get("/api/polygons");
        setFields(response.data);
      } catch (error) {
        console.error("Error fetching polygons", error);
      }
    }
    fetchPolygons();
  }, []);
  useEffect(() => {
    async function fetchSatelliteData() {
      try {
        const response = await axios.get(
          `/api/satellite-images?polyid=${selectedPolygonId}&start=${startDate}&end=${endDate}`
        );
        setSatelliteData(response.data);
      } catch (error) {
        console.error("Error fetching satellite data:", error);
      }
    }

    if (selectedPolygonId) {
      fetchSatelliteData();
    }
  }, [selectedPolygonId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-4 bg-white border border-green-700 rounded-lg shadow-lg w-full"
    >
      <h2 className="text-xl font-semibold text-green-800">Field Data</h2>
      {!selectedPolygonId && (
        <div className="mt-2 flex  lg:flex-row gap-10 flex-col">
          {fields.length > 0 ? (
            fields.map((field) => (
              <motion.button
                key={field.id}
                onClick={() => setSelectedPolygonId(field.id)}
                className="border shadow-sm p-2 hover:bg-gray-400"
              >
                <h3>{field.name}</h3>
                <span>Area: {field.area} sq km</span>
              </motion.button>
            ))
          ) : (
            <p>Loading fields...</p>
          )}
        </div>
      )}

      {selectedPolygonId && (
        <div>
          <button
            onClick={() => setSelectedPolygonId(null)}
            className="mt-4 text-blue-500 underline"
          >
            Back to Fields
          </button>
          <h3 className="mt-4 text-lg font-semibold text-green-800">
            Satellite Images and Stats
          </h3>
          {loading ? (
            <p>Loading satellite images and stats...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {satelliteData.map((item, index) => (
                <div key={index} className="border p-2 rounded">
                  <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
                  <p>Type: {item.type}</p>
                  <div>
                    {item.images.map((img, idx) => (
                      <div key={idx} className="mt-2">
                        <p className="font-semibold">
                          {img.feature.toUpperCase()}
                        </p>
                        {img.url ? (
                          <div className="relative h-48 mt-2 rounded overflow-hidden">
                            <Image
                              src={img.url}
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              alt={`Satellite image`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <p>Image loading...</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <StatsDisplay statsData={item.stats} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default FieldDataPanel;
