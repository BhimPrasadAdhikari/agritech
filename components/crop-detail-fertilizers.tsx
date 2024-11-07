// components/CropDetailFertilizers.tsx
interface CropDetailFertilizersProps{
    fertilizers: {
        type: string;
        applicationTiming: string;
    }[] | undefined
    
}
const CropDetailFertilizers:React.FC<CropDetailFertilizersProps> = ({ fertilizers }) => {
    return (
      <div className="p-6">
        <h3 className="text-xl font-semibold">Fertilizers:</h3>
        <ul className="mt-4">
          {fertilizers?.map((fertilizer) => (
            <li key={fertilizer.type} className="border-b py-2">
              <h4 className="font-medium">{fertilizer.type}</h4>
              <p>Apply: {fertilizer.applicationTiming}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CropDetailFertilizers;
  