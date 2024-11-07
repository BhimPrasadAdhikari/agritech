import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async () => {
  try {
    const Products = await prismadb.product.findMany({
      include: {
        category: true,
        subCategory: true,
        productSpecification: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const formattedProducts: ProductColumn[] = Products.map((item) => ({
      id: item.id,
      name: item.name,
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      price: formatter.format(item.price),
      discount: `${item.discount}%`,
      category: item.category.name,
      subCategory: item.subCategory?.name,
      images: item.images,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));
    console.log(formattedProducts);
    return (
      <div className="flex-col m-10">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductClient data={formattedProducts} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("ProductsPage", error);
  }
};

export default ProductsPage;
