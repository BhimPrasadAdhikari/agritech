// components/PlantDiseaseClassifier.tsx
"use client";
import { useState, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Image from "next/image";

const PlantDiseaseClassifier = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const classifyImage = async () => {
    if (imgRef.current) {
      await tf.setBackend("webgl");
      const model = await mobilenet.load();
      const predictions = await model.classify(imgRef.current);
      if (predictions && predictions.length > 0) {
        setPrediction(predictions[0].className); // Top prediction
      }
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Plant Disease Classifier</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="mb-4"
      />

      {imageSrc && (
        <div className="relative w-28 h-28 mb-4">
          <Image
            src={imageSrc}
            alt="Uploaded plant"
            fill
            ref={imgRef}
            className="w-full h-auto"
          />
        </div>
      )}

      <button
        onClick={classifyImage}
        className="bg-blue-500 text-white dark:text-blackpx-4 py-2 rounded hover:bg-blue-600"
      >
        Classify Image
      </button>

      {prediction && (
        <p className="mt-4 text-lg">
          Prediction: <strong>{prediction}</strong>
        </p>
      )}
    </div>
  );
};

export default PlantDiseaseClassifier;
