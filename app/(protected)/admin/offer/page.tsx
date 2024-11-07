
import OfferForm from "./components/offer-form"
import prismadb from "@/lib/prismadb"

const fetchProducts = async()=>{
   try{
      const products= await prismadb.product.findMany({
         select:{
            id:true,
            name:true,
            images:{
               select:{
                  url:true
               }
            }

         }
      })
   return products
}catch(error){
      console.error('fetch_products_error',error)
      return [];
   }

}
 const Offerpage =async()=>{
   const products = await fetchProducts();
    return(
       <OfferForm products={products}/>
    )
}
export default Offerpage;