// app/diseases/page.tsx
import prismadb from "@/lib/prismadb";
import { motion } from "framer-motion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crop Diseases Information",
  description:
    "Discover information about various crop diseases and treatments",
};

// Fetch diseases data from Prisma
async function fetchDiseases() {
  try {
    const diseases = await prismadb.disease.findMany({
      include: { crop: true },
    });
    return diseases;
  } catch (error) {
    console.error("Error fetching diseases:", error);
    return [];
  }
}

export default async function DiseasesPage() {
  const diseases = await fetchDiseases();

  return (
    <>
      
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
          <h1 className="text-4xl font-bold text-center text-green-900 mb-8">
            Crop Diseases Information
          </h1>
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {diseases.length > 0 ? (
              diseases.map((disease) => (
                <motion.div
                  key={disease.id}
                  className="bg-white      shadow-lg rounded-lg p-6 border-l-4 border-green-500"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h2 className="text-2xl font-semibold text-green-700 mb-2">
                    {disease.diseaseName}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Affected Crop:</strong> {disease.crop.cropName}
                  </p>
                  <p className="text-gray-700 mb-2">{disease.symptoms}</p>
                  <h3 className="text-lg font-medium text-green-600">
                    Symptoms
                  </h3>
                  <p className="text-gray-600 mb-3">{disease.symptoms}</p>
                  <h3 className="text-lg font-medium text-green-600">
                    Treatment
                  </h3>
                  <p className="text-gray-600">{disease.preventions}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No disease information available.
              </p>
            )}
          </div>
        </div>
      
    </>
  );
}
