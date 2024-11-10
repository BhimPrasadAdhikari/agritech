import prismadb from '@/lib/prismadb';
import { SpecificationForm } from './components/specification-setting';
const SpecificationPage = async (props: {
  params: Promise<{ specificationId: string }>;
}) => {
  const params = await props.params;
  const Specification = await prismadb.specification.findUnique({
    where: {
      id: params.specificationId,
    },
  });
  const categories=await prismadb.category.findMany(
   {
    orderBy:{
      createdAt:'asc'
    }
   }
 )
 
  return (
    <div>
      existing Specification {Specification?.name}
      <SpecificationForm
        initialData={Specification}
        categories={categories}
      />
    </div>
  );
};

export default SpecificationPage;
