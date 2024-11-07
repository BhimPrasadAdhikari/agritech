// components/CropDetailDiseases.tsx
interface CropDetailDiseasesProps{
    diseases: {
        diseaseName: string;
        season: string;
        symptoms: string[];
        prevention: string[];
        fertilizers: {
            type: string;
            applicationTiming: string;
        };
    }[] | undefined
    
}
const CropDetailDiseases:React.FC<CropDetailDiseasesProps> = ({ diseases }) => {
    return (
      <div className="p-6">
        <h3 className="text-xl font-semibold">Diseases:</h3>
        <ul className="mt-4">
          {diseases?.map((disease) => (
            <li key={disease.diseaseName} className="border-b py-2">
              <h4 className="font-medium">{disease.diseaseName}</h4>
              <p>Symptoms: {disease.symptoms.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CropDetailDiseases;
  