import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { SubCategoryClient } from "./components/client";
import { SubCategoryColumn } from "./components/columns";

const SubCategoriesPage = async () => {
  const subCategories = await prismadb.subCategory.findMany({
    include: {
        category:true
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedSubCategories: SubCategoryColumn[] = subCategories.map((item) => ({
    id: item.id,
    name: item.name,
    categoryLabel: item.category.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubCategoryClient data={formattedSubCategories} />
      </div>
    </div>
  );
};

export default SubCategoriesPage;
