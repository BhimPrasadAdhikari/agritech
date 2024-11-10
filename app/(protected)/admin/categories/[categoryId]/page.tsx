import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-setting";

const CategoryPage = async (props: { params: Promise<{categoryId:string}> }) => {
  const params = await props.params

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    orderBy:{
        createdAt:'asc'
    }
  });

  return (
    <div>
      existing category {category?.name}
      <CategoryForm billboards={billboards} initialData={category} />
    </div>
  );
};

export default CategoryPage;
