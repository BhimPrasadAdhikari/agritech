import React from "react";

// components/CropDetailHeader.tsx
interface CropDetailHeaderProps{
    crop:{
        cropName:string;
        imageUrl:string;
    }
}
const CropDetailHeader:React.FC<CropDetailHeaderProps> = ({ crop }) => {
    return (
      <div className="bg-cover bg-center h-64 flex items-center justify-center text-white" style={{ backgroundImage: `url(${crop.imageUrl})` }}>
        <h1 className="text-4xl font-bold">{crop.cropName}</h1>
      </div>
    );
  };
  
  export default CropDetailHeader;
  