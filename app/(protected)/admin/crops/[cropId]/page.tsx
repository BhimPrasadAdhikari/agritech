import prismadb from '@/lib/prismadb';
import CropForm from './components/crop-setting';
import { isObjectIdOrHexString } from 'mongoose';
const ProductPage = async ({
  params,
}: {
  params: { cropId: string };
}) => {
  if(isObjectIdOrHexString(params.cropId)){
  const Crop = await prismadb.crop.findUnique({
    where: {
      id: params.cropId,
    },
    include: {
        wateringSchedule:true,
        diseases:true,
    },
  });
  return (
    <div className='m-5 p-2'>
       {Crop?.cropName}
      <CropForm
        initialData={Crop}
      />
    </div>
  );}
  return <p>not found</p>
};

export default ProductPage;
