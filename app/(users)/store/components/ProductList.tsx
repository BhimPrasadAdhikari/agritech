"use client"

import { useState } from "react";
import CategoryList from "./CategoryList";
import ProductCard from "./ProductCard";
import MobileCategoryList from "./MobileCategoryList";

interface Category {
    id: string;
    name: string;
    subCategories: { id: string; name: string }[];
  }
interface ProductListProps {
    products: {
      id:string,
      name:string,
      description:string,
      discount:number,
      images:{url:string}[],
      ratings:{rating:number}[],
      price:number,
      discountedPrice:number,
      category:string,
      subCategory:string,
      productSpecifications:{name:string,value:string}[]
  
    }[];
    categories: Category[] | undefined;

  }
const ProductList:React.FC<ProductListProps> =({products,categories})=>{
     const[category,setCategory] = useState<string | null>(null);
     const setFilter =(category:string)=>{
        setCategory(category);
     }
    const filterProducts =category?products.filter(p=>p.category===category || p.subCategory===category):products
    return (
        <>
        <div className="hidden md:block">
        <CategoryList categories={categories} setFilter={setFilter}/>
        </div>
        <div className="block md:hidden"> {/* Mobile View */}
        <MobileCategoryList categories={categories} setFilter={setFilter} />
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {filterProducts && filterProducts.length > 0 ? (
                    filterProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} /> {/* Pass a single product here */}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No products available.</p>
                )}
            </div>
            </>
    )
}
export default ProductList;