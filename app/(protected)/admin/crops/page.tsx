import { format } from "date-fns";
import { CropColumn } from "./components/columns";
import { CropClient } from "./components/client";

const ProductsPage = async () => {
  // const Crops = await prismadb.crop.findMany({
  //   include: {
  //     wateringSchedule: true,
  //     diseases: {
  //       include:{
  //           symptoms:true,
  //           preventions:true,
  //           fertilizers:true
  //       }
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  const Crops = [
    {
      id: "1",
      cropName: "Rice",
      createdAt: new Date(),
      scientificName: "Oryza sativa",
      cultivationSeason: "May to September",
      imageUrl: "/images/rice.jpg",
      wateringSchedule: "Every 5 days",
      wateringInterval: 5, // in days
      diseases: [
        {
          diseaseName: "Bacterial Blight",
          season: "Rainy",
          symptoms: [
            { description: "Water-soaked lesions on leaves" },
            { description: "Yellowing of leaf margins" },
            { description: "Plant stunting" },
          ],
          preventions: [
            { description: "Use resistant varieties" },
            { description: "Practice crop rotation" },
            { description: "Ensure proper drainage" },
          ],
          fertilizers: {
            types: "Nitrogen, Phosphorus, and Potassium (NPK)",
            applicationTiming: "Apply before planting and at tillering stage",
          },
        },
        {
          diseaseName: "Rice Blast",
          season: "Warm and humid",
          symptoms: [
            { description: "Water-soaked lesions on leaves" },
            { description: "Yellowing of leaf margins" },
            { description: "Plant stunting" },
          ],
          preventions: [
            { description: "Water-soaked lesions on leaves" },
            { description: "Yellowing of leaf margins" },
            { description: "Plant stunting" },
          ],
          fertilizers: {
            types: "NPK, with emphasis on Nitrogen",
            applicationTiming: "Apply at planting and at early tillering",
          },
        },
      ],
    },
  ];
  console.log(Crops);
  const formattedCrops: CropColumn[] = Crops.map((crop) => ({
    id: crop.id,
    name: crop.cropName,
    diseases: crop.diseases.map((disease) => {
      return {
        diseaseName: disease.diseaseName,
        symptoms: disease.symptoms.map((s) => s.description).join(","),
        preventions: disease.preventions.map((p) => p.description).join(","),
        fertilizers: disease.fertilizers?.types,
      };
    }),
    createdAt: format(crop.createdAt, "MMMM do, yyyy"),
  }));
  console.log(formattedCrops);
  return (
    <div className="flex-col m-10">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CropClient data={formattedCrops} />
      </div>
    </div>
  );
};

export default ProductsPage;
