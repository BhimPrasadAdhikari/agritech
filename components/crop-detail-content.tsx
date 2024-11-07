// components/CropDetailContent.tsx
interface CropDetailContentProps{
    crop:{
        scientificName:string;
        cultivationSeason:string;
    }
}
const CropDetailContent:React.FC<CropDetailContentProps> = ({ crop }) => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Scientific Name: {crop.scientificName}</h2>
        <p className="mt-2 text-gray-700">Cultivation Season: {crop.cultivationSeason}</p>
      </div>
    );
  };
  
  export default CropDetailContent;
  