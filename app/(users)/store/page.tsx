import prismadb from "@/lib/prismadb";
import { Metadata } from "next";
import ProductList from "./components/ProductList";

export const metadata:Metadata ={
   title:"AgriTech Store",
   description:"Purchase agricultural products, everything!"
}

const fetchProducts=async(
)=>{
    try{
    const products = await prismadb.product.findMany({
        include:{images:true,Ratings:true,productSpecification:true,category:true,subCategory:true}
    })
    return products}catch(error){
        console.error("PRODUCT_FETCH",error);
    }

}

const fetchCategories = async()=>{
    try{
const categories = await prismadb.category.findMany({
    include:{subCategories:true}
})
return categories;
    }catch(error){
        console.error("CATEGORY_FETCH",error)
    }
}

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const StorePage =async(
    props: {
        params: Params
        searchParams: SearchParams
      })=>{
  const searchParams = await props.searchParams
    console.log(searchParams.name) 
    const products = await fetchProducts();
    const categories = await fetchCategories();
const formattedCategories = categories?.map((category)=>{
    return {
        id:category.id,
        name:category.name,
        subCategories: category.subCategories.map((sc)=>{
            return{id:sc.id,name:sc.name}
        }
        )
    }
})
const formattedProducts= products?.map((product)=>{
    return {
        id:product.id,
        name:product.name,
        description:product.detail,
        discount:product.discount ||0,
        images:product.images.map(image=>{return{url:image.url}}),
        ratings:product.Ratings.map(rating=>{return{rating:rating.rating}}),
        price:product.price,
        discountedPrice: product.discount?Math.round(product.price-product.price*0.01*product.discount):0,
        category:product.category.name,
        subCategory:product.subCategory?.name || '',
        productSpecifications:product.productSpecification.map(ps=>{return {name:ps.name,value:ps.value}})
    }
}) || [];

    console.log(products,categories);
    return <>
   
        <ProductList products={formattedProducts} categories={formattedCategories}/>
            
    </>
}
export default StorePage;