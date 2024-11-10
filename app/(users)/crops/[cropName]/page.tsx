// pages/crops/[cropName]/page.tsx
"use client";

import { motion } from "framer-motion";
import data from "@/utils/data";
import CropDetailHeader from "@/components/crop-detail-header";
import CropDetailContent from "@/components/crop-detail-content";
import CropDetailDiseases from "@/components/crop-detail-diseases";
import CropDetailFertilizers from "@/components/crop-detail-fertilizers";
import CropDetailRecommendations from "@/components/crop-detail-recommendations";
import React from "react";
import { FaLeaf } from "react-icons/fa"; // Agriculture icon
import { use } from 'react'
 
type Params = Promise<{ cropName: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
 
const CropPage= (
 props:{ params: Params
  searchParams: SearchParams}

) => {

  const params = use(props.params)
  const searchParams = use(props.searchParams)
  const cropName = params.cropName
  const query = searchParams.query
  const crop = data.cropsInfo.find((c) => c.cropName === cropName);
  const diseases = crop?.diseases;
  const fertilizers = crop?.diseases.map((d) => d.fertilizers).flat();

  if (!crop) return <p>Loading...</p>;

  return (
    <>
    
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-b from-green-50 to-green-100 text-green-900"
        >
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-center gap-4 mb-4">
              <FaLeaf className="text-green-700 text-3xl" />
              <h1 className="text-4xl font-bold">{crop.cropName}</h1>
            </div>
            <CropDetailHeader
              crop={{
                cropName: crop.cropName,
                imageUrl: crop.imageUrl,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-4 rounded-lg shadow-lg mt-6"
            >
              <CropDetailContent
                crop={{
                  scientificName: crop.scientificName,
                  cultivationSeason: crop.cultivationSeason,
                }}
              />
              <div className="mt-8">
                <CropDetailDiseases diseases={diseases} />
              </div>
              <div className="mt-8">
                <CropDetailFertilizers fertilizers={fertilizers} />
              </div>
              <div className="mt-8">
                <CropDetailRecommendations />
              </div>
            </motion.div>
          </div>
        </motion.div>
      
    </>
  );
};

export default CropPage;
