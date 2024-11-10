import prismadb from "@/lib/prismadb";

import { SubCategoryForm } from "./components/subcategory-setting";

const SubCategoryPage = async (props: {
  params: Promise<{ subcategoryId: string }>;
}) => {
  const params = await props.params;
  const subCategory = await prismadb.subCategory.findUnique({
    where: {
      id: params.subcategoryId,
    },
  });
  const categories = await prismadb.category.findMany();
  return (
    <div>
      Manage sub-category {subCategory?.name}
      <SubCategoryForm categories={categories} initialData={subCategory} />
    </div>
  );
};

export default SubCategoryPage;
