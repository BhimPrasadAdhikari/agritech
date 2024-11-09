"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
type DiseaseInfo = {
  prevention: string;
  fertilizers: string;
  expertAdvice: string;
};

const diseaseInfo: Record<string, DiseaseInfo> = {
  Pepper__bell___Bacterial_spot: {
    prevention: "Use resistant varieties. Apply copper-based fungicides.",
    fertilizers: "Balanced NPK fertilizers, especially high in Potassium.",
    expertAdvice: "Avoid overhead irrigation. Rotate crops yearly.",
  },
  Pepper__bell___healthy: {
    prevention: "Maintain healthy soil with regular composting.",
    fertilizers: "Regular use of balanced fertilizers.",
    expertAdvice: "Keep plants well-watered, but avoid waterlogging.",
  },
  Potato___Early_blight: {
    prevention: "Use disease-resistant varieties, and apply fungicides.",
    fertilizers: "High Nitrogen fertilizers to boost plant health.",
    expertAdvice: "Ensure proper spacing to improve air circulation.",
  },
  // Add similar information for all other diseases...
};

const PredictPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await axios.post(
          "http://localhost:5000/predict", // Replace with your Flask API endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setPrediction(response.data.predicted_class);
      } catch (error) {
        toast.error('Something went wrong, try again later')
        setLoading(false)
        console.error("Error making prediction:", error);
      }finally{
        setLoading(false)
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 p-6 bg-green-50 rounded-lg shadow-lg">
      <h1 className="font-bold text-3xl text-green-700">
        Plant Disease Detection
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        {imageSrc && (
          <div className="relative w-32 h-32 mb-6">
            <Image
              src={imageSrc}
              alt="Uploaded plant"
              fill
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
        <Button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all"
        >
          Submit
        </Button>
      </form>

      {prediction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-4 bg-white p-4 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Disease Name: <strong>{prediction}</strong>
          </h2>

          <div>
            <h3 className="font-bold text-green-600">Prevention Techniques:</h3>
            <p>
              {diseaseInfo[prediction]?.prevention ||
                "No information available"}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-green-600">
              Recommended Fertilizers:
            </h3>
            <p>
              {diseaseInfo[prediction]?.fertilizers ||
                "No information available"}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-green-600">Expert Advice:</h3>
            <p>
              {diseaseInfo[prediction]?.expertAdvice ||
                "No information available"}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PredictPage;
