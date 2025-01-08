"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { FaExpand, FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";
import useWish from "@/hooks/use-wish";
import usePreviewModel from "@/hooks/use-preview-modal";

interface ProductCardProps {
  product: {
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

  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const previewModal = usePreviewModel();
  const cart = useCart();
  const wish = useWish();
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(product);
  };

  const onAddToWish: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    wish.addItem(product);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(product);
  };

  const averageRating =
    product.ratings.length > 0
      ? product.ratings.reduce((sum, r) => sum + r.rating, 0) / product.ratings.length
      : 0;

  const formattedDiscount = Math.round(product.discount);
  const formattedPrice = product.price.toFixed(2);
  const formattedDiscountedPrice =product.discountedPrice.toFixed(2);
  const discountAmount = Math.round(product.price - product.discountedPrice);
  const shortDescription = product.description.length > 100 ? 
    `${product.description.substring(0, 97)}...` : 
    product.description;

  return (
    <motion.div
      className="w-60 relative group bg-white      border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onClick={() => alert(`Clicked on ${product.name}`)} // Replace with navigation logic
    >
      {product.discount > 0 && (
        <div className="absolute top-0 left-0 z-30 bg-red-500 text-white     px-2 py-1 text-sm font-bold">
          {formattedDiscount}%
        </div>
      )}
      <div className=" w-full h-60 relative">
      <Image
        src={product.images[0]?.url || "/images/default-product.jpg"}
        alt={product.name}
        fill
        className="object-contain"
      />
      <IconButton
          onClick={onAddToWish}
          icon={
            <FaHeart size={15} className="text-red-600" />
          }
          className="absolute top-0 right-5 group-hover:opacity-100 opacity-0"
        />
      
       <div className="group-hover:opacity-100 transition absolute w-full px-6 bottom-5 opacity-0">
       
          <div className="flex gap-2 justify-center">
        
            <IconButton
              onClick={onPreview}
              icon={
                <FaExpand size={15} className="text-blue-800" />
              }
              className=""
            />
            <IconButton
              onClick={onAddToCart}
              icon={
                <FaShoppingBag
                  size={15}
                  className="text-yellow-500"
                />
              }
              className=""
            />
          </div>
        </div>

      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <div className="text-sm text-gray-600 my-2">{shortDescription}</div>
        {product.description.length > 100 && (
          <button className="text-blue-500 hover:underline">
            Read more
          </button>
        )}
        <div className="flex items-center my-1">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={`material-icons ${index < averageRating ? "text-yellow-500" : "text-gray-300"}`}>
              <FaStar/>
            </span>
          ))}
          <span className="ml-2 text-gray-600">({product.ratings.length})</span>
        </div>
        {
            product.discount >0 && 
        <div className="text-lg text-red-500 line-through"><Currency value={formattedPrice}/></div>
        }
              {
            product.discount===0 &&     
        <div><Currency value={formattedPrice} /></div>}
        { product.discount >0 &&  <div className="text-lg font-bold"><Currency value={formattedDiscountedPrice}/></div>}

       { product.discount >0 &&  (
          <div className="text-sm text-blue-600 flex gap-2">
            Save up to <Currency value={discountAmount}/>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
