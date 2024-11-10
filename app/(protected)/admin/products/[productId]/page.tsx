import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-setting";
const ProductPage = async (props: {
  params: Promise<{ productId: string }>;
}) => {
  const params = await props.params;
  try {
    const Product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        productSpecification: true,
      },
    });
    const Categories = await prismadb.category.findMany();
    const subCategories = await prismadb.subCategory.findMany();

    return (
      <div className="m-5 p-2">
        existing Product {Product?.name}
        <ProductForm
          categories={Categories}
          subCategories={subCategories}
          initialData={Product}
        />
      </div>
    );
  } catch (error) {
    console.error("ProductPage", error);
  }
};

export default ProductPage;
